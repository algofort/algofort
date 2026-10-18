// cPanel terminates HTTPS before forwarding to Next, so request.url can contain
// an internal HTTP origin. Keep the public origins explicit rather than trusting
// arbitrary forwarded headers or disabling the cross-origin check.
const publicOrigins = new Set(['https://algofort.com', 'https://www.algofort.com']);

export function hasValidRequestOrigin(request) {
  const origin = request.headers.get('origin');
  if (!origin) return true;
  if (publicOrigins.has(origin)) return true;
  return origin === new URL(request.url).origin;
}
