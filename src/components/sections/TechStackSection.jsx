'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SubtitleMarquee } from '../common/SubtitleMarquee';
import { initTitleAnimation } from '../../utils/titleAnimation';

const techRowsData = [
  // Row 1: Frontend & Core Frameworks (12 icons)
  [
    { id: 'html5', label: 'HTML5' },
    { id: 'css', label: 'CSS3' },
    { id: 'js', label: 'JavaScript' },
    { id: 'typescript', label: 'TypeScript' },
    { id: 'react', label: 'React' },
    { id: 'nextjs', label: 'Next.js' },
    { id: 'tailwindcss', label: 'Tailwind CSS' },
    { id: 'materialui', label: 'Material UI' },
    { id: 'reactnative', label: 'React Native' },
    { id: 'nodejs', label: 'Node.js' },
    { id: 'nestjs', label: 'NestJS' },
    { id: 'express', label: 'Express' },
  ],
  // Row 2: Databases, Cloud & Design Tools (12 icons)
  [
    { id: 'graphql', label: 'GraphQL' },
    { id: 'mongodb', label: 'MongoDB' },
    { id: 'postgresql', label: 'PostgreSQL' },
    { id: 'mysqli', label: 'MySQL' },
    { id: 'firebase', label: 'Firebase' },
    { id: 'supabase', label: 'Supabase' },
    { id: 'docker', label: 'Docker' },
    { id: 'figma', label: 'Figma' },
    { id: 'adobexd', label: 'Adobe XD' },
    { id: 'illustrator', label: 'Illustrator' },
    { id: 'photoshop', label: 'Photoshop' },
    { id: 'webflow', label: 'Webflow' },
  ],
];

function ToolIcon({ id, label, index }) {
  const src = `/dock-icons/${id}.png`;

  return (
    <div className="alg-tools-icon tool-icon" style={{ '--delay': `${index * 0.03}s` }}>
      <div className="alg-tools-icon-inner tool-icon-inner">
        <img src={src} alt={label} />
      </div>
      <div className="alg-tools-tooltip tool-tooltip">{label}</div>
    </div>
  );
}

export function TechStackSection() {
  const sectionRef = useRef(null);
  const dockRef = useRef(null);

  // GSAP Button swipe hover animation
  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const mainTitle = sectionRef.current.querySelector('.sec-tools__title');
      if (mainTitle) {
        initTitleAnimation(mainTitle, { start: 'top 85%', stagger: 0.02 });
      }

      const buttons = sectionRef.current.querySelectorAll('.main-button');
      buttons.forEach((btn) => {
        const texts = btn.querySelectorAll('.button-text');
        const icon = btn.querySelector('.button-icon');

        const onMouseEnter = () => {
          if (texts.length >= 2) {
            gsap.to(texts, { yPercent: -100, duration: 0.35, ease: 'power2.out' });
          }
          if (icon) {
            gsap.to(icon, { rotate: 90, duration: 0.35, ease: 'power2.out' });
          }
        };

        const onMouseLeave = () => {
          if (texts.length) {
            gsap.to(texts, { yPercent: 0, duration: 0.35, ease: 'power2.out' });
          }
          if (icon) {
            gsap.to(icon, { rotate: 0, duration: 0.35, ease: 'power2.out' });
          }
        };

        btn.addEventListener('mouseenter', onMouseEnter);
        btn.addEventListener('mouseleave', onMouseLeave);
      });
    },
    { scope: sectionRef }
  );

  // GSAP MacOS Dock Magnification Pointer Animation with Single-Row Isolation
  useEffect(() => {
    const container = dockRef.current;
    if (!container) return;

    gsap.set('.tool-tooltip', { xPercent: -50, y: -10, scale: 0.6 });
    gsap.set('.tool-icon-inner', { transformOrigin: '50% 100%' });

    const onMove = (event) => {
      const rows = Array.from(container.querySelectorAll('.tools-icons-row'));
      if (!rows.length) return;

      // Find the single row closest to cursor vertical position
      let activeRowIndex = -1;
      let minDiffY = Infinity;

      rows.forEach((row, idx) => {
        const rect = row.getBoundingClientRect();
        const rowCenterY = rect.top + rect.height / 2;
        const diffY = Math.abs(event.clientY - rowCenterY);

        if (event.clientY >= rect.top - 15 && event.clientY <= rect.bottom + 15) {
          if (diffY < minDiffY) {
            minDiffY = diffY;
            activeRowIndex = idx;
          }
        }
      });

      rows.forEach((row, idx) => {
        if (idx === activeRowIndex) {
          const icons = row.querySelectorAll('.tool-icon');
          if (!icons.length) return;
          const firstIcon = icons[0];
          const iconWidth = firstIcon.offsetWidth;
          const rowRect = row.getBoundingClientRect();
          const computedGap = parseFloat(getComputedStyle(row).gap);
          const gap =
            !isNaN(computedGap) && computedGap > 0
              ? computedGap
              : (rowRect.width - iconWidth * icons.length) / Math.max(1, icons.length - 1);
          const min = iconWidth + gap;
          const max = min * 1.35;
          const bound = min * Math.PI;
          const offset = rowRect.left + firstIcon.offsetLeft;
          const pointer = event.clientX - offset;

          icons.forEach((icon, i) => {
            const inner = icon.querySelector('.tool-icon-inner');
            const tooltip = icon.querySelector('.tool-tooltip');
            const distance = i * min + min / 2 - pointer;
            let x = 0,
              scale = 1;

            if (-bound < distance && distance < bound) {
              const rad = (distance / min) * 0.5;
              scale = 1 + (max / min - 1) * Math.cos(rad);
              x = 2 * (max - min) * Math.sin(rad);
            } else {
              x = (-bound < distance ? 2 : -2) * (max - min);
            }

            gsap.to(inner, {
              duration: 0.25,
              x,
              scale,
              zIndex: Math.round(scale * 100),
              ease: 'power2.out',
            });

            const isHovered = Math.abs(distance) < min * 0.5;
            gsap.to(tooltip, {
              duration: 0.25,
              x,
              y: isHovered ? 0 : -10,
              opacity: isHovered ? 1 : 0,
              scale: isHovered ? 1 : 0.6,
              zIndex: Math.round(scale * 100) - 1,
              ease: 'power2.out',
            });
          });
        } else {
          // Strictly reset inactive rows
          const inners = row.querySelectorAll('.tool-icon-inner');
          const tooltips = row.querySelectorAll('.tool-tooltip');
          gsap.to(inners, {
            duration: 0.3,
            scale: 1,
            x: 0,
            zIndex: 1,
            ease: 'power2.out',
          });
          gsap.to(tooltips, {
            duration: 0.25,
            opacity: 0,
            y: -10,
            scale: 0.6,
            x: 0,
            ease: 'power2.out',
          });
        }
      });
    };

    const onLeave = () => {
      gsap.to('.tool-icon-inner', {
        duration: 0.35,
        scale: 1,
        x: 0,
        zIndex: 1,
        ease: 'power2.out',
      });
      gsap.to('.tool-tooltip', {
        duration: 0.25,
        opacity: 0,
        y: -10,
        scale: 0.6,
        x: 0,
        ease: 'power2.out',
      });
    };

    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section className="alg-tools site-section sec-tools tools-section" id="sec-tools" ref={sectionRef}>
      <div className="alg-tools-container site-container sec-tools__container tools-container">
        {/* Header matching FAQ & Services title style */}
        <div className="alg-tools-header section-header sec-tools__header tools-header">
          <div className="alg-tools-badge section-badge sec-tools__badge">
            <SubtitleMarquee text="Tech Stack & Tools — " variant="dark" />
          </div>
          <h2 className="alg-tools-title heading-style-h2 section-title sec-tools__title" style={{ color: '#05080C' }}>
            Our Tech <br />
            <span className="text-color-secondary">Stack</span>
          </h2>
        </div>

        {/* Dock Magnification Grid Rows using custom PNG logos */}
        <div className="alg-tools-dock-container tools-icons-container" id="dockContainer" ref={dockRef}>
          {techRowsData.map((rowItems, rowIndex) => (
            <div key={`row-${rowIndex}`} className="alg-tools-icons-row tools-icons-row">
              {rowItems.map((tool, itemIndex) => (
                <ToolIcon
                  key={`${tool.id}-${itemIndex}`}
                  id={tool.id}
                  label={tool.label}
                  index={rowIndex * 12 + itemIndex}
                />
              ))}
            </div>
          ))}
        </div>

        <div className="alg-tools-footer tools-footer">
          <p className="alg-tools-desc section-description sec-tools__desc tools-desc alg-text">
            We design products that live in the digital world: intuitive UX, sharp UI, immersive 3D and
            motion. From research to launch, we craft bold, seamless experiences.
          </p>
          <Link href="/process" className="main-button footer-submit-btn w-inline-block">
            <div className="main-button-block">
              <div className="button-text">See how we work</div>
              <div className="button-text">See how we work</div>
            </div>
            <img
              loading="lazy"
              src="/assets/68f287b26ff74f4a3003bac1_white-star-icon.svg"
              alt="Star Icon"
              className="button-icon"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
