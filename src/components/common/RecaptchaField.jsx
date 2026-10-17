'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export function RecaptchaField({ onTokenChange, resetKey = 0, theme = 'light' }) {
  const containerRef = useRef(null);
  const widgetIdRef = useRef(null);
  const callbackRef = useRef(onTokenChange);
  const [callbackReady, setCallbackReady] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [nearViewport, setNearViewport] = useState(false);

  useEffect(() => {
    callbackRef.current = onTokenChange;
  }, [onTokenChange]);

  useEffect(() => {
    if (!siteKey || !containerRef.current) return;
    if (!('IntersectionObserver' in window)) {
      setNearViewport(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: '500px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleReady = () => setScriptReady(true);
    window.addEventListener('algofort-recaptcha-ready', handleReady);
    window.algofortRecaptchaLoaded = () => {
      window.__algofortRecaptchaReady = true;
      window.dispatchEvent(new Event('algofort-recaptcha-ready'));
    };
    if (window.__algofortRecaptchaReady) setScriptReady(true);
    setCallbackReady(true);

    return () => window.removeEventListener('algofort-recaptcha-ready', handleReady);
  }, []);

  useEffect(() => {
    if (!siteKey || !scriptReady || !containerRef.current || typeof window.grecaptcha?.render !== 'function' || widgetIdRef.current !== null) return;

    widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
      sitekey: siteKey,
      theme,
      size: window.matchMedia('(max-width: 420px)').matches ? 'compact' : 'normal',
      callback: (token) => callbackRef.current(token),
      'expired-callback': () => callbackRef.current(''),
      'error-callback': () => callbackRef.current(''),
    });
  }, [scriptReady, theme]);

  useEffect(() => {
    if (!resetKey || widgetIdRef.current === null) return;
    window.grecaptcha?.reset(widgetIdRef.current);
    callbackRef.current('');
  }, [resetKey]);

  if (!siteKey) return null;

  return (
    <>
      {callbackReady && nearViewport && (
        <Script
          src="https://www.google.com/recaptcha/api.js?onload=algofortRecaptchaLoaded&render=explicit"
          strategy="afterInteractive"
          onReady={() => {
            if (typeof window.grecaptcha?.render === 'function') setScriptReady(true);
          }}
        />
      )}
      <div ref={containerRef} aria-label="Security check" />
    </>
  );
}
