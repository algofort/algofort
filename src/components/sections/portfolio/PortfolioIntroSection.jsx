'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortfolioIntroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      const els = sectionRef.current.querySelectorAll('.sec-portfolio-intro__badge, .sec-portfolio-intro__title, .sec-portfolio-intro__buttons');
      els.forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const badge = sectionRef.current.querySelector('.sec-portfolio-intro__badge');
    const titleEl = sectionRef.current.querySelector('.sec-portfolio-intro__title');
    const buttons = sectionRef.current.querySelector('.sec-portfolio-intro__buttons');

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

    // 2. Entrance animation for Headline (ONLY entrance, NO scrub!)
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
              icon="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145874/algofort/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
            />
          </div>

          {/* Right Column: Title + Body Paragraphs + Signature Underline Link */}
          <div className="sec-portfolio-intro__content">
            <div className="sec-portfolio-intro__title-wrap">
              <h2 className="heading-style-h2 section-title sec-portfolio-intro__title">
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
