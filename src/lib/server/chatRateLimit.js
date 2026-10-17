import { createHmac } from 'node:crypto';
import { database } from './firebase.js';

export async function takeChatSlot(headers, dailyLimit) {
  const now = Date.now(), day = new Date(now).toISOString().slice(0,10), windowId = Math.floor(now / 600000);
  const ip = (headers.get('x-real-ip') || headers.get('x-forwarded-for')?.split(',')[0] || 'unknown').trim().slice(0,100);
  const hash = createHmac('sha256', process.env.CHATBOT_ENCRYPTION_KEY || 'algofort-chat').update(ip).digest('hex').slice(0,32);
  const store = database();
  const clientRef = store.collection('chatRateLimits').doc(`client-${windowId}-${hash}`);
  const dayRef = store.collection('chatRateLimits').doc(`daily-${day}`);
  return store.runTransaction(async tx => {
    const [client, global] = await Promise.all([tx.get(clientRef),tx.get(dayRef)]);
    if ((client.data()?.count || 0) >= 20) return { allowed:false, retryAfter:Math.ceil((600000-now%600000)/1000) };
    if ((global.data()?.count || 0) >= dailyLimit) return { allowed:false, retryAfter:Math.ceil((86400000-now%86400000)/1000) };
    const expiresAt = new Date(now+7*86400000);
    tx.set(clientRef, { count:(client.data()?.count || 0)+1, expiresAt });
    tx.set(dayRef, { count:(global.data()?.count || 0)+1, expiresAt });
    return { allowed:true };
  });
}
