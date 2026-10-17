'use client';

import { useEffect, useRef, useState } from 'react';

export function ViewportVideo({ sources, poster, ...props }) {
  const videoRef = useRef(null);
  const visibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Keep the poster for visitors who prefer less motion or use data saver.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;

    const updatePlayback = (visible) => {
      visibleRef.current = visible;
      if (visible && !document.hidden) {
        setShouldLoad(true);
        if (video.readyState > 0) video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    if (!('IntersectionObserver' in window)) {
      updatePlayback(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => updatePlayback(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(video);

    const handleVisibility = () => {
      if (document.hidden) video.pause();
      else if (visibleRef.current) {
        setShouldLoad(true);
        if (video.readyState > 0) video.play().catch(() => {});
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      video.pause();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    videoRef.current.load();
    if (visibleRef.current && !document.hidden) videoRef.current.play().catch(() => {});
  }, [shouldLoad]);

  return (
    <video ref={videoRef} poster={poster} preload="none" muted loop playsInline {...props}>
      {shouldLoad && sources.map(({ src, type, media }) => (
        <source key={src} src={src} type={type} media={media} />
      ))}
    </video>
  );
}
