const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 10;
const MAX_GLOBAL = 120;

const state = globalThis.__algofortContactRateLimit || {
  clients: new Map(),
  total: { count: 0, resetAt: 0 },
};
globalThis.__algofortContactRateLimit = state;

function takeWindowSlot(record, limit, now) {
  if (now >= record.resetAt) {
    record.count = 0;
    record.resetAt = now + WINDOW_MS;
  }
  if (record.count >= limit) {
    return Math.max(1, Math.ceil((record.resetAt - now) / 1000));
  }
  record.count += 1;
  return 0;
}

export function checkContactRateLimit(headers) {
  const now = Date.now();
  const forwarded = headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const ip = (headers.get('x-real-ip') || forwarded || 'unknown').slice(0, 64);
  let client = state.clients.get(ip);
  if (!client) {
    client = { count: 0, resetAt: 0 };
    state.clients.set(ip, client);
  }

  if (state.clients.size > 1000) {
    for (const [key, value] of state.clients) {
      if (now >= value.resetAt) state.clients.delete(key);
    }
  }

  const clientRetryAfter = takeWindowSlot(client, MAX_PER_IP, now);
  if (clientRetryAfter) return clientRetryAfter;

  return takeWindowSlot(state.total, MAX_GLOBAL, now);
}
