'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const btnRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Check scroll position to show/hide the button
  const handleScroll = (customY) => {
    const scrollY =
      typeof customY === 'number'
        ? customY
        : window.scrollY || window.pageYOffset || document.documentElement?.scrollTop || 0;

    if (scrollY > 350) {
      setIsVisible(true);
    } else if (scrollY < 180) {
      setIsVisible(false);
    }
  };

  const scrollToTop = (e) => {
    if (e) {
      e.preventDefault?.();
      e.stopPropagation?.();
    }

    if (isScrollingRef.current) return;
    isScrollingRef.current = true;

    // Detect real Lenis instance safely
    const lenis =
      (typeof window !== 'undefined' &&
        window.__lenisInstance &&
        typeof window.__lenisInstance.scrollTo === 'function'
        ? window.__lenisInstance
        : null) ||
      (typeof window !== 'undefined' &&
        window.lenis &&
        typeof window.lenis.scrollTo === 'function'
        ? window.lenis
        : null);

    const onFinish = () => {
      isScrollingRef.current = false;
    };

    if (lenis) {
      try {
        lenis.scrollTo(0, {
          duration: 1.25,
          force: true,
          lock: false,
          onComplete: onFinish,
        });
      } catch {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      setTimeout(onFinish, 1400);
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      setTimeout(onFinish, 1000);
    }
  };

  useEffect(() => {
    const onScroll = () => handleScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    // Also connect to Lenis scroll event if present
    const lenis =
      typeof window !== 'undefined' &&
      window.__lenisInstance &&
      typeof window.__lenisInstance.on === 'function'
        ? window.__lenisInstance
        : null;

    let lenisUnsub = null;
    if (lenis) {
      lenisUnsub = lenis.on('scroll', (e) => {
        handleScroll(e.scroll);
      });
    }

    const rafId = requestAnimationFrame(() => {
      handleScroll();
    });

    // GSAP ScrollTrigger with scrub: true for smooth mouse scroll slide-up at footer
    const footerEl = document.querySelector('.footer') || document.querySelector('footer');
    const btn = btnRef.current;
    let ctx;
    if (footerEl && btn) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          btn,
          { y: 0 },
          {
            y: -76, // Slide up by 76px (-4.75rem) to cleanly clear footer bottom menu
            ease: 'none',
            scrollTrigger: {
              trigger: footerEl,
              start: 'bottom-=260 bottom',
              end: 'bottom bottom',
              scrub: 0.5,
              invalidateOnRefresh: true,
            },
          }
        );
      });

      const refreshTimeout = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 300);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(refreshTimeout);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (lenisUnsub) lenisUnsub();
        if (ctx) ctx.revert();
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (lenisUnsub) lenisUnsub();
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <div
      className={`alg-back-to-top-wrap back-to-top-wrap ${isVisible ? 'is-visible' : ''}`}
      onClick={scrollToTop}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          scrollToTop(e);
        }
      }}
      aria-label="Back to top"
      style={{ cursor: 'pointer' }}
    >
      <button
        ref={btnRef}
        type="button"
        onClick={scrollToTop}
        className="alg-back-to-top-btn back-to-top-btn"
        aria-label="Back to top"
      >
        <div className="alg-back-to-top-icon-wrap back-to-top-icon-wrap">
          <svg
            className="alg-back-to-top-icon back-to-top-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
          <svg
            className="alg-back-to-top-icon back-to-top-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="19" x2="12" y2="5" />
            <polyline points="5 12 12 5 19 12" />
          </svg>
        </div>
      </button>
    </div>
  );
};
