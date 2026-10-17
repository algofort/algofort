'use client';

import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const processSteps = [
  {
    number: '01',
    titlePrimary: 'Our',
    titleAccent: 'Vision',
    description:
      'To stand as a preeminent global leader in digital innovation, delivering intelligent, scalable, and sustainable technologies that drive sustained competitive advantage.',
  },
  {
    number: '02',
    titlePrimary: 'Our',
    titleAccent: 'Mission',
    description:
      'To engineer intuitive, high-impact enterprise solutions that eliminate digital friction, champion purposeful technology, and foster enduring client partnerships rooted in accountability and high performance.',
  },
  {
    number: '03',
    titlePrimary: 'Our',
    titleAccent: 'Promise',
    description:
      'Algofort pledges to keep your organization at the technological vanguard, serving as a trusted strategic partner dedicated to your innovation, expansion, and enduring market success.',
  },
];

export function AboutProcessSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-about-process__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          try {
            ScrollTrigger.refresh();
          } catch {
            // ignore
          }
        }
      }, 150);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sec-about-process"
      className="site-section sec-about-process"
    >
      <div className="site-container sec-about-process__container container-large padding-global">
        <div className="padding-section-large sec-about-process__padding">
          
          {/* Header Row */}
          <div className="w-layout-grid top-grid section-header sec-about-process__header">
            <div className="max-width-large">
              <div className="section-badge sec-about-process__badge">
                <SubtitleMarquee
                  text="Strategic Purpose — "
                  variant="dark"
                  icon="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145875/algofort/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-about-process__title">
                <span className="text-color-alternate">Mission &</span>{' '}
                <span className="text-color-secondary">Vision</span>
              </h2>
            </div>

            <div className="margin-bottom margin-small sec-about-process__step-badge">
              <h2 className="heading-style-h2 text-color-secondary font-mono">(03)</h2>
            </div>
          </div>

          <div className="spacer-xlarge"></div>

          {/* Process 3-Column Grid */}
          <div className="process-component">
            <div className="w-layout-grid process-component-grid sec-about-process__grid">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className={`process-content-wrap _${step.number} content-card sec-about-process__card`}
                >
                  <div className="process-number font-mono">{step.number}</div>
                  <h3 className="process-title heading-style-h3 sec-about-process__subtitle">
                    {step.titlePrimary}
                    <br />
                    <span className="text-color-secondary">{step.titleAccent}</span>
                  </h3>
                  <p className="alg-text text-size-regular text-color-secondary section-description sec-about-process__desc">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
