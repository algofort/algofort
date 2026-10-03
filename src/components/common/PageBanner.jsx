'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

const marqueeItems = [
  'Web Development',
  'UI/UX Development',
  'Mobile App',
  'Custom Software',
  'SEO',
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

export function PageBanner({
  title = 'Page Title',
  breadcrumbs,
  showBottomBar = true,
  className = '',
}) {
  const containerRef = useRef(null);

  // Default breadcrumbs if not explicitly provided
  const breadcrumbList = breadcrumbs && breadcrumbs.length > 0
    ? breadcrumbs
    : [
        { label: 'Home', href: '/' },
        { label: title },
      ];

  useGSAP(() => {
    const container = containerRef.current;
    if (!container) return;

    // Header elements (matching Home page BannerSection)
    const headerEl = document.querySelector('.site-header');
    const logoEl = headerEl?.querySelector('.logo-wrapper');
    const navLinks = headerEl?.querySelectorAll('.nav-link');
    const menuBtn = headerEl?.querySelector('.menu-button');

    // Subpage Banner elements
    const videoWrap = container.querySelector('.sec-banner__video-wrap');
    const titleEl = container.querySelector('.sec-page-banner__title');
    const breadcrumbWrap = container.querySelector('.sec-page-banner__breadcrumb-wrap');
    const social1 = container.querySelector('.social-link-1');
    const social2 = container.querySelector('.social-link-2');
    const marqueeComp = container.querySelector('.service-marquee-component');
    const social3 = container.querySelector('.social-link-3');
    const social4 = container.querySelector('.social-link-4');

    // Reduced motion accessibility fallback
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      if (headerEl) gsap.set(headerEl, { opacity: 1 });
      if (logoEl) gsap.set(logoEl, { opacity: 1, y: 0 });
      if (navLinks?.length) gsap.set(navLinks, { opacity: 1, y: 0 });
      if (menuBtn) gsap.set(menuBtn, { opacity: 1, scale: 1 });
      if (videoWrap) gsap.set(videoWrap, { opacity: 1, scale: 1 });
      if (titleEl) gsap.set(titleEl, { visibility: 'visible', opacity: 1 });
      if (breadcrumbWrap) gsap.set(breadcrumbWrap, { visibility: 'visible', opacity: 1, y: 0 });
      if (social1) gsap.set(social1, { opacity: 1, y: 0 });
      if (social2) gsap.set(social2, { opacity: 1, y: 0 });
      if (marqueeComp) gsap.set(marqueeComp, { opacity: 1, scale: 1 });
      if (social3) gsap.set(social3, { opacity: 1, y: 0 });
      if (social4) gsap.set(social4, { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Initial hidden states (same as Home BannerSection)
    if (headerEl) gsap.set(headerEl, { opacity: 1 });
    if (logoEl) gsap.set(logoEl, { opacity: 0, y: -15 });
    if (navLinks?.length) gsap.set(navLinks, { opacity: 0, y: -10 });
    if (menuBtn) gsap.set(menuBtn, { opacity: 0, scale: 0.85 });
    if (videoWrap) gsap.set(videoWrap, { opacity: 0, scale: 1.04 });
    if (breadcrumbWrap) gsap.set(breadcrumbWrap, { opacity: 0, y: 20 });
    if (social1) gsap.set(social1, { opacity: 0, y: 15 });
    if (social2) gsap.set(social2, { opacity: 0, y: 15 });
    if (marqueeComp) gsap.set(marqueeComp, { opacity: 0, scale: 0.95 });
    if (social3) gsap.set(social3, { opacity: 0, y: 15 });
    if (social4) gsap.set(social4, { opacity: 0, y: 15 });

    // 1. Split Title characters
    let titleChars = [];
    if (titleEl) {
      titleChars = splitTextIntoSpans(titleEl);
      gsap.set(titleChars, { opacity: 0, y: 30 });
      gsap.set(titleEl, { visibility: 'visible', opacity: 1 });
    }

    // 2. Video Reveal
    if (videoWrap) {
      tl.to(videoWrap, { opacity: 1, scale: 1, duration: 0.45, ease: 'power2.out' });
    }

    // 3. Stagger Header reveal (matching Home page BannerSection)
    if (logoEl) {
      tl.to(logoEl, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
    }
    if (navLinks?.length) {
      tl.to(navLinks, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 0.3);
    }
    if (menuBtn) {
      tl.to(menuBtn, { opacity: 1, scale: 1, duration: 0.5 }, 0.35);
    }

    // 4. Stagger Title Chars
    if (titleChars.length) {
      tl.to(titleChars, { opacity: 1, y: 0, duration: 0.35, stagger: 0.02, ease: 'power3.out' }, '-=0.2');
    }

    // 5. Breadcrumb Reveal
    if (breadcrumbWrap) {
      gsap.set(breadcrumbWrap, { visibility: 'visible' });
      tl.to(breadcrumbWrap, { opacity: 1, y: 0, duration: 0.35, ease: 'back.out(1.4)' }, '-=0.15');
    }

    // 6. Sequential Social icons & Marquee in Bottom Bar
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
  }, { scope: containerRef, dependencies: [title, JSON.stringify(breadcrumbList), showBottomBar] });

  return (
    <header
      id="sec-page-banner"
      ref={containerRef}
      className={`alg-hero site-section section-home-header sec-banner sec-page-banner ${className}`}
    >
      {/* Video Background - directly positioned as absolute card backdrop */}
      <div className="alg-hero-video-wrap background-video-wrap sec-banner__video-wrap">
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
        <div className="alg-hero-video-overlay video-overlay" />
      </div>

      <div className="sec-page-banner__grid">
        
        {/* Main Center Content: Title + Breadcrumb */}
        <div className="sec-page-banner__content-wrap">
          <h1 className="alg-hero-title section-title sec-page-banner__title">
            {title}
          </h1>

          <div className="sec-page-banner__breadcrumb-wrap">
            <nav aria-label="Breadcrumb" className="sec-page-banner__breadcrumb-nav">
              <ol className="sec-page-banner__breadcrumb-list">
                {breadcrumbList.map((crumb, idx) => {
                  const isLast = idx === breadcrumbList.length - 1;
                  return (
                    <React.Fragment key={idx}>
                      <li className="sec-page-banner__breadcrumb-item">
                        {isLast ? (
                          <span
                            className="sec-page-banner__breadcrumb-current"
                            aria-current="page"
                          >
                            {crumb.label}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href || '/'}
                            className="sec-page-banner__breadcrumb-link"
                          >
                            {crumb.label}
                          </Link>
                        )}
                      </li>
                      {!isLast && (
                        <li
                          className="sec-page-banner__breadcrumb-separator"
                          aria-hidden="true"
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                        </li>
                      )}
                    </React.Fragment>
                  );
                })}
              </ol>
            </nav>
          </div>
        </div>

        {/* Bottom Social Links & Service Marquee */}
        {showBottomBar && (
          <div className="sec-page-banner__bottom-wrap padding-global">
            <div className="container-large">
              <div className="header-bottom-wrap sec-banner__bottom-wrap">
                <div className="w-layout-grid header-inner-grid">
                  
                  {/* Col 1: Instagram Link */}
                  <a
                    id="page-banner-social-1"
                    aria-label="Instagram Link"
                    className="social-link social-link-1 w-inline-block"
                    href="https://www.instagram.com/algoforttech/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="social-icon-wrap">
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Col 2: Linkedin Link */}
                  <a
                    id="page-banner-social-2"
                    aria-label="Linkedin Link"
                    className="social-link social-link-2 w-inline-block"
                    href="https://www.linkedin.com/company/algoforttech/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="social-icon-wrap">
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Col 3: Marquee */}
                  <div
                    id="page-banner-marquee"
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

                  {/* Col 4: Behance Link */}
                  <a
                    id="page-banner-social-3"
                    aria-label="Behance Link"
                    className="social-link social-link-3 w-inline-block"
                    href="https://www.behance.net/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="social-icon-wrap">
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.109 0-5.467-2.046-5.467-5.5 0-3.232 2.37-5.5 5.34-5.5 3.329 0 5.127 2.464 4.853 5.5h-7.693c0 1.939 1.488 3.02 3.197 3.02 1.625 0 2.656-.844 3.056-1.52l1.44.5zm-4.887-5.5c-.114-1.258-1.042-2.02-2.296-2.02-1.392 0-2.261.942-2.383 2.02h4.679zm-13.839 5.5h-5v-14h5.5c2.485 0 4.5 1.515 4.5 3.5 0 1.238-.646 2.336-1.657 2.94 1.344.624 2.157 1.838 2.157 3.31 0 2.346-2.015 4.25-5.5 4.25zm-2.5-8.5h2.5c1.104 0 2-.672 2-1.5s-.896-1.5-2-1.5h-2.5v3zm0 6h2.8c1.215 0 2.2-.784 2.2-1.75s-.985-1.75-2.2-1.75h-2.8v3.5z" />
                        </svg>
                      </div>
                      <div className="social-icon w-embed">
                        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.109 0-5.467-2.046-5.467-5.5 0-3.232 2.37-5.5 5.34-5.5 3.329 0 5.127 2.464 4.853 5.5h-7.693c0 1.939 1.488 3.02 3.197 3.02 1.625 0 2.656-.844 3.056-1.52l1.44.5zm-4.887-5.5c-.114-1.258-1.042-2.02-2.296-2.02-1.392 0-2.261.942-2.383 2.02h4.679zm-13.839 5.5h-5v-14h5.5c2.485 0 4.5 1.515 4.5 3.5 0 1.238-.646 2.336-1.657 2.94 1.344.624 2.157 1.838 2.157 3.31 0 2.346-2.015 4.25-5.5 4.25zm-2.5-8.5h2.5c1.104 0 2-.672 2-1.5s-.896-1.5-2-1.5h-2.5v3zm0 6h2.8c1.215 0 2.2-.784 2.2-1.75s-.985-1.75-2.2-1.75h-2.8v3.5z" />
                        </svg>
                      </div>
                    </div>
                  </a>

                  {/* Col 5: Facebook Link */}
                  <a
                    id="page-banner-social-4"
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
        )}

      </div>
    </header>
  );
}