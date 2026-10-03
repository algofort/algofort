'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
    const title01 = section.querySelector('.cta-title._01');
    const title02 = section.querySelector('.cta-title._02');
    const title03 = section.querySelector('.cta-title._03');
    const title04 = section.querySelector('.cta-title._04');
    const subtitle = section.querySelector('.sec-about-cta__badge');
    const button = section.querySelector('.cta-button-block');
    const overlayTop = section.querySelector('.cta-overlay.top');
    const overlayBottom = section.querySelector('.cta-overlay.bottom');
    const topContent = section.querySelector('.cta-top-content');

    if (prefersReduced) {
      gsap.set([title01, title02, title03, title04, subtitle, button], { yPercent: 0, opacity: 1 });
      gsap.set([overlayTop, overlayBottom], { display: 'none' });
      return undefined;
    }

    const ctx = gsap.context(() => {
      // Keyframe 0: Completely hidden at top of CTA
      gsap.set(topContent, { opacity: 1 });
      gsap.set([title01, title02], { yPercent: 140, opacity: 0 });
      gsap.set([title03, title04], { yPercent: -140, opacity: 0 });
      gsap.set(subtitle, { yPercent: 100, opacity: 0 });
      gsap.set(button, { yPercent: 140, opacity: 0 });
      gsap.set(overlayTop, { yPercent: 0 });
      gsap.set(overlayBottom, { yPercent: 0 });

      // Continuous scrubbed timeline over the 300vh scroll track
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      // 1. Reveal Phase (0% - 40%): curtains open, top hint fades out, words reveal from masks
      tl.to(topContent, { opacity: 0, duration: 0.15, ease: 'power1.out' }, 0)
        .to(overlayTop, { yPercent: -100, duration: 0.25, ease: 'power2.inOut' }, 0)
        .to(overlayBottom, { yPercent: 100, duration: 0.25, ease: 'power2.inOut' }, 0)
        .to(title01, { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.08)
        .to(title04, { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.08)
        .to(title02, { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.18)
        .to(title03, { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.18)
        .to(subtitle, { yPercent: 0, opacity: 1, duration: 0.2, ease: 'power1.out' }, 0.22)
        .to(button, { yPercent: 0, opacity: 1, duration: 0.22, ease: 'power1.out' }, 0.30)

      // 2. Resting View Phase (40% - 75%): full message held prominently
        .to({}, { duration: 0.35 })

      // 3. Exit Phase (75% - 96%): all text and button cleanly hide when scrolling down
        .to(title01, { yPercent: -140, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.75)
        .to(title02, { yPercent: -140, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.77)
        .to(title03, { yPercent: 140, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.75)
        .to(title04, { yPercent: 140, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.77)
        .to(subtitle, { yPercent: -100, opacity: 0, duration: 0.18, ease: 'power1.in' }, 0.73)
        .to(button, { yPercent: 140, opacity: 0, duration: 0.2, ease: 'power1.in' }, 0.77);
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

        {/* Ambient video background (matches home page banner video) */}
        <div className="cta-video-wrap alg-hero-video-wrap background-video-wrap">
          <div className="alg-hero-video background-video w-background-video w-background-video-atom">
            <video
              autoPlay
              loop
              muted
              playsInline
              data-object-fit="cover"
              style={{
                backgroundImage:
                  'url("/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001.jpg")',
              }}
            >
              <source
                src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.mp4"
                type="video/mp4"
              />
              <source
                src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.webm"
                type="video/webm"
              />
            </video>
          </div>
          <div className="alg-hero-video-overlay video-overlay"></div>
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
              <h2 className="cta-title sec-about-cta__title _01">Let’s</h2>
              <h2 className="cta-title sec-about-cta__title _02">
                <span className="text-color-secondary _02">Build</span>
              </h2>
            </div>

            <div className="cta-title-wrap">
              <h2 className="cta-title sec-about-cta__title _03">
                <span className="text-color-secondary _03">Your</span>
              </h2>
              <h2 className="cta-title sec-about-cta__title _04">Brand</h2>
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
