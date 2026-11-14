import { saveSubmission } from '../../../lib/server/submissions.js';
import { checkContactRateLimit } from '../../../utils/contactRateLimit';

export const runtime = 'nodejs';

function json(data, status, extraHeaders = {}) {
  return Response.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store', ...extraHeaders },
  });
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(request) {
  const retryAfter = checkContactRateLimit(request.headers);
  if (retryAfter) {
    return json(
      { error: 'Too many attempts. Please try again shortly.' },
      429,
      { 'Retry-After': String(retryAfter) }
    );
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return json({ error: 'Invalid request format.' }, 415);
  }

  const contentLength = Number(request.headers.get('content-length'));
  if (contentLength > 4000) {
    return json({ error: 'Request too large.' }, 413);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 4000) return json({ error: 'Request too large.' }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid request format.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Invalid request format.' }, 400);
  }

  // Honeypot for bot detection
  if (body.website) return json({ ok: true }, 200);

  const email = clean(body.email).toLowerCase();
  const fullName = clean(body.fullName) || 'Newsletter Subscriber';

  if (!email || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please enter a valid email address.' }, 400);
  }

  try {
    await saveSubmission({
      fullName,
      email,
      phone: clean(body.phone),
      message: 'Newsletter subscription request',
      source: 'newsletter',
      selectedServices: ['Newsletter'],
    });
    return json({ ok: true }, 200);
  } catch (error) {
    console.error('Saving newsletter subscription failed:', error?.code || error?.name || error);
    return json({ error: 'Subscription service temporarily unavailable. Please try again later.' }, 503);
  }
}
