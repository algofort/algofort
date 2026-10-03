'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const drawerRef = useRef(null);

  const toggleNav = () => {
    setNavOpen((prev) => !prev);
  };

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
    const links = drawerEl.querySelectorAll('.alg-header-drawer-link-block, .navigation-link-block');

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
                      <div className="navigation-content-list">
                        
                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className="navigation-link w-inline-block" href="/services" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Web Development</div>
                              <div className="navigation-link-text">Web Development</div>
                            </div>
                            <div className="navigation-number">(01)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className="navigation-link w-inline-block" href="/services" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">UI/UX Development</div>
                              <div className="navigation-link-text">UI/UX Development</div>
                            </div>
                            <div className="navigation-number">(02)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className="navigation-link w-inline-block" href="/services" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Mobile App</div>
                              <div className="navigation-link-text">Mobile App</div>
                            </div>
                            <div className="navigation-number">(03)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className="navigation-link w-inline-block" href="/services" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">Custom Software</div>
                              <div className="navigation-link-text">Custom Software</div>
                            </div>
                            <div className="navigation-number">(04)</div>
                          </Link>
                        </div>

                        <div className="alg-header-drawer-link-block navigation-link-block">
                          <Link className="navigation-link w-inline-block" href="/services" onClick={() => setNavOpen(false)}>
                            <div className="navigation-link-wrap">
                              <div className="navigation-link-text">SEO</div>
                              <div className="navigation-link-text">SEO</div>
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
              <Link className="nav-link w-inline-block" href="/">
                <div className="nav-text-wrap">
                  <div className="nav-text">Home</div>
                  <div className="nav-text">Home</div>
                </div>
              </Link>
              <Link className="nav-link w-inline-block" href="/about">
                <div className="nav-text-wrap">
                  <div className="nav-text">About</div>
                  <div className="nav-text">About</div>
                </div>
              </Link>
              <Link className="nav-link w-inline-block" href="/services">
                <div className="nav-text-wrap">
                  <div className="nav-text">Services</div>
                  <div className="nav-text">Services</div>
                </div>
              </Link>
              <Link className="nav-link w-inline-block" href="/#sec-projects">
                <div className="nav-text-wrap">
                  <div className="nav-text">Portfolio</div>
                  <div className="nav-text">Portfolio</div>
                </div>
              </Link>
              <Link className="nav-link w-inline-block" href="/contact">
                <div className="nav-text-wrap">
                  <div className="nav-text">Contact</div>
                  <div className="nav-text">Contact</div>
                </div>
              </Link>
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
