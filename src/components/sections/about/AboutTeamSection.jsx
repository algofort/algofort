'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SubtitleMarquee } from '../../common/SubtitleMarquee';
import { initTitleAnimation } from '../../../utils/titleAnimation';

const teamMembers = [
  {
    id: 'wade-warren',
    name: 'Wade Warren',
    role: 'Web Developer',
    image: '/assets/team/img-team-1.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    role: 'Web Developer',
    image: '/assets/team/img-team-2.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'jenny-wilson',
    name: 'Jenny Wilson',
    role: 'Web Developer',
    image: '/assets/team/img-team-3.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'cody-fisher',
    name: 'Cody Fisher',
    role: 'Web Developer',
    image: '/assets/team/img-team-4.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'robert-fox',
    name: 'Robert Fox',
    role: 'Web Developer',
    image: '/assets/team/img-team-5.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'albert-flores',
    name: 'Albert Flores',
    role: 'Web Developer',
    image: '/assets/team/img-team-6.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'jerome-bell',
    name: 'Jerome Bell',
    role: 'Web Developer',
    image: '/assets/team/img-team-1.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
  {
    id: 'devon-lane',
    name: 'Devon Lane',
    role: 'Web Developer',
    image: '/assets/team/img-team-3.webp',
    socials: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
      twitter: 'https://twitter.com',
    },
  },
];

export function AboutTeamSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const titleEl = sectionRef.current.querySelector('.sec-about-team__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 85%', stagger: 0.02 });
      const t = setTimeout(() => ScrollTrigger.refresh(), 150);
      return () => clearTimeout(t);
    }
  }, []);

  return (
    <div className="sec-about-team-wrapper">
      <section
        ref={sectionRef}
        id="sec-about-team"
        className="site-section sec-about-team section-home-service"
      >
        <div className="site-container sec-about-team__container padding-global">
        <div className="container-large">
          <div className="padding-section-large sec-about-team__padding">
            {/* Header */}
            <div className="section-header sec-about-team__header">
              <div className="section-badge sec-about-team__badge">
                <SubtitleMarquee
                  text="Top Members — "
                  variant="dark"
                  icon="/assets/68f7ca5b06eb018b17750d6c_star-icon.svg"
                />
              </div>
              <h2 className="heading-style-h2 section-title sec-about-team__title">
                <span className="team-heading-main">A Great Team is Key to a </span>
                <span className="text-color-secondary">Successful Company</span>
              </h2>
              <p className="section-description sec-about-team__desc alg-text">
                Meet our exceptional team members who bring creativity and expertise to every project.
              </p>
            </div>

            {/* Team Grid */}
            <div className="pxl-grid pxl-team-grid pxl-team-grid1 pxl-team-layout1 sec-about-team__grid">
              {teamMembers.map((member) => (
                <div key={member.id} className="pxl-grid-item sec-about-team__item">
                  <div className="pxl-item--inner sec-about-team__card">
                    {/* Member Cutout Image */}
                    <div className="pxl-item--image">
                      <div className="pxl-item--image-link">
                        <img
                          loading="lazy"
                          decoding="async"
                          className="no-lazyload"
                          src={member.image}
                          width={314}
                          height={343}
                          alt={member.name}
                          title={member.name}
                        />
                      </div>
                    </div>

                    {/* Member Meta & Social Actions */}
                    <div className="pxl-content">
                      <div className="pxl-item--holder pxl-transition">
                        <h3 className="pxl-item--title heading-style-h3">{member.name}</h3>
                        <div className="pxl-item--position">
                          <span>{member.role}</span>
                        </div>
                      </div>

                      {/* Trigger Plus Button */}
                      <div className="pxl-social--button" aria-label="Social Menu">
                        <span className="pxl-social--plus-icon">+</span>
                      </div>

                      {/* Floating Slide-up Social Links */}
                      <div className="pxl-item--social">
                        <a
                          href={member.socials.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Facebook`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                          </svg>
                        </a>
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Instagram`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Twitter`}
                        >
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Join Collective Banner */}
            <div className="sec-about-team__join-bar">
              <div className="sec-about-team__join-text">
                <span className="join-highlight">Join our team:</span> Recruiting skilled agency talent for exciting, rewarding opportunities.
              </div>
              <div className="sec-about-team__join-action">
                <Link href="/contact" className="main-button alternate-button w-inline-block">
                  <div className="main-button-block">
                    <div className="button-text alternate-text">Join The Collective</div>
                    <div className="button-text alternate-text">Join The Collective</div>
                  </div>
                  <img
                    loading="lazy"
                    src="/assets/68f287b26ff74f4a3003bac0_black-star-icon.svg"
                    alt="Star Icon"
                    className="button-icon"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
  );
}
