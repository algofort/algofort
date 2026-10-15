'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import '../../styles/header.css';

export const Header = () => {
  const pathname = usePathname();
  const [navOpen, setNavOpen] = useState(false);
  const [servicesSubOpen, setServicesSubOpen] = useState(false);
  const drawerRef = useRef(null);

  const currentPath = (pathname || (typeof window !== 'undefined' ? window.location.pathname : ''))
    .replace(/\/+$/, '') || '/';

  const isActive = (href) => {
    const target = href.replace(/\/+$/, '') || '/';
    if (target === '/') {
      return currentPath === '/';
    }
    if (target === '/about') {
      return currentPath === '/about';
    }
    if (target === '/services') {
      return (
        currentPath === '/services' ||
        currentPath.startsWith('/services/') ||
        currentPath === '/our-services' ||
        currentPath === '/web-development' ||
        currentPath === '/brand-identity' ||
        currentPath === '/saas-app' ||
        currentPath === '/saas-app-development' ||
        currentPath === '/mobile-app' ||
        currentPath === '/mobile-app-development'
      );
    }
    if (target === '/portfolio') {
      return (
        currentPath === '/portfolio' ||
        currentPath.startsWith('/portfolio/') ||
        currentPath === '/projects' ||
        currentPath.startsWith('/projects/')
      );
    }
    if (target === '/contact') {
      return (
        currentPath === '/contact' ||
        currentPath.startsWith('/contact/') ||
        currentPath === '/contact-us' ||
        currentPath.startsWith('/contact-us/')
      );
    }
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!navOpen) {
      setServicesSubOpen(false);
    }
  }, [navOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && navOpen) {
        setNavOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navOpen]);

  useEffect(() => {
    if (!drawerRef.current) return;
    const drawerEl = drawerRef.current;
    const contentWrap = drawerEl.querySelector('.alg-header-drawer-content-wrap, .navigation-content-wrap');
    const opacityBg = drawerEl.querySelector('.alg-header-drawer-opacity, .navigation-opacity');
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 991;
    const links = drawerEl.querySelectorAll(
      isMobile 
        ? '.mobile-nav-list > .navigation-link-block' 
        : '.desktop-nav-list > .navigation-link-block'
    );

    if (navOpen) {
      gsap.set(drawerEl, { display: 'block' });
      gsap.fromTo(opacityBg, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: 'power2.out' });
      gsap.fromTo(
        contentWrap,
        { scale: 0.15, opacity: 0, transformOrigin: '100% 100%' },
        { scale: 1, opacity: 1, duration: 0.85, ease: 'power3.out' }
      );
      gsap.fromTo(
        links,
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out', delay: 0.2 }
      );
    } else {
      gsap.to(opacityBg, { opacity: 0, duration: 0.35 });
      gsap.to(contentWrap, {
        scale: 0.15,
        opacity: 0,
        duration: 0.55,
        ease: 'power3.inOut',
        transformOrigin: '100% 100%',
        onComplete: () => {
          gsap.set(drawerEl, { display: 'none' });
        },
      });
    }
  }, [navOpen]);

  return (
    <div 
      className={`alg-header navbar site-header sec-header w-nav ${navOpen ? 'w--nav-menu-open' : ''}`} 
      data-animation="default" 
      data-collapse="all" 
      data-duration="0" 
      data-easing="ease"
      data-easing2="ease" 
      data-wf--navbar--variant="base" 
      id="top" 
      role="banner"
    >
      <div className="alg-header-container sec-header__container-full w-full">
        <div className="alg-header-content-wrapper nav-content-wrapper sec-header__wrapper">
          
          {/* Logo */}
          <div className="alg-header-logo-wrapper logo-wrapper sec-header__logo-wrapper" id="w-node-_775fe0a9-7eeb-54f2-c56b-580613a9104a-13a91046">
            <Link aria-current="page" className="alg-header-logo-link logo-link sec-header__logo-link w-inline-block" href="/">
              <div className="alg-header-logo-wrap logo-wrap">
                <img 
                  alt="Algofort Logo" 
                  className="alg-header-logo-img logo sec-header__logo-img" 
                  loading="eager" 
                  src="/assets/logo.png" 
                />
                <img 
                  alt="Algofort Logo" 
                  className="alg-header-logo-img logo sec-header__logo-img" 
                  loading="eager" 
                  src="/assets/logo.png" 
                />
              </div>
            </Link>
            <div className="logo-text-block"></div>
          </div>

          {/* Webflow Overlay Navigation Drawer */}
          <nav 
            ref={drawerRef}
            className={`alg-header-drawer navigation sec-header__nav-drawer w-nav-menu ${navOpen ? 'w--nav-menu-open' : ''}`} 
            role="navigation"
            style={{ display: 'none' }}
          >
            <div className="alg-header-drawer-container navigation-container">
              <div className="alg-header-drawer-content-wrap navigation-content-wrap" id="w-node-_775fe0a9-7eeb-54f2-c56b-580613a91055-13a91046">
                <div className="navigation-content-block">
                  <div className="navigation-content">
                    <div className="w-layout-grid navigation-inner-grid">
                      {/* Desktop Navigation List (Shown on screens > 991px) */}
                      <div className="navigation-content-list desktop-nav-list">
                        
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${pathname?.includes('web-development') ? 'is-active w--current' : ''}`} href="/services/web-development" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Web Development</div>
                              <div className="navigation-link-text">Web Development</div>
                            </div>
                            <div className="navigation-number">(01)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${pathname?.includes('brand-identity') ? 'is-active w--current' : ''}`} href="/services/brand-identity" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Brand Identity</div>
                              <div className="navigation-link-text">Brand Identity</div>
                            </div>
                            <div className="navigation-number">(02)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${pathname?.includes('saas-app') ? 'is-active w--current' : ''}`} href="/services/saas-app-development" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">SaaS App Development</div>
                              <div className="navigation-link-text">SaaS App Development</div>
                            </div>
                            <div className="navigation-number">(03)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${pathname?.includes('mobile-app') ? 'is-active w--current' : ''}`} href="/services/mobile-app-development" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Mobile App Development</div>
                              <div className="navigation-link-text">Mobile App Development</div>
                            </div>
                            <div className="navigation-number">(04)</div>
                          </Link>
                        </div>

                      </div>

                      {/* Mobile Navigation List (Full Main Menu - Shown on screens <= 991px) */}
                      <div className="navigation-content-list mobile-nav-list">

                        {/* 01. Home */}
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${isActive('/') ? 'is-active w--current' : ''}`} href="/" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Home</div>
                              <div className="navigation-link-text">Home</div>
                            </div>
                            <div className="navigation-number">(01)</div>
                          </Link>
                        </div>

                        {/* 02. About */}
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${isActive('/about') ? 'is-active w--current' : ''}`} href="/about" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">About</div>
                              <div className="navigation-link-text">About</div>
                            </div>
                            <div className="navigation-number">(02)</div>
                          </Link>
                        </div>

                        {/* 03. Services (Hover or Click expands sub-services) */}
                        <div 
                          className={`alg-header-drawer-link-block navigation-link-block mobile-services-wrapper ${servicesSubOpen ? 'is-open' : ''} ${isActive('/services') ? 'is-active' : ''}`}
                          onMouseEnter={() => setServicesSubOpen(true)}
                          onMouseLeave={() => setServicesSubOpen(false)}
                        >
                          <div 
                            className={`navigation-link mobile-services-trigger ${isActive('/services') ? 'is-active w--current' : ''}`}
                            onClick={() => setServicesSubOpen((prev) => !prev)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={servicesSubOpen}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setServicesSubOpen((prev) => !prev);
                              }
                            }}
                          >
                            <div className="mobile-services-trigger-left">
                              <div className="navigation-link-wrap">
                                <div className="navigation-link-text">Services</div>
                                <div className="navigation-link-text">Services</div>
                              </div>
                              <div className="navigation-number">(03)</div>
                            </div>
                            <div className="mobile-services-arrow" aria-label="Toggle Sub Services">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                              </svg>
                            </div>
                          </div>

                          {/* Sub Services Accordion */}
                          <div className={`nav-subservices-container ${servicesSubOpen ? 'is-open' : ''}`}>
                            <div className="nav-subservices-list">
                              <Link className={`nav-subservice-item ${pathname?.includes('web-development') ? 'is-active' : ''}`} href="/services/web-development" onClick={() => setNavOpen(false)}>
                                <span className="nav-subservice-dot">✦</span>
                                <span>Web Development</span>
                              </Link>
                              <Link className={`nav-subservice-item ${pathname?.includes('brand-identity') ? 'is-active' : ''}`} href="/services/brand-identity" onClick={() => setNavOpen(false)}>
                                <span className="nav-subservice-dot">✦</span>
                                <span>Brand Identity</span>
                              </Link>
                              <Link className={`nav-subservice-item ${pathname?.includes('saas-app') ? 'is-active' : ''}`} href="/services/saas-app-development" onClick={() => setNavOpen(false)}>
                                <span className="nav-subservice-dot">✦</span>
                                <span>SaaS App Development</span>
                              </Link>
                              <Link className={`nav-subservice-item ${pathname?.includes('mobile-app') ? 'is-active' : ''}`} href="/services/mobile-app-development" onClick={() => setNavOpen(false)}>
                                <span className="nav-subservice-dot">✦</span>
                                <span>Mobile App Development</span>
                              </Link>
                              <Link className={`nav-subservice-item ${pathname === '/services' || pathname === '/our-services' ? 'is-active' : ''}`} href="/services" onClick={() => setNavOpen(false)}>
                                <span className="nav-subservice-dot">✦</span>
                                <span>All Services</span>
                              </Link>
                            </div>
                          </div>
                        </div>

                        {/* 04. Portfolio */}
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${isActive('/portfolio') ? 'is-active w--current' : ''}`} href="/portfolio" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Portfolio</div>
                              <div className="navigation-link-text">Portfolio</div>
                            </div>
                            <div className="navigation-number">(04)</div>
                          </Link>
                        </div>

                        {/* 05. Contact */}
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className={`navigation-link w-inline-block ${isActive('/contact') ? 'is-active w--current' : ''}`} href="/contact" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Contact</div>
                              <div className="navigation-link-text">Contact</div>
                            </div>
                            <div className="navigation-number">(05)</div>
                          </Link>
                        </div>

                      </div>

                      <div className="navigation-button-wrap" id="w-node-_775fe0a9-7eeb-54f2-c56b-580613a91087-13a91046">
                        <div className="navigation-button-block">
                          <Link className="main-button btn-primary sec-header__btn w-inline-block" href="/contact" onClick={() => setNavOpen(false)}>
                            <div className="main-button-block">
                              <div className="button-text">Get in Touch</div>
                              <div className="button-text">Get in Touch</div>
                            </div>
                            <img 
                              alt="Star Icon" 
                              className="button-icon" 
                              loading="lazy" 
                              src="/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg" 
                            />
                          </Link>
                        </div>
                      </div>

                    </div>
                  </div>
                  <div className="navigation-background"></div>
                </div>
              </div>
              <div className="alg-header-drawer-opacity navigation-opacity" onClick={() => setNavOpen(false)}></div>
            </div>
          </nav>

          {/* Quick Nav Bar */}
          <div className="nav-wrapper sec-header__nav-wrapper">
            <div className="nav-link-block">
              {[
                { label: 'Home', href: '/' },
                { label: 'About', href: '/about' },
                { label: 'Services', href: '/services' },
                { label: 'Portfolio', href: '/portfolio' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => {
                const active = isActive(item.href);
                return (
                  <Link 
                    key={item.href}
                    className={`nav-link w-inline-block ${active ? 'is-active w--current' : ''}`} 
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    style={active ? { backgroundColor: '#f47a1f', color: '#ffffff' } : undefined}
                  >
                    <div className="nav-text-wrap">
                      <div className="nav-text" style={active ? { color: '#ffffff' } : undefined}>{item.label}</div>
                      <div className="nav-text" style={active ? { color: '#ffffff' } : undefined}>{item.label}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Hamburger Toggle Button */}
            <div 
              className={`menu-button sec-header__menu-btn w-nav-button ${navOpen ? 'w--open' : ''}`}
              id="w-node-_775fe0a9-7eeb-54f2-c56b-580613a910ac-13a91046"
              onClick={toggleNav}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleNav();
                }
              }}
              role="button"
              aria-label={navOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={navOpen}
              tabIndex={0}
            >
              <div className="menu-button-container">
                <div className="menu-button-block">
                  <div className="menu-button-wrap">
                    <div className="menu-line-item">
                      <div className={`menu-line top ${navOpen ? 'open' : ''}`}></div>
                    </div>
                    <div className="menu-line-item">
                      <div className={`menu-line bottom ${navOpen ? 'open' : ''}`}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
