import { readChatConfig } from '../../../lib/server/chatConfig';
import { buildChatMessages } from '../../../lib/server/chatPrompt';
import { requestChatCompletion } from '../../../lib/server/chatProvider';
import { takeChatSlot } from '../../../lib/server/chatRateLimit';
import { readSiteSettings } from '../../../lib/server/siteSettingsStore';
import { whatsappLink } from '../../../lib/siteSettings';

export const runtime = 'nodejs';
const noStore = {'Cache-Control':'no-store'};
function json(data,status=200,headers={}) { return Response.json(data,{status,headers:{...noStore,...headers}}); }
export async function GET() {
  try {
    const [config,contact] = await Promise.all([readChatConfig(),readSiteSettings()]);
    return json({enabled:config.enabled && Boolean(config.apiKeyEncrypted),name:config.name,greeting:config.greeting,whatsappUrl:whatsappLink(contact)});
  } catch { return json({enabled:false}); }
}
export async function POST(request) {
  const origin = request.headers.get('origin');
  if (origin && origin!==new URL(request.url).origin) return json({error:'Invalid request origin.'},403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({error:'Expected JSON.'},415);
  let messages;
  try {
    if (Number(request.headers.get('content-length'))>18000) return json({error:'Please send a shorter message.'},413);
    const text=await request.text(); if(text.length>18000)return json({error:'Please send a shorter message.'},413);
    const body=JSON.parse(text); messages=body.messages;
    if (!Array.isArray(messages) || !messages.length || messages.length>12 || messages.some(message=>!message || !['user','assistant'].includes(message.role) || typeof message.content!=='string' || !message.content.trim() || message.content.length>2000) || messages.at(-1).role!=='user' || messages.reduce((n,message)=>n+message.content.length,0)>12000) return json({error:'Please keep messages under 2,000 characters.'},400);
  } catch { return json({error:'Invalid message.'},400); }
  try {
    const [config,contact]=await Promise.all([readChatConfig(),readSiteSettings()]);
    if (!config.enabled || !config.apiKeyEncrypted) return json({error:'AI support is unavailable. Please contact our team.'},503);
    const slot=await takeChatSlot(request.headers,config.dailyLimit);
    if(!slot.allowed)return json({error:'AI support is busy. Please try again later or contact us on WhatsApp.'},429,{'Retry-After':String(slot.retryAfter)});
    const reply=await requestChatCompletion(config,buildChatMessages(config,contact,whatsappLink(contact),messages));
    return json({reply});
  } catch(error) {
    console.error('Support chat failed:',error.providerStatus || error.code || error.name);
    return json({error:'Our AI assistant could not reply just now. Please try again or contact the team on WhatsApp.'},502);
  }
}
