'use client';

import React, { useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OFFICE_LOCATION } from './contactLocation';
import styles from './ContactMap.module.css';

/**
 * Helper to ensure Leaflet tiles invalidate and resize properly
 * without grey areas on mount, layout changes, or window resizes.
 */
function MapController() {
  const map = useMap();

  useEffect(() => {
    // Invalidate size immediately and after short delay for container animation/flex stabilization
    map.invalidateSize();
    const t1 = setTimeout(() => map.invalidateSize(), 150);
    const t2 = setTimeout(() => map.invalidateSize(), 500);

    const handleResize = () => {
      map.invalidateSize();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
    };
  }, [map]);

  return null;
}

/**
 * Unified Map Controls Stack (Zoom In, Zoom Out, Recenter)
 * All vertically aligned inside a single cohesive container
 */
function MapControls({ center, zoom }) {
  const map = useMap();

  const handleZoomIn = (e) => {
    e.stopPropagation();
    map.zoomIn();
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    map.zoomOut();
  };

  const handleRecenter = (e) => {
    e.stopPropagation();
    map.flyTo(center, zoom, { duration: 0.8 });
  };

  return (
    <div className={styles.controlsStack}>
      <button
        type="button"
        onClick={handleZoomIn}
        className={styles.controlBtn}
        aria-label="Zoom in"
        title="Zoom in"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleZoomOut}
        className={styles.controlBtn}
        aria-label="Zoom out"
        title="Zoom out"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
        </svg>
      </button>

      <button
        type="button"
        onClick={handleRecenter}
        className={`${styles.controlBtn} ${styles.recenterBtn}`}
        aria-label="Recenter on Algofort Studio"
        title="Recenter on Algofort Studio"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
        </svg>
      </button>
    </div>
  );
}

export default function ContactMapLeaflet() {
  // Custom marker icon matching Algofort brand design with light/white glass theme
  const customIcon = useMemo(() => {
    return L.divIcon({
      className: styles.customLeafletIcon,
      html: `
        <div class="${styles.markerContainer}">
          <span class="${styles.markerLabel}">ALGOFORT</span>
          <div class="${styles.markerPin}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/>
              <circle cx="12" cy="10" r="2.5"/>
            </svg>
          </div>
          <div class="${styles.markerShadow}"></div>
        </div>
      `,
      iconSize: [46, 64],
      iconAnchor: [23, 64],
      popupAnchor: [0, -66],
    });
  }, []);

  return (
    <div className={styles.leafletWrapper}>
      {/* Studio Floating Badge at Top-Left */}
      <div className={styles.studioBadge} aria-hidden="true">
        <div className={styles.badgeIcon}>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div>
          <span className={styles.eyebrow}>OUR STUDIO ADDRESS</span>
          <span className={styles.badgeTitle}>{OFFICE_LOCATION.address}</span>
        </div>
      </div>

      <MapContainer
        center={OFFICE_LOCATION.coordinates}
        zoom={OFFICE_LOCATION.zoom}
        scrollWheelZoom={false}
        zoomControl={false}
        attributionControl={true}
        className={styles.mapContainer}
      >
        <MapController />

        {/* Unified Vertical Controls Stack at Top-Right */}
        <MapControls center={OFFICE_LOCATION.coordinates} zoom={OFFICE_LOCATION.zoom} />

        {/* Official OpenStreetMap Tile Layer */}
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors'
          maxZoom={19}
        />

        {/* Studio Marker & Popup */}
        <Marker position={OFFICE_LOCATION.coordinates} icon={customIcon}>
          <Popup className={styles.customPopup} autoPanPadding={[24, 24]}>
            <div className={styles.popupContent}>
              <span className={styles.eyebrow}>COME SAY HELLO</span>
              <strong className={styles.popupTitle}>{OFFICE_LOCATION.name}</strong>
              <p className={styles.popupAddress}>{OFFICE_LOCATION.address}</p>
              <div className={styles.popupActions}>
                <a
                  href={OFFICE_LOCATION.osmUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.popupActionLink}
                >
                  <span>View on OpenStreetMap</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.actionArrow}
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
                <a
                  href={OFFICE_LOCATION.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.popupActionLink}
                >
                  <span>Directions</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={styles.actionArrow}
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Desktop / Touch Hint */}
      <p className={styles.gestureHint}>
        <span className={styles.desktopHint}>Drag to explore · Use +/- or double-click to zoom</span>
        <span className={styles.touchHint}>Use fingers to pan & zoom</span>
      </p>
    </div>
  );
}
