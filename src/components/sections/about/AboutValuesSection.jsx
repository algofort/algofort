'use client';

import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const valuePillars = [
  {
    id: 'creative-excellence',
    titleMain: 'Creative ',
    titleAccent: 'Excellence',
    description:
      'We push creative boundaries to deliver designs that inspire emotion and reflect the true essence of every brand we build.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M7.94101 18C7.64391 16.7274 6.30412 15.6857 5.75395 14.9992C4.65645 13.6297 4 11.8915 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10C20 11.8925 19.3428 13.6315 18.2443 15.0014C17.6944 15.687 16.3558 16.7276 16.059 18H7.94101ZM16 20V21C16 22.1046 15.1046 23 14 23H10C8.89543 23 8 22.1046 8 21V20H16ZM13 10.0048V6L8.5 12.0048H11V16.0048L15.5 10.0048H13Z" />
      </svg>
    ),
  },
  {
    id: 'strategic-thinking',
    titleMain: 'Strategic ',
    titleAccent: 'Thinking',
    description:
      'Every decision is driven by insight and purpose, ensuring each project aligns creativity with measurable business growth.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11 2.04938V13H21.9506C21.4489 18.0533 17.1853 22 12 22C6.47715 22 2 17.5229 2 12C2 6.81465 5.94668 2.5511 11 2.04938ZM13 2.04938C17.7244 2.51845 21.4816 6.27559 21.9506 11H13V2.04938Z" />
      </svg>
    ),
  },
  {
    id: 'meaningful-collaboration',
    titleMain: 'Meaningful ',
    titleAccent: 'Collaboration',
    description:
      'We believe great results come from teamwork, transparency, and shared vision between our team and our clients.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.1213 10.4792C13.7308 10.0886 13.0976 10.0886 12.7071 10.4792L12 11.1863C11.2189 11.9673 9.95259 11.9673 9.17154 11.1863C8.39049 10.4052 8.39049 9.13888 9.17154 8.35783L14.8022 2.72568C16.9061 2.24973 19.2008 2.83075 20.8388 4.46875C23.2582 6.88811 23.3716 10.7402 21.1792 13.2939L19.071 15.4289L14.1213 10.4792ZM3.16113 4.46875C5.33452 2.29536 8.66411 1.98283 11.17 3.53116L7.75732 6.94362C6.19523 8.50572 6.19523 11.0384 7.75732 12.6005C9.27209 14.1152 11.6995 14.1611 13.2695 12.7382L13.4142 12.6005L17.6568 16.8431L13.4142 21.0858C12.6331 21.8668 11.3668 21.8668 10.5858 21.0858L3.16113 13.6611C0.622722 11.1227 0.622722 7.00715 3.16113 4.46875Z" />
      </svg>
    ),
  },
  {
    id: 'lasting-impact',
    titleMain: 'Lasting ',
    titleAccent: 'Impact',
    description:
      'We craft durable brand systems and digital architectures that continually deliver measurable value and sustainable brand equity.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z" />
      </svg>
    ),
  },
];

export function AboutValuesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-about-values__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  }, []);

  return (
    <section ref={sectionRef} id="sec-about-values" className="site-section sec-about-values section-about-values">
      <div className="site-container sec-about-values__container container-large padding-global">
        <div className="padding-section-large">
          
          {/* Header */}
          <div className="top-grid section-header sec-about-values__header">
            <div className="max-width-xlarge align-center">
              <div className="center-subtitle">
                <div className="section-badge sec-about-values__badge">
                  <SubtitleMarquee
                    text="Our values — "
                    variant="dark"
                    icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                  />
                </div>
              </div>
              <h2 className="heading-style-h2 text-align-center section-title sec-about-values__title">
                <span className="values-heading-main">Vision</span>{' '}
                <span className="text-color-secondary">Pillars</span>
              </h2>
            </div>
          </div>

          <div className="spacer-xlarge"></div>

          {/* 2-Column Layout */}
          <div className="w-layout-grid values-component-grid">
            
            {/* Left Column: Outlined Sticky Frame */}
            <div className="outlined-image-wrapper">
              <div className="cover-image-wrap">
                <img
                  src="/assets/68f800db63fd513ee96c96c2_medium-shot-business-woman-with-laptop.jpg"
                  loading="lazy"
                  alt="Vision Pillars Leader"
                  className="cover-image"
                />
              </div>
            </div>

            {/* Right Column: 4 Value Cards */}
            <div className="value-content-block">
              <div className="w-layout-grid value-inner-grid">
                {valuePillars.map((pillar) => (
                  <div key={pillar.id} className="value-content-item content-card sec-about-values__card">
                    <div className="value-icon">{pillar.icon}</div>
                    <h3 className="value-title heading-style-h3">
                      <span className="value-title-main">{pillar.titleMain}</span>
                      <span className="text-color-secondary">{pillar.titleAccent}</span>
                    </h3>
                    <p className="text-size-regular text-color-grey section-description">
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
