'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

export function PortfolioHeroSection() {
  const sectionRef = useRef(null);

  const row1 = [
    { src: '/assets/portfolio/rectangle-1.webp', alt: 'Project 1' },
    { src: '/assets/portfolio/rectangle-2.webp', alt: 'Project 2' },
    { src: '/assets/portfolio/rectangle-3.webp', alt: 'Project 3' },
    { src: '/assets/portfolio/rectangle-4.webp', alt: 'Project 4' },
  ];

  const row2 = [
    { src: '/assets/portfolio/rectangle-9.webp', alt: 'Project 9' },
    { src: '/assets/portfolio/rectangle-5.webp', alt: 'Project 5' },
    { src: '/assets/portfolio/rectangle-6.webp', alt: 'Project 6' },
  ];

  const row3 = [
    { src: '/assets/portfolio/rectangle-8.webp', alt: 'Project 8' },
    { src: '/assets/portfolio/rectangle-7.webp', alt: 'Project 7' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // 1. GSAP Split-Text Title Animation (design.md 3.3)
    const title = section.querySelector('.sec-portfolio-hero__title');
    if (title) {
      initTitleAnimation(title, { start: 'top 85%', stagger: 0.02 });
    }

    // 2. Signature Dual-Text Rolling Button hover effect (instructions.md 2.3)
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

    return () => cleanups.forEach((c) => c());
  }, []);

  const scrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="sec-portfolio-hero-wrap" aria-label="Portfolio Hero Showcase">
      <div className="sec-portfolio-hero">
        <div className="sec-portfolio-hero__inner">
          {/* Left Column: Heading, Subtitle, Description, CTA buttons, and Floating Badge */}
          <div className="sec-portfolio-hero__content-wrap">
            <div className="sec-portfolio-hero__text-area">
              
              {/* Universal Subtitle Marquee Badge (instructions.md 2.2) */}
              <div className="section-badge sec-portfolio-hero__badge">
                <SubtitleMarquee
                  text="Our Portfolio ✦ "
                  variant="dark"
                  icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                />
              </div>

              {/* Exact H2 Heading with Mona Sans Narrow & Secondary Accent (instructions.md 2.1) */}
              <h2 className="heading-style-h2 section-title sec-portfolio-hero__title">
                Turning Ideas into <br className="hidden sm:block" />
                <span className="text-color-secondary">Reality</span>
              </h2>

              {/* Single Signature Dual-Text Rolling CTA Button (.sec-portfolio-hero__btn) */}
              <div className="sec-portfolio-hero__actions">
                <Link
                  href="#projects"
                  onClick={scrollToProjects}
                  className="main-button sec-portfolio-hero__btn w-inline-block"
                >
                  <div className="main-button-block">
                    <div className="button-text">Explore All Projects</div>
                    <div className="button-text">Explore All Projects</div>
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

            {/* Right Column (50%): Centered Starburst Badge */}
            <div className="sec-portfolio-hero__starburst-col">
              <div className="sec-portfolio-hero__starburst" aria-hidden="true">
                <div className="sec-portfolio-hero__starburst-bg">
                  <Image
                    src="/assets/portfolio/flow-bg.svg"
                    alt=""
                    width={320}
                    height={320}
                    priority
                    className="sec-portfolio-hero__starburst-img"
                  />
                </div>
                <div className="sec-portfolio-hero__starburst-content">
                  <span className="sec-portfolio-hero__starburst-number">24+</span>
                  <span className="sec-portfolio-hero__starburst-label">Projects</span>
                </div>
              </div>
            </div>
          </div>

        {/* Right 3D Isometric Rotating Marquee Showcase */}
        <div className="sec-portfolio-hero__marquee-container" aria-hidden="true">
          <div className="sec-portfolio-hero__marquee-plane">
            {/* Track 1 */}
            <div className="sec-portfolio-hero__marquee-row sec-portfolio-hero__marquee-row--1">
              <div className="sec-portfolio-hero__marquee-track marquee-rtl-track">
                {[...row1, ...row1, ...row1].map((item, idx) => (
                  <div key={`r1-${idx}`} className="sec-portfolio-hero__marquee-card">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={396}
                      height={236}
                      className="sec-portfolio-hero__card-img"
                      priority={idx < 4}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 2 */}
            <div className="sec-portfolio-hero__marquee-row sec-portfolio-hero__marquee-row--2">
              <div className="sec-portfolio-hero__marquee-track marquee-ltr-track">
                {[...row2, ...row2, ...row2, ...row2].map((item, idx) => (
                  <div key={`r2-${idx}`} className="sec-portfolio-hero__marquee-card">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={396}
                      height={236}
                      className="sec-portfolio-hero__card-img"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Track 3 */}
            <div className="sec-portfolio-hero__marquee-row sec-portfolio-hero__marquee-row--3">
              <div className="sec-portfolio-hero__marquee-track marquee-rtl-track">
                {[...row3, ...row3, ...row3, ...row3, ...row3].map((item, idx) => (
                  <div key={`r3-${idx}`} className="sec-portfolio-hero__marquee-card">
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={396}
                      height={236}
                      className="sec-portfolio-hero__card-img"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);
}
