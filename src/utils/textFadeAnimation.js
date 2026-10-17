import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Initializes letter-by-letter fade-in animation across all body paragraphs on any page.
 * Features:
 * 1. Sequential multi-paragraph execution: When a container has multiple paragraphs (e.g. 2 or more),
 *    Paragraph 1 completes completely before Paragraph 2 starts.
 * 2. Zero layout shift: Spans are kept at opacity 1 without reverting onComplete.
 * 3. FOUC prevention: Works with CSS split-ready class so text never flashes on initial load.
 * 4. Excludes scrub text (like homepage large scrub statements).
 */
export function initAllTextFadeAnimation() {
  if (typeof window === 'undefined') return [];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('p.alg-text, .alg-text, .sec-about-team__join-text, .alg-contact-desc').forEach((el) => {
      el.classList.add('split-ready');
    });
    return [];
  }

  const allParagraphs = Array.from(
    document.querySelectorAll('p.alg-text, .alg-text, .sec-about-team__join-text, .alg-contact-desc')
  );

  // Mark excluded elements as split-ready immediately so they are never hidden
  allParagraphs.forEach((p) => {
    if (
      p.closest('.scrub_letter') ||
      p.closest('.scrub-headline') ||
      p.closest('.fact-cards-wrapper') ||
      p.closest('.subtitle-marquee-track') ||
      p.closest('details') ||
      p.closest('.cb-faq-item') ||
      p.closest('.alg-faq-item') ||
      p.closest('.sec-privacy') ||
      p.closest('.sec-terms')
    ) {
      p.classList.add('split-ready');
    }
  });

  // Filter out elements that shouldn't have letter fade (e.g. scrub statements, badges, or already handled)
  const targetParagraphs = allParagraphs.filter((p) => {
    if (p.dataset.fadeInitialized) return false;
    // Exclude large scrub statement elements which have their own scrub timeline
    if (p.closest('.scrub_letter') || p.closest('.scrub-headline')) return false;
    // Exclude fact card labels or badges that are already animated
    if (p.closest('.fact-cards-wrapper') || p.closest('.subtitle-marquee-track')) return false;
    // Exclude FAQ accordions which are hidden in details
    if (p.closest('details') || p.closest('.cb-faq-item') || p.closest('.alg-faq-item')) return false;
    // Exclude legal pages (privacy policy & terms of service)
    if (p.closest('.sec-privacy') || p.closest('.sec-terms')) return false;
    return true;
  });

  if (!targetParagraphs.length) return [];

  // Group paragraphs by their immediate or closest parent content container
  const containerGroups = new Map();
  targetParagraphs.forEach((p) => {
    p.dataset.fadeInitialized = 'true';
    const parent = p.parentElement || p;
    if (!containerGroups.has(parent)) {
      containerGroups.set(parent, []);
    }
    containerGroups.get(parent).push(p);
  });

  const activeTimelines = [];

  containerGroups.forEach((groupParagraphs, container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 86%',
        toggleActions: 'play none none none',
        once: true,
      },
    });

    groupParagraphs.forEach((paragraph, idx) => {
      const originalText = (paragraph.textContent || '').trim();
      if (!originalText) {
        paragraph.classList.add('split-ready');
        return;
      }

      if (!paragraph.getAttribute('aria-label')) {
        paragraph.setAttribute('aria-label', originalText);
      }

      const split = new SplitType(paragraph, {
        types: 'words, chars',
        tagName: 'span',
      });

      const chars = split.chars || [];
      if (!chars.length) {
        paragraph.classList.add('split-ready');
        return;
      }

      if (split.words) {
        split.words.forEach((w) => w.setAttribute('aria-hidden', 'true'));
      }

      // Initial opacity 0 on characters
      gsap.set(chars, { opacity: 0 });

      // Mark container ready so parent opacity becomes 1 without flash
      paragraph.classList.add('split-ready');

      // Calibrate compact, visible stagger (fast sequence for lengthy paragraphs)
      const totalStagger = Math.min(0.55, Math.max(0.25, chars.length * 0.0028));
      const stagger = totalStagger / Math.max(chars.length - 1, 1);

      // Sequential execution:
      // idx === 0 starts immediately when container enters view.
      // idx > 0 starts AFTER the preceding paragraph has fully finished executing!
      tl.to(
        chars,
        {
          opacity: 1,
          duration: 0.28,
          stagger,
          ease: 'power1.out',
        },
        idx === 0 ? 0 : '>+0.06'
      );
    });

    activeTimelines.push(tl);
  });

  return activeTimelines;
}
