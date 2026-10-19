'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { splitTextIntoChars } from '../../utils/titleAnimation';
import { ViewportVideo } from '../common/ViewportVideo';
import { homeVideoSources } from '../../utils/videoAssets';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export function NotFoundSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    // Top-left logo entrance
    const logoEl = container.querySelector('.sec-not-found__top-left');

    if (logoEl) {
      gsap.fromTo(
        logoEl,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.1 }
      );
    }

    // 1. Large 404 entrance animation
    const number = container.querySelector('.sec-not-found__number');
    if (number) {
      gsap.fromTo(
        number,
        { opacity: 0, x: -35, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      );
    }

    // 2. Heading letter-by-letter entrance animation matching homepage
    const titleEl = container.querySelector('.sec-not-found__title');
    if (titleEl) {
      const chars = splitTextIntoChars(titleEl);
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
          stagger: 0.02,
          delay: 0.15,
        }
      );
    }

    // 3. Description & button entrance
    const desc = container.querySelector('.sec-not-found__desc');
    const buttonItem = container.querySelector('.sec-not-found__button-item');

    if (desc) {
      gsap.fromTo(
        desc,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.35 }
      );
    }

    if (buttonItem) {
      gsap.fromTo(
        buttonItem,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 0.45 }
      );
    }

    // 4. Main Button Hover Slide & Rotating Star Icon (Exact Homepage Interaction)
    const buttons = container.querySelectorAll('.main-button');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('.button-icon');
      const texts = btn.querySelectorAll('.button-text');

      const onMouseEnter = () => {
        if (texts.length >= 2) {
          gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
        }
      };

      const onMouseLeave = () => {
        if (texts.length) {
          gsap.to(texts, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power2.out' });
        }
      };

      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);
    });
  }, { scope: containerRef });

  return (
    <div className="sec-not-found-wrapper">
      <div className="sec-not-found-card" ref={containerRef}>
        
        {/* Top-Left Corner Logo */}
        <div className="sec-not-found__top-left">
          <Link href="/" className="sec-not-found__logo-link" aria-label="Algofort Home">
            <img
              src="https://res.cloudinary.com/vfsp1egd/image/upload/w_400,c_limit,q_auto,f_auto/v1792145914/algofort/assets/logo"
              alt="Algofort Logo"
              className="sec-not-found__logo-img"
              loading="eager"
            />
          </Link>
        </div>

        {/* Same background video and poster as the homepage hero */}
        <div className="sec-not-found__video-wrap" aria-hidden="true">
          <ViewportVideo
            sources={homeVideoSources}
            poster="/assets/banner_bg_poster.jpg"
          />
          <div className="alg-hero-video-overlay video-overlay sec-not-found__video-overlay" />
        </div>

        {/* Centered error message */}
        <div className="sec-not-found__grid">
          <h1 className="sec-not-found__number">404</h1>
          <h2 className="sec-not-found__title">
            <span className="text-color-secondary">Oops!</span> Page Not Found
          </h2>
          <p className="sec-not-found__desc alg-text">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable.
          </p>
          <div className="button-item sec-not-found__button-item">
            <Link href="/" className="main-button alternate-button w-inline-block">
              <div className="main-button-block">
                <div className="button-text alternate-text">Back to Home</div>
                <div className="button-text alternate-text">Back to Home</div>
              </div>
              <img
                loading="lazy"
                src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145871/algofort/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                alt="Star Icon"
                className="button-icon"
              />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
