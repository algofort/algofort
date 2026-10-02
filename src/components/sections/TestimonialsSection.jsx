'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const testimonialsData = [
  {
    name: 'Ahsan Raza',
    role: 'CEO at QuickBasket (Karachi)',
    text: '“Algofort turned our idea into a fully functional app faster than we expected. Their team was responsive, professional, and highly skilled. We couldn’t have asked for a better tech partner.”',
  },
  {
    name: 'Zainab Fatima',
    role: 'Founder of GlamNest (Lahore)',
    text: '“The branding work Algofort did for us completely transformed our online presence — everything now feels more premium and professional.”',
  },
  {
    name: 'Bilal Shahid',
    role: 'CTO at PayWell Solutions (Islamabad)',
    text: '“Working with Algofort on our fintech product was a game-changer. They understood the complexity of our requirements and delivered a secure, scalable solution on time.”',
  },
  {
    name: 'Hira Javed',
    role: 'Marketing Head at Al-Karim Fabrics (Faisalabad)',
    text: '“We approached Algofort for our website revamp, and the results were incredible. The new design is sleek, fast, and mobile-friendly — exactly what our customers needed.”',
  },
  {
    name: 'Usman Tariq',
    role: 'Co-founder at SmartElectro.pk (Rawalpindi)',
    text: '“Algofort’s digital marketing team helped us boost our sales by over 40% in just three months. Their strategies are data-driven, creative, and highly effective.”',
  },
];

export function TestimonialsSection() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const titleEl =
      document.querySelector('#sec-testimonials .sec-testimonials__title') ||
      el.closest('.sec-testimonials')?.querySelector('.sec-testimonials__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 70%',
      end: 'top -30%',
      onEnter: () => el.classList.add('is-visible'),
      onLeave: () => el.classList.remove('is-visible'),
      onEnterBack: () => el.classList.add('is-visible'),
      onLeaveBack: () => el.classList.remove('is-visible'),
    });

    return () => st.kill();
  }, []);

  return (
    <section className="site-section sec-testimonials cb-summary" id="sec-testimonials">
      <div className="site-container sec-testimonials__container cb-summary-container -lg">
        <div className="section-header sec-testimonials__header cb-summary-header">
          <div className="section-badge sec-testimonials__badge" style={{ marginBottom: 0 }}>
            <SubtitleMarquee text="Our Testimonials — " variant="dark" />
          </div>
          <h2 className="heading-style-h2 section-title sec-testimonials__title" style={{ color: '#05080C', textAlign: 'left' }}>
            Trusted By <br />
            <span className="text-color-secondary">Our Clients</span>
          </h2>
        </div>

        <div className="cb-summary-testimonials" id="testimonials" ref={containerRef}>
          {testimonialsData.map((item, idx) => (
            <div key={idx} className="cb-summary-testimonial">
              <div className="cb-summary-testimonial-quotes" />
              <div className="cb-summary-testimonial-text">{item.text}</div>
              <div className="cb-summary-testimonial-divider" />
              <div className="cb-summary-testimonial-author">
                <div className="cb-summary-author-name">{item.name}</div>
                <div className="cb-summary-author-role">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
