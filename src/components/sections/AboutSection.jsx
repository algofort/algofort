'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { FactCardsGrid } from '../common/FactCardsGrid';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

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
            <SubtitleMarquee text="About Algofort — " />
          </div>
          <div className="section-description sec-about__desc sec-about__content about-markeio_content scrub_letter forteve-about__content" ref={textRef}>
            <p className="alg-text">
              At Algofort, we believe technology isn't just about code — it's about connection and delivering measurable impact. We're a digital solutions agency built to help brands grow with purpose and engineering precision. From architecting intelligent software to executing digital strategies, we combine technology and creativity to deliver solutions that drive sustainable growth.
            </p>
          </div>
        </div>

        {/* Fact Cards Grid (Inspired by Denzil Framer - 100% Localhost) */}
        <FactCardsGrid />

      </div>
    </section>
  );
};

