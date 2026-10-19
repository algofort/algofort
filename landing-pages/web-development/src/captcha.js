import { fitRecaptcha } from '../../../src/utils/fitRecaptcha.js';

const siteKey = __RECAPTCHA_SITE_KEY__;
const widgets = new WeakMap();
const fitCleanups = new WeakMap();
let scriptPromise;

function loadScript() {
  if (!siteKey) return Promise.reject(new Error('Security check is unavailable. Please try again later.'));
  if (window.grecaptcha?.render) return Promise.resolve();
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    window.algofortWebRecaptchaLoaded = () => resolve();
    const script = document.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=algofortWebRecaptchaLoaded&render=explicit';
    script.async = true;
    script.onerror = () => reject(new Error('Security check could not load. Please try again.'));
    document.head.appendChild(script);
  }).catch((error) => {
    scriptPromise = null;
    throw error;
  });

  return scriptPromise;
}

export async function renderCaptcha(container) {
  if (!container) return;
  if (widgets.has(container)) {
    if (container.dataset.captchaSize !== 'compact') {
      fitCleanups.get(container)?.();
      fitCleanups.set(container, fitRecaptcha(container));
    }
    return;
  }
  await loadScript();
  if (!container.isConnected || widgets.has(container)) return;
  const id = window.grecaptcha.render(container, {
    sitekey: siteKey,
    // The interactive phone demo intentionally uses compact mode. Every real
    // enquiry form keeps the familiar horizontal checkbox, also on mobile.
    size: container.dataset.captchaSize === 'compact' ? 'compact' : 'normal',
  });
  widgets.set(container, id);
  if (container.dataset.captchaSize !== 'compact') {
    fitCleanups.get(container)?.();
    fitCleanups.set(container, fitRecaptcha(container));
  }
}

export function captchaToken(container) {
  const id = container && widgets.get(container);
  return id === undefined ? '' : window.grecaptcha?.getResponse(id) || '';
}

export function resetCaptcha(container) {
  const id = container && widgets.get(container);
  if (id !== undefined) window.grecaptcha?.reset(id);
}

export function observeCaptcha(container, onError = () => {}) {
  if (!container) return;
  let active = true;
  const render = () => renderCaptcha(container).then(() => {
    if (!active) { fitCleanups.get(container)?.(); fitCleanups.delete(container); }
  }).catch(error => { if (active) onError(error); });
  if (!('IntersectionObserver' in window)) {
    render();
    return () => { active = false; fitCleanups.get(container)?.(); fitCleanups.delete(container); };
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    render();
  }, { rootMargin: '400px 0px' });
  observer.observe(container);
  return () => { active = false; observer.disconnect(); fitCleanups.get(container)?.(); fitCleanups.delete(container); };
}
