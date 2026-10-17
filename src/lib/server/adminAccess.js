import { adminAuth } from './firebase.js';
import { database } from './firebase.js';

export class HttpError extends Error {
  constructor(status, message) { super(message); this.status = status; }
}
export async function requireAdmin(request, permission = 'read') {
  const token = request.headers.get('authorization')?.match(/^Bearer (.+)$/)?.[1];
  if (!token || token.length > 8192) throw new HttpError(401, 'Sign in to continue.');
  let user;
  try { user = await adminAuth().verifyIdToken(token, true); }
  catch { throw new HttpError(401, 'Your session has expired. Sign in again.'); }
  const record = await database().collection('adminUsers').doc(user.uid).get();
  const profile = record.data();
  const role = profile?.active === true ? profile.role : null;
  if (!user.email_verified || !['owner', 'editor', 'support'].includes(role)) throw new HttpError(403, 'Verify your email and ask the owner to enable your account.');
  if ((['users', 'settings'].includes(permission) && role !== 'owner') || (permission === 'portfolio' && !['owner', 'editor'].includes(role)) || (permission === 'submissions' && !['owner', 'support'].includes(role))) throw new HttpError(403, 'Your role does not allow this action.');
  if (!['GET', 'HEAD'].includes(request.method)) {
    const origin = request.headers.get('origin');
    if (origin && origin !== new URL(request.url).origin) throw new HttpError(403, 'Invalid request origin.');
  }
  return { ...user, role };
}
export function adminError(error) {
  console.error('Admin request failed:', error.status || error.code || error.name);
  return Response.json({ error: error.status ? error.message : 'The service is unavailable. Please try again.' }, { status: error.status || 503, headers: { 'Cache-Control': 'no-store' } });
}
export async function readBody(request) {
  if (!request.headers.get('content-type')?.includes('application/json')) throw new HttpError(415, 'Expected JSON.');
  const text = await request.text();
  if (text.length > 20000) throw new HttpError(413, 'Request is too large.');
  try { const body = JSON.parse(text); if (!body || Array.isArray(body) || typeof body !== 'object') throw Error(); return body; }
  catch { throw new HttpError(400, 'Invalid request.'); }
}
