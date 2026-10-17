'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { splitTextIntoChars } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

export function NotFoundSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    // Top-left logo & bottom-left copyright entrance
    const logoEl = container.querySelector('.sec-not-found__top-left');
    const copyrightEl = container.querySelector('.sec-not-found__bottom-left');

    if (logoEl) {
      gsap.fromTo(
        logoEl,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.1 }
      );
    }

    if (copyrightEl) {
      gsap.fromTo(
        copyrightEl,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', delay: 0.5 }
      );
    }

    // 1. Left Column: Outline 404 entrance animation
    const outlineNumber = container.querySelector('.sec-not-found__number-outline');
    if (outlineNumber) {
      gsap.fromTo(
        outlineNumber,
        { opacity: 0, x: -35, scale: 0.94 },
        { opacity: 1, x: 0, scale: 1, duration: 0.9, ease: 'power3.out' }
      );
    }

    // 2. Right Column: Heading letter-by-letter entrance animation matching homepage
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

    // 3. Right Column: Description & button entrance
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

        {/* Background Subtle Cyber Grid & Ambient Glow */}
        <div className="sec-not-found__bg-grid" aria-hidden="true" />
        <div className="sec-not-found__nebula" aria-hidden="true" />

        {/* 2-Column Error Layout: Left Column = 404, Right Column = Heading + Desc + Button */}
        <div className="sec-not-found__grid">
          
          {/* Left Column: Big Wireframe Outline 404 */}
          <div className="sec-not-found__left">
            <div className="sec-not-found__number-outline" aria-hidden="true">
              404
            </div>
          </div>

          {/* Right Column: Heading + Description + Home Page Button */}
          <div className="sec-not-found__right">
            
            {/* Heading: Only "Oops!" is Orange brand color, rest is white */}
            <h2 className="heading-style-h2 section-title sec-not-found__title text-color-alternate">
              <span className="text-color-secondary">Oops!</span> Page Not Found
            </h2>

            {/* Description text */}
            <p className="sec-not-found__desc alg-text">
              The page you are looking for may have been moved, renamed, or is temporarily unavailable.
            </p>

            {/* Button matching exact homepage main-button alternate-button structure */}
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

        {/* Bottom-Left Corner Copyright */}
        <div className="sec-not-found__bottom-left">
          <span className="sec-not-found__copyright">
            &copy; 2026 Algofort. All rights reserved.
          </span>
        </div>

      </div>
    </div>
  );
}