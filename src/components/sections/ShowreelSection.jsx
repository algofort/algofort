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
          ScrollTrigger.refresh();
        });
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <>
      <section className="site-section sec-showreel section_showreel" id="sec-showreel">
        <div ref={wrapRef} className="showreel_wrap">
          <div ref={stickyRef} className="showreel_sticky">
            <div
              ref={lightboxRef}
              className="showreel_lightbox"
              onClick={() => setIsVideoOpen(true)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setIsVideoOpen(true);
                }
              }}
            >
              <h2 className="showreel_heading _1">©2026</h2>

              <div className="showreel_img-wrap">
                <img
                  ref={imgRef}
                  src="/assets/BG_IMAGE.webp"
                  alt="A man standing in the middle of a dark room."
                  className="showreel_img"
                  loading="eager"
                />

                <div ref={playWrapperRef} className="showreel_play-wrapper">
                  <h2 className="showreel_play-text">Play Algofort</h2>
                  <div className="showreel_play-icon-wrap">
                    <img
                      src="/assets/play-icon.svg"
                      alt="Play icon"
                      className="showreel_play-icon"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>

              <h2 className="showreel_heading _2">Algofort</h2>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal Lightbox */}
      {isVideoOpen && (
        <div
          className="showreel-modal-overlay"
          onClick={() => setIsVideoOpen(false)}
        >
          <div
            className="showreel-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="showreel-modal-close"
              onClick={() => setIsVideoOpen(false)}
              aria-label="Close modal"
            >
              ✕ Close
            </button>
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
