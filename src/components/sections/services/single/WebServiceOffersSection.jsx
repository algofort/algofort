'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../../utils/titleAnimation';

const offersData = [
  {
    id: '01',
    num: '(01)',
    title: 'WordPress',
    image: '/assets/services/web-development/web-wordpress.jpg',
    text: 'Custom WordPress websites built with scalable themes, clean block architecture, fast load times, and intuitive editorial management workflows.',
  },
  {
    id: '02',
    num: '(02)',
    title: 'Shopify',
    image: '/assets/services/web-development/web-shopify.jpg',
    text: 'High-converting Shopify storefronts engineered with bespoke design systems, conversion-driven checkout flows, and seamless third-party app integrations.',
  },
  {
    id: '03',
    num: '(03)',
    title: 'React.js',
    image: '/assets/services/web-development/web-react.jpg',
    text: 'High-performance interactive web applications developed with modern React architecture, fluid state transitions, and responsive component libraries.',
  },
  {
    id: '04',
    num: '(04)',
    title: 'Custom Website',
    image: '/assets/services/web-development/web-1.jpg',
    text: 'Tailored digital experiences handcrafted from the ground up with semantic code, bespoke micro-interactions, SEO foundations, and robust scalability.',
  },
  {
    id: '05',
    num: '(05)',
    title: 'WooCommerce',
    image: '/assets/services/web-development/web-woocommerce.jpg',
    text: 'Flexible e-commerce solutions integrated into WordPress, featuring frictionless checkout funnels, custom product catalogs, and secure global payment gateways.',
  },
];

// Helper function to split text into words and chars
function splitTextIntoSpans(el) {
  if (!el || el.dataset.splitDone) return el.querySelectorAll('.char');

  const text = el.textContent.trim();
  el.innerHTML = '';
  const charArray = [];

  const words = text.split(/\s+/);
  words.forEach((wordStr, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';

    wordStr.split('').forEach((cStr) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.style.display = 'inline-block';
      charSpan.style.willChange = 'transform';
      charSpan.textContent = cStr;
      wordSpan.appendChild(charSpan);
      charArray.push(charSpan);
    });

    el.appendChild(wordSpan);
    if (wIdx < words.length - 1) {
      const space = document.createTextNode(' ');
      el.appendChild(space);
    }
  });

  el.dataset.splitDone = 'true';
  return charArray;
}

export const WebServiceOffersSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    const mainTitle = containerRef.current.querySelector('.sec-services__title');
    if (mainTitle) {
      initTitleAnimation(mainTitle, { start: 'top 85%', stagger: 0.02 });
    }

    // 2. Service Cards Interactions with Letter-by-Letter Stagger & 3D Mouse Follow
    const serviceGrids = containerRef.current.querySelectorAll('.service-content-grid');
    serviceGrids.forEach((grid) => {
      const imageWrap = grid.querySelector('.service-image-wrap');
      const titles = grid.querySelectorAll('.service-title');
      const numberText = grid.querySelector('.service-text.is-number');

      // Split titles into words and chars
      const allChars = [];
      titles.forEach((titleEl) => {
        const chars = splitTextIntoSpans(titleEl);
        allChars.push(chars);
      });

      if (imageWrap) {
        gsap.set(imageWrap, {
          opacity: 0,
          scale: 0.5,
          pointerEvents: 'none',
        });
      }

      let xTo = imageWrap ? gsap.quickTo(imageWrap, 'x', { duration: 0.35, ease: 'power2.out' }) : null;
      let yTo = imageWrap ? gsap.quickTo(imageWrap, 'y', { duration: 0.35, ease: 'power2.out' }) : null;
      let rotateYTo = imageWrap ? gsap.quickTo(imageWrap, 'rotationY', { duration: 0.35, ease: 'power2.out' }) : null;
      let rotateZTo = imageWrap ? gsap.quickTo(imageWrap, 'rotation', { duration: 0.35, ease: 'power2.out' }) : null;

      const onMouseEnter = () => {
        allChars.forEach((chars) => {
          if (chars.length) {
            gsap.to(chars, {
              yPercent: -100,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.02,
              overwrite: 'auto',
            });
          }
        });

        if (numberText) {
          gsap.to(numberText, { color: '#ffffff', duration: 0.3, overwrite: 'auto' });
        }

        if (imageWrap) {
          gsap.to(imageWrap, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: 'back.out(1.4)',
            overwrite: 'auto',
          });
        }
      };

      const onMouseMove = (e) => {
        if (!imageWrap) return;
        const rect = grid.getBoundingClientRect();
        const relativeX = e.clientX - rect.left - rect.width / 2;
        const relativeY = e.clientY - rect.top - rect.height / 2;

        const moveX = relativeX * 0.35;
        const moveY = relativeY * 0.35;
        const rotY = (relativeX / rect.width) * 20;
        const rotZ = (relativeX / rect.width) * -8;

        if (xTo) xTo(moveX);
        if (yTo) yTo(moveY);
        if (rotateYTo) rotateYTo(rotY);
        if (rotateZTo) rotateZTo(rotZ);
      };

      const onMouseLeave = () => {
        allChars.forEach((chars) => {
          if (chars.length) {
            gsap.to(chars, {
              yPercent: 0,
              duration: 0.4,
              ease: 'power2.out',
              stagger: 0.02,
              overwrite: 'auto',
            });
          }
        });

        if (numberText) {
          gsap.to(numberText, { color: '', duration: 0.3, overwrite: 'auto' });
        }

        if (imageWrap) {
          gsap.to(imageWrap, {
            opacity: 0,
            scale: 0.5,
            duration: 0.3,
            ease: 'power2.inOut',
            overwrite: 'auto',
            onComplete: () => {
              if (xTo) xTo(0);
              if (yTo) yTo(0);
              if (rotateYTo) rotateYTo(0);
              if (rotateZTo) rotateZTo(0);
            },
          });
        }
      };

      grid.addEventListener('mouseenter', onMouseEnter);
      grid.addEventListener('mousemove', onMouseMove);
      grid.addEventListener('mouseleave', onMouseLeave);
    });

    // 3. Main Button Hover Slide
    const buttons = containerRef.current.querySelectorAll('.main-button');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('.button-icon');
      const texts = btn.querySelectorAll('.button-text');

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

  return (
    <section ref={containerRef} id="sec-services" className="site-section sec-services section-home-service">
      <div className="site-container sec-services__container padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Top Header Grid */}
            <div className="section-header sec-services__header w-layout-grid top-grid">
              <div className="max-width-large">
                <div className="section-badge sec-services__badge">
                  <SubtitleMarquee text="What We Offer — " />
                </div>

                <h2 className="heading-style-h2 section-title sec-services__title text-color-alternate">
                  Solutions for <span className="text-color-secondary">Your Business</span>
                </h2>
              </div>

              <div className="button-item">
                <Link href="/contact" className="main-button alternate-button w-inline-block">
                  <div className="main-button-block">
                    <div className="button-text alternate-text">Start A Project</div>
                    <div className="button-text alternate-text">Start A Project</div>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                    alt="Star Icon"
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>

            <div className="spacer-xlarge"></div>
            <div className="dark-line"></div>

            {/* Service Items Component */}
            <div className="service-component">
              {offersData.map((service) => (
                <div key={service.id} className="w-layout-grid service-content-grid">
                  <div className="service-content-item">
                    <div className="service-text is-number">{service.num}</div>
                  </div>

                  <div className="service-content-item">
                    <div className="service-title-wrap">
                      <h2 className="service-title is-top">{service.title}</h2>
                      <h2 className="service-title is-bottom">{service.title}</h2>
                    </div>

                    <div className="service-image-wrap">
                      <img
                        src={service.image}
                        loading="lazy"
                        alt={`Image - ${service.title}`}
                        className="service-image"
                      />
                    </div>
                  </div>

                  <div className="service-content-item">
                    <div className="service-content">
                      <p className="service-text alg-text">{service.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
