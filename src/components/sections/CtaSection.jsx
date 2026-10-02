'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const availableServices = [
  'Branding',
  'Website',
  'Mobile App',
  'Web Application',
  'Digital Marketing',
];

export function CtaSection() {
  const containerRef = useRef(null);
  const bgImgRef = useRef(null);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedServices: ['Branding', 'Web Application'],
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Attach exact GSAP hover & parallax scroll animation to CTA section
  useGSAP(() => {
    if (!containerRef.current) return;

    const titleEl = containerRef.current.querySelector('.sec-cta__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    // Smooth parallax scroll effect on background image
    if (bgImgRef.current) {
      gsap.to(bgImgRef.current, {
        yPercent: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    const buttons = containerRef.current.querySelectorAll('.main-button');

    buttons.forEach((btn) => {
      const texts = btn.querySelectorAll('.button-text');
      const icon = btn.querySelector('.button-icon');

      const onMouseEnter = () => {
        if (texts.length >= 2) {
          gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
        }
      };

      const onMouseLeave = () => {
        if (texts.length) {
          gsap.to(texts, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power2.out' });
        }
      };

      btn.addEventListener('mouseenter', onMouseEnter);
      btn.addEventListener('mouseleave', onMouseLeave);
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: '',
        phone: '',
        email: '',
        selectedServices: ['Branding', 'Web Application'],
        message: '',
      });
    }, 4000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleService = (service) => {
    setFormData((prev) => {
      const exists = prev.selectedServices.includes(service);
      return {
        ...prev,
        selectedServices: exists
          ? prev.selectedServices.filter((s) => s !== service)
          : [...prev.selectedServices, service],
      };
    });
  };

  return (
    <section ref={containerRef} className="site-section sec-cta section_cta" id="sec-cta">
      <div className="padding-global is-tiny">
        <div className="cta_component">
          {/* Background image with vertical parallax scroll effect */}
          <div className="cta_bg_wrap">
            <img
              ref={bgImgRef}
              src="/assets/showreel.png"
              alt="CTA Background"
              className="cta_bg_img"
            />
            <div className="cta_bg_overlay"></div>
          </div>

          <div className="padding-section-medium" style={{ paddingTop: '2rem' }}></div>
          <div className="padding-global" style={{ width: '100%' }}>
            <div className="site-container sec-cta__container cta_content">
              {/* Left Column Header */}
              <div className="section-header sec-cta__header cta_left_column">
                <div className="section-badge sec-cta__badge">
                  <SubtitleMarquee text="Get Started — " variant="light" />
                </div>
                <div className="text-align-left">
                  <div className="text-color-white">
                    <h2 className="heading-style-h2 section-title sec-cta__title">
                      Start <br />
                      <span className="text-color-secondary">Project</span>
                    </h2>
                    <p className="section-description sec-cta__desc cta-description alg-text">
                      Let us collaborate to build something extraordinary and elevate your brand to the next level.
                    </p>
                  </div>
                </div>
                <div className="spacer-large"></div>
                <div className="fade-in fade-in-left">
                  <a
                    href="tel:+923233678383"
                    className="main-button alternate-button w-inline-block"
                  >
                    <div className="main-button-block">
                      <div className="button-text alternate-text">+92 323 3678383</div>
                      <div className="button-text alternate-text">+92 323 3678383</div>
                    </div>
                    <img
                      loading="lazy"
                      src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                      alt="Star Icon"
                      className="button-icon"
                    />
                  </a>
                </div>
              </div>

              {/* Right Column (Glassmorphism Contact Form) */}
              <div className="cta_right_column">
                <div className="glass-container" style={{ borderRadius: '1.5rem', padding: '1px' }}>
                  <div className="glass-filter"></div>
                  <div className="glass-overlay"></div>
                  <div className="glass-specular"></div>
                  <div className="glass-content">
                    {submitted ? (
                      <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#ffffff' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                          Thank you!
                        </h3>
                        <p style={{ color: 'rgba(255,255,255,0.8)' }} className="alg-text">
                          Your submission has been received! We will contact you soon.
                        </p>
                      </div>
                    ) : (
                      <form className="cta_form" onSubmit={handleSubmit}>
                        {/* Row 1: Full Name & Phone Number */}
                        <div className="form_row two-cols">
                          <div className="form_group">
                            <label htmlFor="fullName">Full Name</label>
                            <input
                              type="text"
                              id="fullName"
                              name="fullName"
                              placeholder="Enter Your Full Name"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="form_group">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              placeholder="Enter Your Phone Number"
                              value={formData.phone}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>

                        {/* Row 2: Email Address */}
                        <div className="form_group">
                          <label htmlFor="email">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Your Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>

                        {/* Row 3: Service Pill Buttons */}
                        <div className="form_group">
                          <label>Service</label>
                          <div className="service-pills-row">
                            {availableServices.map((service) => {
                              const isSelected = formData.selectedServices.includes(service);
                              return (
                                <button
                                  type="button"
                                  key={service}
                                  className={`service-pill-btn ${isSelected ? 'active' : ''}`}
                                  onClick={() => toggleService(service)}
                                >
                                  {service}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Row 4: Message */}
                        <div className="form_group">
                          <label htmlFor="message">Message</label>
                          <textarea
                            id="message"
                            name="message"
                            placeholder="Type Your Message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                          ></textarea>
                        </div>

                        {/* Row 5: Submit Button */}
                        <button
                          type="submit"
                          className="main-button alternate-button w-inline-block"
                          style={{ border: 'none', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '0.5rem' }}
                        >
                          <div className="main-button-block">
                            <div className="button-text alternate-text">Submit</div>
                            <div className="button-text alternate-text">Submit</div>
                          </div>
                          <img
                            loading="lazy"
                            src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                            alt="Star Icon"
                            className="button-icon"
                          />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="padding-section-medium" style={{ paddingBottom: '2rem' }}></div>
        </div>
      </div>
    </section>
  );
}
