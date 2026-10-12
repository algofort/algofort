'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { SubtitleMarquee } from '../../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Generates strip of digits [0..9, 0..9, ..., 0..targetDigit] for slot machine / odometer roll
function generateDigitStrip(targetDigit, cycles = 3) {
  const target = parseInt(targetDigit, 10);
  const items = [];

  for (let c = 0; c < cycles; c++) {
    for (let d = 0; d <= 9; d++) {
      items.push(d);
    }
  }

  for (let d = 0; d <= target; d++) {
    items.push(d);
  }

  const targetIndex = items.length - 1;
  const targetPercent = (targetIndex / items.length) * 100;

  return {
    items,
    targetPercent,
  };
}

function OdometerDigit({ digit, cycles = 3 }) {
  const { items, targetPercent } = useMemo(
    () => generateDigitStrip(digit, cycles),
    [digit, cycles]
  );

  return (
    <span className="odometer-digit-col why-us-odometer-col" aria-hidden="true">
      <span className="odometer-digit-track" data-target-percent={targetPercent}>
        {items.map((val, idx) => (
          <span key={idx} className="odometer-digit-val why-us-digit-val">
            {val}
          </span>
        ))}
      </span>
    </span>
  );
}

function WhyUsOdometerNumber({ value, prefix, suffix }) {
  const digits = String(value).split('');

  return (
    <h2 className="stats-number-wrap heading-style-h2" aria-label={`${prefix || ''}${value}${suffix || ''}`}>
      {prefix && <span className="stats-prefix-suffix alternate">{prefix}</span>}
      <div className="stats-digits-container">
        {digits.map((digit, idx) => (
          <OdometerDigit key={idx} digit={digit} cycles={3} />
        ))}
      </div>
      {suffix && <span className="stats-prefix-suffix alternate">{suffix}</span>}
    </h2>
  );
}

export function SaasServiceWhyUsSection() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const cubeRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-why-us__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
      setTimeout(() => {
        if (typeof window !== 'undefined') {
          ScrollTrigger.refresh();
        }
      }, 150);
    }
  }, []);

  useGSAP(
    () => {
      // 1. Simultaneous Rolling Number Odometer for Stat Cards
      if (cardsRef.current) {
        const tracks = cardsRef.current.querySelectorAll('.odometer-digit-track');
        if (tracks.length > 0) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          });

          tracks.forEach((track) => {
            const targetPercent = parseFloat(track.dataset.targetPercent) || 0;
            tl.fromTo(
              track,
              { yPercent: 0 },
              {
                yPercent: -targetPercent,
                duration: 2.2,
                ease: 'power3.out',
              },
              0
            );
          });
        }
      }

      // 2. Interactive tilt and subtle scrub on the 3D Cube
      if (cubeRef.current) {
        gsap.to(cubeRef.current, {
          rotateY: '+=120',
          rotateX: '+=45',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section 
      ref={sectionRef} 
      id="sec-why-us" 
      className="site-section sec-why-us section-home-why-us"
    >
      <div className="site-container sec-why-us__container container-large">
        <div className="padding-section-large sec-why-us__padding">
          
          {/* Header Row: Subtitle + Heading on Left, CTA Button on Right */}
          <div className="w-layout-grid top-grid section-header sec-why-us__header">
            <div className="max-width-xlarge">
              <div className="section-badge sec-why-us__badge">
                <SubtitleMarquee
                  text="Why choose us — "
                  variant="dark"
                  icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-why-us__title">
                <span className="text-color-primary">Choose </span>
                <span className="text-color-secondary">Excellence</span>
              </h2>
            </div>

            <div className="button-item sec-why-us__cta">
              <Link href="/contact" className="main-button sec-why-us__btn w-inline-block">
                <div className="main-button-block">
                  <div className="button-text">Get in touch</div>
                  <div className="button-text">Get in touch</div>
                </div>
                <img
                  loading="lazy"
                  src="/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
                  alt="Star Icon"
                  className="button-icon"
                />
              </Link>
            </div>
          </div>

          <div className="spacer-xlarge"></div>

          {/* Why Us Component Grid: Left 3D Video Cube Wrap + Right 2 Stat Cards */}
          <div className="w-layout-grid why-us-component-grid sec-why-us__grid">
            
            {/* Left Card: Background Video + 3D Cube (Spans 2 rows) */}
            <div className="why-us-wrap sec-why-us__cube-card">
              <div className="alg-hero-video-wrap background-video-wrap why-us-video-wrap">
                <div className="alg-hero-video background-video w-background-video w-background-video-atom">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    data-object-fit="cover"
                    style={{
                      backgroundImage:
                        'url("/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001.jpg")',
                    }}
                  >
                    <source
                      src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.mp4"
                      type="video/mp4"
                    />
                    <source
                      src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.webm"
                      type="video/webm"
                    />
                  </video>
                </div>
                <div className="alg-hero-video-overlay video-overlay"></div>
              </div>

              <div className="w-layout-grid why-us-grid">
                {/* Top content: Logo Centered */}
                <div className="why-us-top-bar">
                  <img
                    src="/assets/logo-white-01.png"
                    alt="Algofort Logo"
                    className="why-us-logo"
                  />
                </div>

                {/* 3D Rotating Cube */}
                <div className="_3d-component">
                  <div className="_3d-cube-container">
                    <div className="_3d-cube-wrapper">
                      <div ref={cubeRef} className="_3d-cube-box">
                        <div className="_3d-cube-face _3d-cube-front">
                          <img
                            src="/assets/services/saas-app/saas-cube-1.jpg"
                            alt="SaaS App Front"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-right">
                          <img
                            src="/assets/services/saas-app/saas-cube-2.jpg"
                            alt="SaaS App Right"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-back">
                          <img
                            src="/assets/services/saas-app/saas-cube-3.jpg"
                            alt="SaaS App Back"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-left">
                          <img
                            src="/assets/services/saas-app/saas-cube-4.jpg"
                            alt="SaaS App Left"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-top">
                          <img
                            src="/assets/services/saas-app/saas-cube-5.jpg"
                            alt="SaaS App Top"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-bottom">
                          <img
                            src="/assets/services/saas-app/saas-cube-6.jpg"
                            alt="SaaS App Bottom"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom content: Year Badge Centered */}
                <div className="why-us-bottom-bar">
                  <div className="why-us-year-badge">(2010-26©)</div>
                </div>
              </div>
            </div>

            {/* Right Cards Stack: 2 Stats Cards with Odometer Roll Numbers */}
            <div ref={cardsRef} className="why-us-cards-stack">
              
              {/* Stat Card 1: 50+ SaaS Platforms Delivered */}
              <div className="card-block content-card sec-why-us__card">
                <div className="w-layout-grid stats-grid">
                  <div className="stats-top-row">
                    <WhyUsOdometerNumber value="50" suffix="+" />
                    <div className="stat-subtitle">
                      SaaS Platforms<br />Delivered
                    </div>
                  </div>

                  <div className="card-line"></div>

                  <div className="stats-bottom-row">
                    <p className="stats-description alg-text">
                      From early-stage MVPs to enterprise-ready cloud platforms, we build SaaS applications engineered for high concurrency. Our technical architecture prioritizes data privacy, low-latency API responses, and effortless tenant scalability.
                    </p>
                    <img
                      loading="lazy"
                      src="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                      alt="Asterisk Icon"
                      className="stat-icon"
                    />
                  </div>
                </div>
              </div>

              {/* Stat Card 2: 99% Platform Uptime */}
              <div className="card-block content-card sec-why-us__card">
                <div className="w-layout-grid stats-grid">
                  <div className="stats-top-row">
                    <WhyUsOdometerNumber value="99" suffix="%" />
                    <div className="stat-subtitle">
                      Platform Uptime<br />Standard
                    </div>
                  </div>

                  <div className="card-line"></div>

                  <div className="stats-bottom-row">
                    <p className="stats-description alg-text">
                      We implement modern container orchestration and fault-tolerant cloud services to keep your platform dependable. Rigorous security practices, automated backups, and detailed logging ensure your customers' data is always protected.
                    </p>
                    <img
                      loading="lazy"
                      src="/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                      alt="Asterisk Icon"
                      className="stat-icon"
                    />
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
