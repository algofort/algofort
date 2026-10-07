'use client';

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { SubtitleMarquee } from '../../../common/SubtitleMarquee';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Generates strip of digits [0..9, 0..9, ..., 0..targetDigit] for slot machine / odometer roll
function generateDigitStrip(targetDigit, cycles = 3) {
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

function OdometerDigit({ digit, cycles = 3 }) {
  const { items, targetPercent } = useMemo(
    () => generateDigitStrip(digit, cycles),
    [digit, cycles]
  );

  return (
    <span className="odometer-digit-col" aria-hidden="true">
      <span className="odometer-digit-track" data-target-percent={targetPercent}>
        {items.map((val, idx) => (
          <span key={idx} className="odometer-digit-val">
            {val}
          </span>
        ))}
      </span>
    </span>
  );
}

function OdometerNumber({ value, prefix = '', suffix = '' }) {
  const digits = String(value).split('');

  return (
    <h3 className="why-us-card-number" aria-label={`${prefix}${value}${suffix}`}>
      {prefix && <span className="odometer-prefix">{prefix}</span>}
      {digits.map((digit, idx) => (
        <OdometerDigit key={idx} digit={digit} cycles={3} />
      ))}
      {suffix && <span className="odometer-suffix">{suffix}</span>}
    </h3>
  );
}

const statsCardsData = [
  {
    id: 'projects',
    prefix: '+',
    target: '99',
    suffix: '',
    ghost: '+99',
    desc: 'Web projects delivered with high performance, scalability, and modern clean architecture.',
  },
  {
    id: 'satisfaction',
    prefix: '',
    target: '99',
    suffix: '%',
    ghost: '99%',
    desc: 'Client satisfaction rate backed by clear communication, dependable delivery, and results.',
  },
  {
    id: 'responsive',
    prefix: '',
    target: '100',
    suffix: '%',
    ghost: '100%',
    desc: 'Pixel-perfect mobile and desktop responsiveness engineered for all modern devices.',
  },
  {
    id: 'support',
    prefix: '',
    target: '24',
    suffix: '/7',
    ghost: '24/7',
    desc: 'Ongoing maintenance, proactive monitoring, security updates, and performance scaling.',
  },
];

export function WebServiceAboutSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      // 1. Text scrub animation
      if (textRef.current) {
        const pElement = textRef.current.querySelector('p');
        if (pElement) {
          const split = new SplitType(pElement, {
            types: 'words, chars',
            tagName: 'span',
          });

          if (split.chars && split.chars.length > 0) {
            gsap.set(split.chars, { opacity: 0.2 });

            gsap.to(split.chars, {
              opacity: 1,
              duration: 0.01,
              stagger: 0.02,
              ease: 'none',
              scrollTrigger: {
                trigger: textRef.current,
                start: 'top 80%',
                end: 'bottom 30%',
                scrub: true,
              },
            });
          }
        }
      }

      // 2. Simultaneous Rolling Number Ticker / Slot Machine Odometer for All 4 Cards
      if (cardsRef.current) {
        const tracks = cardsRef.current.querySelectorAll('.odometer-digit-track');
        if (tracks.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cardsRef.current,
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
        }
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="site-section sec-about section_about-markeio forteve-about"
      id="sec-about"
    >
      <div className="site-container container-large sec-about__container forteve-about__container">
        {/* Top Header Block */}
        <div className="section-header sec-about__header about-markeio_top forteve-about__top">
          <div className="section-badge sec-about__badge forteve-about__badge">
            <SubtitleMarquee text="About Web Development — " />
          </div>
          <div
            className="section-description sec-about__desc sec-about__content about-markeio_content scrub_letter forteve-about__content"
            ref={textRef}
          >
            <p className="alg-text">
              AT ALGOFORT, WE ENGINEER FAST, SCALABLE, AND PURPOSE-DRIVEN WEBSITES. COMBINING CLEAN ARCHITECTURE, RESPONSIVE PRECISION, AND MODERN CODE, WE BUILD DIGITAL PLATFORMS DESIGNED TO CONNECT, CONVERT, AND GROW YOUR BRAND.
            </p>
          </div>
        </div>

        {/* 4 Stat Cards Grid with Slot Machine / Odometer Roll Effect */}
        <div ref={cardsRef} className="why-us-cards-grid">
          {statsCardsData.map((card) => (
            <div key={card.id} className="why-us-card">
              <div className="framer-corner-icons" aria-hidden="true">
                <svg
                  className="corner-icon top-left"
                  viewBox="0 0 10 10"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.2"
                >
                  <line x1="5" y1="0" x2="5" y2="10" />
                  <line x1="0" y1="5" x2="10" y2="5" />
                </svg>
                <svg
                  className="corner-icon bottom-left"
                  viewBox="0 0 10 10"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.2"
                >
                  <line x1="5" y1="0" x2="5" y2="10" />
                  <line x1="0" y1="5" x2="10" y2="5" />
                </svg>
                <svg
                  className="corner-icon bottom-right"
                  viewBox="0 0 10 10"
                  width="10"
                  height="10"
                  fill="none"
                  stroke="#000"
                  strokeWidth="1.2"
                >
                  <rect x="1" y="1" width="8" height="8" />
                </svg>
              </div>
              <div className="why-us-ghost-number" aria-hidden="true">
                {card.ghost}
              </div>
              <div className="why-us-card-top">
                <div className="why-us-card-number-wrap">
                  <OdometerNumber
                    prefix={card.prefix}
                    value={card.target}
                    suffix={card.suffix}
                  />
                </div>
              </div>
              <div className="why-us-card-bottom">
                <p className="why-us-card-desc alg-text">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
