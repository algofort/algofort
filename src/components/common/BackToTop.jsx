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

  useEffect(() => {
    // 1. Entrance and Exit scroll listener
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY > 350) {
        setIsVisible(true);
      } else if (scrollY < 180) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    // 2. GSAP ScrollTrigger with scrub: true for smooth mouse scroll slide-up at footer
    const footerEl = document.querySelector('.footer') || document.querySelector('footer');
    let ctx;
    if (footerEl && btnRef.current) {
      ctx = gsap.context(() => {
        gsap.fromTo(
          btnRef.current,
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
        clearTimeout(refreshTimeout);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleScroll);
        if (ctx) ctx.revert();
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (ctx) ctx.revert();
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className={`back-to-top-wrap ${isVisible ? 'is-visible' : ''}`}>
      <button
        ref={btnRef}
        type="button"
        onClick={scrollToTop}
        className="back-to-top-btn"
        aria-label="Back to top"
      >
        <div className="back-to-top-icon-wrap">
          <svg
            className="back-to-top-icon"
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
            className="back-to-top-icon"
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
