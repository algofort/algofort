import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Splits text inside an element into .word-wrap and .char spans,
 * preserving nested HTML tags like <br/> or <span className="...">.
 */
export function splitTextIntoChars(el) {
  if (!el || el.dataset.splitDone) {
    return el ? Array.from(el.querySelectorAll('.char')) : [];
  }

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text) return null;

      const fragment = document.createDocumentFragment();
      const tokens = text.split(/(\s+)/);

      tokens.forEach((token) => {
        if (/^\s+$/.test(token)) {
          fragment.appendChild(document.createTextNode(token));
        } else if (token.length > 0) {
          const wordSpan = document.createElement('span');
          wordSpan.className = 'word-wrap';
          wordSpan.style.display = 'inline-block';
          wordSpan.style.overflow = 'hidden';
          wordSpan.style.verticalAlign = 'top';

          token.split('').forEach((cStr) => {
            const charSpan = document.createElement('span');
            charSpan.className = 'char';
            charSpan.style.display = 'inline-block';
            charSpan.style.willChange = 'transform, opacity';
            charSpan.textContent = cStr;
            wordSpan.appendChild(charSpan);
          });

          fragment.appendChild(wordSpan);
        }
      });

      return fragment;
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.tagName === 'BR') return null;
      const childNodes = Array.from(node.childNodes);
      childNodes.forEach((child) => {
        const replacement = processNode(child);
        if (replacement) {
          node.replaceChild(replacement, child);
        }
      });
      return null;
    }
    return null;
  }

  processNode(el);
  el.dataset.splitDone = 'true';
  return Array.from(el.querySelectorAll('.char'));
}

/**
 * Animates a section title element with character slide-up stagger animation on scroll.
 */
export function initTitleAnimation(titleEl, options = {}) {
  if (!titleEl || titleEl.dataset.titleAnimated) return;

  const chars = splitTextIntoChars(titleEl);
  if (!chars.length) return;

  titleEl.dataset.titleAnimated = 'true';

  gsap.fromTo(
    chars,
    {
      yPercent: 110,
      opacity: 0,
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.75,
      ease: 'power3.out',
      stagger: options.stagger ?? 0.02,
      scrollTrigger: {
        trigger: options.trigger || titleEl,
        start: options.start || 'top 85%',
        toggleActions: 'play none none none',
        ...options.scrollTrigger,
      },
    }
  );
}

/**
 * Automatically finds and initializes title animation on all section headings across the page.
 */
export function initAllHeadingsAnimation() {
  if (typeof window === 'undefined') return;

  const selectors = [
    '.heading-style-h2',
    '.section-title',
    '.works-intro-title',
    '.sec-services__title',
    '.sec-testimonials__title',
    '.sec-faq__title',
    '.sec-cta__title',
    '.sec-projects__title',
    '.sec-tools__title',
    '.sec-process .heading-text',
    '.work-title',
    '.footer_heading',
  ];

  const headings = document.querySelectorAll(selectors.join(', '));
  headings.forEach((heading) => {
    // Exclude hero banner and showreel lightbox which have their own animations
    if (
      heading.closest('#sec-banner') ||
      heading.closest('.sec-banner') ||
      heading.closest('.navbar') ||
      heading.closest('.sec-header') ||
      heading.closest('.showreel_lightbox')
    ) {
      return;
    }
    const trigger = heading.closest('.work-item') || heading;
    initTitleAnimation(heading, { trigger, start: 'top 85%', stagger: 0.02 });
  });

  ScrollTrigger.refresh();
}
