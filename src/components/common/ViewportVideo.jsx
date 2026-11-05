'use client';

import { useEffect, useRef, useState } from 'react';

export function ViewportVideo({ sources, poster, ...props }) {
  const videoRef = useRef(null);
  const visibleRef = useRef(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Enforce programmatic muted state required by iOS WebKit autoplay policy
    video.muted = true;
    video.defaultMuted = true;

    // Keep the poster for visitors who prefer less motion or use data saver.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || navigator.connection?.saveData) return;

    const playSafely = () => {
      if (visibleRef.current && !document.hidden) {
        const promise = video.play();
        if (promise !== undefined) {
          promise.catch(() => {});
        }
      }
    };

    const updatePlayback = (visible) => {
      visibleRef.current = visible;
      if (visible && !document.hidden) {
        setShouldLoad(true);
        if (video.readyState >= 2) {
          playSafely();
        }
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
      if (document.hidden) {
        video.pause();
      } else if (visibleRef.current) {
        setShouldLoad(true);
        playSafely();
      }
    };

    video.addEventListener('canplay', playSafely);
    video.addEventListener('loadeddata', playSafely);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      observer.disconnect();
      video.removeEventListener('canplay', playSafely);
      video.removeEventListener('loadeddata', playSafely);
      document.removeEventListener('visibilitychange', handleVisibility);
      video.pause();
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return;
    const video = videoRef.current;
    video.muted = true;
    video.defaultMuted = true;
    video.load();
    if (visibleRef.current && !document.hidden) {
      const promise = video.play();
      if (promise !== undefined) {
        promise.catch(() => {});
      }
    }
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="none"
      muted
      loop
      playsInline
      webkit-playsinline="true"
      {...props}
    >
      {shouldLoad && sources.map(({ src, type, media }) => (
        <source key={src} src={src} type={type} media={media} />
      ))}
    </video>
  );
}
