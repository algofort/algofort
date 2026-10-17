import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';
import { database } from './firebase.js';
import { DEFAULT_CHAT_CONFIG } from '../chatDefaults.js';

function masterKey() {
  const key = Buffer.from(process.env.CHATBOT_ENCRYPTION_KEY || '', 'base64');
  if (key.length !== 32) throw new Error('Chat encryption is not configured');
  return key;
}
export function encryptChatKey(secret) {
  const iv = randomBytes(12); const cipher = createCipheriv('aes-256-gcm', masterKey(), iv);
  const encrypted = Buffer.concat([cipher.update(secret, 'utf8'), cipher.final()]);
  return { ciphertext: encrypted.toString('base64'), iv: iv.toString('base64'), tag: cipher.getAuthTag().toString('base64') };
}
export function decryptChatKey(value) {
  if (!value?.ciphertext || !value.iv || !value.tag) return '';
  const decipher = createDecipheriv('aes-256-gcm', masterKey(), Buffer.from(value.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(value.tag, 'base64'));
  return Buffer.concat([decipher.update(Buffer.from(value.ciphertext, 'base64')), decipher.final()]).toString('utf8');
}
export async function readChatConfig() {
  const doc = await database().collection('siteSettings').doc('chatbot').get();
  const data = doc.data() || {};
  return { ...DEFAULT_CHAT_CONFIG, ...Object.fromEntries(Object.keys(DEFAULT_CHAT_CONFIG).filter(key => data[key] !== undefined).map(key => [key,data[key]])), apiKeyEncrypted: data.apiKeyEncrypted || null };
}
export function adminChatConfig(config) {
  const { apiKeyEncrypted, ...safe } = config;
  return { ...safe, hasApiKey: Boolean(apiKeyEncrypted?.ciphertext) };
}
