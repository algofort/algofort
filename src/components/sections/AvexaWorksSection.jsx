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
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146053/algofort/images/work-1',
    alt: 'Content Marketing & Copywriting - Algofort',
    category: 'Development · Read More →',
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
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146055/algofort/images/work-2',
    alt: 'Social Media Marketing - Algofort',
    category: 'Development · Read More →',
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
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146055/algofort/images/work-3',
    alt: 'PPC Pay-Per-Click Advertising - Algofort',
    category: 'Development · Read More →',
    reversed: false,
    link: 'https://www.algofort.com/',
  },
  {
    id: 'work-4',
    code: 'P404',
    titleWord1: 'SEO',
    titleWord2: 'Optimization',
    description:
      'Improving your ranking on the search results so that user foot fall to your site with organic traffic increases.',
    image: 'https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792146055/algofort/images/work-4',
    alt: 'Search Engine Optimization - Algofort',
    category: 'Development · Read More →',
    reversed: true,
    link: 'https://www.algofort.com/local-seo-services/',
  },
];

export function AvexaWorksSection() {
  const sectionRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const workItems = Array.from(sectionEl.querySelectorAll('.work-item'));
    const cursor = cursorRef.current;
    const cards = sectionEl.querySelectorAll('.work-card');
    const globalCursor = document.querySelector('.cb-cursor');

    const introTitle = sectionEl.querySelector('.works-intro-title');
    if (introTitle) {
      initTitleAnimation(introTitle, { start: 'top 85%', stagger: 0.02 });
    }

    workItems.forEach((item) => {
      const cardTitle = item.querySelector('.work-title');
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
            // Progress from 0 (just entered viewport) to 1 (fully covering current card)
            const progress = 1 - nextTop / viewportHeight;

            const scale = (1 - progress * 0.3).toFixed(4); // scale 1.0 down to 0.7
            const brightness = (1 - progress * 0.5).toFixed(4); // brightness 1.0 down to 0.5
            const opacity = (1 - progress * 0.3).toFixed(4); // opacity 1.0 down to 0.7

            item.style.transform = `scale(${scale})`;
            item.style.filter = `brightness(${brightness})`;
            item.style.opacity = `${opacity}`;
          } else if (nextTop <= 0) {
            // Fully covered
            item.style.transform = 'scale(0.7)';
            item.style.filter = 'brightness(0.5)';
            item.style.opacity = '0.7';
          } else {
            // Not yet overlapped
            item.style.transform = 'scale(1)';
            item.style.filter = 'brightness(1)';
            item.style.opacity = '1';
          }
        } else {
          // Last card remains normal
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

    if (cursor && window.innerWidth > 1024) {
      window.addEventListener('mousemove', onMouseMove);
      animateCursor();

      const handleMouseEnterCard = () => {
        cursor.classList.add('active');
        if (globalCursor) globalCursor.style.opacity = '0';
      };

      const handleMouseLeaveCard = () => {
        cursor.classList.remove('active');
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
      className="site-section sec-avexa-works projects-section works-section"
      aria-label="Online Marketing Services"
      style={{ display: 'none' }}
    >
      <div className="site-container sec-avexa-works__container">
        {/* Intro Header */}
        <div className="works-intro">
          <div className="works-intro-left">
            <div className="section-badge sec-projects__badge">
              <SubtitleMarquee text="Online Marketing Services — " variant="dark" />
            </div>
            <h2 className="heading-style-h2 section-title sec-projects__title works-intro-title">
              Internet <br />
              <span className="text-color-secondary">Outreach</span>
            </h2>
          </div>
          <div className="works-intro-right">
            <p className="section-description sec-projects__desc works-intro-desc alg-text">
              Algofort is here as always to help you grow your business with an improved online visibility and an online presence. Our services in digital marketing include but are not limited to:
            </p>
          </div>
        </div>

        {/* Works Container with Stacking Sticky Items */}
        <div className="works-container">
          {worksData.map((work, index) => (
            <article key={work.id} className="work-item" id={work.id}>
              <Link
                href={work.link}
                className={`work-card ${work.reversed ? 'card-reversed' : ''}`}
                aria-label={`${work.titleWord1} ${work.titleWord2} - Algofort`}
              >
                {/* Thumbnail Column */}
                <div className="work-thumbnail">
                  <div className="work-image-wrapper">
                    <img
                      src={work.image}
                      alt={work.alt}
                      className="work-image"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                {/* Info Column */}
                <div className="work-info">
                  <div className="meta-tag align-left">
                    <span className="tag-slash">/</span>
                    <span className="tag-label">{work.code}</span>
                  </div>

                  <div className="work-header">
                    <h2 className="work-title">
                      <span className="work-title-word">{work.titleWord1}</span>
                      <span className="work-title-word">{work.titleWord2}</span>
                    </h2>
                    <p className="work-description alg-text">{work.description}</p>
                  </div>

                  <div className="meta-tag align-right">
                    <span className="tag-slash">/</span>
                    <span className="tag-label">{work.category}</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Custom Cursor ("VIEW") */}
      <div ref={cursorRef} className="avexa-custom-cursor" aria-hidden="true">
        <span>View</span>
      </div>
    </section>
  );
}
