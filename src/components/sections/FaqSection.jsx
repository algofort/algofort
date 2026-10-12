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
    question: 'How am I going to finance my project?',
    paragraphs: [
      'The thing is that the price of your project will be based on the level of requirements that you would like to have, and the kind of services you would like to obtain. Quotes will only be made regarding installation after the discussion on requirements and objectives is made after we establish what is required.',
    ],
  },
  {
    question: 'Do you do custom solutions?',
    paragraphs: [
      'Yes! We specialize in making bespoke, personalized software, websites and internet based solutions that fit your business needs. Whether you are wanting to find something special in design or in functionality, we can help.',
    ],
  },
  {
    question: 'What is so special about Algofort as compared to other companies with a similar basis in technology?',
    paragraphs: [
      'Well, first you have to understand that the company is well established and based on very credible technological foundations.',
      'The experience years and the approach of starting with the customer are just interchangeable at Algofort. Our organization takes delight in coming up with new, and cost-efficient solutions. And we partner with you to see your vision come to life.',
    ],
  },
  {
    question: 'Can you come and make me sell my business on the net?',
    paragraphs: [
      'Absolutely! Our digital marketing services will be able to benefit businesses such as yours, seeking to reach the right audience. Strategies can be developed to boost online presence and be able to boost sales by use of SEO, social media marketing, etc.',
    ],
  },
  {
    question: 'My follow-up on my project is what?',
    paragraphs: [
      'We give you the updates at every stage. Our team will regularly update you to know what is going on. We also keep an open communication channel whereby we are able to respond to whatever doubts you might have.',
    ],
  },
  {
    question: 'What services does Algofort provide?',
    paragraphs: [
      'Algofort provides web development, software development, mobile app development, and digital marketing services to help businesses grow online.',
    ],
  },
  {
    question: 'How long does it take to complete a project?',
    paragraphs: [
      'The project timeline depends on its requirements, features, and complexity. We discuss the details with you before starting and keep you updated throughout the development process.',
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