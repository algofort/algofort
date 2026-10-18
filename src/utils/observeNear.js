/** Initialize offscreen motion before it enters view, preserving its scroll trigger. */
export function observeNear(element, initialize, margin = 600) {
  if (!element) return () => {};
  let cleanup;
  let started = false;
  const start = () => {
    if (started) return;
    started = true;
    cleanup = initialize();
  };
  // Also initialize earlier sections on restored scroll/anchor navigation so
  // pin spacing and scrub progress are correct at the restored position.
  if (!('IntersectionObserver' in window) || element.getBoundingClientRect().top <= innerHeight + margin) {
    start();
    return () => cleanup?.();
  }
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      observer.disconnect();
      start();
    }
  }, { rootMargin: `${margin}px 0px` });
  observer.observe(element);
  return () => { observer.disconnect(); cleanup?.(); };
}
