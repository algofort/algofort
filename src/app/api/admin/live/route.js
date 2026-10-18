import { requireAdmin,adminError } from '../../../../lib/server/adminAccess';
import { subscribeAdminRevisions,allowedRevisions } from '../../../../lib/server/adminLive';
import { database } from '../../../../lib/server/firebase';

export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET(request) {
  try {
    const actor=await requireAdmin(request);
    if(new URL(request.url).searchParams.get('snapshot')==='1') {
      const versions=await new Promise((resolve,reject)=>{
        let stop=()=>{};
        const timer=setTimeout(()=>{stop();reject(Error('Revision timeout'));},10000);
        stop=subscribeAdminRevisions(value=>{clearTimeout(timer);stop();resolve(allowedRevisions(value,actor.role));},()=>{clearTimeout(timer);stop();reject(Error('Revision unavailable'));});
      });
      return Response.json(versions,{headers:{'Cache-Control':'no-store'}});
    }
    const encoder=new TextEncoder();let dispose=()=>{};
    const stream=new ReadableStream({
      start(controller) {
        let closed=false,stopRevisions=()=>{},stopProfile=()=>{},heartbeat,expiry;
        function finish() {
          if(closed)return;closed=true;clearInterval(heartbeat);clearTimeout(expiry);stopRevisions();stopProfile();request.signal.removeEventListener('abort',finish);
          try{controller.close();}catch{}
        }
        dispose=finish;
        function send(event,data) {if(!closed)try{controller.enqueue(encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`));}catch{finish();}}
        stopRevisions=subscribeAdminRevisions(versions=>send('revisions',allowedRevisions(versions,actor.role)),()=>{send('unavailable',{});finish();});
        stopProfile=database().collection('adminUsers').doc(actor.uid).onSnapshot(snapshot=>{
          const profile=snapshot.data();
          if(!profile?.active || profile.role!==actor.role){send('access-changed',{});finish();}
        },()=>finish());
        heartbeat=setInterval(()=>send('heartbeat',{}),15000);
        // Reauthenticate regularly, including revoked Firebase sessions.
        expiry=setTimeout(finish,55000);
        request.signal.addEventListener('abort',finish,{once:true});if(request.signal.aborted)finish();
      },
      cancel(){dispose();},
    });
    return new Response(stream,{headers:{'Content-Type':'text/event-stream','Cache-Control':'no-store, no-transform','X-Accel-Buffering':'no'}});
  }catch(error){return adminError(error);}
}
