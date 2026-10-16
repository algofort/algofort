'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { SubtitleMarquee } from '../../../common/SubtitleMarquee';

const processSteps = [
  {
    step: '01',
    title: 'DISCOVERY & SCOPING',
    lottieSrc: '/lottie/process-ideate.lottie',
    description:
      'We define core product requirements, user personas, recurring revenue models, and technical feasibility before architecting the application.',
  },
  {
    step: '02',
    title: 'ARCHITECTURE & SCHEMA',
    lottieSrc: '/lottie/process-design.lottie',
    description:
      'We architect the cloud environment, database schema, multi-tenant security layers, and API specifications to ensure high-concurrency scalability.',
  },
  {
    step: '03',
    title: 'FULL-CYCLE SPRINT',
    lottieSrc: '/lottie/process-develop.lottie',
    description:
      'Our engineering team builds the application in agile sprints, combining modular front-end components with robust, low-latency cloud microservices.',
  },
  {
    step: '04',
    title: 'QA & SECURITY AUDIT',
    lottieSrc: '/lottie/process-test.lottie',
    description:
      'We execute rigorous automated integration checks, load testing, role-based access validation, and security audits across all application modules.',
  },
  {
    step: '05',
    title: 'DEVOPS & LIVE LAUNCH',
    lottieSrc: '/lottie/process-launch.lottie',
    description:
      'We deploy your SaaS platform to production cloud infrastructure with zero-downtime CI/CD pipelines, automated backups, and live monitoring.',
  },
  {
    step: '06',
    title: 'SCALING & ITERATION',
    lottieSrc: '/lottie/process-support.lottie',
    description:
      'Post-launch, we partner with your team to monitor telemetry metrics, optimize cloud resource costs, and ship continuous feature enhancements.',
  },
];

export function SaasServiceProcessSection() {
  const sectionRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;

    const START_OFFSET_X = 235;

    function clamp(v, min, max) {
      return Math.max(min, Math.min(max, v));
    }

    function onScroll() {
      if (!section || !titleLeft || !titleRight) return;

      if (window.innerWidth <= 900) {
        titleLeft.style.transform = 'none';
        titleRight.style.transform = 'none';
        return;
      }

      const rect = section.getBoundingClientRect();

      // Trigger point when sticky section hits viewport top
      const triggerPoint = 40;
      const scrollDistance = 380;
      const progressPx = clamp(triggerPoint - rect.top, 0, scrollDistance);
      const progress = progressPx / scrollDistance; // 0 to 1

      // Left title: translateX goes from +235px -> 0px
      const leftTranslate = START_OFFSET_X * (1 - progress);
      // Right title: translateX goes from -235px -> 0px
      const rightTranslate = -START_OFFSET_X * (1 - progress);

      titleLeft.style.transform = `translateX(${leftTranslate}px)`;
      titleRight.style.transform = `translateX(${rightTranslate}px)`;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <Script
        src="/scripts/dotlottie-player.js"
        strategy="afterInteractive"
      />

      <section className="alg-process site-section sec-process step-process-section" id="sec-process" ref={sectionRef}>
        <div className="alg-process-container site-container sec-process__container step-container">
          <div className="alg-process-wrap step-wrap">
            {/* Pre-Title Sticky Badge */}
            <div className="alg-process-header section-header sec-process__header step-header" style={{ marginBottom: 0 }}>
              <div className="alg-process-badge section-badge sec-process__badge" style={{ marginBottom: 0 }}>
                <SubtitleMarquee text="From Concept to Launch ✦ " />
              </div>
            </div>

            {/* 3-Column Step Content Layout */}
            <div className="alg-process-content step-content">
              {/* Left Column Sticky Title */}
              <div className="alg-process-title-col alg-process-title-left section-title sec-process__title title-column title-left" id="titleLeft" ref={titleLeftRef}>
                <h3 className="alg-process-heading-text heading-text">Your ideas</h3>
                <h3 className="alg-process-heading-text heading-text">
                  into <span className="alg-process-brand-script brand-script">Brand</span>
                </h3>
              </div>

              {/* Middle Column: Cards List */}
              <div className="alg-process-cards-col cards-column">
                <div className="alg-process-cards-spacer cards-empty-space"></div>

                {processSteps.map((item, index) => (
                  <div key={item.step} className="alg-process-card process-card" data-step={index + 1}>
                    <div className="alg-process-card-inner process-card-inner">
                      <div className="alg-process-card-head card-head">
                        <h3 className="alg-process-card-title card-title">{item.title}</h3>
                        <div className="alg-process-card-count card-count-icon">
                          <span className="alg-process-step-num step-num">{item.step}</span>
                        </div>
                      </div>
                      <div className="alg-process-card-illustration card-illustration">
                        <dotlottie-player
                          src={item.lottieSrc}
                          background="transparent"
                          speed="1"
                          style={{ width: '280px', height: '280px' }}
                          loop
                          autoplay
                        ></dotlottie-player>
                      </div>
                      <p className="alg-process-card-desc card-desc alg-text">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column Sticky Title */}
              <div className="alg-process-title-col alg-process-title-right title-column title-right" id="titleRight" ref={titleRightRef}>
                <h3 className="alg-process-heading-text heading-text">transform</h3>
                <h3 className="alg-process-heading-text heading-text">stories</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
