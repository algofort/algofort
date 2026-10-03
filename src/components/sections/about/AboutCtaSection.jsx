'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const VIDEO_BASE =
  '/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29';

/**
 * About CTA — 1:1 rebuild of unusually.webflow.io/about `.call-to-action`.
 * Tall scroll track (300vh) with a sticky 100vh video stage. As the user scrolls:
 *  1. Subtitle + giant title words rise in from their masks.
 *  2. The rolling button rises in.
 *  3. Light canvas overlay panels close in from top & bottom to hand off to the footer.
 */
export function AboutCtaSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const titles = section.querySelectorAll('.sec-about-cta__title');
    const subtitle = section.querySelector('.sec-about-cta__badge');
    const button = section.querySelector('.cta-button-block');
    const overlayTop = section.querySelector('.cta-overlay.top');
    const overlayBottom = section.querySelector('.cta-overlay.bottom');
    const topContent = section.querySelector('.cta-top-content');

    if (prefersReduced) {
      gsap.set([titles, subtitle, button], { yPercent: 0, opacity: 1 });
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.set(titles, { yPercent: 110 });
      gsap.set(subtitle, { yPercent: 100, opacity: 0 });
      gsap.set(button, { yPercent: 110 });
      gsap.set(overlayTop, { yPercent: -100 });
      gsap.set(overlayBottom, { yPercent: 100 });

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
        },
      });

      tl.to(topContent, { opacity: 0, duration: 0.5 }, 0)
        .to(subtitle, { yPercent: 0, opacity: 1, duration: 0.6 }, 0.15)
        .to(titles, { yPercent: 0, duration: 1, stagger: 0.2 }, 0.25)
        .to(button, { yPercent: 0, duration: 0.6 }, 1.2)
        .to({}, { duration: 0.8 })
        .to(overlayTop, { yPercent: 0, duration: 1 }, '>-0.1')
        .to(overlayBottom, { yPercent: 0, duration: 1 }, '<');
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 200);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="sec-about-cta" className="site-section sec-about-cta call-to-action">
      <div className="cta-container sec-about-cta__container">

        {/* Top hint */}
        <div className="cta-top-content">
          <div className="detail-text">Keep scrolling</div>
        </div>

        {/* Ambient video background */}
        <div className="cta-video-wrap">
          <video
            className="cta-background-video"
            autoPlay
            loop
            muted
            playsInline
            poster={`${VIDEO_BASE}-poster-00001.jpg`}
          >
            <source src={`${VIDEO_BASE}-transcode.mp4`} type="video/mp4" />
            <source src={`${VIDEO_BASE}-transcode.webm`} type="video/webm" />
          </video>
          <div className="video-overlay"></div>
        </div>

        {/* Content */}
        <div className="cta-content-wrap">
          <div className="cta-content sec-about-cta__content">
            <div className="cta-subtitle">
              <div className="section-badge sec-about-cta__badge">
                <SubtitleMarquee
                  text="Bring Ideas To Life — "
                  variant="light"
                  icon="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                />
              </div>
            </div>

            <div className="cta-title-wrap">
              <h2 className="heading-style-h2 section-title cta-title sec-about-cta__title _01">Let’s</h2>
              <h2 className="heading-style-h2 section-title cta-title sec-about-cta__title _02">
                <span className="text-color-secondary">Build</span>
              </h2>
            </div>

            <div className="cta-title-wrap">
              <h2 className="heading-style-h2 section-title cta-title sec-about-cta__title _03">
                <span className="text-color-secondary">Your</span>
              </h2>
              <h2 className="heading-style-h2 section-title cta-title sec-about-cta__title _04">Brand</h2>
            </div>

            <div className="cta-button-wrap">
              <div className="cta-button-block">
                <Link href="/contact" className="main-button alternate-button sec-about-cta__btn w-inline-block">
                  <div className="main-button-block">
                    <div className="button-text alternate-text">Get in Touch</div>
                    <div className="button-text alternate-text">Get in Touch</div>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                    alt="Star Icon"
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Closing overlay panels */}
        <div className="cta-overlay-wrap" aria-hidden="true">
          <div className="cta-overlay-block">
            <div className="cta-overlay top"></div>
            <div className="cta-overlay bottom"></div>
          </div>
        </div>

      </div>
    </section>
  );
}
