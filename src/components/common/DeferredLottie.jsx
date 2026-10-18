'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

// Keep the illustration's dimensions, without downloading a player or six
// animations before the visitor reaches the process section.
export function DeferredLottie({ src, ...props }) {
  const ref = useRef(null);
  const [near, setNear] = useState(false);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) { queueMicrotask(() => setNear(true)); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setNear(true); observer.disconnect(); }
    }, { rootMargin: '400px 0px' });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return <>
    {near && <Script src="/scripts/dotlottie-player.js" strategy="afterInteractive" />}
    <dotlottie-player ref={ref} src={near ? src : undefined} {...props} />
  </>;
}
