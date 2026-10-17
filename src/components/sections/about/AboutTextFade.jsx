'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutTextFade() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // If user prefers reduced motion, reveal all text immediately
      document.querySelectorAll('.page-about p.alg-text, .page-about .sec-about-team__join-text').forEach((el) => {
        el.classList.add('split-ready');
      });
      return;
    }

    const main = document.querySelector('.page-about main') || document.querySelector('main');
    if (!main) return;

    const timelines = [];
    const splits = [];

    // Group target paragraphs by their direct content parent container
    // (e.g. .sec-about-intro__body, .sec-about-values__header-desc, or individual cards)
    const targetElements = Array.from(main.querySelectorAll('p.alg-text, .sec-about-team__join-text'));
    const containerGroups = new Map();

    targetElements.forEach((el) => {
      const parent = el.parentElement || el;
      if (!containerGroups.has(parent)) {
        containerGroups.set(parent, []);
      }
      containerGroups.get(parent).push(el);
    });

    // Process each container group sequentially
    containerGroups.forEach((groupParagraphs, container) => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top 85%',
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

        // Accessibility: Keep full sentence readable by assistive tech
        if (!paragraph.getAttribute('aria-label')) {
          paragraph.setAttribute('aria-label', originalText);
        }

        const split = new SplitType(paragraph, {
          types: 'words, chars',
          tagName: 'span',
        });
        splits.push(split);

        const chars = split.chars || [];
        if (!chars.length) {
          paragraph.classList.add('split-ready');
          return;
        }

        if (split.words) {
          split.words.forEach((w) => w.setAttribute('aria-hidden', 'true'));
        }

        // Set letters to opacity 0 initially
        gsap.set(chars, { opacity: 0 });

        // Mark container ready so parent opacity becomes 1 without flash
        paragraph.classList.add('split-ready');

        // Calibrate compact, visible stagger so sequence is fast and snappy
        const totalStagger = Math.min(0.55, Math.max(0.25, chars.length * 0.0028));
        const stagger = totalStagger / Math.max(chars.length - 1, 1);

        // Add to timeline sequentially:
        // idx === 0 starts immediately when container triggers.
        // idx > 0 starts AFTER the previous paragraph has fully finished executing!
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

      timelines.push(tl);
    });

    // Ensure ScrollTrigger accurately calculates positions once fonts and images load
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    const timer1 = setTimeout(() => ScrollTrigger.refresh(), 100);
    const timer2 = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      timelines.forEach((tl) => {
        if (tl.scrollTrigger) tl.scrollTrigger.kill();
        tl.kill();
      });
      splits.forEach((s) => s.revert());
      targetElements.forEach((el) => el.classList.remove('split-ready'));
    };
  }, []);

  return null;
}




