'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqData = [
  {
    question: 'Should we build a native app or cross-platform with React Native?',
    paragraphs: [
      'For most business, SaaS, and consumer applications, cross-platform frameworks like React Native or Flutter provide significant cost and time savings by sharing one codebase while delivering near-native 60fps performance. For apps requiring intensive hardware access or low-level Bluetooth protocols, native Swift or Kotlin is recommended.',
    ],
  },
  {
    question: 'How long does it take to develop and launch a mobile app?',
    paragraphs: [
      'An MVP mobile app typically takes between 6 to 10 weeks from discovery to store submission. More complex apps with real-time features, extensive backend integrations, or custom hardware support can take 12 weeks or more.',
    ],
  },
  {
    question: 'How do you handle App Store and Google Play approvals?',
    paragraphs: [
      'We manage the entire store submission process, including metadata, screenshots, privacy declarations, app review responses, and test flight beta distribution, ensuring compliance with Apple and Google guidelines.',
    ],
  },
  {
    question: 'Will our mobile app work offline?',
    paragraphs: [
      'Yes. We can implement local SQLite or Realm databases and intelligent caching layers so users can view data, create drafts, and navigate the app without an active internet connection, syncing seamlessly once reconnected.',
    ],
  },
  {
    question: 'Can you integrate push notifications and user analytics?',
    paragraphs: [
      'Yes. We set up push notification services via Firebase Cloud Messaging (FCM) or OneSignal, along with privacy-compliant analytics platforms like Mixpanel or PostHog to help you monitor retention and engagement.',
    ],
  },
  {
    question: 'Do you support ongoing OS updates for iOS and Android?',
    paragraphs: [
      'Yes. Operating systems release major updates every year. We offer maintenance packages to keep your app updated, compliant, and compatible with the latest iOS and Android releases and screen sizes.',
    ],
  },
];

function FaqDivider() {
  const dividerRef = useRef(null);

  useEffect(() => {
    const el = dividerRef.current;
    if (!el) return;

    const w = el.offsetWidth || 800;
    const d = `M0,100 Q${w / 2},100 ${w},100`;
    el.innerHTML = `<svg viewBox="0 0 ${w} 200" preserveAspectRatio="none"><path d="${d}"/></svg>`;
    const svg = el.querySelector('svg');
    const path = el.querySelector('path');

    if (!svg || !path) return;

    gsap.set(svg, { transformOrigin: 'left center' });
    const scrollAnim = gsap.from(svg, {
      scaleX: 0,
      duration: 2.5,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    const defaultD = d;

    const handleMouseMove = (e) => {
      const rect = svg.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const cpY = 2 * my - 100;

      gsap.killTweensOf(path);
      const newD = `M0,100 Q${mx},${cpY} ${w},100`;
      gsap.to(path, { attr: { d: newD }, duration: 0.1, overwrite: true });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: defaultD },
        duration: 1.2,
        ease: 'elastic.out(1.2, 0.15)',
      });
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      scrollAnim?.kill();
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="alg-faq-divider cb-faq-divider">
      <div className="alg-faq-divider-line cb-divider" ref={dividerRef}></div>
    </div>
  );
}

export function MobileServiceFaqSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.alg-faq-title, .sec-faq__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }
  }, []);

  return (
    <section ref={sectionRef} className="alg-faq site-section sec-faq cb-faq" id="sec-faq">
      <div className="alg-faq-container site-container sec-faq__container cb-faq-container -lg">
        {/* Top Header Block */}
        <div
          className="alg-faq-header section-header sec-faq__header cb-faq-header"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: '4rem',
          }}
        >
          <div className="alg-faq-badge section-badge sec-faq__badge">
            <SubtitleMarquee text="Frequently Asked Questions ✦ " />
          </div>
          <h2
            className="alg-faq-title heading-style-h2 section-title sec-faq__title"
            style={{ marginBottom: 0 }}
          >
            Frequently Ask <br />
            <span className="alg-faq-title-secondary text-color-secondary">Question</span>
          </h2>
        </div>

        {/* Full-Width FAQ Items */}
        <div className="alg-faq-items cb-faq-items">
          <FaqDivider />

          {faqData.map((item, idx) => (
            <div key={idx}>
              <details className="alg-faq-item cb-faq-item">
                <summary className="alg-faq-item-toggle cb-faq-item-toggle">
                  <span className="alg-faq-item-title cb-faq-item-title">{item.question}</span>
                  <span className="alg-faq-item-arrow cb-faq-item-arr"></span>
                </summary>
                <div className="alg-faq-item-content cb-faq-item-content">
                  <div className="alg-faq-item-text cb-faq-item-text">
                    {item.paragraphs.map((p, pIdx) => (
                      <p key={pIdx} className="alg-faq-text alg-text">{p}</p>
                    ))}
                  </div>
                </div>
              </details>

              <FaqDivider />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
