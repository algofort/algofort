// Show the welcome enquiry after visitor intent, keeping initial page paint
// free of modal imagery and CAPTCHA. Do not interrupt navigation/form controls.
export function onPopupIntent(open) {
  let timer;
  let disposed = false;
  const events = ['wheel', 'touchmove', 'pointerdown', 'keydown'];
  function remove() { events.forEach(name => window.removeEventListener(name, intent, true)); }
  function intent(event) {
    if (event.type === 'keydown' && !['ArrowDown', 'PageDown', ' ', 'End'].includes(event.key)) return;
    if (event.target instanceof Element && event.target.closest('a, button, input, textarea, select, [role="button"]')) return;
    if (document.querySelector('dialog[open], button[aria-label="Close menu"][aria-expanded="true"], [aria-controls="mobile-navigation"][aria-expanded="true"], .menu-button[aria-expanded="true"]')) return;
    remove();
    timer = setTimeout(() => { if (!disposed) open(); }, 200);
  }
  events.forEach(name => window.addEventListener(name, intent, { capture: true, passive: true }));
  return () => { disposed = true; remove(); clearTimeout(timer); };
}
