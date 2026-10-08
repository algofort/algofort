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
    question: 'What deliverables are included in a brand identity project?',
    paragraphs: [
      'Our deliverables typically include primary and secondary logo marks, responsive symbol variations, color palettes with digital and print color codes, typography pairings, brand patterns, stationery templates, social media assets, and a comprehensive brand guidelines manual.',
    ],
  },
  {
    question: 'How long does the complete brand identity process take?',
    paragraphs: [
      'A complete brand identity system usually takes between 3 to 6 weeks, depending on project scope, research requirements, and revision cycles. We outline clear phase milestones at the start of every engagement.',
    ],
  },
  {
    question: 'Can you redesign our existing logo while keeping brand recognition?',
    paragraphs: [
      'Yes. We regularly perform brand refreshes where we modernize typography, balance symbol geometry, and optimize colors for digital screens while retaining the recognizable core identity your customers know.',
    ],
  },
  {
    question: 'Will we receive full ownership and source files of our brand assets?',
    paragraphs: [
      'Absolutely. Upon project completion and final sign-off, you receive full intellectual property ownership and an organized archive containing all master vector files (AI, EPS, SVG) and web-ready formats (PNG, JPG, PDF).',
    ],
  },
  {
    question: 'Do you also provide design guidelines for digital products and websites?',
    paragraphs: [
      'Yes. We create digital design tokens, typography scales, icon systems, and UI components that directly integrate with modern web and mobile product development.',
    ],
  },
  {
    question: 'Can you help apply the new branding to marketing collateral and presentations?',
    paragraphs: [
      'Yes. We can design business cards, corporate pitch decks, letterheads, packaging, advertising banners, and promotional merchandise to ensure your launch is completely cohesive.',
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

export function BrandServiceFaqSection() {
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
