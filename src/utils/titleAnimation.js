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
  if (!titleEl || titleEl.dataset.titleAnimated) return null;

  const chars = splitTextIntoChars(titleEl);
  if (!chars.length) {
    titleEl.dataset.titleAnimated = 'true';
    titleEl.dataset.splitDone = 'true';
    return null;
  }

  titleEl.dataset.titleAnimated = 'true';

  try {
    const triggerTarget = options.trigger || titleEl;

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
          trigger: triggerTarget,
          start: options.start || 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          ...options.scrollTrigger,
        },
      }
    );
  } catch (err) {
    console.warn('[titleAnimation] Error animating heading:', err);
    gsap.set(chars, { yPercent: 0, opacity: 1 });
    titleEl.dataset.splitDone = 'true';
    return null;
  }
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
    '.alg-works-title',
    '.work-title',
  ];

  const headings = document.querySelectorAll(selectors.join(', '));
  headings.forEach((heading) => {
    // Skip if already animated
    if (heading.dataset.titleAnimated) return;

    // Exclude hero banner, navbar, footer heading, showreel lightbox, and process section which has simple static headings
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
      heading.closest('.alg-showreel-lightbox') ||
      heading.closest('#sec-process') ||
      heading.closest('.sec-process') ||
      heading.closest('.alg-process') ||
      heading.closest('.step-process-section')
    ) {
      return;
    }
    const trigger = heading.closest('.alg-works-item') || heading.closest('.work-item') || heading;
    initTitleAnimation(heading, { trigger, start: 'top 85%', stagger: 0.02 });
  });

  requestAnimationFrame(() => {
    try {
      ScrollTrigger.refresh();
    } catch {
      // ignore
    }
  });
}