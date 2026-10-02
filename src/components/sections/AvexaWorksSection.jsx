'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

const worksData = [
  {
    id: 'work-1',
    code: 'P101',
    titleWord1: 'Content',
    titleWord2: 'Marketing',
    description:
      'We empower your brand by creating and sharing beneficial content that educates, attracts, and engages potential customers.',
    image: '/images/work-1.jpeg',
    alt: 'Content Marketing & Copywriting - Algofort',
    category: 'Development • Read More ↗',
    reversed: false,
    link: 'https://www.algofort.com/copywriting-services/',
  },
  {
    id: 'work-2',
    code: 'P202',
    titleWord1: 'Social Media',
    titleWord2: 'Marketing',
    description:
      'Engage with audiences on trending platforms to promote and enhance visibility to your brand.',
    image: '/images/work-2.jpg',
    alt: 'Social Media Marketing - Algofort',
    category: 'Development • Read More ↗',
    reversed: true,
    link: 'https://www.algofort.com/social-media-marketing/',
  },
  {
    id: 'work-3',
    code: 'P303',
    titleWord1: 'PPC',
    titleWord2: 'Pay-Per-Click',
    description:
      'Direct traffic and leads to your site through targeted advertising campaigns.',
    image: '/images/work-3.jpeg',
    alt: 'PPC Pay-Per-Click Advertising - Algofort',
    category: 'Development • Read More ↗',
    reversed: false,
    link: 'https://www.algofort.com/',
  },
  {
    id: 'work-4',
    code: 'P404',
    titleWord1: 'SEO',
    titleWord2: 'Optimization',
    description:
      'Increase organic visibility and drive relevant users through strategic search engine optimization.',
    image: '/images/work-4.jpeg',
    alt: 'Search Engine Optimization SEO - Algofort',
    category: 'Development • Read More ↗',
    reversed: true,
    link: 'https://www.algofort.com/search-engine-optimization-seo-services/',
  },
];

export function AvexaWorksSection() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const workItems = Array.from(sectionEl.querySelectorAll('.alg-works-item, .work-item'));
    const cursor = cursorRef.current;
    const cards = sectionEl.querySelectorAll('.alg-works-card, .work-card');
    const globalCursor = document.querySelector('.cb-cursor');

    const introTitle = sectionEl.querySelector('.alg-works-intro-title, .works-intro-title');
    if (introTitle) {
      initTitleAnimation(introTitle, { start: 'top 85%', stagger: 0.02 });
    }

    workItems.forEach((item) => {
      const cardTitle = item.querySelector('.alg-works-title, .work-title');
      if (cardTitle) {
        initTitleAnimation(cardTitle, { trigger: item, start: 'top 80%', stagger: 0.02 });
      }
    });

    /* --------------------------------------------------------------------------
       1. Stacking Scroll Effects for Desktop
       -------------------------------------------------------------------------- */
    const updateScrollProgress = () => {
      if (window.innerWidth <= 1024) {
        workItems.forEach((item) => {
          item.style.transform = '';
          item.style.filter = '';
          item.style.opacity = '';
        });
        return;
      }

      const viewportHeight = window.innerHeight;

      workItems.forEach((item, index) => {
        const nextItem = workItems[index + 1];

        if (nextItem) {
          const nextRect = nextItem.getBoundingClientRect();
          const nextTop = nextRect.top;

          if (nextTop < viewportHeight && nextTop > 0) {
            const progress = 1 - nextTop / viewportHeight;

            const scale = (1 - progress * 0.3).toFixed(4);
            const brightness = (1 - progress * 0.5).toFixed(4);
            const opacity = (1 - progress * 0.3).toFixed(4);

            item.style.transform = `scale(${scale})`;
            item.style.filter = `brightness(${brightness})`;
            item.style.opacity = `${opacity}`;
          } else if (nextTop <= 0) {
            item.style.transform = 'scale(0.7)';
            item.style.filter = 'brightness(0.5)';
            item.style.opacity = '0.7';
          } else {
            item.style.transform = 'scale(1)';
            item.style.filter = 'brightness(1)';
            item.style.opacity = '1';
          }
        } else {
          item.style.transform = 'scale(1)';
          item.style.filter = 'brightness(1)';
          item.style.opacity = '1';
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateScrollProgress();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateScrollProgress);
    updateScrollProgress();

    /* --------------------------------------------------------------------------
       2. Interactive Custom Cursor ("VIEW")
       -------------------------------------------------------------------------- */
    let cursorAnimId;
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animateCursor = () => {
      if (!cursor) return;
      const speed = 0.2;
      cursorX += (mouseX - cursorX) * speed;
      cursorY += (mouseY - cursorY) * speed;

      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;

      cursorAnimId = requestAnimationFrame(animateCursor);
    };

    if (window.innerWidth > 1024 && cursor) {
      cursorAnimId = requestAnimationFrame(animateCursor);
      window.addEventListener('mousemove', onMouseMove, { passive: true });

      const handleMouseEnterCard = () => {
        cursor.classList.add('is-active');
        if (globalCursor) globalCursor.style.opacity = '0';
      };

      const handleMouseLeaveCard = () => {
        cursor.classList.remove('is-active');
        if (globalCursor) globalCursor.style.opacity = '';
      };

      cards.forEach((card) => {
        card.addEventListener('mouseenter', handleMouseEnterCard);
        card.addEventListener('mouseleave', handleMouseLeaveCard);
      });

      return () => {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', updateScrollProgress);
        window.removeEventListener('mousemove', onMouseMove);
        cancelAnimationFrame(cursorAnimId);
        cards.forEach((card) => {
          card.removeEventListener('mouseenter', handleMouseEnterCard);
          card.removeEventListener('mouseleave', handleMouseLeaveCard);
        });
        if (globalCursor) globalCursor.style.opacity = '';
      };
    }

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateScrollProgress);
      cancelAnimationFrame(cursorAnimId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sec-projects"
      className="alg-works site-section sec-avexa-works projects-section works-section"
      aria-label="Online Marketing Services"
    >
      <div className="alg-works-container site-container sec-avexa-works__container">
        {/* Intro Header */}
        <div className="alg-works-intro works-intro">
          <div className="alg-works-intro-left works-intro-left">
            <div className="alg-works-badge section-badge sec-projects__badge">
              <SubtitleMarquee text="Online Marketing Services ✦ " variant="dark" />
            </div>
            <h2 className="alg-works-intro-title heading-style-h2 section-title sec-projects__title works-intro-title">
              Internet <br />
              <span className="alg-works-title-secondary text-color-secondary">Outreach</span>
            </h2>
          </div>
          <div className="alg-works-intro-right works-intro-right">
            <p className="alg-works-intro-desc section-description sec-projects__desc works-intro-desc alg-text">
              Algofort is here as always to help you grow your business with an improved online visibility and an online presence. Our services in digital marketing include but are not limited to:
            </p>
          </div>
        </div>

        {/* Works Container with Stacking Sticky Items */}
        <div className="alg-works-cards-list works-container">
          {worksData.map((work, index) => (
            <article key={work.id} className="alg-works-item work-item" id={work.id}>
              <Link
                href={work.link}
                className={`alg-works-card work-card ${work.reversed ? 'alg-works-card-reversed card-reversed' : ''}`}
                aria-label={`${work.titleWord1} ${work.titleWord2} - Algofort`}
              >
                {/* Thumbnail Column */}
                <div className="alg-works-thumbnail work-thumbnail">
                  <div className="alg-works-image-wrapper work-image-wrapper">
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="alg-works-image work-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                {/* Info Column */}
                <div className="alg-works-info work-info">
                  <div className="alg-works-tag meta-tag align-left">
                    <span className="alg-works-tag-slash tag-slash">/</span>
                    <span className="alg-works-tag-label tag-label">{work.code}</span>
                  </div>

                  <div className="alg-works-header work-header">
                    <h2 className="alg-works-title work-title">
                      <span className="alg-works-title-word work-title-word">{work.titleWord1}</span>
                      <span className="alg-works-title-word work-title-word">{work.titleWord2}</span>
                    </h2>
                    <p className="alg-works-desc work-description alg-text">{work.description}</p>
                  </div>

                  <div className="alg-works-footer work-footer">
                    <span className="alg-works-category work-category">{work.category}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Floating View Cursor */}
      <div ref={cursorRef} className="alg-works-view-cursor view-cursor" aria-hidden="true">
        <span>VIEW</span>
      </div>
    </section>
  );
}