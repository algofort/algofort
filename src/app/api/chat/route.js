import { readChatConfig } from '../../../lib/server/chatConfig';
import { buildChatMessages } from '../../../lib/server/chatPrompt';
import { requestChatCompletion } from '../../../lib/server/chatProvider';
import { takeChatSlot } from '../../../lib/server/chatRateLimit';
import { readSiteSettings } from '../../../lib/server/siteSettingsStore';
import { whatsappLink } from '../../../lib/siteSettings';
import { hasValidRequestOrigin } from '../../../lib/server/requestOrigin.js';
import { saveSubmission } from '../../../lib/server/submissions.js';

export const runtime = 'nodejs';
const noStore = {'Cache-Control':'no-store'};
function json(data,status=200,headers={}) { return Response.json(data,{status,headers:{...noStore,...headers}}); }

function extractContactLead(messages) {
  const latestMessage = messages.at(-1);
  if (!latestMessage || latestMessage.role !== 'user') return null;
  const content = latestMessage.content || '';

  const emailMatch = content.match(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/);
  if (!emailMatch) return null;
  const email = emailMatch[0].toLowerCase();

  const previousUserMessages = messages.slice(0, -1).filter(m => m.role === 'user');
  const alreadyCaptured = previousUserMessages.some(m => (m.content || '').toLowerCase().includes(email));
  if (alreadyCaptured) return null;

  const phoneMatch = content.match(/(?:phone|whatsapp|tel|mobile)?[:\s]*([+]?[\d\s().-]{7,25}\d)/i);
  const phone = phoneMatch ? phoneMatch[1].trim() : '';

  const nameMatch = content.match(/(?:name|i am|i'm|my name is)[:\s]*([a-zA-Z\s]{2,40})(?:\r?\n|$|,|\.)/i);
  const fullName = nameMatch ? nameMatch[1].trim() : 'Chat Visitor';

  return { fullName, email, phone, message: content };
}

export async function GET() {
  try {
    const [config,contact] = await Promise.all([readChatConfig(),readSiteSettings()]);
    return json({enabled:config.enabled && Boolean(config.apiKeyEncrypted),name:config.name,greeting:config.greeting,whatsappUrl:whatsappLink(contact)});
  } catch { return json({enabled:false}); }
}
export async function POST(request) {
  if (!hasValidRequestOrigin(request)) return json({error:'Invalid request origin.'},403);
  if (!request.headers.get('content-type')?.includes('application/json')) return json({error:'Expected JSON.'},415);
  let messages;
  try {
    if (Number(request.headers.get('content-length'))>18000) return json({error:'Please send a shorter message.'},413);
    const text=await request.text(); if(text.length>18000)return json({error:'Please send a shorter message.'},413);
    const body=JSON.parse(text); messages=body.messages;
    if (!Array.isArray(messages) || !messages.length || messages.length>12 || messages.some(message=>!message || !['user','assistant'].includes(message.role) || typeof message.content!=='string' || !message.content.trim() || message.content.length>2000) || messages.at(-1).role!=='user' || messages.reduce((n,message)=>n+message.content.length,0)>12000) return json({error:'Please keep messages under 2,000 characters.'},400);
  } catch { return json({error:'Invalid message.'},400); }

  const lead = extractContactLead(messages);
  if (lead) {
    saveSubmission({
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
      source: 'chat',
      selectedServices: ['AI Support Chat'],
    }).catch(err => {
      console.error('Chat lead capture failed:', err?.code || err?.name || err);
    });
  }

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
