'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const termsSections = [
  { id: 'acceptance-of-terms', number: '01', title: 'Acceptance of Terms' },
  { id: 'description-of-services', number: '02', title: 'Description of Services' },
  { id: 'user-responsibilities', number: '03', title: 'User Responsibilities and Acceptable Use' },
  { id: 'intellectual-property', number: '04', title: 'Intellectual Property Rights' },
  { id: 'payment-and-billing', number: '05', title: 'Payment and Billing' },
  { id: 'third-party-links-tools', number: '06', title: 'Third-Party Links and Tools' },
  { id: 'warranties-and-disclaimers', number: '07', title: 'Warranties and Disclaimers' },
  { id: 'limitation-of-liability', number: '08', title: 'Limitation of Liability' },
  { id: 'termination', number: '09', title: 'Termination' },
  { id: 'governing-law', number: '10', title: 'Governing Law and Jurisdiction' },
  { id: 'changes-to-terms', number: '11', title: 'Changes to These Terms' },
  { id: 'contact-us', number: '12', title: 'Contact Us' },
];

export function TermsOfServiceSection() {
  const sectionRef = useRef(null);
  const [activeSection, setActiveSection] = useState('acceptance-of-terms');

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate top span title
    const titleEl = sectionRef.current.querySelector('.sec-terms__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
    }

    // Animate section card h2 titles
    const cardTitleEls = sectionRef.current.querySelectorAll('.sec-terms__card-title');
    cardTitleEls.forEach((cardTitle) => {
      initTitleAnimation(cardTitle, {
        trigger: cardTitle.closest('.sec-terms__section-card') || cardTitle,
        start: 'top 88%',
        stagger: 0.02,
      });
    });

    // Scrollspy to highlight active TOC link
    const handleScroll = () => {
      const sectionElements = termsSections
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
    <section ref={sectionRef} id="sec-terms" className="site-section sec-terms">
      <div className="site-container sec-terms__container container-large padding-global">
        <div className="padding-section-large sec-terms__padding">
          
          {/* Section Header */}
          <div className="section-header sec-terms__header">
            <div className="section-badge sec-terms__badge">
              <SubtitleMarquee
                text="Legal & Compliance — "
                variant="dark"
                icon="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145874/algofort/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
              />
            </div>

            {/* Terms of Service rendered as span with identical styling & GSAP animation */}
            <span className="heading-style-h2 section-title sec-terms__title">
              Terms of <span className="text-color-secondary">Service</span>
            </span>

            <div className="sec-terms__meta-bar">
              <span className="sec-terms__meta-date">Last Updated: October 5, 2026</span>
              <span className="sec-terms__meta-pill">
                <span className="sec-terms__meta-dot"></span>
                Active & In Effect
              </span>
            </div>
          </div>

          {/* 2-Column Layout */}
          <div className="sec-terms__grid">
            
            {/* Left Sticky Sidebar Column */}
            <div className="sec-terms__sidebar-col">
              <aside className="sec-terms__sidebar">
                <div className="sec-terms__toc-card">
                  <div className="sec-terms__toc-header">
                    <div className="sec-terms__toc-title">Table of Contents</div>
                    <span className="sec-terms__toc-count">12 Sections</span>
                  </div>
                  <nav className="sec-terms__toc-nav" aria-label="Table of Contents">
                    {termsSections.map((sec) => (
                      <a
                        key={sec.id}
                        href={`#${sec.id}`}
                        onClick={(e) => handleSmoothJump(e, sec.id)}
                        className={`sec-terms__toc-link ${
                          activeSection === sec.id ? 'is-active' : ''
                        }`}
                      >
                        <span className="sec-terms__toc-num">{sec.number}</span>
                        <span className="sec-terms__toc-label">{sec.title}</span>
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Sidebar Quick Legal Contact Support */}
                <div className="sec-terms__sidebar-help">
                  <div className="sec-terms__help-title">Legal Counsel</div>
                  <p className="sec-terms__help-text">
                    Have questions about project agreements, SOWs, or these Terms of Service?
                  </p>
                  <a href="mailto:hello@algofort.com" className="sec-terms__help-link">
                    hello@algofort.com &rarr;
                  </a>
                </div>
              </aside>
            </div>

            {/* Right Main Editorial Content */}
            <article className="sec-terms__article">
              
              {/* Executive Summary Box */}
              <div className="sec-terms__lead-card">
                <p className="sec-terms__lead-p">
                  Welcome to <strong>Algofort</strong>. These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the Algofort website, products, and digital technology services, including web development, UI/UX design, mobile app development, custom software, and SEO solutions (collectively, the &ldquo;Services&rdquo;).
                </p>
                <p className="sec-terms__lead-p">
                  Please read these Terms carefully. By accessing our website or engaging our Services, you agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our website or Services.
                </p>
              </div>

              {/* 1. Acceptance of Terms */}
              <section id="acceptance-of-terms" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">01</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Acceptance of Terms</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    By accessing the Algofort website or entering into a project agreement with Algofort Studio, you confirm that you have the legal capacity to enter into a binding contract and agree to comply with these Terms, as well as our Privacy Policy.
                  </p>
                </div>
              </section>

              {/* 2. Description of Services */}
              <section id="description-of-services" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">02</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Description of Services</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    Algofort provides comprehensive technology and digital solutions. The specific scope, deliverables, timelines, and fees for any custom software development, mobile app development, or digital transformation project will be outlined in a separate, written Project Proposal or Statement of Work (SOW) agreed upon by both parties.
                  </p>
                </div>
              </section>

              {/* 3. User Responsibilities and Acceptable Use */}
              <section id="user-responsibilities" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">03</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">User Responsibilities and Acceptable Use</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    When using our website or Services, you agree to:
                  </p>
                  
                  <ul className="sec-terms__list">
                    <li className="sec-terms__list-item">Provide accurate, current, and complete information when requesting quotes or communicating with our team.</li>
                    <li className="sec-terms__list-item">Use our website and Services only for lawful purposes.</li>
                    <li className="sec-terms__list-item">Refrain from engaging in any activity that disrupts, damages, or compromises the security of our website, servers, or networks.</li>
                    <li className="sec-terms__list-item">Not attempt to gain unauthorized access to any portion of our website or internal systems.</li>
                  </ul>
                </div>
              </section>

              {/* 4. Intellectual Property Rights */}
              <section id="intellectual-property" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">04</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Intellectual Property Rights</h2>
                </div>
                <div className="sec-terms__body">
                  <div className="sec-terms__subblock">
                    <div className="sec-terms__subhead">4.1 Algofort&apos;s Intellectual Property</div>
                    <p className="alg-text sec-terms__p">
                      All content on the Algofort website—including text, graphics, logos, icons, images, and software—is the property of Algofort or its content suppliers and is protected by international copyright and intellectual property laws.
                    </p>
                  </div>

                  <div className="sec-terms__subblock">
                    <div className="sec-terms__subhead">4.2 Client Intellectual Property</div>
                    <p className="alg-text sec-terms__p">
                      Upon full payment for our custom development or design Services, Algofort grants or transfers to you the intellectual property rights for the final deliverables as specifically outlined in your Project Proposal or SOW. Algofort retains the right to use non-confidential project assets in our portfolio and marketing materials unless a Non-Disclosure Agreement (NDA) specifies otherwise.
                    </p>
                  </div>
                </div>
              </section>

              {/* 5. Payment and Billing */}
              <section id="payment-and-billing" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">05</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Payment and Billing</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    For our custom digital solutions, payment terms, milestones, and methods will be detailed in your individual Project Proposal or contract.
                  </p>

                  <ul className="sec-terms__list">
                    <li className="sec-terms__list-item">Invoices must be paid within the time frame specified on the invoice.</li>
                    <li className="sec-terms__list-item">Algofort reserves the right to suspend or halt Services if payments are delayed or outstanding.</li>
                    <li className="sec-terms__list-item">All fees are non-refundable unless expressly stated otherwise in your specific project agreement.</li>
                  </ul>
                </div>
              </section>

              {/* 6. Third-Party Links and Tools */}
              <section id="third-party-links-tools" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">06</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Third-Party Links and Tools</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    Our website or Services may integrate with or link to third-party tools, plugins, or websites. Algofort does not endorse, control, or assume responsibility for the content, privacy policies, or practices of any third-party websites or services. Your use of third-party tools is at your own risk.
                  </p>
                </div>
              </section>

              {/* 7. Warranties and Disclaimers */}
              <section id="warranties-and-disclaimers" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">07</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Warranties and Disclaimers</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    Algofort provides its website and Services on an &ldquo;as-is&rdquo; and &ldquo;as-available&rdquo; basis.
                  </p>
                  <p className="alg-text sec-terms__p">
                    While we strive for excellence and reliability in our technology solutions, we make no warranties, expressed or implied, regarding the continuous availability, error-free operation, or absolute security of our website or final deliverables, except as explicitly stated in a signed service agreement.
                  </p>
                </div>
              </section>

              {/* 8. Limitation of Liability */}
              <section id="limitation-of-liability" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">08</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Limitation of Liability</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    To the maximum extent permitted by applicable law, Algofort Studio, its directors, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                  </p>

                  <ul className="sec-terms__list">
                    <li className="sec-terms__list-item">Your access to or use of or inability to access or use the Services.</li>
                    <li className="sec-terms__list-item">Any unauthorized access, use, or alteration of your transmissions or content.</li>
                    <li className="sec-terms__list-item">Any bugs, viruses, or the like that may be transmitted to or through our Services by any third party.</li>
                  </ul>
                </div>
              </section>

              {/* 9. Termination */}
              <section id="termination" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">09</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Termination</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    We reserve the right to terminate or suspend your access to our website or Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Services will immediately cease.
                  </p>
                </div>
              </section>

              {/* 10. Governing Law and Jurisdiction */}
              <section id="governing-law" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">10</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Governing Law and Jurisdiction</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the state or federal courts located in Los Angeles, California.
                  </p>
                </div>
              </section>

              {/* 11. Changes to These Terms */}
              <section id="changes-to-terms" className="sec-terms__section-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">11</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Changes to These Terms</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    Algofort reserves the right to modify or replace these Terms at any time to reflect changes in our business practices, technology, or legal requirements. We will notify users of significant changes by updating the Last Updated date at the top of this page. Your continued use of the website or Services after any changes constitutes acceptance of the new Terms.
                  </p>
                </div>
              </section>

              {/* 12. Contact Us (Featured Contact Callout) */}
              <section id="contact-us" className="sec-terms__section-card sec-terms__contact-card">
                <div className="sec-terms__section-header">
                  <span className="sec-terms__section-num">12</span>
                  <h2 className="heading-style-h2 section-title sec-terms__card-title">Contact Us</h2>
                </div>
                <div className="sec-terms__body">
                  <p className="alg-text sec-terms__p">
                    If you have any questions, concerns, or legal inquiries regarding these Terms of Service, please contact us at:
                  </p>

                  <div className="sec-terms__contact-grid">
                    <div className="sec-terms__contact-box">
                      <div className="sec-terms__contact-box-label">Offline Studio</div>
                      <p className="sec-terms__contact-box-val">
                        Algofort Studio<br />
                        84j Ghazali Rd, Block 2 PECHS<br />
                        Karachi, Pakistan
                      </p>
                    </div>

                    <div className="sec-terms__contact-box">
                      <div className="sec-terms__contact-box-label">Direct Communication</div>
                      <p className="sec-terms__contact-box-val">
                        Email:{' '}
                        <a href="mailto:hello@algofort.com">hello@algofort.com</a>
                        <br />
                        Phone:{' '}
                        <a data-site-phone href="tel:+923337198686">+92 333 7198686</a>
                      </p>
                    </div>
                  </div>

                  <div className="sec-terms__contact-actions">
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

              {/* Closing Acknowledgement Box */}
              <div className="sec-terms__closing-card">
                <p className="alg-text sec-terms__p" style={{ margin: 0, fontWeight: 500, color: '#05080c' }}>
                  By continuing to use our website and services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                </p>
              </div>

            </article>

          </div>

        </div>
      </div>
    </section>
  );
}
