'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';
import '../../styles/pricing-section.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const pricingPlans = [
  {
    number: '01',
    category: 'Website Solutions',
    name: 'Web Development',
    price: '$2,500',
    numericPrice: 2500,
    period: '/project',
    ctaLink: '/contact?plan=web-development',
    features: [
      'Custom website design',
      'Responsive development',
      'WordPress / Shopify setup',
      'SEO-friendly structure',
      'Speed optimization',
      'Testing & deployment',
    ],
  },
  {
    number: '02',
    category: 'Creative Solutions',
    name: 'Brand Identity',
    price: '$1,500',
    numericPrice: 1500,
    period: '/project',
    ctaLink: '/contact?plan=brand-identity',
    features: [
      'Custom logo design',
      'Brand color palette',
      'Typography selection',
      'Brand guidelines',
      'Social media assets',
      'Complete brand kit',
    ],
  },
  {
    number: '03',
    category: 'Digital Products',
    name: 'SaaS App Development',
    price: '$5,000',
    numericPrice: 5000,
    period: '/project',
    ctaLink: '/contact?plan=saas-app-development',
    features: [
      'Custom SaaS development',
      'User authentication',
      'Admin dashboard',
      'API integrations',
      'Database architecture',
      'Testing & deployment',
    ],
  },
  {
    number: '04',
    category: 'Mobile Solutions',
    name: 'Mobile App Development',
    price: '$4,000',
    numericPrice: 4000,
    period: '/project',
    ctaLink: '/contact?plan=mobile-app-development',
    features: [
      'Custom UI/UX design',
      'Android & iOS development',
      'Backend integration',
      'API connectivity',
      'Performance optimization',
      'App testing & launch',
    ],
  },
];

export function PricingSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      const titleEl = sectionRef.current.querySelector('.pricing-title');
      if (titleEl) {
        initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
      }

      // Entrance animation for complete package cards (.our-packages-box) and price counter
      const grid = sectionRef.current.querySelector('.our-packages-wrapper');
      const cards = sectionRef.current.querySelectorAll('.our-packages-box');
      const counters = sectionRef.current.querySelectorAll('.pricing-counter');

      if (cards && cards.length > 0 && grid) {
        // Entrance animation on complete boxes (.our-packages-box)
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.12,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: grid,
              start: 'top 85%',
            },
          }
        );

        // Price counter count-up animation
        counters.forEach((el, index) => {
          const target = parseFloat(el.getAttribute('data-price')) || 0;
          const counterObj = { val: 0 };
          gsap.fromTo(
            counterObj,
            { val: 0 },
            {
              val: target,
              duration: 1.5,
              delay: index * 0.12,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: grid,
                start: 'top 85%',
              },
              onStart: () => {
                el.textContent = '$0';
              },
              onUpdate: () => {
                el.textContent = '$' + Math.round(counterObj.val).toLocaleString('en-US');
              },
              onComplete: () => {
                el.textContent = '$' + target.toLocaleString('en-US');
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="pricing-section">
      <div className="w-layout-blockcontainer container w-container">
        <div className="pricing-wrapper">
          <div className="pricing-wrap">

            {/* Header Block: Left-Aligned Algofort Standard */}
            <div className="section-header sec-pricing__header">
              <div className="section-badge sec-pricing__badge" style={{ marginBottom: 0 }}>
                <SubtitleMarquee
                  text="Pricing Plans ✦ "
                  variant="dark"
                  icon="/assets/pricing/asterisk-icon.svg"
                />
              </div>

              <h2
                className="heading-style-h2 section-title sec-pricing__title pricing-title"
                style={{ color: '#05080C', textAlign: 'left', marginBottom: 0 }}
              >
                Find The <br />
                <span className="text-color-secondary">Right Plan</span>
              </h2>
            </div>

            {/* 4 Packages Grid */}
            <div fade-up="true" className="our-packages-wrapper">
              {pricingPlans.map((plan) => (
                <div key={plan.number} className="our-packages-box">
                  {/* Top Card Box: Category & Price */}
                  <div className="our-packages-text-wrapper">
                    <div className="our-packages-text-namber-wrap">
                      <div
                        data-wf--text-title-box--variant="style-two"
                        className="text-title-box w-variant-140bda40-e9e6-59e8-874a-a23dcd055b01"
                      >
                        <div className="text-mediums">{plan.category}</div>
                      </div>
                      <h3 className="h4 gaya">{plan.number}</h3>
                    </div>
                    <div className="plans-pricing-wrapper">
                      <h4 className="h4 pricing-counter" data-price={plan.numericPrice}>{plan.price}</h4>
                      <div className="text-default opactiy-70">{plan.period}</div>
                    </div>
                  </div>

                  {/* Bottom Card Box: Included Features & Algofort Master Button */}
                  <div className="plans-pricing-item-wrapper">
                    <div>
                      <div className="plans-pricing-item-name-wrap">
                        <div className="text-medium blold-meddle">What's included</div>
                      </div>
                      <div className="plans-pricing-item-wrap" style={{ marginTop: '16px' }}>
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="plans-pricing-item-box">
                            <div className="plans-pricing-item-icon-wrap">
                              <img
                                src="/assets/pricing/plus-icon.svg"
                                loading="lazy"
                                alt="Included"
                                className="icon-image-wrap"
                                width="8"
                                height="8"
                              />
                            </div>
                            <div className="plans-pricing-item-text-wrap">
                              <div className="text-default opactiy-70">{feature}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="plans-pricing-item-button-wrap">
                      <Link
                        href={plan.ctaLink}
                        className="main-button footer-submit-btn w-inline-block"
                      >
                        <div className="main-button-block">
                          <div className="button-text">Start a Project</div>
                          <div className="button-text">Start a Project</div>
                        </div>
                        <img
                          loading="lazy"
                          src="/assets/pricing/white-star-icon.svg"
                          alt="Star Icon"
                          className="button-icon"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pricing Transparency Note */}
            <div className="pricing-note-wrap">
              <p className="pricing-note-text">
                <strong>Pricing Note:</strong> Prices are suggested starting prices, not fixed quotes. Final pricing may vary depending on project scope, required features, complexity, and timeline. SaaS and Mobile App Development projects can also be offered with custom pricing.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
