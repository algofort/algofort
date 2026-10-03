'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

export function AboutStorySection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-about-story__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 95%', stagger: 0.015 });
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  }, []);

  return (
    <section ref={sectionRef} id="sec-about-story" className="site-section sec-about-story section-about-story">
      <div className="site-container sec-about-story__container container-large padding-global">
        <div className="padding-section-large">
          <div className="intro-component-grid">
            
            {/* Subtitle Badge */}
            <div className="spacer-small">
              <div className="center-subtitle">
                <div className="section-badge sec-about-story__badge">
                  <SubtitleMarquee
                    text="Our Story — "
                    variant="dark"
                    icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                  />
                </div>
              </div>
            </div>

            {/* Main Story Content */}
            <div className="our-story-content">
              <h2 className="intro-text story section-title sec-about-story__title">
                <span className="story-heading-main">From Vision to Impact, Crafting ㋡ Brands That </span>
                <span className="text-color-secondary">Inspire and Endure.</span>
              </h2>

              <div className="spacer-large"></div>

              <div className="intro-description-wrap">
                <div className="our-story-wrap">
                  <p className="text-size-medium text-align-center section-description sec-about-story__description">
                    Born from a passion for design and innovation, we set out to redefine how brands communicate in the digital era. What started as a small creative studio evolved into a full-service branding agency — blending strategy, art, and technology to craft experiences that inspire and endure.
                  </p>
                </div>

                <div className="spacer-xlarge"></div>

                {/* Button Group: Get in touch + Our Portfolio */}
                <div className="button-group-wrap center">
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

                  <Link href="/projects" className="underline-link w-inline-block">
                    <div className="link-wrapper">
                      <div className="link-text-wrap">
                        <div className="link-text">Our Portfolio</div>
                        <div className="link-text">Our Portfolio</div>
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

          <div className="dividing-line"></div>
        </div>
      </div>
    </section>
  );
}
