'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const trailImages = [
  '/assets/68ee90f82cb86f84f6e79af4_Frame_202.jpg',
  '/assets/68ee90f83da8227728cad6fd_Frame_2015.jpg',
  '/assets/68ee90f8ce3669d6703033cf_Frame_2014.jpg',
  '/assets/68ee90f80b05eb5159a3717d_Frame_2012.jpg',
  '/assets/68ee90f8393fe398b8270db3_Frame_204.jpg',
];

const marqueeItems = [
  'Web Development',
  'Brand Identity',
  'Saas App development',
  'Mobile App',
];

function splitTextIntoSpans(el) {
  if (!el || el.dataset.splitDone) return Array.from(el.querySelectorAll('.char'));

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
      charSpan.style.willChange = 'transform, opacity';
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

export const BannerSection = () => {
  const containerRef = useRef(null);
  const activeImageIndexRef = useRef(0);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = containerRef.current;
    if (!container) return;

    // Master Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Target elements
    const videoWrap = container.querySelector('.sec-banner__video-wrap');
    const headerEl = document.querySelector('.site-header');
    const logoEl = headerEl?.querySelector('.logo-wrapper');
    const navLinks = headerEl?.querySelectorAll('.nav-link');
    const menuBtn = headerEl?.querySelector('.menu-button');
    const titleEl = container.querySelector('.sec-banner__title');
    const symbolEl = container.querySelector('.sec-banner__symbol');
    const descEl = container.querySelector('.sec-banner__desc');
    const social1 = container.querySelector('.social-link-1');
    const social2 = container.querySelector('.social-link-2');
    const marqueeComp = container.querySelector('.service-marquee-component');
    const social3 = container.querySelector('.social-link-3');
    const social4 = container.querySelector('.social-link-4');

    // Initial hidden states
    if (videoWrap) gsap.set(videoWrap, { opacity: 0, scale: 1.04 });
    if (headerEl) gsap.set(headerEl, { opacity: 1 });
    if (logoEl) gsap.set(logoEl, { opacity: 0, y: -15 });
    if (navLinks?.length) gsap.set(navLinks, { opacity: 0, y: -10 });
    if (menuBtn) gsap.set(menuBtn, { opacity: 0, scale: 0.85 });
    if (symbolEl) gsap.set(symbolEl, { opacity: 0, scale: 0 });
    if (social1) gsap.set(social1, { opacity: 0, y: 15 });
    if (social2) gsap.set(social2, { opacity: 0, y: 15 });
    if (marqueeComp) gsap.set(marqueeComp, { opacity: 0, scale: 0.95 });
    if (social3) gsap.set(social3, { opacity: 0, y: 15 });
    if (social4) gsap.set(social4, { opacity: 0, y: 15 });

    // Split Title "Algofort" characters
    let titleChars = [];
    if (titleEl) {
      titleChars = splitTextIntoSpans(titleEl);
      gsap.set(titleChars, { opacity: 0, y: 35 });
      gsap.set(titleEl, { visibility: 'visible', opacity: 1 });
    }

    // Split Subtitle "Designing Your Digital World" characters
    let descChars = [];
    if (descEl) {
      descChars = splitTextIntoSpans(descEl);
      gsap.set(descChars, { opacity: 0, scale: 1.3, x: 10, y: -20 });
      gsap.set(descEl, { visibility: 'visible', opacity: 1 });
    }

    // 1. Video Show
    if (videoWrap) {
      tl.to(videoWrap, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }

    // 2. Header visible -> Logo -> Nav links 1 by 1 -> Menu button
    if (logoEl) {
      tl.to(logoEl, { opacity: 1, y: 0, duration: 0.3 }, '-=0.25');
    }
    if (navLinks?.length) {
      tl.to(navLinks, { opacity: 1, y: 0, duration: 0.25, stagger: 0.04 }, '-=0.15');
    }
    if (menuBtn) {
      tl.to(menuBtn, { opacity: 1, scale: 1, duration: 0.25 }, '-=0.15');
    }

    // 3. Heading animation on Algofort Text -> Register symbol ® scale 0 to 1
    if (titleChars.length) {
      tl.to(titleChars, { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: 'power3.out' }, '-=0.1');
    }
    if (symbolEl) {
      tl.to(symbolEl, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(2)' }, '-=0.15');
    }

    // 4. "Designing Your Digital World" character drop down effect
    if (descChars.length) {
      tl.to(descChars, {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        duration: 0.3,
        stagger: 0.012,
        ease: 'back.out(1.2)',
      }, '-=0.15');
    }

    // 5. Sequential Social icons & Marquee: 1st social -> 2nd social -> Marquee -> 3rd social -> 4th social
    if (social1) {
      tl.to(social1, { opacity: 1, y: 0, duration: 0.2 }, '-=0.1');
    }
    if (social2) {
      tl.to(social2, { opacity: 1, y: 0, duration: 0.2 }, '-=0.12');
    }
    if (marqueeComp) {
      tl.to(marqueeComp, { opacity: 1, scale: 1, duration: 0.3 }, '-=0.1');
    }
    if (social3) {
      tl.to(social3, { opacity: 1, y: 0, duration: 0.2 }, '-=0.12');
    }
    if (social4) {
      tl.to(social4, { opacity: 1, y: 0, duration: 0.2 }, '-=0.12');
    }

    const visualWrap = container.querySelector('.alg-hero-gsap-wrapper, .gsap-wrapper');
    if (!visualWrap) return;

    const handleMouseMove = (e) => {
      const pageX = e.clientX;
      const pageY = e.clientY;

      if (
        Math.abs(lastPosRef.current.x - pageX) > 90 ||
        Math.abs(lastPosRef.current.y - pageY) > 90
      ) {
        lastPosRef.current = { x: pageX, y: pageY };

        const imgUrl = trailImages[activeImageIndexRef.current];
        activeImageIndexRef.current = (activeImageIndexRef.current + 1) % trailImages.length;

        const imgWrap = document.createElement('div');
        imgWrap.className = 'gsap-image-wrap';
        imgWrap.style.position = 'fixed';
        imgWrap.style.pointerEvents = 'none';
        imgWrap.style.zIndex = '15';
        imgWrap.style.left = '0px';
        imgWrap.style.top = '0px';

        const img = document.createElement('img');
        img.src = imgUrl;
        img.className = 'placeholder-image';
        img.alt = 'Interactive Trail';
        imgWrap.appendChild(img);

        visualWrap.appendChild(imgWrap);

        const trailTl = gsap.timeline({
          onComplete: () => {
            imgWrap.remove();
          },
        });

        trailTl.set(imgWrap, { x: pageX - 60, y: pageY - 60 });

        trailTl.fromTo(
          imgWrap,
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
        );

        trailTl.to(img, {
          opacity: 0,
          y: 80,
          duration: 0.5,
          ease: 'power2.in',
        }, '+=0.1');
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <header id="sec-banner" ref={containerRef} className="alg-hero site-section section-home-header sec-banner">
      <div className="alg-hero-container w-layout-grid header-component-grid sec-banner__grid">
        
        {/* Main Header Copy */}
        <div className="alg-hero-content header-content-wrap sec-banner__content-wrap" id="w-node-e3d40d27-f8bf-23a1-bff7-5262c35d051f-fc8c1483">
          <div className="alg-hero-symbol copyright-symbol sec-banner__symbol">®</div>
          <h1 className="alg-hero-title header-title section-title sec-banner__title">Algofort</h1>
          <div className="alg-hero-text header-description section-description sec-banner__desc">Designing Your Digital World</div>
        </div>

        {/* Video Background */}
        <div className="alg-hero-video-wrap background-video-wrap sec-banner__video-wrap">
          <div className="alg-hero-video background-video w-background-video w-background-video-atom">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              data-object-fit="cover" 
              style={{
                backgroundImage: 'url("/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-poster-00001.jpg")',
              }}
            >
              <source src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.mp4" type="video/mp4" />
              <source src="/assets/68ee74b7102caefef6ce7890_2F68f23d0b14d2158ab1fa8dea_14471915_3840_2160_30fps_20_281_29-transcode.webm" type="video/webm" />
            </video>
          </div>
          <div className="alg-hero-video-overlay video-overlay"></div>
        </div>

        {/* Bottom Social Links & Service Marquee */}
        <div className="padding-global" id="w-node-_729114be-2394-d3d6-aa3c-1b67dfcf4970-fc8c1483">
          <div className="container-large">
            <div className="header-bottom-wrap sec-banner__bottom-wrap">
              <div className="w-layout-grid header-inner-grid">
                                {/* Col 1 (Far Left): Instagram Link */}
                <a 
                  id="w-node-_0c97661b-373d-c2a7-8aef-7496757e2c72-fc8c1483" 
                  aria-label="Instagram Link" 
                  className="social-link social-link-1 w-inline-block" 
                  href="https://www.instagram.com/algoforttech/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="social-icon-wrap">
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97212 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z" />
                      </svg>
                    </div>
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.001 9C10.3436 9 9.00098 10.3431 9.00098 12C9.00098 13.6573 10.3441 15 12.001 15C13.6583 15 15.001 13.6569 15.001 12C15.001 10.3427 13.6579 9 12.001 9ZM12.001 7C14.7614 7 17.001 9.2371 17.001 12C17.001 14.7605 14.7639 17 12.001 17C9.24051 17 7.00098 14.7629 7.00098 12C7.00098 9.23953 9.23808 7 12.001 7ZM18.501 6.74915C18.501 7.43926 17.9402 7.99917 17.251 7.99917C16.5609 7.99917 16.001 7.4384 16.001 6.74915C16.001 6.0599 16.5617 5.5 17.251 5.5C17.9393 5.49913 18.501 6.0599 18.501 6.74915ZM12.001 4C9.5265 4 9.12318 4.00655 7.97227 4.0578C7.18815 4.09461 6.66253 4.20007 6.17416 4.38967C5.74016 4.55799 5.42709 4.75898 5.09352 5.09255C4.75867 5.4274 4.55804 5.73963 4.3904 6.17383C4.20036 6.66332 4.09493 7.18811 4.05878 7.97115C4.00703 9.0752 4.00098 9.46105 4.00098 12C4.00098 14.4745 4.00753 14.8778 4.05877 16.0286C4.0956 16.8124 4.2012 17.3388 4.39034 17.826C4.5591 18.2606 4.7605 18.5744 5.09246 18.9064C5.42863 19.2421 5.74179 19.4434 6.17187 19.6094C6.66619 19.8005 7.19148 19.9061 7.97227 19.9422C9.07618 19.9939 9.46203 20 12.001 20C14.4755 20 14.8788 19.9934 16.0296 19.9422C16.8117 19.9055 17.3385 19.7996 17.827 19.6106C18.2604 19.4423 18.5752 19.2402 18.9074 18.9085C19.2436 18.5718 19.4445 18.2594 19.6107 17.8283C19.8013 17.3358 19.9071 16.8098 19.9432 16.0289C19.9949 14.9248 20.001 14.5389 20.001 12C20.001 9.52552 19.9944 9.12221 19.9432 7.97137C19.9064 7.18906 19.8005 6.66149 19.6113 6.17318C19.4434 5.74038 19.2417 5.42635 18.9084 5.09255C18.573 4.75715 18.2616 4.55693 17.8271 4.38942C17.338 4.19954 16.8124 4.09396 16.0298 4.05781C14.9258 4.00605 14.5399 4 12.001 4ZM12.001 2C14.7176 2 15.0568 2.01 16.1235 2.06C17.1876 2.10917 17.9135 2.2775 18.551 2.525C19.2101 2.77917 19.7668 3.1225 20.3226 3.67833C20.8776 4.23417 21.221 4.7925 21.476 5.45C21.7226 6.08667 21.891 6.81333 21.941 7.8775C21.9885 8.94417 22.001 9.28333 22.001 12C22.001 14.7167 21.991 15.0558 21.941 16.1225C21.8918 17.1867 21.7226 17.9125 21.476 18.55C21.2218 19.2092 20.8776 19.7658 20.3226 20.3217C19.7668 20.8767 19.2076 21.22 18.551 21.475C17.9135 21.7217 17.1876 21.89 16.1235 21.94C15.0568 21.9875 14.7176 22 12.001 22C9.28431 22 8.94514 21.99 7.87848 21.94C6.81431 21.8908 6.08931 21.7217 5.45098 21.475C4.79264 21.2208 4.23514 20.8767 3.67931 20.3217C3.12348 19.7658 2.78098 19.2067 2.52598 18.55C2.27848 17.9125 2.11098 17.1867 2.06098 16.1225C2.01348 15.0558 2.00098 14.7167 2.00098 12C2.00098 9.28333 2.01098 8.94417 2.06098 7.8775C2.11014 6.8125 2.27848 6.0875 2.52598 5.45C2.78014 4.79167 3.12348 4.23417 3.67931 3.67833C4.23514 3.1225 4.79348 2.78 5.45098 2.525C6.08848 2.2775 6.81348 2.11 7.87848 2.06C8.94514 2.0125 9.28431 2 12.001 2Z" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Col 2 (Right of Left Box): Linkedin Link */}
                <a 
                  id="w-node-c8ad3dcd-d792-94bb-b18f-04adaa3af236-fc8c1483" 
                  aria-label="Linkedin Link" 
                  className="social-link social-link-2 w-inline-block" 
                  href="https://www.linkedin.com/company/algoforttech/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="social-icon-wrap">
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
                      </svg>
                    </div>
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.94048 4.99993C6.94011 5.81424 6.44608 6.54702 5.69134 6.85273C4.9366 7.15845 4.07187 6.97605 3.5049 6.39155C2.93793 5.80704 2.78195 4.93715 3.1105 4.19207C3.43906 3.44699 4.18654 2.9755 5.00048 2.99993C6.08155 3.03238 6.94097 3.91837 6.94048 4.99993ZM7.00048 8.47993H3.00048V20.9999H7.00048V8.47993ZM13.3205 8.47993H9.34048V20.9999H13.2805V14.4299C13.2805 10.7699 18.0505 10.4299 18.0505 14.4299V20.9999H22.0005V13.0699C22.0005 6.89993 14.9405 7.12993 13.2805 10.1599L13.3205 8.47993Z" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Col 3 (Center): Marquee */}
                <div 
                  id="w-node-_7096530b-cec4-e332-9168-3ed594ea7bd4-fc8c1483" 
                  className="service-marquee-component"
                >
                  <div className="service-marquee">
                    <div className="service-marquee-track">
                      {[...marqueeItems, ...marqueeItems].map((text, i) => (
                        <div className="marquee-service-text" key={i}>
                          {text}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Col 4 (Left of Right Box): Behance Link */}
                <a 
                  id="w-node-_923bbb91-ab4e-64e0-e5d3-6ad3d2bc123a-fc8c1483" 
                  aria-label="Behance Link" 
                  className="social-link social-link-3 w-inline-block" 
                  href="https://www.behance.net/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="social-icon-wrap">
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.44262 5.34998C8.08197 5.34998 8.67213 5.39945 9.21311 5.54786C9.7541 5.6468 10.1967 5.84468 10.5902 6.09203C10.9836 6.33938 11.2787 6.68566 11.4754 7.13089C11.6721 7.57612 11.7705 8.12029 11.7705 8.71393C11.7705 9.40651 11.623 10.0002 11.2787 10.4454C10.9836 10.8906 10.4918 11.2864 9.90164 11.5832C10.7377 11.8305 11.377 12.2758 11.7705 12.8694C12.1639 13.463 12.4098 14.2051 12.4098 15.0461C12.4098 15.7387 12.2623 16.3323 12.0164 16.827C11.7705 17.3217 11.377 17.7669 10.9344 18.0638C10.4918 18.3606 9.95082 18.6079 9.36066 18.7563C8.77049 18.9047 8.18033 19.0037 7.59016 19.0037H1V5.34998H7.44262ZM7.04918 10.8906C7.59016 10.8906 8.03279 10.7422 8.37705 10.4949C8.72131 10.2475 8.86885 9.80227 8.86885 9.2581C8.86885 8.96128 8.81967 8.66446 8.72131 8.46658C8.62295 8.2687 8.47541 8.12029 8.27869 7.97188C8.08197 7.87294 7.88525 7.774 7.63934 7.72453C7.39344 7.67506 7.14754 7.67506 6.85246 7.67506H4V10.8906H7.04918ZM7.19672 16.7281C7.4918 16.7281 7.78689 16.6786 8.03279 16.6291C8.27869 16.5797 8.52459 16.4807 8.72131 16.3323C8.91803 16.1839 9.06557 16.0355 9.21311 15.7881C9.31148 15.5408 9.40984 15.244 9.40984 14.8977C9.40984 14.2051 9.21312 13.7104 8.81967 13.3641C8.42623 13.0673 7.88525 12.9189 7.2459 12.9189H4V16.7281H7.19672ZM16.6885 16.6786C17.082 17.0744 17.6721 17.2722 18.459 17.2722C19 17.2722 19.4918 17.1238 19.8852 16.8765C20.2787 16.5797 20.5246 16.2828 20.623 15.986H23.0328C22.6393 17.1733 22.0492 18.0143 21.2623 18.5585C20.4754 19.0532 19.541 19.35 18.4098 19.35C17.6229 19.35 16.9344 19.2016 16.2951 18.9542C15.6557 18.7069 15.1639 18.3606 14.7213 17.8659C14.2787 17.4206 13.9344 16.8765 13.7377 16.2334C13.4918 15.5903 13.3934 14.8977 13.3934 14.1062C13.3934 13.3641 13.4918 12.6715 13.7377 12.0284C13.9836 11.3853 14.3279 10.8411 14.7705 10.3464C15.2131 9.90121 15.7541 9.50545 16.3443 9.2581C16.9836 9.01075 17.6229 8.86234 18.4098 8.86234C19.2459 8.86234 19.9836 9.01075 20.623 9.35704C21.2623 9.70333 21.7541 10.0991 22.1475 10.6927C22.541 11.2369 22.8361 11.88 23.0328 12.5726C23.1311 13.2652 23.1803 13.9577 23.1311 14.7493H16C16 15.5408 16.2951 16.2828 16.6885 16.6786ZM19.7869 11.4843C19.4426 11.138 18.9016 10.9401 18.2623 10.9401C17.8197 10.9401 17.4754 11.039 17.1803 11.1874C16.8852 11.3358 16.6885 11.5337 16.4918 11.7316C16.2951 11.9295 16.1967 12.1768 16.1475 12.4242C16.0984 12.6715 16.0492 12.8694 16.0492 13.0673H20.4754C20.3771 12.3252 20.1311 11.8305 19.7869 11.4843ZM15.459 6.2899H20.9672V7.62559H15.459V6.2899Z" />
                      </svg>
                    </div>
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.44262 5.34998C8.08197 5.34998 8.67213 5.39945 9.21311 5.54786C9.7541 5.6468 10.1967 5.84468 10.5902 6.09203C10.9836 6.33938 11.2787 6.68566 11.4754 7.13089C11.6721 7.57612 11.7705 8.12029 11.7705 8.71393C11.7705 9.40651 11.623 10.0002 11.2787 10.4454C10.9836 10.8906 10.4918 11.2864 9.90164 11.5832C10.7377 11.8305 11.377 12.2758 11.7705 12.8694C12.1639 13.463 12.4098 14.2051 12.4098 15.0461C12.4098 15.7387 12.2623 16.3323 12.0164 16.827C11.7705 17.3217 11.377 17.7669 10.9344 18.0638C10.4918 18.3606 9.95082 18.6079 9.36066 18.7563C8.77049 18.9047 8.18033 19.0037 7.59016 19.0037H1V5.34998H7.44262ZM7.04918 10.8906C7.59016 10.8906 8.03279 10.7422 8.37705 10.4949C8.72131 10.2475 8.86885 9.80227 8.86885 9.2581C8.86885 8.96128 8.81967 8.66446 8.72131 8.46658C8.62295 8.2687 8.47541 8.12029 8.27869 7.97188C8.08197 7.87294 7.88525 7.774 7.63934 7.72453C7.39344 7.67506 7.14754 7.67506 6.85246 7.67506H4V10.8906H7.04918ZM7.19672 16.7281C7.4918 16.7281 7.78689 16.6786 8.03279 16.6291C8.27869 16.5797 8.52459 16.4807 8.72131 16.3323C8.91803 16.1839 9.06557 16.0355 9.21311 15.7881C9.31148 15.5408 9.40984 15.244 9.40984 14.8977C9.40984 14.2051 9.21312 13.7104 8.81967 13.3641C8.42623 13.0673 7.88525 12.9189 7.2459 12.9189H4V16.7281H7.19672ZM16.6885 16.6786C17.082 17.0744 17.6721 17.2722 18.459 17.2722C19 17.2722 19.4918 17.1238 19.8852 16.8765C20.2787 16.5797 20.5246 16.2828 20.623 15.986H23.0328C22.6393 17.1733 22.0492 18.0143 21.2623 18.5585C20.4754 19.0532 19.541 19.35 18.4098 19.35C17.6229 19.35 16.9344 19.2016 16.2951 18.9542C15.6557 18.7069 15.1639 18.3606 14.7213 17.8659C14.2787 17.4206 13.9344 16.8765 13.7377 16.2334C13.4918 15.5903 13.3934 14.8977 13.3934 14.1062C13.3934 13.3641 13.4918 12.6715 13.7377 12.0284C13.9836 11.3853 14.3279 10.8411 14.7705 10.3464C15.2131 9.90121 15.7541 9.50545 16.3443 9.2581C16.9836 9.01075 17.6229 8.86234 18.4098 8.86234C19.2459 8.86234 19.9836 9.01075 20.623 9.35704C21.2623 9.70333 21.7541 10.0991 22.1475 10.6927C22.541 11.2369 22.8361 11.88 23.0328 12.5726C23.1311 13.2652 23.1803 13.9577 23.1311 14.7493H16C16 15.5408 16.2951 16.2828 16.6885 16.6786ZM19.7869 11.4843C19.4426 11.138 18.9016 10.9401 18.2623 10.9401C17.8197 10.9401 17.4754 11.039 17.1803 11.1874C16.8852 11.3358 16.6885 11.5337 16.4918 11.7316C16.2951 11.9295 16.1967 12.1768 16.1475 12.4242C16.0984 12.6715 16.0492 12.8694 16.0492 13.0673H20.4754C20.3771 12.3252 20.1311 11.8305 19.7869 11.4843ZM15.459 6.2899H20.9672V7.62559H15.459V6.2899Z" />
                      </svg>
                    </div>
                  </div>
                </a>

                {/* Col 5 (Far Right of Right Box): Facebook Link */}
                <a 
                  id="w-node-cfeebc13-4cd4-951f-70ab-363bb4d9c9c8-fc8c1483" 
                  aria-label="Facebook Link" 
                  className="social-link social-link-4 w-inline-block" 
                  href="https://www.facebook.com/algoforttech/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <div className="social-icon-wrap">
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <div className="social-icon w-embed">
                      <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                  </div>
                </a>

              </div>
            </div>
          </div>
        </div>

        {/* GSAP Image Trail Visual Wrapper */}
        <div className="gsap-component sec-banner__gsap-trail">
          <div className="alg-hero-gsap-wrapper gsap-wrapper">
            <div className="gsap-block">
              <div className="gsap-image-wrap">
                <img alt="" className="placeholder-image" src="/assets/68ee74b7102caefef6ce7894_image.svg" />
              </div>
            </div>
          </div>
          <div className="gsap-image-container" style={{ display: 'none' }}>
            <div className="gsap-image-block">
              {trailImages.map((src, i) => (
                <div className="gsap-image-item" key={i}>
                  <img alt="Trail Preview" className="gsap-image" src={src} />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};
