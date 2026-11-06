'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import styles from './ContactMap.module.css';

// Dynamically import Leaflet with SSR disabled to ensure window/document are only accessed in the browser
const ContactMapLeaflet = dynamic(
  () => import('./ContactMapLeaflet'),
  {
    ssr: false,
    loading: () => (
      <div className={styles.loading} role="status">
        <span className={styles.loadingDot} />
        Loading studio map…
      </div>
    ),
  }
);

export function ContactMap() {
  return (
    <div
      className={`alg-contact-map-iframe ${styles.map}`}
      role="region"
      aria-label="Algofort Studio location map"
      data-lenis-prevent
    >
      <ContactMapLeaflet />
    </div>
  );
}
