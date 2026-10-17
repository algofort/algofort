'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const socialLinks = [
  {
    name: 'Facebook',
    url: 'https://www.facebook.com/algoforttech/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/company/algoforttech/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64a1.67 1.67 0 1 0 0 3.34 1.67 1.67 0 0 0 0-3.34z" />
      </svg>
    ),
  },
  {
    name: 'Twitter/X',
    url: 'https://x.com/algofort',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/algoforttech/',
    icon: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
];

export const Footer = ({ className = '', newsletterPreview = false } = {}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className={`footer ${className}`}>
      <div className="padding-global is-tiny">
        <div className="footer_wrap">

          {/* Artistic Calligraphic "Letter G" Watermark on Right */}
          <div className="footer_watermark" aria-hidden="true">
            <img 
              src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145912/algofort/assets/footer-watermark.svg" 
              alt="" 
              className="footer_watermark_img" 
              loading="lazy"
            />
          </div>

          <div className="footer_content">
            
            {/* Unified 2-Pane Main Layout */}
            <div className="footer_main_layout">

              {/* LEFT PANE: Newsletter (Top) & Social Media Rows (Bottom) */}
              <div className="footer_left_pane">
                
                {/* Stay connected & Newsletter */}
                <div className="footer_col_newsletter">
                  <h2 className="footer_heading">Stay Connected</h2>
                  <p className="footer_subtext alg-text">
                    Join our newsletter for tips, updates, and project highlights—only the good stuff.
                  </p>
                  <form className="footer_newsletter_form" onSubmit={handleSubmit}>
                    <input
                      type="email"
                      placeholder="Enter your email address*"
                      className="footer_newsletter_input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button
                      type="submit"
                      className="footer_newsletter_btn"
                      aria-label="Submit newsletter subscription"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </form>
                  {submitted && (
                    <div className="footer_form_success">
                      {newsletterPreview ? 'Newsletter signup is coming soon. You have not been subscribed.' : '✓ Thank you! Your email has been registered.'}
                    </div>
                  )}
                </div>

                {/* Social Links List with arrows */}
                <div className="footer_social_list">
                  {socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="footer_social_row"
                    >
                      <div className="footer_social_left">
                        <span className="footer_social_icon">{social.icon}</span>
                        <div className="nav-text-wrap">
                          <span className="nav-text">{social.name}</span>
                          <span className="nav-text">{social.name}</span>
                        </div>
                      </div>
                      <div className="footer_social_arrow">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </div>
                    </a>
                  ))}
                </div>

              </div>

              {/* RIGHT PANE: Main Links + Get in Touch (Right-Aligned) on Top; ALGOFORT (Bottom) */}
              <div className="footer_right_pane">
                
                {/* Top of Right Pane: Main Links (left) and Get in touch (right) */}
                <div className="footer_right_top">

                  {/* Main links & Services (Left sub-cols) */}
                  <div className="footer_col_links">
                    <div className="footer_links_grid">
                      <div className="footer_links_col">
                        <div className="footer_label">Main Links</div>
                        <Link href="/" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">HOME</div>
                            <div className="nav-text">HOME</div>
                          </div>
                        </Link>
                        <Link href="/about" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">ABOUT US</div>
                            <div className="nav-text">ABOUT US</div>
                          </div>
                        </Link>
                        <Link href="/services" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">SERVICES</div>
                            <div className="nav-text">SERVICES</div>
                          </div>
                        </Link>
                        <Link href="/portfolio" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">PROJECTS</div>
                            <div className="nav-text">PROJECTS</div>
                          </div>
                        </Link>
                        <Link href="/contact" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">CONTACT US</div>
                            <div className="nav-text">CONTACT US</div>
                          </div>
                        </Link>
                      </div>

                      <div className="footer_links_col">
                        <div className="footer_label">Our Services</div>
                        <Link href="/services/web-development" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">Web Development</div>
                            <div className="nav-text">Web Development</div>
                          </div>
                        </Link>
                        <Link href="/services/brand-identity" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">Brand Identity</div>
                            <div className="nav-text">Brand Identity</div>
                          </div>
                        </Link>
                        <Link href="/services/saas-app-development" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">SaaS App Development</div>
                            <div className="nav-text">SaaS App Development</div>
                          </div>
                        </Link>
                        <Link href="/services/mobile-app-development" className="footer_nav_link nav-link">
                          <div className="nav-text-wrap">
                            <div className="nav-text">Mobile App Development</div>
                            <div className="nav-text">Mobile App Development</div>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Get in touch & Offline (Right-Aligned sub-col) */}
                  <div className="footer_col_contact">
                    <div className="footer_contact_section">
                      <div className="footer_label">Get in Touch</div>
                      <a data-site-phone href="tel:+923337198686" className="footer_phone_link">
                        <div className="nav-text-wrap">
                          <span className="nav-text">+92 333 7198686</span>
                          <span className="nav-text">+92 333 7198686</span>
                        </div>
                      </a>
                      <a href="mailto:hello@algofort.com" className="footer_email_link">
                        <div className="nav-text-wrap">
                          <span className="nav-text">hello@algofort.com</span>
                          <span className="nav-text">hello@algofort.com</span>
                        </div>
                      </a>
                    </div>

                    <div className="footer_offline_section">
                      <div className="footer_label">Offline</div>
                      <div className="footer_studio_title">Algofort Studio</div>
                      <p className="footer_address_text alg-text">
                        84j Ghazali Rd, Block 2 PECHS, Karachi
                      </p>
                    </div>
                  </div>

                </div>

                {/* Bottom of Right Pane: Logo */}
                <Link href="/" className="footer_brand_display" aria-label="Algofort homepage">
                  <Image
                    src="https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:best/v1792145913/algofort/assets/logo-black.png"
                    alt="Algofort Logo"
                    width={828}
                    height={115}
                    className="footer_brand_img"
                    priority
                    unoptimized
                  />
                </Link>

              </div>

            </div>

            {/* Bottom Bar: Divider & Copyright (Left) / Legal (Right) */}
            <div className="footer_bottom_bar">
              <div className="footer_bottom_left">
                <span>© 2026 Algofort. All rights reserved.</span>
              </div>
              <div className="footer_bottom_right">
                <Link href="/privacy-policy" className="footer_legal_link">
                  <div className="nav-text-wrap">
                    <span className="nav-text">Privacy Policy</span>
                    <span className="nav-text">Privacy Policy</span>
                  </div>
                </Link>
                <span className="footer_bottom_dot">•</span>
                <Link href="/terms-of-service" className="footer_legal_link">
                  <div className="nav-text-wrap">
                    <span className="nav-text">Terms of Service</span>
                    <span className="nav-text">Terms of Service</span>
                  </div>
                </Link>
              </div>
            </div>

          </div>

        </div>
      </div>
    </footer>
  );
};
