'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const availableServices = [
  'Website Design',
  'Software Development',
  'AI Development',
  'App Development',
  'DevOps & Cloud',
  'UI/UX Design',
];

export function ContactSection() {
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    selectedServices: ['Website Design'],
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    // Heading letter-by-letter entrance animation
    const titleEl = container.querySelector('.alg-contact-title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }
  }, { scope: containerRef });

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
    <section ref={containerRef} id="sec-contact" className="alg-contact site-section sec-contact">
      {/* Decorative Ambient Background Wave Ribbons */}
      <div className="alg-contact-bg-wave alg-contact-bg-wave--top-right" aria-hidden="true">
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M550,50 C450,150 500,350 350,450 C200,550 50,450 50,450" stroke="url(#orange-grad-tr)" strokeWidth="60" strokeLinecap="round" opacity="0.32" filter="blur(20px)" />
          <path d="M580,20 C420,120 480,320 300,420" stroke="url(#orange-grad-tr)" strokeWidth="2.5" opacity="0.4" />
          <defs>
            <linearGradient id="orange-grad-tr" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f47a1f" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#f47a1f" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="alg-contact-bg-wave alg-contact-bg-wave--bottom-left" aria-hidden="true">
        <svg viewBox="0 0 700 400" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-50,350 C150,380 250,320 450,220 C600,150 680,80 750,50" stroke="url(#orange-grad-bl)" strokeWidth="45" strokeLinecap="round" opacity="0.35" filter="blur(18px)" />
          <path d="M-80,360 C120,390 280,330 480,230 C620,160 700,90 780,60" stroke="url(#orange-grad-bl)" strokeWidth="2.5" opacity="0.45" />
          <defs>
            <linearGradient id="orange-grad-bl" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f47a1f" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#f47a1f" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="alg-contact-container site-container sec-contact__container container-large padding-global">
        <div className="padding-section-large alg-contact-inner">
          
          {/* Main 2-Column Grid */}
          <div className="alg-contact-grid">
            
            {/* Left Column: Heading, Description & 2-Col Contact Cards */}
            <div className="alg-contact-left-col">
              
              {/* Header matching homepage subtitle marquee & heading style */}
              <div className="alg-contact-header section-header sec-contact__header" style={{ marginBottom: 0 }}>
                <div className="alg-contact-badge section-badge sec-contact__badge" style={{ marginBottom: 0 }}>
                  <SubtitleMarquee text="Get In Touch ✦ " variant="dark" />
                </div>
                <h2
                  className="alg-contact-title heading-style-h2 section-title sec-contact__title"
                  style={{ color: '#05080C', textAlign: 'left', marginBottom: 0 }}
                >
                  Let’s Build Something <br />
                  <span className="alg-contact-title-secondary text-color-secondary">Great</span>
                </h2>
              </div>

              {/* Paragraph */}
              <p className="section-description alg-contact-desc sec-contact__desc alg-text">
                We are prepared to make happen, however little your idea. Go through our contact us form, write to us, or call us and we will see you off to Algofort.
              </p>

              {/* 2-Column Contact Info Grid */}
              <div className="alg-contact-info-grid">
                
                {/* 1. Our studio address */}
                <div className="alg-contact-info-item">
                  <div className="alg-contact-info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                  </div>
                  <div className="alg-contact-info-text">
                    <span className="alg-contact-info-label">OUR STUDIO ADDRESS</span>
                    <span className="alg-contact-info-value">
                      84J GHAZALI RDBLOCK 2PECHS, KARACHI
                    </span>
                  </div>
                </div>

                {/* 2. Contact Us Via Email */}
                <a href="mailto:info@algofort.com" className="alg-contact-info-item" aria-label="Contact Us Via Email">
                  <div className="alg-contact-info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </div>
                  <div className="alg-contact-info-text">
                    <span className="alg-contact-info-label">CONTACT US VIA EMAIL</span>
                    <span className="alg-contact-info-value">INFO@ALGOFORT.COM</span>
                  </div>
                </a>

                {/* 3. Contact Us Via Whatsapp */}
                <a href="https://wa.me/923337198686" target="_blank" rel="noopener noreferrer" className="alg-contact-info-item" aria-label="Contact Us Via Whatsapp">
                  <div className="alg-contact-info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="alg-contact-info-text">
                    <span className="alg-contact-info-label">CONTACT US VIA WHATSAPP</span>
                    <span className="alg-contact-info-value">+92 3337198686</span>
                    <span className="alg-contact-info-timing">Timing: 7PM to 7AM</span>
                  </div>
                </a>

                {/* 4. Contact info */}
                <a href="tel:+17708847207" className="alg-contact-info-item" aria-label="Contact info">
                  <div className="alg-contact-info-icon-circle">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                    </svg>
                  </div>
                  <div className="alg-contact-info-text">
                    <span className="alg-contact-info-label">CONTACT INFO</span>
                    <span className="alg-contact-info-value">+1 (770) 884-7207</span>
                    <span className="alg-contact-info-timing">Timing: 7PM to 7AM</span>
                  </div>
                </a>

              </div>

            </div>

            {/* Right Column: Clean White Floating Form Card */}
            <div className="alg-contact-right-col">
              <div className="alg-contact-form-card content-card sec-contact__card">
                {submitted ? (
                  <div className="alg-contact-success">
                    <div className="alg-contact-success-icon-wrap">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                    </div>
                    <h4 className="alg-contact-success-title">Message Sent!</h4>
                    <p className="alg-contact-success-desc">
                      Thank you for reaching out. An Algofort specialist will get back to you shortly.
                    </p>
                  </div>
                ) : (
                  <form className="alg-contact-form alg-cta-form cta_form" onSubmit={handleSubmit}>
                    
                    {/* Row 1: Full Name & Phone Number (two-cols) */}
                    <div className="alg-contact-form-row alg-cta-form-row form_row two-cols">
                      <div className="alg-contact-form-group alg-cta-form-group form_group">
                        <label htmlFor="fullName">FULL NAME</label>
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
                      <div className="alg-contact-form-group alg-cta-form-group form_group">
                        <label htmlFor="phone">PHONE NUMBER</label>
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
                    <div className="alg-contact-form-group alg-cta-form-group form_group">
                      <label htmlFor="email">EMAIL ADDRESS</label>
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
                    <div className="alg-contact-form-group alg-cta-form-group form_group">
                      <label>SERVICE</label>
                      <div className="alg-contact-pills-row alg-cta-pills-row service-pills-row">
                        {availableServices.map((service) => {
                          const isSelected = formData.selectedServices.includes(service);
                          return (
                            <button
                              type="button"
                              key={service}
                              className={`alg-contact-pill-btn alg-cta-pill-btn service-pill-btn ${isSelected ? 'active' : ''}`}
                              onClick={() => toggleService(service)}
                            >
                              {service}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Row 4: Message */}
                    <div className="alg-contact-form-group alg-contact-form-group--message alg-cta-form-group form_group">
                      <label htmlFor="message">MESSAGE</label>
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
                    <div className="alg-contact-form-actions">
                      <button type="submit" className="alg-contact-submit-btn">
                        <span>SUBMIT</span>
                        <svg className="alg-contact-btn-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </button>
                    </div>

                  </form>
                )}
              </div>
            </div>

          </div>

          {/* Subsay nichay map */}
          <div className="alg-contact-map-wrapper">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7239.476525376414!2d67.04718154488073!3d24.872787454250034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e8c5f05ada3%3A0xd7721a415c03d15!2s84j%20Ghazali%20Rd%2C%20P.E.C.H.S%20Block%202%20Block%202%20PECHS%2C%20Karachi%2C%2075300%2C%20Pakistan!5e0!3m2!1sen!2s!4v1790938745774!5m2!1sen!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Algofort Studio Location PECHS Karachi"
              className="alg-contact-map-iframe"
            />
          </div>

        </div>
      </div>
    </section>
  );
}