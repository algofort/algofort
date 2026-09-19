'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const projectsData = [
  {
    id: 1,
    title: 'Energy Management App',
    description: 'Smart energy monitoring and consumption tracking',
    image: '/assets/projects_1.webp',
    tags: ['Mobile Application', 'UI/UX Design', 'Energy Management'],
  },
  {
    id: 2,
    title: 'Delivery & Parcel App',
    description: 'Smart delivery and order tracking platform',
    image: '/assets/projects_2.webp',
    tags: ['Mobile App', 'UI/UX Design', 'Logistics'],
  },
  {
    id: 3,
    title: 'Forvex Brand Identity',
    description: 'Modern branding and visual identity system',
    image: '/assets/projects_3.webp',
    tags: ['Branding', 'Visual Identity', 'Graphic Design'],
  },
  {
    id: 4,
    title: 'Eco-Star Chef',
    description: 'Premium food branding and packaging system',
    image: '/assets/projects_4.webp',
    tags: ['Branding', 'Packaging Design', 'Product Identity'],
  },
  {
    id: 5,
    title: 'SuperFit',
    description: 'Bold fitness branding and merchandise identity',
    image: '/assets/projects_5.webp',
    tags: ['Branding', 'Merchandise', 'Fitness'],
  },
  {
    id: 6,
    title: 'Ride Booking App',
    description: 'Modern ride booking and tracking experience',
    image: '/assets/projects_6.webp',
    tags: ['Mobile App', 'UI/UX Design', 'Ride Booking'],
  },
];

export function ProjectsSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mainTitle = containerRef.current.querySelector('.sec-projects__title');
    if (mainTitle) {
      initTitleAnimation(mainTitle, { start: 'top 85%', stagger: 0.02 });
    }

    // Button swipe hover animation
    const buttons = containerRef.current.querySelectorAll('.main-button');
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
    });

    // Scroll reveal animation for each project item
    const projectItems = containerRef.current.querySelectorAll('.projects-item');
    projectItems.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'sine.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on image inside preview frame
      const img = item.querySelector('.projects-item-img');
      if (img) {
        gsap.fromTo(
          img,
          { yPercent: -8, scale: 1.1 },
          {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        );
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="sec-projects" className="site-section sec-projects projects-section">
      <div className="site-container sec-projects__container projects-container">
        <div className="projects-grid">
          {/* Left Column: Sticky Title & Description */}
          <div className="section-header sec-projects__header projects-static-col">
            <div className="projects-static-inner">
              <div className="section-badge sec-projects__badge" style={{ marginBottom: '1rem' }}>
                <SubtitleMarquee text="Featured Projects — " variant="dark" />
              </div>
              <h2 className="heading-style-h2 section-title sec-projects__title projects-title">
                Featured <br />
                <span className="text-color-secondary">Projects</span>
              </h2>
              <p className="section-description sec-projects__desc projects-descr">
                Explore our portfolio of digital products, software solutions, and technology experiences built by Algofort.
              </p>
              <div className="projects-btn-wrap">
                <Link href="/projects" className="main-button footer-submit-btn w-inline-block">
                  <div className="main-button-block">
                    <div className="button-text">All Works</div>
                    <div className="button-text">All Works</div>
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

          {/* Right Column: Scrollable Projects */}
          <div className="projects-scroll-col">
            <div className="projects-items-list">
              {projectsData.map((project) => (
                <div key={project.id} className="projects-item">
                  <Link href="/projects" className="projects-item-media">
                    <div className="projects-item-img-wrap">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="projects-item-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="projects-item-tags">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="projects-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  <div className="projects-item-promo">
                    <div className="projects-item-name">
                      <Link href="/projects">
                        <span className="projects-item-title-bold">{project.title}</span>{' '}
                        <span className="projects-item-desc">{project.description}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
