'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ViewportVideo } from '../../common/ViewportVideo';
import { cardVideoSources } from '../../../utils/videoAssets';

import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

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

export function AboutWhyUsSection() {
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
          try {
            ScrollTrigger.refresh();
          } catch {
            // ignore
          }
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
                  text="Why Choose Us — "
                  variant="dark"
                  icon="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145874/algofort/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
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
                  src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145872/algofort/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
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
                  <ViewportVideo
                    sources={cardVideoSources}
                    data-object-fit="cover"
                    poster="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145856/algofort/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001"
                    style={{
                      backgroundImage:
                        'url("https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145856/algofort/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001")',
                    }}
                  />
                </div>
                <div className="alg-hero-video-overlay video-overlay"></div>
              </div>

              <div className="w-layout-grid why-us-grid">
                {/* Top content: Logo Centered */}
                <div className="why-us-top-bar">
                  <img
                    src="https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:best/v1792145914/algofort/assets/logo-white-01.png"
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
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145870/algofort/assets/68ee90f82cb86f84f6e79af4_Frame_202"
                            alt="Why Us Front"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-right">
                          <img
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145870/algofort/assets/68ee90f8393fe398b8270db3_Frame_204"
                            alt="Why Us Right"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-back">
                          <img
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145864/algofort/assets/68ee90f80b05eb5159a3717d_Frame_2012"
                            alt="Why Us Back"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-left">
                          <img
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145872/algofort/assets/68ee90f8ce3669d6703033cf_Frame_2014"
                            alt="Why Us Left"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-top">
                          <img
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145870/algofort/assets/68ee90f83da8227728cad6fd_Frame_2015"
                            alt="Why Us Top"
                            loading="lazy"
                          />
                        </div>
                        <div className="_3d-cube-face _3d-cube-bottom">
                          <img
                            src="https://res.cloudinary.com/vfsp1egd/image/upload/w_800,c_limit,q_auto:good,f_auto/v1792145870/algofort/assets/68ee90f82cb86f84f6e79af4_Frame_202"
                            alt="Why Us Bottom"
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
              
              {/* Stat Card 1: +99 Successful Projects Completed */}
              <div className="card-block content-card sec-why-us__card">
                <div className="w-layout-grid stats-grid">
                  <div className="stats-top-row">
                    <WhyUsOdometerNumber value="99" suffix="+" />
                    <div className="stat-subtitle">
                      Successful Projects<br />Completed
                    </div>
                  </div>

                  <div className="card-line"></div>

                  <div className="stats-bottom-row">
                    <p className="stats-description alg-text">
                      For over a decade, we’ve been shaping digital experiences and building strong brands. Our years of knowledge ensure every project is backed by skill, strategy, and creativity.
                    </p>
                    <img
                      loading="lazy"
                      src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145875/algofort/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
                      alt="Asterisk Icon"
                      className="stat-icon"
                    />
                  </div>
                </div>
              </div>

              {/* Stat Card 2: 99% Customer Satisfaction Rate */}
              <div className="card-block content-card sec-why-us__card">
                <div className="w-layout-grid stats-grid">
                  <div className="stats-top-row">
                    <WhyUsOdometerNumber value="99" suffix="%" />
                    <div className="stat-subtitle">
                      Customer<br />Satisfaction Rate
                    </div>
                  </div>

                  <div className="card-line"></div>

                  <div className="stats-bottom-row">
                    <p className="stats-description alg-text">
                      We measure success by the impact we create. With a near-perfect satisfaction rate, our clients trust us to deliver solutions that exceed expectations every time.
                    </p>
                    <img
                      loading="lazy"
                      src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145875/algofort/assets/68f7cadfd454c94c5b5251cb_grey-asterisk-icon.svg"
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
