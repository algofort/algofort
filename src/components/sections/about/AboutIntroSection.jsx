'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { FactCardsGrid } from '../../common/FactCardsGrid';
import { initTitleAnimation } from '../../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function AboutIntroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const els = sectionRef.current.querySelectorAll('.sec-about__badge, .sec-about-intro__title, .sec-about-intro__buttons');
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const badge = sectionRef.current.querySelector('.sec-about__badge');
    const titleEl = sectionRef.current.querySelector('.sec-about-intro__title');
    const buttons = sectionRef.current.querySelector('.sec-about-intro__buttons');

    // 1. Entrance animation for Subtitle Badge
    if (badge) {
      gsap.fromTo(
        badge,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }

    // 2. Entrance character animation for Headline (ONLY entrance, NO scrub!)
    if (titleEl) {
      initTitleAnimation(titleEl, {
        trigger: sectionRef.current,
        start: 'top 85%',
        stagger: 0.02,
      });
    }

    // 3. Entrance animation for CTA Button
    if (buttons) {
      gsap.fromTo(
        buttons,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttons,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      );
    }

    const timer = setTimeout(() => {
      try {
        ScrollTrigger.refresh();
      } catch {
        // ignore
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

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
            {/* Right headline - pure entrance character animation, no scrub */}
            <div className="sec-about-intro__title-wrap">
              <h2 className="heading-style-h2 section-title sec-about-intro__title">
                Inventing the Future, Now
              </h2>
            </div>

            {/* Description text underneath headline */}
            <div className="sec-about-intro__body">
              <p className="alg-text">
                At Algofort, we view technology as more than just a set of tools — it is the foundation for building smart businesses, stronger communities, and a brighter future. From day one, our mission has been to deliver intelligent, scalable, and future-ready solutions that empower businesses to thrive in the digital landscape.
              </p>
              <p className="alg-text">
                We are more than a technology provider; we are your dedicated innovation partner, combining creative vision, technical expertise, and modern engineering to bring ideas to life.
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

        {/* Fact Cards Grid (Inspired by Denzil Framer - 100% Localhost) */}
        <FactCardsGrid />

      </div>
    </section>
  );
}
