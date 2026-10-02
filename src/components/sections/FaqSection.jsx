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
    question: 'What types of projects do you typically work on?',
    paragraphs: [
      'We work with brands, technology startups and established companies across a wide range of digital projects.',
      'Depending on your needs, we can help with brand identity, UX research, product strategy, user experience design, interface design, motion design, frontend and backend development, CMS implementation, performance optimization and ongoing support.',
      'Some clients come to us for a single landing page, while others trust us to build complete digital products from the ground up. We adapt our process to every project while maintaining the same level of quality throughout.',
    ],
  },
  {
    question: 'Do you build websites using Webflow or custom code?',
    paragraphs: [
      'Both. We choose the technology based on your business goals rather than forcing every project into the same stack.',
      'For marketing websites that require easy content management and fast delivery, Webflow can be a great solution. For more complex products, custom interactions, advanced animations, CMS integrations or scalable platforms, we usually build custom websites using modern technologies like Astro, Next.js, React, GSAP and headless CMS solutions such as Strapi.',
    ],
  },
  {
    question: 'Can you help launch an MVP quickly?',
    paragraphs: [
      "Absolutely. We've helped startups launch MVPs within just a few months by focusing on what matters most: validating the product idea instead of building every possible feature.",
      'Our team works closely with founders to define the minimum feature set, prioritize user flows and create a polished product that is ready for investors, early adopters or market testing.',
      'As your business grows, the MVP can naturally evolve into a fully featured product without starting over.',
    ],
  },
  {
    question: 'Which CMS do you recommend?',
    paragraphs: [
      "There isn't a single CMS that's right for every project. The best choice depends on your content structure, editorial workflow, scalability requirements and technical needs.",
      'For simple marketing websites, platforms like Webflow or WordPress can work well. For more complex websites and digital products, we often recommend headless CMS solutions like Strapi, which provide greater flexibility, performance and long-term scalability.',
      "We'll help you choose the solution that best fits your project rather than recommending a platform simply because it's popular.",
    ],
  },
  {
    question: 'Do you work on fixed-price projects or Time & Materials?',
    paragraphs: [
      'Both pricing models are available. For projects with a clearly defined scope, timeline and deliverables, a fixed-price model provides predictable budgeting and milestones.',
      'For evolving products, startups or long-term partnerships, Time & Materials offers greater flexibility, allowing priorities to change as the project grows.',
    ],
  },
  {
    question: 'Do you offer SEO services?',
    paragraphs: [
      'Yes. We build every website following technical SEO best practices, including semantic HTML, clean code, optimized performance, structured metadata, accessibility, Core Web Vitals and search engine indexing.',
      'If you need a broader SEO strategy, we can also help with technical audits, content recommendations, site architecture, keyword research and ongoing optimization together with trusted SEO specialists.',
    ],
  },
  {
    question: 'My website has poor PageSpeed scores. Can you help improve them?',
    paragraphs: [
      'Absolutely. Low PageSpeed scores are usually caused by a combination of factors rather than a single issue. We begin with a technical audit to identify bottlenecks such as unoptimized images, excessive JavaScript, render-blocking resources, inefficient third-party scripts, poor caching or server configuration.',
      'Based on our findings, we optimize both the frontend and backend, improve loading strategies, implement modern image formats, reduce unnecessary code, fine-tune Core Web Vitals and configure CDN and caching where appropriate.',
      'In many cases, these improvements lead not only to better PageSpeed scores but also to faster user experiences, higher conversion rates and improved SEO performance.',
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
            Frequently Ask <br />
            <span className="alg-faq-title-secondary text-color-secondary">Question</span>
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