'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const faqData = [
  {
    question: 'What core services does Algofort specialize in?',
    paragraphs: [
      'Algofort is a full-cycle digital product and engineering agency specializing in four core disciplines: Web Development (WordPress, Shopify, React.js, Custom Websites, WooCommerce), Brand Identity (Logo Design, Brand Strategy, Guidelines, Stationery & Packaging), SaaS App Development (Custom Cloud Platforms, CRM & ERP Systems, Dashboards, API Integration), and Mobile App Development (Native iOS & Android, Cross-Platform Apps, Mobile UI/UX).',
    ],
  },
  {
    question: 'How is the pricing of my project determined?',
    paragraphs: [
      'Project pricing is based on the scope of work, technical architecture, timeline, and specific deliverables. Following an initial discovery session, we provide transparent, itemized quotes with clear milestone-based billing—ensuring complete predictability with no hidden fees.',
    ],
  },
  {
    question: 'Do you build custom bespoke solutions or rely on templates?',
    paragraphs: [
      'We engineer bespoke solutions tailored specifically to your brand and business objectives. Whether developing a high-performance React web application, designing a distinctive brand identity system from scratch, or building a scalable multi-tenant SaaS platform, every asset is purpose-built for speed, security, and market differentiation.',
    ],
  },
  {
    question: 'How can Algofort help my business sell and scale online?',
    paragraphs: [
      'We build high-converting digital foundations. For e-commerce brands, we engineer optimized Shopify and WooCommerce stores with frictionless checkout funnels. For modern tech businesses, we design cohesive brand identities and build scalable SaaS and mobile applications that streamline operations, retain customers, and drive predictable revenue growth.',
    ],
  },
  {
    question: 'How will I be updated on my project’s progress?',
    paragraphs: [
      'You are assigned a dedicated project lead and given direct access through collaborative communication channels (such as Slack or WhatsApp). We conduct regular sprint reviews, share interactive staging links, and provide transparent progress updates at every development stage.',
    ],
  },
  {
    question: 'How long does it typically take to complete a project?',
    paragraphs: [
      'Timelines vary based on feature complexity and scope. Comprehensive brand identity systems and custom websites typically take 4 to 8 weeks, while end-to-end SaaS platforms and cross-platform mobile apps generally take 8 to 14 weeks from discovery to production rollout.',
    ],
  },
  {
    question: 'Do you provide ongoing support and maintenance after launch?',
    paragraphs: [
      'Yes. Every launch is backed by post-launch warranty and flexible ongoing maintenance packages. We handle cloud infrastructure monitoring, database backups, security patches, framework updates, and continuous feature enhancements to keep your product operating at peak performance.',
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
      // my is 100 when cursor is directly on the baseline line.
      // cpY = 2 * my - 100 makes line bend UP when entering from upper side (my < 100)
      // and bend DOWN when entering from lower side (my > 100).
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

export function FaqSection() {
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
        <div className="alg-faq-header section-header sec-faq__header cb-faq-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginBottom: '4rem' }}>
          <div className="alg-faq-badge section-badge sec-faq__badge">
            <SubtitleMarquee text="Frequently Asked Questions ✦ " />
          </div>
          <h2 className="alg-faq-title heading-style-h2 section-title sec-faq__title" style={{ marginBottom: 0 }}>
            Frequently Asked <br />
            <span className="alg-faq-title-secondary text-color-secondary">Questions</span>
          </h2>
        </div>
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