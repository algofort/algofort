'use client';

import { useEffect, useRef, useState } from 'react';
import { observeNear } from '../../utils/observeNear';
import { CONTACT_MAP_STYLE_URL, createContactMapStyle, STUDIO_LOCATION } from './contactMapStyle';
import 'maplibre-gl/dist/maplibre-gl.css';
import styles from './ContactMap.module.css';

const HOME_VIEW = { center: STUDIO_LOCATION.coordinates, zoom: 17.2, pitch: 62, bearing: -28 };

function makePopupContent() {
  const content = document.createElement('div');
  content.className = styles.popupContent;
  const eyebrow = document.createElement('span');
  eyebrow.className = styles.eyebrow;
  eyebrow.textContent = 'COME SAY HELLO';
  const title = document.createElement('strong');
  title.className = styles.popupTitle;
  title.textContent = 'Algofort Studio';
  const address = document.createElement('p');
  address.textContent = STUDIO_LOCATION.address;
  const link = document.createElement('a');
  link.href = STUDIO_LOCATION.mapUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'View on OpenStreetMap ↗';
  content.append(eyebrow, title, address, link);
  return content;
}

export function ContactMap() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const [status, setStatus] = useState('loading');
  const [attempt, setAttempt] = useState(0);
  const [is3D, setIs3D] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let map;
    let marker;
    let pin;
    let popup;
    let resizeObserver;
    let resizeFrame;
    let loadingTimeout;
    let hadTileError = false;
    const controller = new AbortController();

    const onLoad = () => {
      clearTimeout(loadingTimeout);
      if (!disposed) setStatus(hadTileError ? 'partial' : 'ready');
    };
    const onError = () => {
      hadTileError = true;
      if (!disposed) setStatus('partial');
    };
    const onPitchEnd = () => {
      if (!disposed) setIs3D(map.getPitch() > 10);
    };
    const onContextLost = () => {
      if (!disposed) setStatus('error');
    };
    const onContextRestored = () => {
      if (!disposed) setStatus(hadTileError ? 'partial' : 'ready');
    };
    const onMarkerClick = (event) => {
      event.stopPropagation();
      if (popup.isOpen()) popup.remove();
      else popup.setLngLat(STUDIO_LOCATION.coordinates).addTo(map);
    };

    const initialize = async () => {
      setStatus('loading');
      loadingTimeout = setTimeout(() => {
        if (!disposed) setStatus('error');
      }, 25000);

      try {
        // Only load the renderer and remote style when the map is near the viewport.
        const [maplibre, response] = await Promise.all([
          import('maplibre-gl'),
          fetch(CONTACT_MAP_STYLE_URL, { signal: controller.signal }),
        ]);
        if (!response.ok) throw new Error('The map style could not be loaded.');
        const baseStyle = await response.json();
        if (disposed || mapRef.current) return;

        // MapLibre 6 uses a separate module worker. Bundle it locally with Next.js.
        maplibre.setWorkerUrl(new URL('maplibre-gl/dist/maplibre-gl-worker.mjs', import.meta.url).href);
        map = new maplibre.Map({
          container,
          style: createContactMapStyle(baseStyle),
          ...HOME_VIEW,
          minZoom: 3,
          maxZoom: 20,
          maxPitch: 75,
          attributionControl: false,
          cooperativeGestures: true,
          renderWorldCopies: false,
          pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          canvasContextAttributes: { antialias: true },
          fadeDuration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 250,
        });
        mapRef.current = map;
        map.getCanvas().setAttribute('aria-label', 'Interactive 3D map of Algofort Studio in PECHS, Karachi');
        map.addControl(new maplibre.NavigationControl({ visualizePitch: true }), 'top-right');
        map.addControl(new maplibre.AttributionControl({ compact: true }), 'bottom-right');
        map.touchPitch.enable();

        // A native button keeps pointer, touch and keyboard activation consistent.
        pin = document.createElement('button');
        pin.type = 'button';
        pin.className = styles.marker;
        pin.setAttribute('aria-label', 'Show Algofort Studio address');
        pin.innerHTML = `<span class="${styles.markerLabel}">ALGOFORT</span><span class="${styles.markerPin}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg></span><span class="${styles.markerFoot}"></span>`;
        popup = new maplibre.Popup({
          className: styles.popup,
          offset: {
            top: [0, 12], 'top-left': [0, 12], 'top-right': [0, 12],
            bottom: [0, -94], 'bottom-left': [0, -94], 'bottom-right': [0, -94],
            left: [32, -35], right: [-32, -35],
          },
          maxWidth: 'min(270px, calc(100vw - 64px))',
          closeButton: true,
          focusAfterOpen: true,
        }).setDOMContent(makePopupContent());
        pin.addEventListener('click', onMarkerClick);
        marker = new maplibre.Marker({ element: pin, anchor: 'bottom' })
          .setLngLat(STUDIO_LOCATION.coordinates)
          .addTo(map);

        map.on('load', onLoad);
        map.on('error', onError);
        map.on('pitchend', onPitchEnd);
        map.on('webglcontextlost', onContextLost);
        map.on('webglcontextrestored', onContextRestored);
        setIs3D(true);

        // Resizes stay inside the fixed map box, independent of ScrollTrigger/Lenis.
        resizeObserver = new ResizeObserver(() => {
          cancelAnimationFrame(resizeFrame);
          resizeFrame = requestAnimationFrame(() => {
            if (!disposed) map.resize();
          });
        });
        resizeObserver.observe(container);
      } catch (error) {
        clearTimeout(loadingTimeout);
        if (!disposed && error.name !== 'AbortError') setStatus('error');
      }
    };

    const stopObserving = observeNear(container, () => { void initialize(); }, 450);
    return () => {
      disposed = true;
      controller.abort();
      clearTimeout(loadingTimeout);
      cancelAnimationFrame(resizeFrame);
      stopObserving();
      resizeObserver?.disconnect();
      pin?.removeEventListener('click', onMarkerClick);
      popup?.remove();
      marker?.remove();
      if (map) {
        map.off('load', onLoad);
        map.off('error', onError);
        map.off('pitchend', onPitchEnd);
        map.off('webglcontextlost', onContextLost);
        map.off('webglcontextrestored', onContextRestored);
        map.remove();
      }
      if (mapRef.current === map) mapRef.current = null;
    };
  }, [attempt]);

  const recenter = () => {
    mapRef.current?.flyTo({ ...HOME_VIEW, duration: 1000, essential: false });
  };
  const togglePerspective = () => {
    mapRef.current?.easeTo({ pitch: is3D ? 0 : HOME_VIEW.pitch, duration: 650, essential: false });
  };
  const retry = () => setAttempt((value) => value + 1);
  const isAvailable = status === 'ready' || status === 'partial';

  return (
    <div className={`alg-contact-map-iframe ${styles.map}`} role="region" aria-label="Algofort Studio location" data-state={status} data-lenis-prevent>
      <div ref={containerRef} className={styles.canvas} />
      <div className={styles.studioBadge} aria-hidden="true">
        <span className={styles.statusDot} />
        <div><span className={styles.eyebrow}>OUR STUDIO</span><span className={styles.badgeTitle}>PECHS, KARACHI</span></div>
      </div>
      {isAvailable && (
        <>
          <div className={styles.viewControls}>
            <button type="button" onClick={togglePerspective} aria-label="Toggle 3D perspective" aria-pressed={is3D} title="Toggle 3D perspective">3D</button>
            <button type="button" onClick={recenter} aria-label="Recenter on Algofort Studio" title="Recenter on Algofort Studio">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /><path d="M12 2v4m0 12v4M2 12h4m12 0h4" /></svg>
            </button>
          </div>
          <p className={styles.gestureHint}><span className={styles.desktopHint}>Drag to explore · Right-drag to rotate & tilt</span><span className={styles.touchHint}>Use two fingers to explore</span></p>
        </>
      )}
      {status === 'loading' && <div className={styles.loading} role="status"><span className={styles.loadingDot} />Loading studio map…</div>}
      {status === 'partial' && <div className={styles.tileNotice} role="status">Some map details couldn’t load.<button type="button" onClick={retry}>Retry</button></div>}
      {status === 'error' && (
        <div className={styles.fallback} role="status">
          <span className={styles.eyebrow}>ALGOFORT STUDIO</span>
          <strong>The map is temporarily unavailable</strong>
          <p>84j Ghazali Rd, Block 2 PECHS, Karachi</p>
          <div><button type="button" onClick={retry}>Try again</button><a href={STUDIO_LOCATION.mapUrl} target="_blank" rel="noopener noreferrer">View location ↗</a></div>
        </div>
      )}
    </div>
  );
}
