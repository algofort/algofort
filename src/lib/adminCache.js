const PREFIX='algofort-admin-v1:';
const MAX_AGE=15*60*1000;
const resources=new Set(['overview','content','submissions','users','settings','chatbot']);
function browserStorage(){try{return globalThis.sessionStorage;}catch{return null;}}
function validData(key,data){
  if(!data||typeof data!=='object'||Array.isArray(data))return false;
  switch(key.split('?')[0]){
    case 'content':return ['projects','homeProjects','categories'].every(name=>Array.isArray(data[name]));
    case 'submissions':return Array.isArray(data.submissions)&&(data.cursor===null||typeof data.cursor==='string');
    case 'users':return Array.isArray(data.users);
    case 'settings':return typeof data.whatsappNumber==='string'&&typeof data.whatsappMessage==='string'&&typeof data.whatsappEnabled==='boolean';
    case 'chatbot':return ['name','greeting','companyKnowledge','instructions','providerName','endpoint','model'].every(name=>typeof data[name]==='string')&&typeof data.hasApiKey==='boolean';
    case 'overview':return Object.values(data).every(value=>typeof value==='number'&&Number.isFinite(value));
    default:return false;
  }
}

export function createAdminCache(uid,role,storage=browserStorage()) {
  const prefix=`${PREFIX}${uid}:${role}:`,memory=new Map(),versions={},listeners=new Set(),pending=new Map();
  let generation=0;
  function remove(key){memory.delete(key);try{storage?.removeItem(prefix+key);}catch{}}
  function read(key){
    try{const item=memory.get(key)||JSON.parse(storage?.getItem(prefix+key)||'null');if(!item)return null;
      if(item.uid!==uid||item.role!==role||!Number.isFinite(item.at)||Date.now()-item.at>MAX_AGE||item.at>Date.now()+60000||!validData(key,item.data)){remove(key);return null;}
      memory.set(key,item);return item;
    }catch{remove(key);return null;}
  }
  function write(key,data,version){
    const item={uid,role,at:Date.now(),data,version:version||null};memory.set(key,item);
    try{const serialized=JSON.stringify(item);if(serialized.length<1500000)storage?.setItem(prefix+key,serialized);}catch{}
  }
  function keys(){const result=new Set(memory.keys());try{for(let i=0;i<storage.length;i++){const key=storage.key(i);if(key?.startsWith(prefix))result.add(key.slice(prefix.length));}}catch{}return [...result];}
  function invalidate(names,notify=true){generation++;for(const key of keys())if(names.includes(key.split('?')[0]))remove(key);if(notify)listeners.forEach(fn=>fn(names));}
  return {
    uid,role,
    peek:path=>read(path)?.data,
    subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn);},
    invalidate,
    clear(){generation++;for(const key of keys())remove(key);listeners.clear();},
    acceptVersions(next){
      const changed=[];
      for(const [name,version] of Object.entries(next)) {
        if(!resources.has(name))continue;
        if((versions[name]&&versions[name]!==version)||keys().some(key=>key.split('?')[0]===name&&read(key)?.version!==version))changed.push(name);
        versions[name]=version;
      }
      if(changed.length)invalidate(changed);
    },
    async get(path,fetcher,{force=false}={}){
      if(!resources.has(path.split('?')[0]))return fetcher();
      const item=read(path);if(!force&&item)return item.data;
      if(pending.has(path))return pending.get(path);
      const start=generation,version=versions[path.split('?')[0]];
      let changed=false;
      const promise=fetcher().then(data=>{if(start===generation)write(path,data,version||versions[path.split('?')[0]]);else changed=true;return data;}).finally(()=>{pending.delete(path);if(changed)queueMicrotask(()=>listeners.forEach(fn=>fn([path.split('?')[0]])));});
      pending.set(path,promise);return promise;
    },
  };
}

export function clearAdminCaches(storage=browserStorage()){try{for(let i=storage.length-1;i>=0;i--){const key=storage.key(i);if(key?.startsWith(PREFIX))storage.removeItem(key);}}catch{}}

export function connectAdminLive({getToken,onVersions,onAccessChanged,onStatus}) {
  let stopped=false,retry=1000,timer,controller,sequence=0;
  async function connect(){
    if(stopped||document.hidden||!navigator.onLine)return;
    const current=++sequence;controller?.abort();controller=new AbortController();const connection=controller;let received=false;
    let watchdog;
    function keepAlive(){clearTimeout(watchdog);watchdog=setTimeout(()=>connection.abort(),25000);}
    keepAlive();
    try {
      const token=await getToken();if(stopped||current!==sequence)return;
      const response=await fetch('/api/admin/live',{headers:{Authorization:`Bearer ${token}`},cache:'no-store',signal:connection.signal});
      if([401,403].includes(response.status)){onAccessChanged();return;}
      if(!response.ok||!response.body)throw Error('Live updates unavailable');
      const reader=response.body.getReader(),decoder=new TextDecoder();let buffer='';
      while(!stopped&&current===sequence){const {value,done}=await reader.read();if(done)break;keepAlive();buffer+=decoder.decode(value,{stream:true});let index;
        while((index=buffer.indexOf('\n\n'))!==-1){const part=buffer.slice(0,index);buffer=buffer.slice(index+2);const event=part.match(/^event: (.+)$/m)?.[1],raw=part.match(/^data: (.+)$/m)?.[1];
          if(event==='revisions'){onVersions(JSON.parse(raw));onStatus('live');received=true;retry=1000;}
          if(event==='access-changed'){onAccessChanged();return;}
          if(event==='unavailable')throw Error('Live updates unavailable');
        }
      }
    }catch{if(!stopped&&current===sequence&&!document.hidden){onStatus('reconnecting');try{
      // Some shared hosts buffer streams. Fall back to revision-only checks;
      // unchanged revisions never cause complete lists to be downloaded again.
      const response=await fetch('/api/admin/live?snapshot=1',{headers:{Authorization:`Bearer ${await getToken()}`},cache:'no-store',signal:AbortSignal.timeout(15000)});
      if([401,403].includes(response.status)){onAccessChanged();return;}
      if(response.ok&&!stopped&&current===sequence){onVersions(await response.json());onStatus('checking');}
    }catch{}}}
    finally{clearTimeout(watchdog);if(!stopped&&current===sequence){clearTimeout(timer);timer=setTimeout(connect,received?500:retry);if(!received)retry=Math.min(retry*2,30000);}}
  }
  function resume(){clearTimeout(timer);if(document.hidden||!navigator.onLine){sequence++;controller?.abort();onStatus(navigator.onLine?'paused':'offline');}else connect();}
  document.addEventListener('visibilitychange',resume);window.addEventListener('online',resume);window.addEventListener('offline',resume);connect();
  return()=>{stopped=true;clearTimeout(timer);controller?.abort();document.removeEventListener('visibilitychange',resume);window.removeEventListener('online',resume);window.removeEventListener('offline',resume);};
}
