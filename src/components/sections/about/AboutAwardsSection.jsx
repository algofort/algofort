'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const awardsData = [
  {
    id: 'space',
    project: 'Space',
    year: '2025',
    award: 'CSS Design Awards',
  },
  {
    id: 'mobile',
    project: 'Mobile',
    year: '2024',
    award: 'Awwwards',
  },
  {
    id: 'reality',
    project: 'Reality',
    year: '2023',
    award: 'CSS Design Awards',
  },
  {
    id: 'ecology',
    project: 'Ecology',
    year: '2022',
    award: 'Awwwards',
  },
  {
    id: 'beyond',
    project: 'Beyond',
    year: '2021',
    award: 'CSS Design Awards',
  },
];

export function AboutAwardsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-about-awards__title');
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
    <section
      ref={sectionRef}
      id="sec-about-awards"
      className="site-section sec-about-awards section-about-awards"
    >
      <div className="site-container sec-about-awards__container container-large padding-global">
        <div className="padding-section-large">
          
          {/* Top Row with Heading & Button */}
          <div className="w-layout-grid top-grid section-header sec-about-awards__header">
            <div className="max-width-xlarge">
              <div className="section-badge sec-about-awards__badge">
                <SubtitleMarquee
                  text="Award Highlights — "
                  variant="dark"
                  icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-about-awards__title">
                <span className="awards-heading-main">Recognized</span>
                <span className="text-color-secondary"> Excellence</span>
              </h2>
            </div>

            <div className="margin-bottom margin-small sec-about-awards__cta">
              <Link href="/contact" className="main-button w-inline-block">
                <div className="main-button-block">
                  <div className="button-text">Get in touch</div>
                  <div className="button-text">Get in touch</div>
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

          <div className="spacer-xlarge"></div>

          {/* Interactive Awards Component */}
          <div className="award-component">
            {/* Table Header */}
            <div className="award-wrapper award-header-row">
              <div className="award-item">
                <div className="award-subtitle">Project :</div>
              </div>
              <div className="award-item">
                <div className="award-subtitle">Year :</div>
              </div>
              <div className="award-item">
                <div className="award-subtitle">Award :</div>
              </div>
            </div>

            {/* Award Data Rows */}
            {awardsData.map((item) => (
              <div key={item.id} className="award-wrapper award-row-interactive">
                <div className="award-item">
                  <div className="award-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M13.0049 16.9409V19.0027H18.0049V21.0027H6.00488V19.0027H11.0049V16.9409C7.05857 16.4488 4.00488 13.0824 4.00488 9.00275V3.00275H20.0049V9.00275C20.0049 13.0824 16.9512 16.4488 13.0049 16.9409ZM1.00488 5.00275H3.00488V9.00275H1.00488V5.00275ZM21.0049 5.00275H23.0049V9.00275H21.0049V5.00275Z" />
                    </svg>
                  </div>
                  <div className="award-title">–</div>
                  <div className="award-title">{item.project}</div>
                </div>

                <div className="award-item">
                  <div className="award-text">{item.year}</div>
                </div>

                <div className="award-item">
                  <div className="award-text">{item.award}</div>
                </div>

                {/* Animated Background Pill */}
                <div className="bg-award"></div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
