export function initBackToTop() {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'lp-back-to-top';
  button.setAttribute('aria-label', 'Back to top');
  button.hidden = true;
  button.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5m-7 7 7-7 7 7"/></svg>';
  document.body.appendChild(button);

  const footer = document.querySelector('footer');
  const update = () => {
    button.hidden = window.scrollY < 350;
    button.style.bottom = footer && footer.getBoundingClientRect().bottom <= window.innerHeight + 180 ? '88px' : '';
  };
  const scrollToTop = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (window.smoothScroll?.scrollTo) {
      window.smoothScroll.scrollTo(0, { duration: 1.1 });
    } else {
      const event = new CustomEvent('algofort:navigate', { detail: '#top', cancelable: true });
      if (window.dispatchEvent(event)) window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  button.addEventListener('click', scrollToTop);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);
    button.removeEventListener('click', scrollToTop);
    button.remove();
  };
}
