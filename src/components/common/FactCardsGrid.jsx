'use client';

import React, { useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

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

function FactOdometerNumber({ value, suffix }) {
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

export const FactCardsGrid = () => {
  const containerRef = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const card4Ref = useRef(null);

  useGSAP(
    () => {
      if (containerRef.current) {
        const mm = gsap.matchMedia();

        const cards = [
          { ref: card1Ref },
          { ref: card2Ref },
          { ref: card3Ref },
          { ref: card4Ref },
        ];

        // Desktop: Reveal strictly from bottom to top (nichay say upper) without changing section height
        mm.add('(min-width: 992px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          // 1. Reveal each card from bottom to top
          cards.forEach(({ ref }, idx) => {
            if (ref.current) {
              tl.fromTo(
                ref.current,
                {
                  clipPath: 'inset(100% 0% 0% 0%)',
                  opacity: 0,
                },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  opacity: 1,
                  duration: 1.15,
                  ease: 'power3.out',
                },
                idx * 0.12
              );

              const topNumber = ref.current.querySelector('.fact-card-top');
              if (topNumber) {
                tl.fromTo(
                  topNumber,
                  { y: 30, opacity: 0 },
                  { y: 0, opacity: 1, duration: 0.85, ease: 'power2.out' },
                  idx * 0.12 + 0.1
                );
              }
            }
          });

          // 2. Rolling Odometer Numbers simultaneously
          const tracks = containerRef.current.querySelectorAll('.odometer-digit-track');
          if (tracks.length > 0) {
            tracks.forEach((track) => {
              const targetPercent = parseFloat(track.dataset.targetPercent) || 0;
              tl.fromTo(
                track,
                { yPercent: 0 },
                {
                  yPercent: -targetPercent,
                  duration: 1.8,
                  ease: 'power3.out',
                },
                0.15
              );
            });
          }
        });

        // Mobile / Tablet: Reveal smoothly from bottom to top
        mm.add('(max-width: 991px)', () => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          cards.forEach(({ ref }, idx) => {
            if (ref.current) {
              tl.fromTo(
                ref.current,
                {
                  clipPath: 'inset(100% 0% 0% 0%)',
                  opacity: 0,
                },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  opacity: 1,
                  duration: 0.9,
                  ease: 'power3.out',
                },
                idx * 0.12
              );
            }
          });

          const tracks = containerRef.current.querySelectorAll('.odometer-digit-track');
          if (tracks.length > 0) {
            tracks.forEach((track) => {
              const targetPercent = parseFloat(track.dataset.targetPercent) || 0;
              tl.fromTo(
                track,
                { yPercent: 0 },
                {
                  yPercent: -targetPercent,
                  duration: 1.8,
                  ease: 'power3.out',
                },
                0.15
              );
            });
          }
        });
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="fact-cards-wrapper" data-framer-name="Cards Wrapper">
      {/* Card 1: Fact Card White */}
      <div ref={card1Ref} className="fact-card fact-card--white" data-framer-name="Fact Card White">
        <div className="fact-card-top">
          <div className="why-us-card-number-wrap">
            <FactOdometerNumber value="15" suffix="+" />
          </div>
        </div>
        <div className="fact-card-bottom">
          <p className="fact-card-label">YEARS OF EXPERIENCE</p>
        </div>
      </div>

      {/* Card 2: Fact Card Black (Tall) */}
      <div ref={card2Ref} className="fact-card fact-card--black" data-framer-name="Fact Card">
        <div className="fact-card-top">
          <div className="why-us-card-number-wrap">
            <FactOdometerNumber value="10" suffix="K+" />
          </div>
        </div>
        <div className="fact-card-bottom">
          <p className="fact-card-label">COMPLETED PROJECTS</p>
        </div>
      </div>

      {/* Card 3: Fact Card Orange */}
      <div ref={card3Ref} className="fact-card fact-card--orange" data-framer-name="Fact Card">
        <div className="fact-card-top">
          <div className="why-us-card-number-wrap">
            <FactOdometerNumber value="50" suffix="+" />
          </div>
        </div>
        <div className="fact-card-bottom">
          <p className="fact-card-label">SPECIALIZED EXPERTS</p>
        </div>
      </div>

      {/* Card 4: Fact Card Video */}
      <div ref={card4Ref} className="fact-card fact-card--video" data-framer-name="Fact Card">
        <div className="fact-card-video-wrap">
          <video
            src="/assets/fact-card-video.mp4"
            poster="/assets/fact-card-poster.jpg"
            loop
            autoPlay
            muted
            playsInline
            className="fact-card-video"
          />
        </div>
        <div className="fact-card-top">
          <div className="why-us-card-number-wrap">
            <FactOdometerNumber value="10" suffix="+" />
          </div>
        </div>
        <div className="fact-card-bottom">
          <p className="fact-card-label">AWARDS WON</p>
        </div>
      </div>
    </div>
  );
};

