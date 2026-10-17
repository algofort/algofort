import https from 'node:https';
import { lookup } from 'node:dns/promises';
import { BlockList, isIP } from 'node:net';
import { decryptChatKey } from './chatConfig.js';

const blocked = new BlockList();
for (const [network,prefix] of [['0.0.0.0',8],['10.0.0.0',8],['100.64.0.0',10],['127.0.0.0',8],['169.254.0.0',16],['172.16.0.0',12],['192.0.0.0',24],['192.0.2.0',24],['192.168.0.0',16],['198.18.0.0',15],['198.51.100.0',24],['203.0.113.0',24],['224.0.0.0',4],['240.0.0.0',4]]) blocked.addSubnet(network,prefix,'ipv4');

export async function validateChatEndpoint(value) {
  let url;
  try { url = new URL(value); } catch { throw new Error('Enter a valid HTTPS chat-completions endpoint.'); }
  if (url.protocol !== 'https:' || url.username || url.password || url.hash || url.search || (url.port && url.port !== '443') || value.length > 500 || !url.pathname.endsWith('/chat/completions')) throw new Error('Use an HTTPS endpoint ending in /chat/completions, on port 443, without credentials or query parameters.');
  if (isIP(url.hostname) || !url.hostname.includes('.') || /(?:^|\.)(localhost|local|internal|test|invalid)$/.test(url.hostname)) throw new Error('Use a public API provider hostname.');
  const addresses = await lookup(url.hostname, { family: 4, all: true });
  if (!addresses.length || addresses.some(entry => blocked.check(entry.address,'ipv4'))) throw new Error('The API endpoint must resolve to a public provider address.');
  return { url, address: addresses[0].address };
}

export class ChatProviderError extends Error {
  constructor(status) { super('The AI provider could not complete the request.'); this.providerStatus = status; }
}
export async function requestChatCompletion(config, messages, { test = false } = {}) {
  const apiKey = decryptChatKey(config.apiKeyEncrypted);
  if (!apiKey) throw new Error('An API key has not been configured.');
  // Pin the validated address to this TLS request, preventing redirects and DNS rebinding.
  const { url, address } = await validateChatEndpoint(config.endpoint);
  const groqReasoning = url.hostname === 'api.groq.com' && config.model.startsWith('openai/gpt-oss-');
  const body = JSON.stringify({ model: config.model, messages, temperature: 0.3,
    ...(groqReasoning ? {max_completion_tokens:test?256:1400,reasoning_effort:'low',reasoning_format:'hidden'} : {max_tokens:test?80:550}), stream: false });
  const result = await new Promise((resolve,reject) => {
    const request = https.request(url, { method:'POST', headers:{ Authorization:`Bearer ${apiKey}`, 'Content-Type':'application/json', 'Content-Length':Buffer.byteLength(body) }, lookup: (_host, options, callback) => callback(null, options?.all ? [{address,family:4}] : address, 4) }, response => {
      const chunks = []; let length = 0;
      response.on('data', chunk => { length += chunk.length; if (length > 1024*1024) { response.destroy(); reject(new Error('AI response was too large')); } else chunks.push(chunk); });
      response.on('error',reject);
      response.on('end', () => {
        if (response.statusCode < 200 || response.statusCode >= 300) { reject(new ChatProviderError(response.statusCode)); return; }
        try { resolve(JSON.parse(Buffer.concat(chunks).toString('utf8'))); } catch { reject(new Error('Invalid AI provider response')); }
      });
    });
    const timer = setTimeout(() => request.destroy(new Error('AI request timed out')), 20000);
    request.on('close',()=>clearTimeout(timer)); request.on('error',reject); request.end(body);
  });
  const reply = result?.choices?.[0]?.message?.content;
  if (typeof reply !== 'string' || !reply.trim()) throw new Error('Empty AI response');
  return reply.trim().slice(0,6000);
}
