'use client';

import { useEffect, useRef } from 'react';
import Script from 'next/script';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

const processSteps = [
  {
    step: '01',
    title: 'Ideate',
    lottieSrc: 'https://lottie.host/5aeb5bda-63f7-49fc-b2d6-81df76599a72/KioKSWlbTl.lottie',
    description: 'Collaborate with our team to define your idea, project scope, goals, requirements, timeline, and estimated budget.',
  },
  {
    step: '02',
    title: 'Design',
    lottieSrc: 'https://lottie.host/6061747f-d3f2-4d89-94d9-35c8c81a067c/D1LnhwOosu.lottie',
    description: 'We create wireframes and interactive UI/UX prototypes to visualize the user journey and overall product experience.',
  },
  {
    step: '03',
    title: 'Develop',
    lottieSrc: 'https://lottie.host/5e1a6144-941d-45fc-a500-740ee084fe14/o0CPGfjO3v.lottie',
    description: 'Our developers turn the approved designs into a secure, scalable, responsive, and high-performance digital product.',
  },
  {
    step: '04',
    title: 'Test',
    lottieSrc: 'https://lottie.host/6658c38e-fa43-4e4b-b62e-3bdecadcc38d/eCg4pRlW23.lottie',
    description: 'We rigorously test the product across devices and scenarios, identifying and resolving bugs before launch.',
  },
  {
    step: '05',
    title: 'Launch',
    lottieSrc: 'https://lottie.host/aae54178-245a-43f9-9eba-a563736b433b/aTyFiJsZwj.lottie',
    description: 'Once everything is ready, we deploy your product and monitor its performance to ensure a smooth launch and rollout.',
  },
  {
    step: '06',
    title: 'Support',
    lottieSrc: 'https://lottie.host/bb3494c9-4d1d-46ff-827b-8cfdbe280433/fnJY1SY0cI.lottie',
    description: 'We provide ongoing maintenance, updates, bug fixes, and performance optimization to help your product grow and scale.',
  },
];

export function ProcessSection() {
  const sectionRef = useRef(null);
  const titleLeftRef = useRef(null);
  const titleRightRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const titleLeft = titleLeftRef.current;
    const titleRight = titleRightRef.current;

    const START_OFFSET_X = 235;

    if (section) {
      const headings = section.querySelectorAll('.heading-text');
      headings.forEach((heading) => {
        initTitleAnimation(heading, { trigger: section, start: 'top 85%', stagger: 0.02 });
      });
    }

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
        src="https://cdn.jsdelivr.net/npm/@dotlottie/player-component@v1.3.0/dist/dotlottie-player.js"
        strategy="afterInteractive"
      />

      <section className="site-section sec-process step-process-section" id="sec-process" ref={sectionRef}>
        <div className="site-container sec-process__container step-container">
          <div className="step-wrap">
            {/* Pre-Title Sticky Badge */}
            <div className="section-header sec-process__header step-header" style={{ marginBottom: 0 }}>
              <div className="section-badge sec-process__badge" style={{ marginBottom: 0 }}>
                <SubtitleMarquee text="From Concept to Launch — " />
              </div>
            </div>

            {/* 3-Column Step Content Layout */}
            <div className="step-content">
              {/* Left Column Sticky Title */}
              <div className="section-title sec-process__title title-column title-left" id="titleLeft" ref={titleLeftRef}>
                <h3 className="heading-text">Your ideas</h3>
                <h3 className="heading-text">
                  into <span className="brand-script">Brand</span>
                </h3>
              </div>

              {/* Middle Column: Cards List */}
              <div className="cards-column">
                <div className="cards-empty-space"></div>

                {processSteps.map((item, index) => (
                  <div key={item.step} className="process-card" data-step={index + 1}>
                    <div className="process-card-inner">
                      <div className="card-head">
                        <h3 className="card-title">{item.title}</h3>
                        <div className="card-count-icon">
                          <span className="step-num">{item.step}</span>
                        </div>
                      </div>
                      <div className="card-illustration">
                        <dotlottie-player
                          src={item.lottieSrc}
                          background="transparent"
                          speed="1"
                          style={{ width: '280px', height: '280px' }}
                          loop
                          autoplay
                        ></dotlottie-player>
                      </div>
                      <p className="card-desc alg-text">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column Sticky Title */}
              <div className="title-column title-right" id="titleRight" ref={titleRightRef}>
                <h3 className="heading-text">transform</h3>
                <h3 className="heading-text">stories</h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
