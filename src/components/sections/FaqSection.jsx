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
    question: 'How is the pricing of my project determined?',
    paragraphs: [
      'Project pricing is based on your specific requirements, project scope, and the services you need. We provide transparent, customized quotes after discussing your objectives and establishing exactly what is required.',
    ],
  },
  {
    question: 'Do you provide custom solutions?',
    paragraphs: [
      'Yes! We specialize in building bespoke software, custom websites, and internet-based solutions tailored to your business needs. Whether you need a unique design or specialized functionality, we are here to help.',
    ],
  },
  {
    question: 'What sets Algofort apart from other technology companies?',
    paragraphs: [
      'Algofort is built on solid, proven technological foundations with a genuine customer-first approach.',
      'With years of hands-on experience, our team takes pride in crafting innovative, cost-effective digital solutions. We partner closely with you to bring your vision to life.',
    ],
  },
  {
    question: 'Can you help my business sell and grow online?',
    paragraphs: [
      'Absolutely! Our digital marketing services are tailored to help businesses reach their ideal audience. We develop targeted strategies—including SEO, social media marketing, and conversion optimization—to boost your online visibility and drive consistent sales.',
    ],
  },
  {
    question: 'How will I be updated on my project’s progress?',
    paragraphs: [
      'We provide regular updates at every stage of development. Our team maintains clear and open communication channels so you always know what is happening and can get answers to any questions promptly.',
    ],
  },
  {
    question: 'What services does Algofort provide?',
    paragraphs: [
      'Algofort provides web development, software engineering, mobile app development, and digital marketing services to help businesses grow and scale online.',
    ],
  },
  {
    question: 'How long does it take to complete a project?',
    paragraphs: [
      'Project timelines depend on requirements, features, and overall complexity. We define clear milestones with you before starting and keep you informed throughout the entire development process.',
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