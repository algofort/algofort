'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

const servicesData = [
  {
    id: '01',
    num: '(01)',
    title: 'Web Development',
    image: '/assets/68ee90f83da8227728cad6fd_Frame_2015.jpg',
    text: 'High-performance websites and scalable web applications crafted with modern architectures, clean code, and responsive design.',
  },
  {
    id: '02',
    num: '(02)',
    title: 'UI/UX Development',
    image: '/assets/68ee90f83da8227728cad6fd_Frame_2015.jpg',
    text: 'Human-centered digital interfaces and interactive design systems creating seamless user journeys and captivating visual experiences.',
  },
  {
    id: '03',
    num: '(03)',
    title: 'Mobile App',
    image: '/assets/68ee90f8393fe398b8270db3_Frame_204.jpg',
    text: 'Intuitive iOS and Android mobile experiences engineered for speed, engagement, and high-performance native capability.',
  },
  {
    id: '04',
    num: '(04)',
    title: 'Custom Software',
    image: '/assets/68ee90f80b05eb5159a3717d_Frame_2012.jpg',
    text: 'Robust enterprise software solutions engineered for tailored business logic, seamless automation, and scalable operations.',
  },
  {
    id: '05',
    num: '(05)',
    title: 'SEO',
    image: '/assets/68ee90f82cb86f84f6e79af4_Frame_202.jpg',
    text: 'Data-driven search engine optimization and strategic visibility growth to boost organic rankings and convert traffic into customers.',
  },
];

// Helper function to split text into words and chars
function splitTextIntoSpans(el) {
  if (!el || el.dataset.splitDone) return el.querySelectorAll('.char');

  const text = el.textContent;
  el.textContent = '';
  const words = text.split(' ');

  words.forEach((word, wIdx) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'word';
    wordSpan.style.display = 'inline-block';

    const chars = word.split('');
    chars.forEach((char) => {
      const charSpan = document.createElement('span');
      charSpan.className = 'char';
      charSpan.style.display = 'inline-block';
      charSpan.textContent = char;
      wordSpan.appendChild(charSpan);
    });

    el.appendChild(wordSpan);
    if (wIdx < words.length - 1) {
      el.appendChild(document.createTextNode(' '));
    }
  });

  el.dataset.splitDone = 'true';
  return el.querySelectorAll('.char');
}

export function ServicesSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // 1. Initial Char Slide-Up Title Animation
    const mainTitle = containerRef.current.querySelector('.alg-services-title, .sec-services__title');
    if (mainTitle) {
      initTitleAnimation(mainTitle, { start: 'top 85%', stagger: 0.02 });
    }

    // 2. Interactive Service Hover Animation (Text Flip + Smooth Image Pop)
    const serviceGrids = containerRef.current.querySelectorAll('.alg-services-card, .service-content-grid');

    serviceGrids.forEach((grid) => {
      const imageWrap = grid.querySelector('.alg-services-card-image-wrap, .service-image-wrap');
      const titles = grid.querySelectorAll('.alg-services-card-title, .service-title');
      const numberText = grid.querySelector('.alg-services-card-number, .service-text.is-number');

      // Split each duplicate h2 into chars for stagger flip effect
      titles.forEach((title) => {
        splitTextIntoSpans(title);
      });

      let mouseMoveHandler = null;

      const onMouseEnter = () => {
        // Only run on desktop/tablet where hover makes sense
        if (window.innerWidth <= 767) return;

        // Flip Title Text Animation
        titles.forEach((title, tIdx) => {
          const chars = title.querySelectorAll('.char');
          if (tIdx === 0) {
            // First title (top) slides UP and out
            gsap.to(chars, {
              yPercent: -100,
              duration: 0.4,
              ease: 'power3.out',
              stagger: 0.015,
              overwrite: 'auto',
            });
          } else {
            // Second title (bottom) slides UP and into view
            gsap.to(chars, {
              yPercent: -100,
              duration: 0.4,
              ease: 'power3.out',
              stagger: 0.015,
              overwrite: 'auto',
            });
          }
        });

        if (numberText) {
          gsap.to(numberText, { color: '#ffffff', duration: 0.3, overwrite: 'auto' });
        }

        if (imageWrap) {
          gsap.to(imageWrap, {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.5)',
            overwrite: 'auto',
          });

          // Floating cursor follow image
          mouseMoveHandler = (evt) => {
            const rect = grid.getBoundingClientRect();
            const relX = evt.clientX - rect.left;
            const relY = evt.clientY - rect.top;

            gsap.to(imageWrap, {
              x: relX - 120,
              y: relY - 140,
              duration: 0.25,
              ease: 'power1.out',
              overwrite: 'auto',
            });
          };

          grid.addEventListener('mousemove', mouseMoveHandler);
        }
      };

      const onMouseLeave = () => {
        if (window.innerWidth <= 767) return;

        // Restore Title Chars to Default Position
        titles.forEach((title, tIdx) => {
          const chars = title.querySelectorAll('.char');
          if (tIdx === 0) {
            gsap.to(chars, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power2.out',
              stagger: 0.01,
              overwrite: 'auto',
            });
          } else {
            gsap.to(chars, {
              yPercent: 0,
              duration: 0.35,
              ease: 'power2.out',
              stagger: 0.01,
              overwrite: 'auto',
            });
          }
        });

        if (numberText) {
          gsap.to(numberText, { color: '', duration: 0.3, overwrite: 'auto' });
        }

        if (imageWrap) {
          if (mouseMoveHandler) {
            grid.removeEventListener('mousemove', mouseMoveHandler);
            mouseMoveHandler = null;
          }

          gsap.to(imageWrap, {
            scale: 0,
            opacity: 0,
            duration: 0.25,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        }
      };

      grid.addEventListener('mouseenter', onMouseEnter);
      grid.addEventListener('mouseleave', onMouseLeave);
    });

    // 3. All Services Button Hover Animation
    const buttons = containerRef.current.querySelectorAll('.alg-services-button, .main-button');
    buttons.forEach((btn) => {
      const icon = btn.querySelector('.button-icon');
      const texts = btn.querySelectorAll('.button-text');

      const onMouseEnter = () => {
        if (texts.length > 0) {
          gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
        }
        if (icon) {
          gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
        }
      };

      const onMouseLeave = () => {
        if (texts.length > 0) {
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
    <section ref={containerRef} id="sec-services" className="alg-services site-section sec-services section-home-service">
      <div className="alg-services-container site-container sec-services__container padding-global">
        <div className="container-large">
          <div className="padding-section-large">
            {/* Top Header Grid */}
            <div className="alg-services-header section-header sec-services__header w-layout-grid top-grid">
              <div className="max-width-large">
                <div className="alg-services-badge section-badge sec-services__badge">
                  <SubtitleMarquee text="Our Services ✦ " />
                </div>

                <h2 className="alg-services-title heading-style-h2 section-title sec-services__title text-color-alternate">
                  Creative <span className="alg-services-title-secondary text-color-secondary">Solutions</span>
                </h2>
              </div>

              <div className="alg-services-button-item button-item">
                <Link href="/services" className="alg-services-button main-button alternate-button w-inline-block">
                  <div className="main-button-block">
                    <div className="button-text alternate-text">All Services</div>
                    <div className="button-text alternate-text">All Services</div>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                    alt="Template Icon - Unusually Webflow Template"
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>

            <div className="spacer-xlarge"></div>
            <div className="dark-line"></div>

            {/* Service Items Component */}
            <div className="alg-services-component service-component">
              {servicesData.map((service) => (
                <div key={service.id} className="alg-services-card service-content-grid w-layout-grid">
                  <div className="alg-services-card-item service-content-item">
                    <div className="alg-services-card-number service-text is-number">{service.num}</div>
                  </div>

                  <div className="alg-services-card-item service-content-item">
                    <div className="alg-services-card-title-wrap service-title-wrap">
                      <h2 className="alg-services-card-title service-title is-top">{service.title}</h2>
                      <h2 className="alg-services-card-title service-title is-bottom">{service.title}</h2>
                    </div>

                    <div className="alg-services-card-image-wrap service-image-wrap">
                      <img
                        src={service.image}
                        loading="lazy"
                        alt={`Image - ${service.title}`}
                        className="alg-services-card-image service-image"
                      />
                    </div>
                  </div>

                  <div className="alg-services-card-item service-content-item">
                    <div className="alg-services-card-content service-content">
                      <p className="alg-services-card-text service-text alg-text">{service.text}</p>
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
}