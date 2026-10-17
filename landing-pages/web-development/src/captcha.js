const siteKey = __RECAPTCHA_SITE_KEY__;
const widgets = new WeakMap();
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
  if (!container || widgets.has(container)) return;
  await loadScript();
  if (!container.isConnected || widgets.has(container)) return;
  const id = window.grecaptcha.render(container, {
    sitekey: siteKey,
    size: container.dataset.captchaSize === 'auto-width'
      ? (container.clientWidth < 304 ? 'compact' : 'normal')
      : container.dataset.captchaSize || (window.matchMedia('(max-width: 420px)').matches || container.clientWidth < 304 ? 'compact' : 'normal'),
  });
  widgets.set(container, id);
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
  if (!('IntersectionObserver' in window)) {
    renderCaptcha(container).catch(onError);
    return () => {};
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    renderCaptcha(container).catch(onError);
  }, { rootMargin: '400px 0px' });
  observer.observe(container);
  return () => observer.disconnect();
}
