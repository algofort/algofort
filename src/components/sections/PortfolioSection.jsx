'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';
import { usePortfolioData } from '../../lib/usePortfolioData';
import '../../styles/portfolio-page.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function PortfolioSection() {
  const { projects: portfolioProjects } = usePortfolioData();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const displayProjects = (portfolioProjects && portfolioProjects.length ? portfolioProjects : []).slice(0, 6);

  useEffect(() => {
    if (!sectionRef.current) return;

    const titleEl = sectionRef.current.querySelector('.sec-portfolio__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    const grid = gridRef.current;
    if (grid) {
      const cards = grid.querySelectorAll('.sec-portfolio__card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 36, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            stagger: 0.07,
            ease: 'power3.out',
            clearProps: 'opacity,transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }
    }

    const buttons = sectionRef.current.querySelectorAll('.main-button');
    const cleanups = [];
    buttons.forEach((btn) => {
      const texts = btn.querySelectorAll('.button-text');
      const icon = btn.querySelector('.button-icon');

      const onMouseEnter = () => {
        if (texts.length >= 2) {
          gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
        }
      };

      const onMouseLeave = () => {
        if (texts.length) {
          gsap.to(texts, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power2.out' });
        }
      };

      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);
      cleanups.push(() => {
        btn.removeEventListener('mouseenter', onMouseEnter);
        btn.removeEventListener('mouseleave', onMouseLeave);
      });
    });

    return () => {
      cleanups.forEach((c) => c());
    };
  }, [displayProjects]);

  return (
    <section ref={sectionRef} id="sec-portfolio" className="site-section sec-portfolio sec-portfolio--home">
      <div className="site-container sec-portfolio__container container-large padding-global">
        <div className="padding-section-large sec-portfolio__padding sec-portfolio__padding--home" style={{ paddingBottom: 0 }}>
          
          {/* Section Header (2-Column Layout matching portfolio showcase) */}
          <div className="section-header sec-portfolio__header">
            <div className="sec-portfolio__header-left">
              <div className="section-badge sec-portfolio__badge">
                <SubtitleMarquee
                  text="Selected Projects — Our Work ✦ "
                  variant="dark"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-portfolio__title" style={{ textTransform: 'uppercase' }}>
                Explore <span className="text-color-secondary">Our Work</span>
              </h2>
            </div>

            <div className="sec-portfolio__header-right">
              <p className="alg-text section-description sec-portfolio__desc">
                Explore a curated collection of digital experiences, brand identities, and high-converting websites crafted with strategy, creativity, and precision.
              </p>
            </div>
          </div>

          {/* 6 Projects Grid */}
          <div ref={gridRef} className="sec-portfolio__grid">
            {displayProjects.map((project) => (
              <div key={project.id} className="sec-portfolio__card">
                
                {/* Image Container with Hover Overlay */}
                <div className="sec-portfolio__image-box">
                  <img
                    src={project.image}
                    alt={`${project.title} Project Showcase`}
                    loading="lazy"
                    decoding="async"
                    className="sec-portfolio__image"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="sec-portfolio__overlay">
                    {project.buttons && project.buttons.map((btn, idx) => {
                      const isExternal = btn.href.startsWith('http');
                      return isExternal ? (
                        <a
                          key={idx}
                          href={btn.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="main-button sec-portfolio__btn w-inline-block"
                        >
                          <div className="main-button-block">
                            <div className="button-text">{btn.text}</div>
                            <div className="button-text">{btn.text}</div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145872/algofort/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                            alt="Star Icon"
                            className="button-icon"
                          />
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          href={btn.href}
                          className="main-button sec-portfolio__btn w-inline-block"
                        >
                          <div className="main-button-block">
                            <div className="button-text">{btn.text}</div>
                            <div className="button-text">{btn.text}</div>
                          </div>
                          <img
                            loading="lazy"
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145872/algofort/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                            alt="Star Icon"
                            className="button-icon"
                          />
                        </Link>
                      );
                    })}
                  </div>
                </div>

                {/* Card Title & Arrow Footer */}
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="sec-portfolio__info w-inline-block"
                  >
                    <div className="sec-portfolio__card-title-group">
                      <h3 className="heading-style-h3 sec-portfolio__card-name">{project.title}</h3>
                    </div>
                    
                    <div className="sec-portfolio__arrow-wrap" aria-hidden="true">
                      <div className="sec-portfolio__arrow-inner">
                        <svg
                          className="sec-portfolio__arrow sec-portfolio__arrow--1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                        <svg
                          className="sec-portfolio__arrow sec-portfolio__arrow--2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="sec-portfolio__info w-inline-block"
                  >
                    <div className="sec-portfolio__card-title-group">
                      <h3 className="heading-style-h3 sec-portfolio__card-name">{project.title}</h3>
                    </div>
                    
                    <div className="sec-portfolio__arrow-wrap" aria-hidden="true">
                      <div className="sec-portfolio__arrow-inner">
                        <svg
                          className="sec-portfolio__arrow sec-portfolio__arrow--1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                        <svg
                          className="sec-portfolio__arrow sec-portfolio__arrow--2"
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="7" y1="17" x2="17" y2="7"></line>
                          <polyline points="7 7 17 7 17 17"></polyline>
                        </svg>
                      </div>
                    </div>
                  </Link>
                )}

              </div>
            ))}
          </div>

          {/* Bottom CTA Button directing to /portfolio */}
          <div className="sec-portfolio__more-wrap">
            <Link href="/portfolio" className="main-button sec-portfolio__explore-btn w-inline-block">
              <div className="main-button-block">
                <div className="button-text">Explore All Projects</div>
                <div className="button-text">Explore All Projects</div>
              </div>
              <img
                loading="lazy"
                src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145872/algofort/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                alt="Star Icon"
                className="button-icon"
              />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
