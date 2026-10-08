'use client';

import React, { useRef, useMemo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { SubtitleMarquee } from '../../common/SubtitleMarquee';

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

function OdometerNumber({ value, suffix }) {
  const digits = String(value).split('');

  return (
    <h3 className="why-us-card-number" aria-label={`${value}${suffix}`}>
      {digits.map((digit, idx) => (
        <OdometerDigit key={idx} digit={digit} cycles={3} />
      ))}
      <span className="odometer-suffix">{suffix}</span>
    </h3>
  );
}

const statsCardsData = [
  {
    id: 'exp',
    target: '15',
    suffix: '+',
    ghost: '15+',
    desc: 'Years of experience delivering custom AI & scalable software',
  },
  {
    id: 'projects',
    target: '10',
    suffix: 'k+',
    ghost: '10k+',
    desc: 'Completed projects for growing brands & global enterprises',
  },
  {
    id: 'employees',
    target: '50',
    suffix: '+',
    ghost: '50+',
    desc: 'Expert employees & specialized engineers driving innovation',
  },
  {
    id: 'awards',
    target: '10',
    suffix: '+',
    ghost: '10+',
    desc: 'Prestigious industry awards for design & technical excellence',
  },
];

export function AboutIntroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef(null);

  useGSAP(
    () => {
      // 1. Text scrub animation on the headline
      if (textRef.current) {
        const headline = textRef.current.querySelector('.scrub-headline');
        if (headline) {
          const split = new SplitType(headline, {
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
                end: 'bottom 40%',
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
      className="site-section sec-about section_about-markeio forteve-about sec-about-intro" 
      id="sec-about-intro"
    >
      <div className="site-container container-large sec-about__container forteve-about__container">
        
        {/* Top Header Block: 2-Column Split */}
        <div className="section-header sec-about__header about-markeio_top forteve-about__top">
          <div className="section-badge sec-about__badge forteve-about__badge">
            <SubtitleMarquee text="About Algofort Company — " />
          </div>

          <div className="section-description sec-about__desc sec-about__content about-markeio_content forteve-about__content">
            {/* Right about-markeio_content scrub_letter headline */}
            <div className="scrub_letter sec-about-intro__scrub" ref={textRef}>
              <h2 className="heading-style-h2 scrub-headline">
                Inventing the Future, Now
              </h2>
            </div>

            {/* Description text underneath headline */}
            <div className="sec-about-intro__body">
              <p className="alg-text">
                Again at Algofort Company we call technology as more than a toolbox; it is how the builders of smart businesses, stronger communities as well as creating a brighter future are achieved. We started with a very clear mission on Day 1 to deliver smart, easy-to-use, and future-ready solution to businesses to grow and thrive in the digital world.
              </p>
              <p className="alg-text">
                Not only do we provide technology but we provide your innovation partner as we have both the creativity, expertise and state of the art technology that makes ideas live.
              </p>
            </div>

            {/* CTA Button at bottom left of right column */}
            <div className="button-group-wrap left-align sec-about-intro__buttons">
              <Link href="/projects" className="underline-link w-inline-block">
                <div className="link-wrapper">
                  <div className="link-text-wrap">
                    <div className="link-text">OUR PORTFOLIO</div>
                    <div className="link-text">OUR PORTFOLIO</div>
                  </div>
                  <div className="arrow-link-wrap">
                    <div className="arrow-link _01">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                      </svg>
                    </div>
                    <div className="arrow-link _02">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M16.0037 9.41421L7.39712 18.0208L5.98291 16.6066L14.5895 8H7.00373V6H18.0037V17H16.0037V9.41421Z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="underline-wrap">
                  <div className="underline-block">
                    <div className="underline-item"></div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* 4 Stat Cards Grid with Slot Machine / Odometer Roll Effect */}
        <div ref={cardsRef} className="why-us-cards-grid">
          {statsCardsData.map((card) => (
            <div key={card.id} className="why-us-card">
              <div className="framer-corner-icons" aria-hidden="true">
                <svg className="corner-icon top-left" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/></svg>
                <svg className="corner-icon bottom-left" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><line x1="5" y1="0" x2="5" y2="10"/><line x1="0" y1="5" x2="10" y2="5"/></svg>
                <svg className="corner-icon bottom-right" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="#000" strokeWidth="1.2"><rect x="1" y="1" width="8" height="8"/></svg>
              </div>
              <div className="why-us-ghost-number" aria-hidden="true">{card.ghost}</div>
              <div className="why-us-card-top">
                <div className="why-us-card-number-wrap">
                  <OdometerNumber value={card.target} suffix={card.suffix} />
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
