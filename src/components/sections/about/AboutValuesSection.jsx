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
        <path d="M12 2C12.5523 2 13 2.44772 13 3C13 3.55228 12.5523 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 11.4477 20.4477 11 21 11C21.5523 11 22 11.4477 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 6C12.5523 6 13 6.44772 13 7C13 7.55228 12.5523 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16C14.2091 16 16 14.2091 16 12C16 11.4477 16.4477 11 17 11C17.5523 11 18 11.4477 18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12C6 8.68629 8.68629 6 12 6ZM18.5713 2.10059C18.8474 2.1006 19.0712 2.32449 19.0713 2.60059V4.42969C19.0716 4.70553 19.2954 4.92866 19.5713 4.92871H21.3994C21.6754 4.92871 21.8992 5.15275 21.8994 5.42871V6.34375L20.0107 8.23242C19.6358 8.60719 19.1268 8.81824 18.5967 8.81836H16.5967L12.707 12.707C12.3165 13.0974 11.6835 13.0975 11.293 12.707C10.9027 12.3165 10.9026 11.6834 11.293 11.293L15.1826 7.4043V5.4043C15.1826 4.87411 15.3928 4.36526 15.7676 3.99023L17.6572 2.10059H18.5713Z" />
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
