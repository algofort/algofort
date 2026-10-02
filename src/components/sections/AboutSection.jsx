'use client';

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { SubtitleMarquee } from '../common/SubtitleMarquee';

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
  const totalLength = items.length;
  // Calculate exact percentage offset to land precisely on target digit
  const targetPercent = (targetIndex / totalLength) * 100;

  return { items, targetPercent };
}

// Single Digit Rolling Reel
function OdometerDigit({ digit }) {
  const { items, targetPercent } = useMemo(() => generateDigitStrip(digit, 3), [digit]);

  return (
    <span className="alg-about-digit-reel odometer-digit-reel">
      <span
        className="alg-about-digit-track odometer-digit-track"
        data-target-percent={targetPercent}
      >
        {items.map((num, idx) => (
          <span key={idx} className="alg-about-digit-char odometer-digit-char">
            {num}
          </span>
        ))}
      </span>
    </span>
  );
}

// Entire Numeric Block with Suffix (e.g. 150+, 40+, 99%, 24/7)
function OdometerNumber({ value, suffix }) {
  const digits = useMemo(() => String(value).split(''), [value]);

  return (
    <div className="alg-about-number-box why-us-number-box">
      <div className="alg-about-odometer-wrap odometer-number-wrap">
        {digits.map((char, index) => {
          if (/\d/.test(char)) {
            return <OdometerDigit key={index} digit={char} />;
          }
          return (
            <span key={index} className="alg-about-non-digit odometer-non-digit">
              {char}
            </span>
          );
        })}
      </div>
      {suffix && <span className="alg-about-card-suffix why-us-card-suffix">{suffix}</span>}
    </div>
  );
}

const statsCardsData = [
  {
    id: 1,
    target: 40,
    suffix: '+',
    desc: 'Talented developers and specialists crafting custom software.',
    ghost: '01',
  },
  {
    id: 2,
    target: 150,
    suffix: '+',
    desc: 'Completed digital projects across AI, Web, Mobile and Cloud.',
    ghost: '02',
  },
  {
    id: 3,
    target: 99,
    suffix: '%',
    desc: 'Client satisfaction rate delivering impact with modern technology.',
    ghost: '03',
  },
  {
    id: 4,
    target: 24,
    suffix: '/7',
    desc: 'Dedicated technical engineering and support for business growth.',
    ghost: '04',
  },
];

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      // 1. Text scrub paragraph highlight letter-by-letter on scroll
      if (textRef.current) {
        const paragraph = textRef.current.querySelector('p');
        if (paragraph) {
          const splitInstance = new SplitType(paragraph, {
            types: 'words,chars',
            tagName: 'span',
          });

          if (splitInstance.chars && splitInstance.chars.length > 0) {
            gsap.fromTo(
              splitInstance.chars,
              { opacity: 0.15 },
              {
                opacity: 1,
                ease: 'none',
                stagger: 0.05,
                scrollTrigger: {
                  trigger: textRef.current,
                  start: 'top 80%',
                  end: 'bottom 40%',
                  scrub: 0.5,
                },
              }
            );
          }
        }
      }

      // 2. Simultaneous Rolling Number Ticker / Slot Machine Odometer for All 4 Cards
      if (cardsRef.current) {
        const tracks = cardsRef.current.querySelectorAll('.alg-about-digit-track, .odometer-digit-track');
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
      className="alg-about site-section sec-about section_about-markeio forteve-about" 
      id="sec-about"
    >
      <div className="alg-about-container site-container container-large sec-about__container forteve-about__container">
        
        {/* Top Header Block */}
        <div className="alg-about-header section-header sec-about__header about-markeio_top forteve-about__top">
          <div className="alg-about-badge section-badge sec-about__badge forteve-about__badge">
            <SubtitleMarquee text="About Algofort ✦ " />
          </div>
          <div className="alg-about-desc section-description sec-about__desc sec-about__content about-markeio_content scrub_letter forteve-about__content" ref={textRef}>
            <p className="alg-about-text alg-text">
              At Algofort, we believe technology isn't just about code — it's about connecting and delivering impact. We're a digital solutions agency built to help brands grow with purpose and engineering precision. From architecting intelligent software to executing digital strategies, we combine technology and creativity to build solutions that drive growth.
            </p>
          </div>
        </div>

        {/* 4 Stat Cards Grid with Slot Machine / Odometer Roll Effect */}
        <div ref={cardsRef} className="alg-about-cards-grid why-us-cards-grid">
          {statsCardsData.map((card) => (
            <div key={card.id} className="alg-about-card why-us-card">
              <div className="alg-about-card-icons framer-corner-icons" aria-hidden="true">
                <svg className="corner-icon top-left" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/></svg>
                <svg className="corner-icon bottom-left" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/></svg>
                <svg className="corner-icon bottom-right" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><rect x="1" y="1" width="8" height="8"/></svg>
              </div>
              <div className="alg-about-card-ghost why-us-ghost-number" aria-hidden="true">{card.ghost}</div>
              <div className="alg-about-card-top why-us-card-top">
                <div className="alg-about-card-number-wrap why-us-card-number-wrap">
                  <OdometerNumber value={card.target} suffix={card.suffix} />
                </div>
              </div>
              <div className="alg-about-card-bottom why-us-card-bottom">
                <p className="alg-about-card-desc why-us-card-desc alg-text">{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};