'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function ShowreelSection() {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const lightboxRef = useRef(null);
  const imgRef = useRef(null);
  const playWrapperRef = useRef(null);
  
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Close modal on Escape key press
  useEffect(() => {
    if (!isVideoOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsVideoOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVideoOpen]);

  useEffect(() => {
    // Only run scroll animation on desktop screens (>991px)
    let mm = gsap.matchMedia();

    mm.add('(min-width: 992px)', () => {
      if (!wrapRef.current || !lightboxRef.current || !imgRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1,
        },
      });

      // 1. Expand Lightbox from 12vw / 10vh to 100vw / 100vh
      tl.fromTo(
        lightboxRef.current,
        {
          width: '12vw',
          height: '10vh',
        },
        {
          width: '100vw',
          height: '100vh',
          ease: 'power2.out',
          duration: 1,
        },
        0
      );

      // 2. Animate Image Scale from 1.4 down to 1.0
      tl.fromTo(
        imgRef.current,
        {
          scale: 1.4,
        },
        {
          scale: 1.0,
          ease: 'power2.out',
          duration: 1,
        },
        0
      );

      // 3. Animate CSS variables for padding & border-radius (1rem -> 2rem)
      tl.fromTo(
        wrapRef.current,
        {
          '--_animations---animation-border-radius': '1rem',
          '--_animations---animation-padding': '0rem',
        },
        {
          '--_animations---animation-border-radius': '2rem',
          '--_animations---animation-padding': '1.5rem',
          ease: 'power2.out',
          duration: 1,
        },
        0
      );

      // 4. Opacity stays 0 during growth, and ONLY appears when image growth is 100% fully complete
      if (playWrapperRef.current) {
        tl.set(playWrapperRef.current, { opacity: 0 }, 0);
        tl.to(
          playWrapperRef.current,
          { opacity: 1, ease: 'power2.out', duration: 0.1 },
          0.95
        );
      }

      if (typeof document !== 'undefined' && document.fonts) {
        document.fonts.ready.then(() => {
          try {
            ScrollTrigger.refresh();
          } catch {
            // ignore
          }
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section className="alg-showreel site-section sec-showreel section_showreel" id="sec-showreel">
        <div ref={wrapRef} className="alg-showreel-wrap showreel_wrap">
          <div ref={stickyRef} className="alg-showreel-sticky showreel_sticky">
            <div
              ref={lightboxRef}
              className="alg-showreel-lightbox showreel_lightbox"
              onClick={() => setIsVideoOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsVideoOpen(true);
                }
              }}
            >
              <h2 className="alg-showreel-heading alg-showreel-heading-1 showreel_heading _1">©2026</h2>

              <div className="alg-showreel-img-wrap showreel_img-wrap">
                <img
                  ref={imgRef}
                  src="https://res.cloudinary.com/vfsp1egd/image/upload/w_1920,c_limit,q_auto:best,f_auto/v1792145887/algofort/assets/BG_IMAGE"
                  alt="A man standing in the middle of a dark room."
                  className="alg-showreel-img showreel_img"
                  loading="eager"
                />

                <div ref={playWrapperRef} className="alg-showreel-play-wrapper showreel_play-wrapper">
                  <h2 className="alg-showreel-play-text showreel_play-text">Play Algofort</h2>
                  <div
                    className="alg-showreel-play-icon-wrap showreel_play-icon-wrap"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsVideoOpen(true);
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label="Play video"
                  >
                    <span className="alg-showreel-sonar-wave alg-showreel-sonar-wave-1 sonar-wave sonar-wave-1" aria-hidden="true" />
                    <span className="alg-showreel-sonar-wave alg-showreel-sonar-wave-2 sonar-wave sonar-wave-2" aria-hidden="true" />
                    <span className="alg-showreel-sonar-wave alg-showreel-sonar-wave-3 sonar-wave sonar-wave-3" aria-hidden="true" />
                    <img
                      src="https://res.cloudinary.com/vfsp1egd/image/upload/v1792145915/algofort/assets/play-icon.svg"
                      alt="Play icon"
                      className="alg-showreel-play-icon showreel_play-icon"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <h2 className="alg-showreel-heading alg-showreel-heading-2 showreel_heading _2">Algofort</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Lightbox */}
      {isVideoOpen && (
        <div
          className="alg-showreel-modal-overlay showreel-modal-overlay"
          onClick={() => setIsVideoOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Algofort Showreel Video"
        >
          {/* Close button outside the video in top-right corner of screen/overlay */}
          <button
            type="button"
            className="alg-showreel-modal-close showreel-modal-close"
            onClick={(e) => {
              e.stopPropagation();
              setIsVideoOpen(false);
            }}
            aria-label="Close modal"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div
            className="alg-showreel-modal-content showreel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src="https://www.youtube.com/embed/p1CLeATYZUQ?autoplay=1"
              title="Algofort Showreel"
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
}