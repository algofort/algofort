import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import BrandSentence from './components/BrandSentence'
import SmoothScroll from './components/SmoothScroll'
import BrandApproach from './components/BrandApproach'
import ActionButton from './components/ActionButton'
import StudioSections from './components/StudioSections'
import HeroGallery from './components/HeroGallery'
import SiteFooter from './components/SiteFooter'
import ProjectInquiry from './components/ProjectInquiry'
import MobileMenu from './components/MobileMenu'
import WelcomeInquiry from './components/WelcomeInquiry'
import './App.css'
import BackToTop from '../../shared/BackToTop.jsx'
import '../../shared/popup.css'

gsap.registerPlugin(ScrollTrigger)

function MenuLabel({ text }: { text: string }) {
  return <span className="button-label" aria-hidden="true"><span className="button-text button-text-one">{text}</span><span className="button-text button-text-two">{text}</span></span>
}

function App() {
  const [menuActive, setMenuActive] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const mainRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.timeline({ defaults: { ease: 'power3.out' } })
          .fromTo('#hero-heading > span', { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.12, clearProps: 'transform,opacity' })
          .fromTo('.hero-aside p', { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.65, clearProps: 'transform,opacity' }, 0.25)
          .fromTo('.hero-cta', { y: 12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, clearProps: 'transform,opacity' }, 0.45)
      }, heroRef)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>('.studio-services-description, .process-intro, .latest-work-description').forEach(paragraph => {
          gsap.fromTo(paragraph, { opacity: 0 }, {
            opacity: 1, duration: 0.7, ease: 'power2.out', clearProps: 'opacity',
            scrollTrigger: { trigger: paragraph, start: 'top 90%', once: true },
          })
        })
      }, mainRef)
      return () => context.revert()
    })
    return () => media.revert()
  }, [])

  function openInquiry() {
    history.pushState(null, '', '#contact')
    const navigation = new CustomEvent('algofort:navigate', { detail: '#contact', cancelable: true })
    if (window.dispatchEvent(navigation)) document.getElementById('contact')?.scrollIntoView({ block: 'start' })
    document.getElementById('inquiry-heading')?.focus({ preventScroll: true })
  }

  return (
    <>
      <SmoothScroll />
      <header className={`site-header page-inset${menuActive ? ' mobile-menu-active' : ''}`} id="top" role={menuActive ? 'dialog' : undefined} aria-modal={menuActive ? true : undefined} aria-label={menuActive ? 'Mobile navigation' : undefined}>
        <a className="wordmark" href="#" aria-label="Algofort home"><img src="https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792214818/algofort/lp/brand-agency/brand/algofort-dark.webp" alt="Algofort" width="156" height="28" /></a>
        <MobileMenu onProject={openInquiry} onActiveChange={setMenuActive} />
        <nav id="main-navigation" className="navigation" aria-label="Main navigation">
          <a className="nav-roll" href="#work" aria-label="Work"><MenuLabel text="Work" /></a>
          <a className="nav-roll" href="#approach" aria-label="Approach"><MenuLabel text="Approach" /></a>
          <button className="nav-contact nav-roll" type="button" aria-label="Contact" onClick={openInquiry}><MenuLabel text="Contact" /></button>
          <ActionButton className="header-cta" onClick={openInquiry}>Start a project</ActionButton>
        </nav>
      </header>

      <main ref={mainRef}>
        <section className="hero page-inset" ref={heroRef} aria-labelledby="hero-heading">
          <div className="hero-layout">
            <h1 id="hero-heading">
              <span>Designing</span>
              <span>Brand Stories</span>
            </h1>
            <div className="hero-aside">
              <p>Thoughtful strategy. Distinctive design.<br />An identity that brings your business into focus.</p>
              <ActionButton className="hero-cta" arrow onClick={openInquiry}>Build Your Brand</ActionButton>
            </div>
          </div>
        </section>

        <HeroGallery />
        <BrandSentence />
        <BrandApproach />
        <StudioSections onProject={openInquiry} />
        <ProjectInquiry />
      </main>
      <SiteFooter />
      <BackToTop />
      <WelcomeInquiry />
    </>
  )
}

export default App
