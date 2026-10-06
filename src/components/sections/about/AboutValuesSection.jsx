'use client';

import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const storyPillars = [
  {
    id: 'our-vision',
    titleMain: 'Our ',
    titleAccent: 'Vision',
    description:
      'In order to become a global leader of digital innovation by having a technology that is smart, scalable and sustainable to serve businesses.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
    ),
  },
  {
    id: 'our-mission',
    titleMain: 'Our ',
    titleAccent: 'Mission',
    description:
      'In a bid to provide quality user oriented solutions Stimulate Minimization, effective and meaningful technology To expand long-lasting relations with familiar backgrounds and the partnership based on performance.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20ZM12 6C8.691 6 6 8.691 6 12C6 15.309 8.691 18 12 18C15.309 18 18 15.309 18 12C18 8.691 15.309 6 12 6ZM12 16C9.794 16 8 14.206 8 12C8 9.794 9.794 8 12 8C14.206 8 16 9.794 16 12C16 14.206 14.206 16 12 16Z" />
      </svg>
    ),
  },
  {
    id: 'our-promise',
    titleMain: 'Our ',
    titleAccent: 'Promise',
    description:
      'Algofort Company commits to keep you on the edge with you as your favorite technology partner that makes you innovative, grow and succeed in a continually developing digital world.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" />
      </svg>
    ),
  },
];

export function AboutValuesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate section h2 title
    const titleEl = sectionRef.current.querySelector('.sec-about-values__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    // Animate h3 subtitles (Our Vision, Our Mission, Our Promise)
    const subtitleEls = sectionRef.current.querySelectorAll('.sec-about-values__subtitle');
    subtitleEls.forEach((subEl) => {
      initTitleAnimation(subEl, {
        trigger: subEl,
        start: 'top 85%',
        stagger: 0.02,
      });
    });

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={sectionRef} id="sec-about-values" className="site-section sec-about-values">
      <div className="site-container sec-about-values__container container-large padding-global">
        <div className="padding-section-large sec-about-values__padding">
          
          {/* Header */}
          <div className="top-grid section-header sec-about-values__header">
            <div className="max-width-xlarge align-center">
              <div className="center-subtitle">
                <div className="section-badge sec-about-values__badge">
                  <SubtitleMarquee
                    text="Our Story — "
                    variant="dark"
                    icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                  />
                </div>
              </div>
              <h2 className="heading-style-h2 text-align-center section-title sec-about-values__title">
                <span className="values-heading-main">Our</span>{' '}
                <span className="text-color-secondary">Story</span>
              </h2>
              <div className="sec-about-values__header-desc">
                <p className="alg-text">
                  Algofort was conceptualized on the concept of offering technically sophisticated technology that can be understood by all. Invented by a team of passionate innovators, we embarked the journey to bridge the gap between complex technology and reality of the business world.
                </p>
                <p className="alg-text">
                  Algofort is today in operation in different industries and is known to have a very practical and permanent solution to clients through customized IT solutions.
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="w-layout-grid values-component-grid sec-about-values__grid">
            
            {/* Left Column: Outlined Sticky Frame */}
            <div className="outlined-image-wrapper sec-about-values__image-wrapper">
              <div className="cover-image-wrap">
                <img
                  src="/assets/68f800db63fd513ee96c96c2_medium-shot-business-woman-with-laptop.jpg"
                  loading="lazy"
                  alt="Our Story Algofort"
                  className="cover-image"
                />
              </div>
            </div>

            {/* Right Column: 3 Value/Story Cards */}
            <div className="value-content-block sec-about-values__content">
              <div className="w-layout-grid value-inner-grid">
                {storyPillars.map((pillar) => (
                  <div key={pillar.id} className="value-content-item content-card sec-about-values__card">
                    <div className="value-icon">{pillar.icon}</div>
                    <h3 className="value-title heading-style-h3 sec-about-values__subtitle">
                      <span className="value-title-main">{pillar.titleMain}</span>
                      <span className="text-color-secondary">{pillar.titleAccent}</span>
                    </h3>
                    <p className="alg-text text-size-regular text-color-grey section-description sec-about-values__desc">
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
