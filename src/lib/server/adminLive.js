import { createHash } from 'node:crypto';
import { database } from './firebase.js';

const collections = ['portfolioProjects','portfolioCategories','submissions','adminUsers','siteSettings'];
const hubKey = Symbol.for('algofort.adminLive.v1');

// Share database listeners between dashboard connections in this server process.
// Only opaque revisions leave the server; document contents never enter the stream.
export function subscribeAdminRevisions(onChange,onError) {
  const hub = globalThis[hubKey] ||= {versions:{},subscribers:new Set(),stops:[],stopTimer:null};
  clearTimeout(hub.stopTimer);
  const subscriber={onChange,onError};hub.subscribers.add(subscriber);
  if(hub.failed){hub.stops.forEach(stop=>stop());hub.stops=[];hub.failed=false;}
  if(!hub.stops.length) {
    hub.versions={};
    hub.stops=collections.map(name=>database().collection(name).onSnapshot(snapshot=>{
      const stamp=snapshot.docs.map(doc=>`${doc.id}:${doc.updateTime?.toDate().getTime()}:${doc.updateTime?.nanoseconds}`).sort().join('|');
      const version=createHash('sha256').update(stamp).digest('hex').slice(0,24);
      if(hub.versions[name]===version)return;
      hub.versions[name]=version;
      if(collections.every(key=>hub.versions[key]))for(const item of hub.subscribers)item.onChange(hub.versions);
    },()=>{hub.failed=true;for(const item of [...hub.subscribers])item.onError();}));
  } else if(collections.every(key=>hub.versions[key]))queueMicrotask(()=>{if(hub.subscribers.has(subscriber))onChange(hub.versions);});
  return ()=>{
    hub.subscribers.delete(subscriber);
    if(!hub.subscribers.size)hub.stopTimer=setTimeout(()=>{hub.stops.forEach(stop=>stop());hub.stops=[];hub.versions={};},15000);
  };
}

export function allowedRevisions(versions,role) {
  const result={};
  if(['owner','editor'].includes(role))result.content=`${versions.portfolioProjects}.${versions.portfolioCategories}`;
  if(['owner','support'].includes(role))result.submissions=versions.submissions;
  if(role==='owner')Object.assign(result,{users:versions.adminUsers,settings:versions.siteSettings,chatbot:versions.siteSettings});
  result.overview=[result.content,result.submissions].filter(Boolean).join('.');
  return result;
}
