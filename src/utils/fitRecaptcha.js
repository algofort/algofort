// Keep Google's normal checkbox layout; scale the whole widget only when a
// narrow form cannot fit its native 304px width. Never crop the iframe itself.
export function fitRecaptcha(container) {
  container.style.width = 'min(304px, 100%)';
  container.style.maxWidth = '100%';
  container.style.flexShrink = '0';
  const fit = () => {
    const widget = container.firstElementChild;
    if (!widget || !container.clientWidth) return;
    const scale = Math.min(1, container.clientWidth / 304);
    widget.style.transformOrigin = 'top left';
    widget.style.transform = scale < 1 ? `scale(${scale})` : '';
    container.style.height = `${78 * scale}px`;
    container.style.minHeight = `${78 * scale}px`;
  };
  fit();
  if (!('ResizeObserver' in window)) return () => {};
  const observer = new ResizeObserver(fit);
  observer.observe(container);
  return () => observer.disconnect();
}
