'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

import { usePortfolioData } from '../../../lib/usePortfolioData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const statCounters = [
  { value: '120', suffix: '+', label: 'Projects Completed' },
  { value: '50', suffix: '+', label: 'Brands Transformed' },
  { value: '6', suffix: '', label: 'Tech Stacks' },
  { value: '100', suffix: '%', label: 'Client Satisfaction' },
];

export function PortfolioShowcaseSection() {
  const { categories: portfolioCategories, projects: portfolioProjects } = usePortfolioData();
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [requestedFilter, setActiveFilter] = useState('animation');
  const activeFilter = portfolioCategories.some(category => category.id === requestedFilter) ? requestedFilter : portfolioCategories[0]?.id || '';
  const hasAnimatedInitialRef = useRef(false);

  // Rapid 1 -> 2 -> 3 sequential cascade animation function
  const animateCards = () => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll('.sec-portfolio__card');
    if (!cards || cards.length === 0) return;

    gsap.killTweensOf(cards);

    // Stagger cards in rapid 1-by-1 succession (1 -> 2 -> 3...)
    const visibleCards = Array.from(cards).slice(0, 12);
    const remainingCards = Array.from(cards).slice(12);

    gsap.fromTo(
      visibleCards,
      {
        opacity: 0,
        y: 32,
        scale: 0.94,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.38,
        stagger: 0.055, // Distinct rapid sequential cascade
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        onComplete: () => {
          if (typeof window !== 'undefined') {
            ScrollTrigger.refresh();
          }
        },
      }
    );

    // Below-the-fold cards reveal smoothly
    if (remainingCards.length > 0) {
      gsap.fromTo(
        remainingCards,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.28,
          delay: 0.22,
          clearProps: 'opacity,transform',
        }
      );
    }
  };

  // Page entrance trigger: sequence cards 1 -> 2 -> 3 when scrolling into view
  useEffect(() => {
    if (!sectionRef.current) return;

    const titleEl = sectionRef.current.querySelector('.sec-portfolio__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    const gridEl = gridRef.current;
    if (!gridEl) return;

    // ScrollTrigger to trigger sequential reveal on entrance
    const st = ScrollTrigger.create({
      trigger: gridEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        hasAnimatedInitialRef.current = true;
        animateCards();
      },
    });

    // If grid is already in viewport on load, run immediately
    const rect = gridEl.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      hasAnimatedInitialRef.current = true;
      animateCards();
    }

    return () => {
      if (st) st.kill();
    };
  }, []);

  // Preload all portfolio images into browser cache so tab switching is instantaneous
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const timer = setTimeout(() => {
      portfolioProjects.forEach((proj) => {
        if (proj.image) {
          const img = new window.Image();
          img.src = proj.image;
        }
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [portfolioProjects]);

  // Instant filter change for zero perceived latency
  const handleFilterChange = (categoryId) => {
    if (categoryId === activeFilter) return;
    hasAnimatedInitialRef.current = true;
    setActiveFilter(categoryId);
  };

  // Trigger 1 -> 2 -> 3 sequence whenever active tab changes
  useEffect(() => {
    if (hasAnimatedInitialRef.current) {
      animateCards();
    }
  }, [activeFilter, portfolioProjects]);

  const filteredProjects = portfolioProjects.filter((item) => {
    return item.category.includes(activeFilter);
  });

  return (
    <section ref={sectionRef} id="projects" className="site-section sec-portfolio">
      <div className="site-container sec-portfolio__container container-large padding-global">
        <div className="padding-section-large sec-portfolio__padding">
          
          {/* Section Header (2-Column Layout: Left Subtitle & Heading, Right Description) */}
          <div className="section-header sec-portfolio__header">
            <div className="sec-portfolio__header-left">
              <div className="section-badge sec-portfolio__badge">
                <SubtitleMarquee
                  text="Our Work ✦ Selected Projects — "
                  variant="dark"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-portfolio__title">
                Explore <span className="text-color-secondary">Our Work</span>
              </h2>
            </div>

            <div className="sec-portfolio__header-right">
              <p className="alg-text section-description sec-portfolio__desc">
                Explore a curated collection of digital experiences, brand identities, and high-converting websites crafted with strategy, creativity, and precision.
              </p>
            </div>
          </div>

          {/* Stats / Metrics Counters */}
          <div className="sec-portfolio__stats-row">
            {statCounters.map((stat, i) => (
              <div key={i} className="sec-portfolio__stat-card">
                <div className="sec-portfolio__stat-num">
                  {stat.value}
                  <span className="sec-portfolio__stat-suffix">{stat.suffix}</span>
                </div>
                <div className="sec-portfolio__stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Filter Tabs */}
          <div className="sec-portfolio__filters" role="tablist" aria-label="Portfolio Filters">
            {portfolioCategories.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  className={`main-button sec-portfolio__filter-btn ${isActive ? 'is-active' : ''}`}
                  onClick={() => handleFilterChange(cat.id)}
                >
                  <div className="main-button-block">
                    <div className="button-text">{cat.label}</div>
                    <div className="button-text">{cat.label}</div>
                  </div>
                  <img
                    loading="lazy"
                    src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145872/algofort/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                    alt="Star Icon"
                    className="button-icon"
                  />
                </button>
              );
            })}
          </div>

          {/* 2-Column Showcase Grid */}
          <div ref={gridRef} className="sec-portfolio__grid">
            {filteredProjects.map((project, index) => (
              <div key={project.id} className="sec-portfolio__card">
                
                {/* Image Container with Hover Overlay */}
                <div className="sec-portfolio__image-box">
                  <img
                    src={project.image}
                    alt={`${project.title} Project Showcase`}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    fetchPriority={index < 4 ? 'high' : 'auto'}
                    decoding="async"
                    className="sec-portfolio__image"
                  />
                  
                  {/* Floating Action Buttons */}
                  <div className="sec-portfolio__overlay">
                    {project.buttons.map((btn, idx) => {
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

        </div>
      </div>
    </section>
  );
}
