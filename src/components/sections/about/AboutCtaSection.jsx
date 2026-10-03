'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

export function AboutCtaSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titles = sectionRef.current.querySelectorAll('.cta-title');
    titles.forEach((t) => {
      initTitleAnimation(t, { start: 'top 85%', stagger: 0.02 });
    });
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sec-about-cta"
      className="site-section sec-about-cta call-to-action"
    >
      <div className="site-container sec-about-cta__container container-large padding-global">
        <div className="cta-container">
          
          <div className="cta-content-wrap">
            <div className="cta-content">
              
              {/* Subtitle Marquee */}
              <div className="cta-subtitle">
                <SubtitleMarquee
                  text="Bring Ideas To Life — "
                  variant="dark"
                  icon="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                />
              </div>

              {/* Giant Title: LET'S BUILD YOUR BRAND */}
              <div className="cta-title-wrap">
                <h2 className="cta-title _01">Let’s</h2>
                <h2 className="cta-title _02">
                  <span className="text-color-secondary _02">Build</span>
                </h2>
              </div>

              <div className="cta-title-wrap">
                <h2 className="cta-title _03">
                  <span className="text-color-secondary _03">Your</span>
                </h2>
                <h2 className="cta-title _04">Brand</h2>
              </div>

              {/* CTA Button */}
              <div className="cta-button-wrap">
                <div className="cta-button-block">
                  <Link
                    href="/contact"
                    className="main-button w-inline-block"
                  >
                    <div className="main-button-block">
                      <div className="button-text">Get in Touch</div>
                      <div className="button-text">Get in Touch</div>
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
      </div>
    </section>
  );
}
