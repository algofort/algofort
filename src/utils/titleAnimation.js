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
  if (!titleEl) return null;

  // If already animated with an active ScrollTrigger, avoid duplicate
  if (titleEl.dataset.titleAnimated) {
    const existing = ScrollTrigger.getAll().find(
      (st) => st.trigger === titleEl || (options.trigger && st.trigger === options.trigger)
    );
    if (existing) return existing.animation;
  }

  const chars = splitTextIntoChars(titleEl);
  if (!chars.length) return null;

  titleEl.dataset.titleAnimated = 'true';

  // Clear any dead/stale ScrollTrigger on this element
  ScrollTrigger.getAll().forEach((st) => {
    if (st.trigger === titleEl || (options.trigger && st.trigger === options.trigger)) {
      st.kill();
    }
  });

  return gsap.fromTo(
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
    '.alg-contact-title',
    '.sec-contact__title',
    '.alg-works-intro-title',
    '.works-intro-title',
    '.alg-services-title',
    '.sec-services__title',
    '.alg-testimonials-title',
    '.sec-testimonials__title',
    '.alg-faq-title',
    '.sec-faq__title',
    '.alg-cta-title',
    '.sec-cta__title',
    '.sec-projects__title',
    '.sec-tools__title',
    '.alg-process-heading-text',
    '.sec-process .heading-text',
    '.alg-works-title',
    '.work-title',
  ];

  const headings = document.querySelectorAll(selectors.join(', '));
  headings.forEach((heading) => {
    // Exclude hero banner, navbar, footer heading, and showreel lightbox which have their own animations
    if (
      heading.closest('#sec-banner') ||
      heading.closest('.sec-banner') ||
      heading.closest('.alg-hero') ||
      heading.closest('.navbar') ||
      heading.closest('.sec-header') ||
      heading.closest('.alg-header') ||
      heading.closest('.footer_heading') ||
      heading.closest('.alg-footer-heading') ||
      heading.closest('.footer') ||
      heading.closest('.showreel_lightbox') ||
      heading.closest('.alg-showreel-lightbox')
    ) {
      return;
    }
    const trigger = heading.closest('.alg-works-item') || heading.closest('.work-item') || heading;
    initTitleAnimation(heading, { trigger, start: 'top 85%', stagger: 0.02 });
  });

  ScrollTrigger.refresh();
}