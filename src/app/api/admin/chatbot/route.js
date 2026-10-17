import { database } from '../../../../lib/server/firebase';
import { readChatConfig, adminChatConfig, encryptChatKey } from '../../../../lib/server/chatConfig';
import { requireAdmin, readBody, adminError, HttpError } from '../../../../lib/server/adminAccess';
import { validateChatEndpoint, requestChatCompletion } from '../../../../lib/server/chatProvider';

export const runtime = 'nodejs';
const noStore = { 'Cache-Control':'no-store' };
export async function GET(request) {
  try { await requireAdmin(request,'settings'); return Response.json(adminChatConfig(await readChatConfig()), {headers:noStore}); }
  catch(error) { return adminError(error); }
}
export async function PUT(request) {
  try {
    const actor = await requireAdmin(request,'settings'); const body = await readBody(request);
    const limits = {name:60,greeting:350,providerName:60,endpoint:500,model:120,instructions:2000,companyKnowledge:12000};
    for (const [key,max] of Object.entries(limits)) if (typeof body[key] !== 'string' || !body[key].trim() || body[key].length>max) throw new HttpError(400,`Check ${key} (maximum ${max} characters).`);
    if (typeof body.enabled !== 'boolean' || !Number.isInteger(body.dailyLimit) || body.dailyLimit<10 || body.dailyLimit>5000) throw new HttpError(400,'Choose a daily limit between 10 and 5,000 requests.');
    if (!/^[a-zA-Z0-9_./:-]+$/.test(body.model)) throw new HttpError(400,'Enter a valid model ID.');
    try { await validateChatEndpoint(body.endpoint.trim()); } catch { throw new HttpError(400,'Use a public HTTPS API endpoint ending in /chat/completions. Private addresses, redirects, credentials and query parameters are not supported.'); }
    const previous = await readChatConfig(); let apiKeyEncrypted = previous.apiKeyEncrypted;
    if (body.apiKey !== undefined && (typeof body.apiKey !== 'string' || body.apiKey.length>500)) throw new HttpError(400,'Invalid API key.');
    if (body.apiKey?.trim()) {
      if (!/^[\x21-\x7e]{20,500}$/.test(body.apiKey.trim())) throw new HttpError(400,'Enter a valid API key without spaces or newlines.');
      apiKeyEncrypted = encryptChatKey(body.apiKey.trim());
    }
    if (body.enabled && !apiKeyEncrypted) throw new HttpError(400,'Add an API key before enabling the assistant.');
    const config = { ...Object.fromEntries(Object.keys(limits).map(key=>[key,body[key].trim()])), enabled:body.enabled, dailyLimit:body.dailyLimit, apiKeyEncrypted };
    await database().collection('siteSettings').doc('chatbot').set({ ...config, updatedAt:new Date().toISOString(), updatedBy:actor.uid },{merge:true});
    return Response.json(adminChatConfig(config),{headers:noStore});
  } catch(error) { return adminError(error); }
}
export async function POST(request) {
  try {
    await requireAdmin(request,'settings'); const config = await readChatConfig();
    await requestChatCompletion(config,[{role:'user',content:'Reply with exactly: Connection successful.'}],{test:true});
    return Response.json({ok:true,message:'Connection successful. The saved API key, endpoint and model are working.'},{headers:noStore});
  } catch(error) {
    if (error.providerStatus) return Response.json({error: error.providerStatus===401 ? 'The provider rejected the API key. Replace it and save again.' : error.providerStatus===429 ? 'The provider rate limit or quota has been reached.' : `The provider returned HTTP ${error.providerStatus}. Check the saved endpoint, model and account access.`},{status:502,headers:noStore});
    return adminError(error);
  }
}
