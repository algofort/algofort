import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight, Sparkles, Code2, Cpu, Rocket } from 'lucide-react';
import { initTitleAnimation } from '../../utils/titleAnimation';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Respect reduced-motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const titleEl = containerRef.current?.querySelector('.sec-hero__title');
    if (titleEl) {
      initTitleAnimation(titleEl, { start: 'top 90%', stagger: 0.02 });
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    timeline
      .from('.sec-hero__badge', {
        y: -20,
        opacity: 0,
        duration: 0.6,
      })
      .from('.sec-hero__desc', {
        y: 20,
        opacity: 0,
        duration: 0.7,
      }, '-=0.4')
      .from('.sec-hero__cta-group', {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, '-=0.4')
      .from('.sec-hero__card', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      }, '-=0.3');

  }, { scope: containerRef });

  return (
    <section id="sec-hero" ref={containerRef} className="site-section sec-hero pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="site-container sec-hero__container">
        
        {/* Section Header Standard Skeleton */}
        <div className="section-header sec-hero__header">
          <span className="section-badge sec-hero__badge">
            <Sparkles className="w-4 h-4 text-[#6366F1]" />
            Digital Agency & Software Lab
          </span>

          <h1 className="section-title sec-hero__title text-balance text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Architecting <span className="bg-gradient-to-r from-white via-indigo-200 to-[#6366F1] bg-clip-text text-transparent">High-Impact</span> Digital Experiences
          </h1>

          <p className="section-description sec-hero__desc max-w-2xl mt-6 alg-text">
            We partner with visionary startups and enterprise brands to design, engineer, and scale state-of-the-art web applications with flawless performance.
          </p>

          <div className="sec-hero__cta-group flex flex-wrap items-center justify-center gap-4 mt-8">
            <a href="#sec-contact" className="btn-primary sec-hero__cta-btn">
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a href="#sec-work" className="btn-secondary sec-hero__secondary-btn">
              Explore Case Studies
            </a>
          </div>
        </div>

        {/* Hero Feature Cards Grid */}
        <div className="section-content sec-hero__content mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="content-card sec-hero__card group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Code2 className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="section-subtitle sec-hero__card-title text-xl mb-2">Modern Architecture</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed alg-text">
              Clean React components built with strict BEM symmetry, TypeScript precision, and zero bloated code.
            </p>
          </div>

          <div className="content-card sec-hero__card group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Cpu className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="section-subtitle sec-hero__card-title text-xl mb-2">GSAP Powered</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed alg-text">
              Fluid 60fps micro-interactions and ScrollTrigger animations engineered for maximum GPU performance.
            </p>
          </div>

          <div className="content-card sec-hero__card group">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-[#6366F1]" />
            </div>
            <h3 className="section-subtitle sec-hero__card-title text-xl mb-2">High Performance</h3>
            <p className="text-sm text-[#9CA3AF] leading-relaxed alg-text">
              Lightning-fast Core Web Vitals, zero layout shift, optimized image assets, and strict security standards.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
