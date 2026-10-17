'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initAllHeadingsAnimation } from '../../utils/titleAnimation';
import { initAllTextFadeAnimation } from '../../utils/textFadeAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const SmoothScroll = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    if (typeof window !== 'undefined') {
      window.lenis = lenis;
      window.__lenisInstance = lenis;
    }

    // Synchronize Lenis smooth scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Initialize heading and sequential paragraph animations across all pages
    initAllHeadingsAnimation();
    initAllTextFadeAnimation();

    if (document.fonts) {
      document.fonts.ready.then(() => {
        try {
          ScrollTrigger.refresh();
        } catch {
          // ignore
        }
      });
    }

    const timer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    }, 150);

    return () => {
      if (typeof window !== 'undefined') {
        if (window.__lenisInstance === lenis) window.__lenisInstance = null;
        if (window.lenis === lenis) window.lenis = null;
      }
      clearTimeout(timer);
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return <>{children}</>;
};
