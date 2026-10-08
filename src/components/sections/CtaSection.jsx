'use client';

import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const availableServices = [
  'Website Design',
  'Software Development',
  'AI Development',
  'App Development',
  'DevOps & Cloud',
  'UI/UX Design',
];

export function CtaSection() {
  const sectionRef = useRef(null);
  const bgImgRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedServices: ['Website Design'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.alg-cta-title, .sec-cta__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }
  }, []);

  useEffect(() => {
    if (!bgImgRef.current || !sectionRef.current) return;

    const anim = gsap.fromTo(
      bgImgRef.current,
      { yPercent: -15 },
      {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      }
    );

    return () => {
      anim.kill();
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} className="alg-cta site-section sec-cta cta-section" id="sec-cta">
      <div className="alg-cta-wrapper cta_wrapper">
        <div className="alg-cta-component cta_component">
          {/* Background Image with Parallax & Dark Gradient Overlay */}
          <div className="alg-cta-bg-wrap cta_bg_wrap">
            <img
              ref={bgImgRef}
              src="/assets/showreel.png"
              alt="CTA Background"
              className="alg-cta-bg-img cta_bg_img"
            />
            <div className="alg-cta-bg-overlay cta_bg_overlay"></div>
          </div>

          <div className="alg-cta-container alg-cta-content sec-cta__container cta_content">
              {/* Left Column Header */}
              <div className="alg-cta-left-col section-header sec-cta__header cta_left_column">
                <div className="alg-cta-badge section-badge sec-cta__badge">
                  <SubtitleMarquee text="Get Started ✦ " variant="light" />
                </div>
                <div className="text-align-left">
                  <div className="text-color-white">
                    <h2 className="alg-cta-title heading-style-h2 section-title sec-cta__title">
                      Start <br />
                      <span className="text-color-secondary">Project</span>
                    </h2>
                    <p className="alg-cta-desc section-description sec-cta__desc cta-description alg-text">
                      Let us collaborate to build something extraordinary and elevate your brand to the next level.
                    </p>
                  </div>
                </div>
                <div className="spacer-large"></div>
                <div className="fade-in fade-in-left">
                  <a
                    href="tel:+923233678383"
                    className="alg-cta-button main-button alternate-button w-inline-block"
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
              <div className="alg-cta-right-col cta_right_column">
                <div className="alg-cta-glass-container glass-container" style={{ borderRadius: '1.5rem', padding: '1px' }}>
                  <div className="alg-cta-glass-filter glass-filter"></div>
                  <div className="alg-cta-glass-overlay glass-overlay"></div>
                  <div className="alg-cta-glass-specular glass-specular"></div>
                  <div className="alg-cta-glass-content glass-content">
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
                      <form className="alg-cta-form cta_form" onSubmit={handleSubmit}>
                        {/* Row 1: Full Name & Phone Number */}
                        <div className="alg-cta-form-row form_row two-cols">
                          <div className="alg-cta-form-group form_group">
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
                          <div className="alg-cta-form-group form_group">
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
                        <div className="alg-cta-form-group form_group">
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
                        <div className="alg-cta-form-group form_group">
                          <label>Service</label>
                          <div className="alg-cta-pills-row service-pills-row">
                            {availableServices.map((service) => {
                              const isSelected = formData.selectedServices.includes(service);
                              return (
                                <button
                                  type="button"
                                  key={service}
                                  className={`alg-cta-pill-btn service-pill-btn ${isSelected ? 'active' : ''}`}
                                  onClick={() => toggleService(service)}
                                >
                                  {service}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {/* Row 4: Message */}
                        <div className="alg-cta-form-group form_group">
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
                          className="alg-cta-button main-button alternate-button w-inline-block"
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
      </div>
    </section>
  );
}