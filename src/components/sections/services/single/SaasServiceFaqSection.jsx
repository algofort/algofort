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
    question: 'What tech stack do you recommend for SaaS applications?',
    paragraphs: [
      'We typically build SaaS platforms with modern technologies like Next.js, React, Node.js, TypeScript, PostgreSQL, Redis, and Tailwind, deployed on scalable cloud infrastructure such as AWS, GCP, or Vercel with Docker and automated pipelines.',
    ],
  },
  {
    question: 'How do you ensure multi-tenant data security and isolation?',
    paragraphs: [
      'We implement strict tenant isolation at the database level, encrypted data storage at rest and in transit, JWT-based authentication, fine-grained role-based access control (RBAC), and automated security scanning to guarantee complete data separation.',
    ],
  },
  {
    question: 'Can you integrate subscription billing systems like Stripe?',
    paragraphs: [
      'Yes. We have deep experience implementing recurring billing, usage-based pricing, seat management, coupon systems, proration, and customer self-serve billing portals using Stripe Billing, Paddle, and other merchant providers.',
    ],
  },
  {
    question: 'Can you help build an MVP to test market demand quickly?',
    paragraphs: [
      'Yes. We specialize in scoped MVP sprints that focus on your product\'s highest-value core features, allowing you to validate your business model and onboard early adopters within weeks.',
    ],
  },
  {
    question: 'How do you handle scalability when our user base grows?',
    paragraphs: [
      'Our systems are designed from day one with stateless services, database connection pooling, intelligent caching with Redis, asynchronous background queues, and auto-scaling cloud compute.',
    ],
  },
  {
    question: 'Do you provide ongoing maintenance and feature upgrades?',
    paragraphs: [
      'Yes. We provide flexible post-launch SLA packages covering server monitoring, database maintenance, security patches, performance optimization, and dedicated feature development sprints.',
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

export function SaasServiceFaqSection() {
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
