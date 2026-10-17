'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const policySections = [
  { id: 'about-algofort', number: '01', title: 'About Algofort' },
  { id: 'information-we-collect', number: '02', title: 'Information We Collect' },
  { id: 'how-we-use-information', number: '03', title: 'How We Use Your Information' },
  { id: 'contact-forms', number: '04', title: 'Contact Forms' },
  { id: 'newsletter-marketing', number: '05', title: 'Newsletter and Marketing Communications' },
  { id: 'cookies-tracking', number: '06', title: 'Cookies and Tracking Technologies' },
  { id: 'analytics-third-party', number: '07', title: 'Analytics and Third-Party Services' },
  { id: 'how-we-protect-information', number: '08', title: 'How We Protect Your Information' },
  { id: 'sharing-of-information', number: '09', title: 'Sharing of Information' },
  { id: 'data-retention', number: '10', title: 'Data Retention' },
  { id: 'your-privacy-rights', number: '11', title: 'Your Privacy Rights' },
  { id: 'childrens-privacy', number: '12', title: "Children's Privacy" },
  { id: 'international-visitors', number: '13', title: 'International Visitors' },
  { id: 'links-to-other-websites', number: '14', title: 'Links to Other Websites' },
  { id: 'changes-to-policy', number: '15', title: 'Changes to This Privacy Policy' },
  { id: 'contact-algofort', number: '16', title: 'Contact Algofort' },
  { id: 'your-privacy-matters', number: '17', title: 'Your Privacy Matters' },
];

export function PrivacyPolicySection() {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState('about-algofort');

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate top span title
    const titleEl = sectionRef.current.querySelector('.sec-privacy__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    // Animate section card h2 titles
    const cardTitleEls = sectionRef.current.querySelectorAll('.sec-privacy__card-title');
    cardTitleEls.forEach((cardTitle) => {
      initTitleAnimation(cardTitle, {
        trigger: cardTitle.closest('.sec-privacy__section-card') || cardTitle,
        start: 'top 88%',
        stagger: 0.02,
      });
    });

    // Scrollspy to highlight active TOC link
    const handleScroll = () => {
      const sectionElements = policySections
        .map((s) => ({
          id: s.id,
          el: document.getElementById(s.id),
        }))
        .filter((item) => item.el !== null);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= 200) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    const timer = setTimeout(() => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.refresh();
      }
    }, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleSmoothJump = (e, targetId) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      const topOffset = 100;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(targetId);
    }
  };

  return (
    <section ref={sectionRef} id="sec-privacy" className="site-section sec-privacy">
      <div className="site-container sec-privacy__container container-large padding-global">
        <div className="padding-section-large sec-privacy__padding">
          
          {/* Section Header */}
          <div className="section-header sec-privacy__header">
            <div className="section-badge sec-privacy__badge">
              <SubtitleMarquee
                text="Legal & Compliance — "
                variant="dark"
                icon="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145874/algofort/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
              />
            </div>

            {/* Privacy Policy rendered as span with identical styling & GSAP animation */}
            <span className="heading-style-h2 section-title sec-privacy__title">
              Privacy <span className="text-color-secondary">Policy</span>
            </span>

            <div className="sec-privacy__meta-bar">
              <span className="sec-privacy__meta-date">Last Updated: October 17, 2026</span>
              <span className="sec-privacy__meta-pill">
                <span className="sec-privacy__meta-dot"></span>
                Active & In Effect
              </span>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="sec-privacy__grid">
            
            {/* Left Sticky Sidebar Column */}
            <div className="sec-privacy__sidebar-col">
              <aside className="sec-privacy__sidebar">
                <div className="sec-privacy__toc-card">
                  <div className="sec-privacy__toc-header">
                    <div className="sec-privacy__toc-title">Table of Contents</div>
                    <span className="sec-privacy__toc-count">17 Sections</span>
                  </div>
                  <nav className="sec-privacy__toc-nav" aria-label="Table of Contents">
                    {policySections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => handleSmoothJump(e, sec.id)}
                        className={`sec-privacy__toc-link ${
                          activeSection === sec.id ? 'is-active' : ''
                        }`}
                      >
                        <span className="sec-privacy__toc-num">{sec.number}</span>
                        <span className="sec-privacy__toc-label">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sidebar Quick Contact Support */}
                <div className="sec-privacy__sidebar-help">
                  <div className="sec-privacy__help-title">Privacy Inquiries</div>
                  <p className="sec-privacy__help-text">
                    Have questions about our data practices or need to exercise your privacy rights?
                  </p>
                  <a href="mailto:hello@algofort.com" className="sec-privacy__help-link">
                    hello@algofort.com &rarr;
                  </a>
                </div>
              </aside>
            </div>

            {/* Right Main Editorial Content */}
            <article className="sec-privacy__article">
              
              {/* Executive Summary Box */}
              <div className="sec-privacy__lead-card">
                <p className="sec-privacy__lead-p">
                  At <strong>Algofort</strong>, we respect your privacy and are committed to protecting the personal information you share with us. This Privacy Policy explains how Algofort collects, uses, stores, and protects information when you visit our website, contact us, subscribe to our newsletter, or use our services.
                </p>
                <p className="sec-privacy__lead-p">
                  By using the Algofort website, you agree to the practices described in this Privacy Policy.
                </p>
              </div>

              {/* 1. About Algofort */}
              <section id="about-algofort" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">01</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">About Algofort</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Algofort is a technology and digital solutions company providing services including web development, UI/UX development, mobile app development, custom software development, SEO, and other digital technology solutions.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    Our goal is to provide reliable and user-focused technology solutions while maintaining the privacy and security of our website visitors, clients, and users.
                  </p>
                </div>
              </section>

              {/* 2. Information We Collect */}
              <section id="information-we-collect" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">02</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Information We Collect</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    We may collect information that you voluntarily provide when you interact with our website or contact our team.
                  </p>
                  
                  <div className="sec-privacy__list-block">
                    <div className="sec-privacy__list-title">This information may include:</div>
                    <ul className="sec-privacy__list">
                      <li className="sec-privacy__list-item">Name</li>
                      <li className="sec-privacy__list-item">Email address</li>
                      <li className="sec-privacy__list-item">Phone number</li>
                      <li className="sec-privacy__list-item">Company or organization name</li>
                      <li className="sec-privacy__list-item">Project requirements and business information</li>
                      <li className="sec-privacy__list-item">Messages or information submitted through contact forms</li>
                      <li className="sec-privacy__list-item">Newsletter subscription information</li>
                      <li className="sec-privacy__list-item">Any other information you choose to provide</li>
                    </ul>
                  </div>

                  <p className="alg-text sec-privacy__p">
                    We may also automatically collect limited technical information when you visit our website.
                  </p>

                  <div className="sec-privacy__list-block">
                    <div className="sec-privacy__list-title">This technical information may include:</div>
                    <ul className="sec-privacy__list">
                      <li className="sec-privacy__list-item">IP address</li>
                      <li className="sec-privacy__list-item">Browser type and version</li>
                      <li className="sec-privacy__list-item">Device type</li>
                      <li className="sec-privacy__list-item">Operating system</li>
                      <li className="sec-privacy__list-item">Pages visited</li>
                      <li className="sec-privacy__list-item">Time spent on pages</li>
                      <li className="sec-privacy__list-item">Referring website</li>
                      <li className="sec-privacy__list-item">General website usage information</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* 3. How We Use Your Information */}
              <section id="how-we-use-information" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">03</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">How We Use Your Information</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Algofort may use collected information for legitimate business and website purposes, including:
                  </p>
                  
                  <ul className="sec-privacy__list">
                    <li className="sec-privacy__list-item">Responding to inquiries and contact requests</li>
                    <li className="sec-privacy__list-item">Understanding your project requirements</li>
                    <li className="sec-privacy__list-item">Providing and managing our services</li>
                    <li className="sec-privacy__list-item">Preparing proposals and project estimates</li>
                    <li className="sec-privacy__list-item">Communicating with clients and potential clients</li>
                    <li className="sec-privacy__list-item">Improving our website, services, and user experience</li>
                    <li className="sec-privacy__list-item">Sending newsletters, updates, or relevant information when you subscribe</li>
                    <li className="sec-privacy__list-item">Analyzing website performance and visitor behavior</li>
                    <li className="sec-privacy__list-item">Maintaining website security</li>
                    <li className="sec-privacy__list-item">Preventing fraud, abuse, or unauthorized activity</li>
                    <li className="sec-privacy__list-item">Complying with applicable legal obligations</li>
                  </ul>

                  <p className="alg-text sec-privacy__p">
                    We do not use personal information for purposes that are unrelated to the reason it was collected without appropriate notice or consent where required by applicable law.
                  </p>
                </div>
              </section>

              {/* 4. Contact Forms */}
              <section id="contact-forms" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">04</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Contact Forms</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    When you submit information through an Algofort contact form, the information you provide may be used to respond to your inquiry or discuss your requested service.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    If you use our AI support chat, your message and recent conversation context are sent through our server to the configured AI provider (currently Groq) to generate a reply. We do not save chat transcripts in our database or browser storage. Conversation history stays in the current page and clears when you leave or reload it. Replies are automated and may be inaccurate; contact our team to confirm project details. Please do not share sensitive information in the chat.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    To limit abuse, we store request counts and a keyed hash derived from the visitor’s network address. These records do not contain chat messages. The AI provider processes messages according to its own privacy practices.
                  </p>
                  <div className="sec-privacy__callout">
                    <p className="sec-privacy__callout-p">
                      <strong>Security Advisory:</strong> We recommend that you do not submit sensitive personal information, passwords, financial information, or confidential information through general website contact forms unless specifically requested through an appropriate secure channel.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Newsletter and Marketing Communications */}
              <section id="newsletter-marketing" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">05</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Newsletter and Marketing Communications</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    If you subscribe to our newsletter, we may use your email address to send information such as:
                  </p>
                  
                  <ul className="sec-privacy__list">
                    <li className="sec-privacy__list-item">Company updates</li>
                    <li className="sec-privacy__list-item">Technology insights</li>
                    <li className="sec-privacy__list-item">Service updates</li>
                    <li className="sec-privacy__list-item">Project highlights</li>
                    <li className="sec-privacy__list-item">Helpful resources</li>
                    <li className="sec-privacy__list-item">News and announcements</li>
                  </ul>

                  <p className="alg-text sec-privacy__p">
                    You can unsubscribe from marketing or newsletter communications at any time by following the unsubscribe instructions included in the relevant communication.
                  </p>
                </div>
              </section>

              {/* 6. Cookies and Tracking Technologies */}
              <section id="cookies-tracking" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">06</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Cookies and Tracking Technologies</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    The Algofort website may use cookies and similar technologies to improve website functionality, understand website traffic, and enhance the user experience.
                  </p>
                  
                  <div className="sec-privacy__list-block">
                    <div className="sec-privacy__list-title">Cookies may help us:</div>
                    <ul className="sec-privacy__list">
                      <li className="sec-privacy__list-item">Remember website preferences</li>
                      <li className="sec-privacy__list-item">Understand how visitors use our website</li>
                      <li className="sec-privacy__list-item">Improve website performance</li>
                      <li className="sec-privacy__list-item">Measure marketing and website effectiveness</li>
                      <li className="sec-privacy__list-item">Provide a better browsing experience</li>
                    </ul>
                  </div>

                  <p className="alg-text sec-privacy__p">
                    You can control or disable cookies through your browser settings. Disabling certain cookies may affect some website functionality.
                  </p>
                </div>
              </section>

              {/* 7. Analytics and Third-Party Services */}
              <section id="analytics-third-party" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">07</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Analytics and Third-Party Services</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    We may use third-party tools and services to understand website traffic, measure performance, improve our services, or support website functionality.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    These third-party providers may collect information according to their own privacy policies and terms.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    Where applicable, these services may include analytics, hosting, communication, security, marketing, and website functionality providers.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    Algofort does not control the privacy practices of independent third-party services and recommends reviewing their respective privacy policies.
                  </p>
                </div>
              </section>

              {/* 8. How We Protect Your Information */}
              <section id="how-we-protect-information" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">08</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">How We Protect Your Information</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    We take reasonable technical and organizational measures to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    However, no website, online service, or method of electronic transmission can be guaranteed to be completely secure. Therefore, while we work to protect your information, we cannot guarantee absolute security.
                  </p>
                </div>
              </section>

              {/* 9. Sharing of Information */}
              <section id="sharing-of-information" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">09</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Sharing of Information</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    <strong>Algofort does not sell or rent your personal information to third parties.</strong>
                  </p>
                  <p className="alg-text sec-privacy__p">
                    We may share information when necessary with trusted service providers, technology partners, hosting providers, or other third parties who help us operate our website and provide our services.
                  </p>

                  <div className="sec-privacy__list-block">
                    <div className="sec-privacy__list-title">Information may also be disclosed when:</div>
                    <ul className="sec-privacy__list">
                      <li className="sec-privacy__list-item">Required by law or legal process</li>
                      <li className="sec-privacy__list-item">Necessary to protect our rights or property</li>
                      <li className="sec-privacy__list-item">Necessary to prevent fraud or security threats</li>
                      <li className="sec-privacy__list-item">Required to protect the safety of our users or others</li>
                      <li className="sec-privacy__list-item">Necessary to provide a service requested by you</li>
                    </ul>
                  </div>

                  <p className="alg-text sec-privacy__p">
                    Third-party service providers are expected to handle information appropriately and only for legitimate business purposes.
                  </p>
                </div>
              </section>

              {/* 10. Data Retention */}
              <section id="data-retention" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">10</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Data Retention</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    We retain personal information only for as long as reasonably necessary for the purposes described in this Privacy Policy, including providing services, maintaining business records, resolving disputes, enforcing agreements, and meeting legal requirements.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    The retention period may vary depending on the type of information and the purpose for which it was collected.
                  </p>
                </div>
              </section>

              {/* 11. Your Privacy Rights */}
              <section id="your-privacy-rights" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">11</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Your Privacy Rights</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Depending on your location and applicable privacy laws, you may have rights regarding your personal information.
                  </p>

                  <div className="sec-privacy__list-block">
                    <div className="sec-privacy__list-title">These rights may include:</div>
                    <ul className="sec-privacy__list">
                      <li className="sec-privacy__list-item">Request access to personal information we hold about you</li>
                      <li className="sec-privacy__list-item">Request correction of inaccurate information</li>
                      <li className="sec-privacy__list-item">Request deletion of personal information where legally permitted</li>
                      <li className="sec-privacy__list-item">Withdraw consent where processing is based on consent</li>
                      <li className="sec-privacy__list-item">Opt out of certain marketing communications</li>
                      <li className="sec-privacy__list-item">Request information about how your data is used</li>
                    </ul>
                  </div>

                  <p className="alg-text sec-privacy__p">
                    To make a privacy-related request, contact us using the information provided below.
                  </p>
                </div>
              </section>

              {/* 12. Children's Privacy */}
              <section id="childrens-privacy" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">12</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Children's Privacy</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Our website and services are intended for general business and professional audiences. Algofort does not knowingly collect personal information from children without appropriate consent where required by applicable law.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    If you believe that a child has provided personal information to us, please contact us so we can take appropriate action.
                  </p>
                </div>
              </section>

              {/* 13. International Visitors */}
              <section id="international-visitors" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">13</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">International Visitors</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Algofort may work with clients and users from different countries. As a result, information you provide may be processed or stored in locations where Algofort, its service providers, or technology partners operate.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    By using our website or contacting us, you acknowledge that information may be processed in accordance with applicable laws and this Privacy Policy.
                  </p>
                </div>
              </section>

              {/* 14. Links to Other Websites */}
              <section id="links-to-other-websites" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">14</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Links to Other Websites</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Our website may contain links to third-party websites, social media platforms, or other online services.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    These websites operate independently from Algofort and have their own privacy policies and terms. We are not responsible for the privacy practices, content, or security of third-party websites.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    We recommend reviewing the privacy policy of any external website before providing personal information.
                  </p>
                </div>
              </section>

              {/* 15. Changes to This Privacy Policy */}
              <section id="changes-to-policy" className="sec-privacy__section-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">15</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Changes to This Privacy Policy</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    Algofort may update this Privacy Policy from time to time to reflect changes in our services, website functionality, technology, or applicable legal requirements.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    When we make changes, we will update the <strong>Last Updated</strong> date at the top of this page.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    We encourage visitors to review this page periodically to stay informed about how we protect personal information.
                  </p>
                </div>
              </section>

              {/* 16. Contact Algofort (Featured Contact Callout) */}
              <section id="contact-algofort" className="sec-privacy__section-card sec-privacy__contact-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">16</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Contact Algofort</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    If you have questions about this Privacy Policy, how we handle personal information, or wish to make a privacy-related request, you can contact us:
                  </p>

                  <div className="sec-privacy__contact-grid">
                    <div className="sec-privacy__contact-box">
                      <div className="sec-privacy__contact-box-label">Offline Studio</div>
                      <p className="sec-privacy__contact-box-val">
                        Algofort Studio<br />
                        84j Ghazali Rd, Block 2 PECHS<br />
                        Karachi, Pakistan
                      </p>
                    </div>

                    <div className="sec-privacy__contact-box">
                      <div className="sec-privacy__contact-box-label">Direct Communication</div>
                      <p className="sec-privacy__contact-box-val">
                        Email:{' '}
                        <a href="mailto:hello@algofort.com">hello@algofort.com</a>
                        <br />
                        Phone:{' '}
                        <a data-site-phone href="tel:+923337198686">+92 333 7198686</a>
                      </p>
                    </div>
                  </div>

                  <p className="alg-text sec-privacy__p">
                    You can also contact us through the Algofort Contact Us page for general inquiries and project discussions.
                  </p>

                  <div className="sec-privacy__contact-actions">
                    <Link href="/contact" className="main-button alternate-button w-inline-block">
                      <div className="main-button-block">
                        <div className="button-text alternate-text">Contact Us</div>
                        <div className="button-text alternate-text">Contact Us</div>
                      </div>
                      <img
                        loading="lazy"
                        src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145871/algofort/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                        alt="Star Icon"
                        className="button-icon"
                      />
                    </Link>
                  </div>
                </div>
              </section>

              {/* 17. Your Privacy Matters */}
              <section id="your-privacy-matters" className="sec-privacy__section-card sec-privacy__closing-card">
                <div className="sec-privacy__section-header">
                  <span className="sec-privacy__section-num">17</span>
                  <h2 className="heading-style-h2 section-title sec-privacy__card-title">Your Privacy Matters</h2>
                </div>
                <div className="sec-privacy__body">
                  <p className="alg-text sec-privacy__p">
                    At <strong>Algofort</strong>, we believe that responsible technology includes responsible handling of information. We are committed to maintaining transparency, protecting user information, and continuously improving our privacy and security practices.
                  </p>
                  <p className="alg-text sec-privacy__p">
                    By using the Algofort website, you acknowledge that you have read and understood this Privacy Policy.
                  </p>
                </div>
              </section>

            </article>

          </div>

        </div>
      </div>
    </section>
  );
}
