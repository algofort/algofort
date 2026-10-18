'use client';

import { useEffect, useRef, useState } from 'react';

let scriptPromise = null;

function ensureDotLottieScript() {
  if (typeof window === 'undefined') return Promise.resolve();
  if (window.customElements && window.customElements.get('dotlottie-player')) {
    return Promise.resolve();
  }
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve) => {
      if (window.customElements && window.customElements.get('dotlottie-player')) {
        resolve();
        return;
      }
      if ('customElements' in window && 'whenDefined' in window.customElements) {
        window.customElements.whenDefined('dotlottie-player').then(resolve);
      }
      const existing = document.querySelector('script[src*="dotlottie-player.js"]');
      if (existing) {
        if (window.customElements?.whenDefined) {
          window.customElements.whenDefined('dotlottie-player').then(resolve);
        } else {
          resolve();
        }
        return;
      }
      const script = document.createElement('script');
      script.src = '/scripts/dotlottie-player.js';
      script.async = true;
      script.onload = () => {
        if (window.customElements?.whenDefined) {
          window.customElements.whenDefined('dotlottie-player').then(resolve);
        } else {
          resolve();
        }
      };
      script.onerror = () => {
        console.error('[DeferredLottie] Failed to load dotlottie-player script');
        resolve();
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export function DeferredLottie({ src, style, className, ...props }) {
  const containerRef = useRef(null);
  const playerRef = useRef(null);
  const [near, setNear] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (window.customElements?.whenDefined) {
      window.customElements.whenDefined('dotlottie-player').then(() => {
        setReady(true);
      });
    }

    if (!('IntersectionObserver' in window)) {
      queueMicrotask(() => setNear(true));
      ensureDotLottieScript();
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setNear(true);
        ensureDotLottieScript();
        observer.disconnect();
      }
    }, { rootMargin: '800px 0px' });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!near || !ready || !src) return;

    const timer = setTimeout(() => {
      const player = playerRef.current;
      if (player && typeof player.load === 'function' && !player.getLottie?.()) {
        try {
          player.load(src);
        } catch {
          // ignore
        }
      }
    }, 80);

    return () => clearTimeout(timer);
  }, [near, ready, src]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: style?.width || '280px',
        height: style?.height || '280px',
        maxWidth: '100%',
        ...style,
      }}
    >
      {near && ready && (
        <dotlottie-player
          ref={playerRef}
          key={src}
          src={src}
          style={{
            width: '100%',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
          }}
          {...props}
        />
      )}
    </div>
  );
}
