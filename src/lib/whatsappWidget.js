import { whatsappLink, displayContactNumber } from './siteSettings.js';

export const WHATSAPP_SETTINGS_EVENT = 'algofort:contact-settings';
export const WHATSAPP_STORAGE_KEY = 'algofort-contact-settings-updated';

// One small implementation is used by Next.js and all four standalone landing pages.
export function initWhatsAppWidget() {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/admin')) return () => {};
  const existing = document.getElementById('algofort-whatsapp');
  if (existing) return () => {};
  const button = document.createElement('a');
  button.id = 'algofort-whatsapp';
  button.className = 'alg-whatsapp-tab';
  button.target = '_blank';
  button.rel = 'noopener noreferrer';
  button.setAttribute('aria-label', 'Chat with Algofort on WhatsApp (opens in a new tab)');
  button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.52 3.48A11.87 11.87 0 0 0 12.04 0C5.47 0 .12 5.35.12 11.92c0 2.1.55 4.15 1.59 5.96L.02 24l6.27-1.64a11.94 11.94 0 0 0 5.75 1.46h.01c6.57 0 11.92-5.35 11.92-11.92a11.85 11.85 0 0 0-3.45-8.42ZM12.05 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98.99-3.63-.24-.37a9.87 9.87 0 0 1-1.51-5.27c0-5.46 4.44-9.9 9.91-9.9a9.8 9.8 0 0 1 7 2.9 9.85 9.85 0 0 1 2.9 7c0 5.46-4.44 9.9-9.9 9.9Zm5.43-7.41c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.88-.78-1.48-1.75-1.65-2.05-.18-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg><span>WhatsApp</span>';
  button.hidden = true;
  document.body.appendChild(button);
  let destroyed = false;
  let sequence = 0;
  const controller = new AbortController();
  function apply(settings) {
    if (destroyed) return;
    const href = whatsappLink(settings);
    button.hidden = !href || !settings.whatsappEnabled;
    if (href) button.href = href;
    document.querySelectorAll('[data-whatsapp-link]').forEach(link => { if (href) link.setAttribute('href', href); });
    if (href) {
      const label = displayContactNumber(settings.whatsappNumber);
      document.querySelectorAll('[data-whatsapp-number]').forEach(element => { element.textContent = label; });
      document.querySelectorAll('[data-site-phone]').forEach(link => {
        link.setAttribute('href', `tel:${settings.whatsappNumber}`);
        const walker = document.createTreeWalker(link, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (/^\+?[\d\s().-]{8,}$/.test(node.textContent.trim())) node.textContent = label;
        }
      });
    }
  }
  async function refresh() {
    const current = ++sequence;
    try {
      const response = await fetch('/api/site-settings', { cache: 'no-store', signal: controller.signal });
      if (!response.ok) return;
      const data = await response.json();
      if (current === sequence) apply(data);
    } catch { /* Keep the last working number during a temporary network failure. */ }
  }
  function onSettings(event) { sequence++; apply(event.detail); }
  function onStorage(event) { if (event.key === WHATSAPP_STORAGE_KEY) refresh(); }
  function onVisible() { if (!document.hidden) refresh(); }
  refresh();
  window.addEventListener('focus', refresh);
  window.addEventListener('storage', onStorage);
  window.addEventListener(WHATSAPP_SETTINGS_EVENT, onSettings);
  document.addEventListener('visibilitychange', onVisible);
  const interval = setInterval(onVisible, 60000);
  return () => {
    destroyed = true; controller.abort(); clearInterval(interval); button.remove();
    window.removeEventListener('focus', refresh);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(WHATSAPP_SETTINGS_EVENT, onSettings);
    document.removeEventListener('visibilitychange', onVisible);
  };
}
