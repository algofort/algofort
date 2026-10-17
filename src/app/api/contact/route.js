import { saveSubmission } from '../../../lib/server/submissions.js';
import { checkContactRateLimit } from '../../../utils/contactRateLimit';

export const runtime = 'nodejs';

const allowedServices = new Set([
  'Website Design',
  'Software Development',
  'AI Development',
  'App Development',
  'DevOps & Cloud',
  'UI/UX Design',
  'Brand Identity',
]);

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
  if (contentLength > 12000) {
    return json({ error: 'Your message is too long.' }, 413);
  }

  let body;
  try {
    const raw = await request.text();
    if (raw.length > 12000) return json({ error: 'Your message is too long.' }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Invalid request format.' }, 400);
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return json({ error: 'Invalid request format.' }, 400);
  }

  // A hidden field gives simple bots a way to identify themselves without bothering visitors.
  if (body.website) return json({ ok: true }, 200);

  const fullName = clean(body.fullName);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const message = clean(body.message);
  const source = body.source;
  const selectedServices = body.selectedServices;
  const isWebLanding = source === 'lp-web-estimate' || source === 'lp-web-popup';
  const isBrandLanding = source === 'lp-brand-inquiry' || source === 'lp-brand-popup';
  const isAppLanding = source === 'lp-app-preview' || source === 'lp-app-inquiry';
  const isSaasLanding = source === 'lp-saas-inquiry' || source === 'lp-saas-popup';

  if (
    fullName.length < 2 || fullName.length > 120 ||
    ((isWebLanding || isBrandLanding || isAppLanding || isSaasLanding)
      ? (phone.length > 0 && (phone.length < 5 || phone.length > 40 || !/^[+\d\s().-]+$/.test(phone)))
      : (phone.length < 5 || phone.length > 40 || !/^[+\d\s().-]+$/.test(phone))) ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 1 || message.length > 5000 ||
    !['contact', 'cta', 'lp-web-estimate', 'lp-web-popup', 'lp-brand-inquiry', 'lp-brand-popup', 'lp-app-preview', 'lp-app-inquiry', 'lp-saas-inquiry', 'lp-saas-popup'].includes(source) ||
    !Array.isArray(selectedServices) || selectedServices.length < 1 ||
    selectedServices.length > allowedServices.size ||
    selectedServices.some((service) => !allowedServices.has(service))
  ) {
    return json({ error: 'Please check the form fields and try again.' }, 400);
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  if (!siteKey || !secretKey) {
    console.error('reCAPTCHA configuration is incomplete.');
    return json({ error: 'Message service is temporarily unavailable. Please try again later.' }, 503);
  }

  const token = clean(body.recaptchaToken);
  if (!token || token.length > 4096) {
    return json({ error: 'Please complete the security check and try again.' }, 400);
  }

  try {
    const verification = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: secretKey, response: token }),
      signal: AbortSignal.timeout(7000),
      cache: 'no-store',
    });
    if (!verification.ok) throw new Error('reCAPTCHA verification unavailable');
    const result = await verification.json();
    if (!result.success || result.hostname !== new URL(request.url).hostname) {
      return json({ error: 'Security check expired or failed. Please try again.' }, 400);
    }
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error?.cause?.code || error?.code || error?.name || 'unknown');
    return json({ error: 'Security check is temporarily unavailable. Please try again later.' }, 503);
  }

  try {
    await saveSubmission({ fullName, email, phone, message, source, selectedServices });
    return json({ ok: true }, 200);
  } catch (error) {
    console.error('Saving contact submission failed:', error.code || error.name);
    return json({ error: 'Your message could not be saved. Please try again later.' }, 503);
  }
}
