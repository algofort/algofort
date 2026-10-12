'use client';

import React, { useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Generates strip of digits for rolling odometer animation like Why Us section
function generateDigitStrip(targetDigit, cycles = 4) {
  const target = parseInt(targetDigit, 10);
  const items = [];

  for (let c = 0; c < cycles; c++) {
    for (let d = 0; d <= 9; d++) {
      items.push(d);
    }
  }

  for (let d = 0; d <= target; d++) {
    items.push(d);
  }

  const targetIndex = items.length - 1;
  const targetPercent = (targetIndex / items.length) * 100;

  return {
    items,
    targetPercent,
  };
}

function BentoOdometerDigit({ digit, cycles = 4 }) {
  const { items, targetPercent } = useMemo(
    () => generateDigitStrip(digit, cycles),
    [digit, cycles]
  );

  return (
    <span className="odometer-digit-col sec-portfolio-bento__odometer-col" aria-hidden="true">
      <span className="odometer-digit-track" data-target-percent={targetPercent}>
        {items.map((val, idx) => (
          <span key={idx} className="odometer-digit-val sec-portfolio-bento__digit-val">
            {val}
          </span>
        ))}
      </span>
    </span>
  );
}

function BentoOdometerNumber({ value, suffix }) {
  const digits = String(value).split('');

  return (
    <div className="sec-portfolio-bento__lime-num" aria-label={`${value}${suffix || ''}`}>
      <div className="sec-portfolio-bento__digits-container">
        {digits.map((digit, idx) => (
          <BentoOdometerDigit key={idx} digit={digit} cycles={4} />
        ))}
      </div>
      {suffix && <span className="sec-portfolio-bento__suffix">{suffix}</span>}
    </div>
  );
}

export function PortfolioBentoSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Signature Dual-Text Rolling Button hover effect
    const buttons = section.querySelectorAll('.main-button');
    const cleanups = [];

    buttons.forEach((btn) => {
      const icon = btn.querySelector('.button-icon');
      const texts = btn.querySelectorAll('.button-text');

      const onEnter = () => {
        if (texts.length >= 2) {
          gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
        }
      };

      const onLeave = () => {
        if (texts.length) {
          gsap.to(texts, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power2.out' });
        }
      };

      btn.addEventListener('mouseenter', onEnter);
      btn.addEventListener('mouseleave', onLeave);

      cleanups.push(() => {
        btn.removeEventListener('mouseenter', onEnter);
        btn.removeEventListener('mouseleave', onLeave);
      });
    });

    // Odometer animation for 1K+ Project Completed (identical to Why Us section)
    const tracks = section.querySelectorAll('.sec-portfolio-bento__lime-box .odometer-digit-track');
    let ctx;
    if (tracks.length > 0) {
      ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section.querySelector('.sec-portfolio-bento__lime-box'),
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });

        tracks.forEach((track) => {
          const targetPercent = parseFloat(track.dataset.targetPercent) || 0;
          tl.fromTo(
            track,
            { yPercent: 0 },
            {
              yPercent: -targetPercent,
              duration: 2.2,
              ease: 'power3.out',
            },
            0
          );
        });
      }, section);
    }

    return () => {
      cleanups.forEach((c) => c());
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="sec-portfolio-bento" 
      className="site-section sec-portfolio-bento" 
      aria-label="Theme Highlights and Features"
    >
      <div className="site-container sec-portfolio-bento__container container-large padding-global">
        <div className="sec-portfolio-bento__padding">
          {/* Bento Grid */}
          <div className="section-content sec-portfolio-bento__grid">
            {/* Card 1: 60+ Unique Sections (Burgundy Red Gradient) */}
            <div className="sec-portfolio-bento__card sec-portfolio-bento__card--red">
              <div className="sec-portfolio-bento__card-header">
                <span className="sec-portfolio-bento__metric-num">60+</span>
                <div className="sec-portfolio-bento__metric-label">
                  <span>UNIQUE SECTIONS</span>
                  <span>CRAFTED BY ALGOFORT</span>
                </div>
              </div>

              <div className="sec-portfolio-bento__previews-grid">
                <div className="sec-portfolio-bento__preview-item">
                  <Image
                    src="/assets/portfolio/rectangle-10.webp"
                    alt="Section Preview 1"
                    width={270}
                    height={180}
                    className="sec-portfolio-bento__preview-img"
                  />
                </div>
                <div className="sec-portfolio-bento__preview-item">
                  <Image
                    src="/assets/portfolio/rectangle-12-1.webp"
                    alt="Section Preview 2"
                    width={270}
                    height={180}
                    className="sec-portfolio-bento__preview-img"
                  />
                </div>
                <div className="sec-portfolio-bento__preview-item">
                  <Image
                    src="/assets/portfolio/rectangle-11.webp"
                    alt="Section Preview 3"
                    width={270}
                    height={180}
                    className="sec-portfolio-bento__preview-img"
                  />
                </div>
                <div className="sec-portfolio-bento__preview-item">
                  <Image
                    src="/assets/portfolio/rectangle-13-e1743753900489.webp"
                    alt="Section Preview 4"
                    width={270}
                    height={180}
                    className="sec-portfolio-bento__preview-img"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Targeted Marketing Pages (Orange Silk Ribbon Wave) */}
            <div className="sec-portfolio-bento__card sec-portfolio-bento__card--orange">
              <div className="sec-portfolio-bento__card-header sec-portfolio-bento__card-header--center">
                <h3 className="heading-style-h3 sec-portfolio-bento__title-orange">
                  TARGETED MARKETING HOME PAGES WITH MULTIPLE COLOR SCHEMES
                </h3>
              </div>

              <div className="sec-portfolio-bento__mockups-fan">
                <div className="sec-portfolio-bento__mockup sec-portfolio-bento__mockup--1">
                  <Image
                    src="/assets/portfolio/rectangle-14.webp"
                    alt="Marketing Template Mockup 1"
                    width={230}
                    height={320}
                    style={{ width: 'auto', height: 'auto' }}
                    className="sec-portfolio-bento__mockup-img"
                  />
                </div>
                <div className="sec-portfolio-bento__mockup sec-portfolio-bento__mockup--2">
                  <Image
                    src="/assets/portfolio/rectangle-15.webp"
                    alt="Marketing Template Mockup 2"
                    width={240}
                    height={340}
                    style={{ width: 'auto', height: 'auto' }}
                    className="sec-portfolio-bento__mockup-img"
                  />
                </div>
                <div className="sec-portfolio-bento__mockup sec-portfolio-bento__mockup--3">
                  <Image
                    src="/assets/portfolio/rectangle-16.webp"
                    alt="Marketing Template Mockup 3"
                    width={230}
                    height={320}
                    style={{ width: 'auto', height: 'auto' }}
                    className="sec-portfolio-bento__mockup-img"
                  />
                </div>
                <div className="sec-portfolio-bento__mockup sec-portfolio-bento__mockup--4">
                  <Image
                    src="/assets/portfolio/rectangle-17.webp"
                    alt="Marketing Template Mockup 4"
                    width={220}
                    height={300}
                    style={{ width: 'auto', height: 'auto' }}
                    className="sec-portfolio-bento__mockup-img"
                  />
                </div>
              </div>
            </div>

            {/* Card 3: 1K+ Project Completed + Complete Outlook CTA */}
            <div className="sec-portfolio-bento__card sec-portfolio-bento__card--split">
              {/* Top Orange Stat Box */}
              <div className="sec-portfolio-bento__lime-box">
                <BentoOdometerNumber value="1" suffix="K+" />
                <span className="sec-portfolio-bento__lime-label">
                  PROJECT COMPLETED
                </span>
              </div>

              {/* Bottom Outlook CTA Box */}
              <div className="sec-portfolio-bento__outlook-box">
                <h4 className="sec-portfolio-bento__outlook-text">
                  GET A COMPLETE OUTLOOK FOR YOUR WEBSITE WITH ALGOFORT
                </h4>
                <Link
                  href="/contact"
                  className="main-button sec-portfolio-bento__btn-purchase w-inline-block"
                >
                  <div className="main-button-block">
                    <div className="button-text">Contact Us</div>
                    <div className="button-text">Contact Us</div>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                    alt="Star Icon"
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
