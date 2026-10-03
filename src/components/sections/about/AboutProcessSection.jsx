'use client';

import React, { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const processSteps = [
  {
    number: '01',
    titlePrimary: 'Discovery',
    titleAccent: 'Phase',
    description:
      'We begin by understanding your brand’s vision, audience, and goals — laying the foundation for a clear creative direction and meaningful strategy.',
  },
  {
    number: '02',
    titlePrimary: 'Design',
    titleAccent: 'Creation',
    description:
      'Our team transforms insights into visual concepts, crafting bold and cohesive designs that express your identity across every digital touchpoint.',
  },
  {
    number: '03',
    titlePrimary: 'Brand',
    titleAccent: 'Delivery',
    description:
      'We finalize and launch your brand assets with precision, ensuring every detail communicates consistency, quality, and lasting emotional impact.',
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
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sec-about-process"
      className="site-section sec-about-process section-about-process"
    >
      <div className="site-container sec-about-process__container container-large padding-global">
        <div className="padding-section-large">
          
          {/* Header Row */}
          <div className="w-layout-grid top-grid section-header sec-about-process__header">
            <div className="max-width-large">
              <div className="section-badge sec-about-process__badge">
                <SubtitleMarquee
                  text="How we work — "
                  variant="dark"
                  icon="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-about-process__title">
                <span className="process-heading-main">Work</span>{' '}
                <span className="text-color-secondary">Process</span>
              </h2>
            </div>

            <div className="margin-bottom margin-small sec-about-process__step-badge">
              <h2 className="heading-style-h2 text-color-secondary font-mono">(03)</h2>
            </div>
          </div>

          <div className="spacer-xlarge"></div>

          {/* Process 3-Column Grid */}
          <div className="process-component">
            <div className="process-component-grid">
              {processSteps.map((step) => (
                <div
                  key={step.number}
                  className={`process-content-wrap _${step.number} content-card sec-about-process__card`}
                >
                  <div className="process-number">{step.number}</div>
                  <h3 className="process-title heading-style-h3">
                    <span className="process-title-main">{step.titlePrimary}</span>
                    <br />
                    <span className="text-color-secondary">{step.titleAccent}</span>
                  </h3>
                  <p className="process-desc section-description">
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
