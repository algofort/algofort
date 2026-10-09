'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SplitType from 'split-type';

import { SubtitleMarquee } from '../../common/SubtitleMarquee';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function PortfolioIntroSection() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      // Scrub Headline: character by character opacity fade on scroll
      if (textRef.current) {
        const headline = textRef.current.querySelector('.scrub-headline');
        if (headline) {
          const split = new SplitType(headline, { types: 'chars' });
          if (split.chars && split.chars.length > 0) {
            gsap.fromTo(
              split.chars,
              { opacity: 0.15 },
              {
                opacity: 1,
                stagger: 0.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: textRef.current,
                  start: 'top 80%',
                  end: 'bottom 40%',
                  scrub: true,
                },
              }
            );
          }
        }
      }
    },
    { scope: sectionRef }
  );

  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects') || document.querySelector('.sec-portfolio-hero-wrap');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={sectionRef} 
      className="site-section sec-portfolio-intro" 
      id="sec-portfolio-intro"
    >
      <div className="site-container container-large sec-portfolio-intro__container padding-global">
        {/* Top Header Block: 2-Column Split */}
        <div className="sec-portfolio-intro__header">
          {/* Left Column: Subtitle Marquee Badge */}
          <div className="sec-portfolio-intro__badge">
            <SubtitleMarquee
              text="Selected Work & Impact — "
              variant="dark"
              icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
            />
          </div>

          {/* Right Column: Scrub Headline + Body Paragraphs + Signature Underline Link */}
          <div className="sec-portfolio-intro__content">
            <div className="scrub_letter sec-portfolio-intro__scrub" ref={textRef}>
              <h2 className="heading-style-h2 scrub-headline">
                Where Bold Ideas Become Digital Reality
              </h2>
            </div>

            <div className="sec-portfolio-intro__body">
              <p className="alg-text">
                At Algofort, every digital platform we build represents far more than lines of code and polished visuals—it is an engine engineered to solve real-world problems and fuel scalable business growth. From high-conversion SaaS architectures and intuitive mobile ecosystems to bespoke enterprise web applications, our work is defined by strategic clarity, technical rigor, and flawless execution.
              </p>
              <p className="alg-text">
                We operate as your dedicated innovation partner, marrying deep AI engineering and cutting-edge web technologies with human-centered product design. Explore our curated selection of flagship projects, interactive products, and brand transformations created for ambitious founders and global industry leaders.
              </p>
            </div>

            {/* Signature Underline CTA Link */}
            <div className="sec-portfolio-intro__buttons">
              <Link
                href="#projects"
                onClick={scrollToProjects}
                className="underline-link w-inline-block"
              >
                <div className="link-wrapper">
                  <div className="link-text-wrap">
                    <div className="link-text">EXPLORE ALL WORK</div>
                    <div className="link-text">EXPLORE ALL WORK</div>
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
      </div>
    </section>
  );
}
