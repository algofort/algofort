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
    question: 'Do you build native mobile apps or cross-platform applications?',
    paragraphs: [
      'We build both. We engineer native iOS Apps (Swift / SwiftUI) and native Android Apps (Kotlin / Jetpack Compose) for projects requiring deep hardware integration and peak platform fidelity. We also build high-performance Cross Platform Apps using React Native and Flutter, allowing businesses to launch on both platforms from a single unified codebase with near-native 60fps performance and lower maintenance overhead.',
    ],
  },
  {
    question: 'What does your Mobile UI/UX Design process involve before development?',
    paragraphs: [
      'Every app begins with comprehensive Mobile UI/UX Design. We map user journeys, design low-fidelity wireframes, test clickable interactive prototypes in Figma, and build custom mobile design systems following Apple Human Interface Guidelines and Google Material 3 standards to ensure intuitive one-handed navigation.',
    ],
  },
  {
    question: 'How do you handle App Store and Google Play submissions and compliance?',
    paragraphs: [
      'We manage the entire app store launch lifecycle from start to finish. This includes developer account configuration, production provisioning profiles, metadata curation, screenshot preparation, privacy policy and permission declarations, and handling app review communications until approved on both the Apple App Store and Google Play Store.',
    ],
  },
  {
    question: 'Can you build offline-capable mobile apps with local data synchronization?',
    paragraphs: [
      'Yes. We architect offline-first mobile apps using local SQLite, WatermelonDB, or Realm databases combined with background sync workers so users can view data, draft actions, and navigate the app without an internet connection, seamlessly syncing once connectivity returns.',
    ],
  },
  {
    question: 'Can you integrate push notifications, biometrics, and in-app subscriptions?',
    paragraphs: [
      'Yes. We integrate native mobile capabilities including biometric authentication (Face ID / Touch ID), camera and geolocation services, in-app purchases and subscriptions (via RevenueCat or StoreKit), and automated push notification campaigns using Firebase Cloud Messaging.',
    ],
  },
  {
    question: 'What ongoing App Maintenance & Support do you provide after launch?',
    paragraphs: [
      'Our App Maintenance & Support packages cover real-time crash and error monitoring, continuous performance tuning, annual iOS and Android OS version compatibility updates, third-party SDK upgrades, and agile feature iteration cycles to keep your app ratings high.',
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
            Frequently Asked <br />
            <span className="alg-faq-title-secondary text-color-secondary">Questions</span>
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
