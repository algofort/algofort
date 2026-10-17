import { useEffect, useLayoutEffect, useRef, useState, type FormEvent, type RefObject } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import SmoothScroll from './SmoothScroll'
import AppPortfolio from './AppPortfolio'
import WhatMakesUsDifferent from './WhatMakesUsDifferent'
import ClientReviews from './ClientReviews'
import LeadTablet from './LeadTablet'
import SiteFooter from './SiteFooter'
import MobileMenu from './MobileMenu'
import { useAppCaptcha, sendAppLead } from './lead'
import EntrancePopup from './EntrancePopup'
import {
  ArrowRight, ArrowUpRight, Bell, Check, ChevronLeft,
  Compass, Home, Mail, Search, Send, Sparkles, Target, PenTool, Code2,
} from 'lucide-react'

type Screen = 'home' | 'discover' | 'contact'
type Category = 'All' | 'Wellness' | 'Lifestyle' | 'Work'

const experiences = [
  { category: 'Wellness', title: 'Find your balance', detail: 'A calmer way to build better habits.', tone: 'peach', icon: '✳' },
  { category: 'Lifestyle', title: 'Everyday moments', detail: 'Little discoveries, made personal.', tone: 'lavender', icon: '✦' },
  { category: 'Work', title: 'Plan with purpose', detail: 'Make room for the work that matters.', tone: 'cream', icon: '◈' },
] as const

function HomeScreen({ onDiscover, onContact }: { onDiscover: () => void; onContact: () => void }) {
  return <div className="app-page app-home">
    <div className="app-topline"><div className="demo-wordmark"><span className="demo-mark">a<span>✳</span></span><strong>alto</strong></div><button className="icon-button" type="button" aria-label="Notifications" onClick={onContact}><Bell size={17}/><i/></button></div>
    <div className="app-greeting"><span>YOUR DAY, YOUR WAY</span><h2>Good morning,<br/><em>Alex.</em></h2><p>Make today feel a little more yours.</p></div>
    <button className="feature-card" type="button" onClick={onDiscover}>
      <span className="feature-eyebrow"><Sparkles size={13}/> CURATED FOR YOU</span>
      <span className="feature-title">Find your<br/>next good thing.</span>
      <span className="feature-action">Explore now <ArrowUpRight size={17}/></span>
      <span className="feature-art" aria-hidden="true"><i/><i/><i/></span>
    </button>
    <div className="app-section-heading"><h3>Made for your day</h3><button type="button" onClick={onDiscover}>See all <ArrowRight size={14}/></button></div>
    <div className="quick-grid">
      <button className="quick-card quick-wellness" type="button" onClick={onDiscover}><span className="quick-symbol">✳</span><strong>Wellness</strong><span>A moment to reset <ArrowUpRight size={13}/></span></button>
      <button className="quick-card quick-work" type="button" onClick={onDiscover}><span className="quick-symbol">◈</span><strong>Focus</strong><span>Make it happen <ArrowUpRight size={13}/></span></button>
    </div>
    <button className="app-contact-prompt" type="button" onClick={onContact}><span><strong>Have an app idea?</strong><small>Let's build yours together.</small></span><span className="prompt-arrow"><ArrowUpRight size={16}/></span></button>
  </div>
}

function DiscoverScreen({ onContact }: { onContact: () => void }) {
  const [category, setCategory] = useState<Category>('All')
  const [selected, setSelected] = useState<string | null>(null)
  const filtered = category === 'All' ? experiences : experiences.filter((item) => item.category === category)

  return <div className="app-page app-discover">
    <div className="app-topline"><div className="demo-wordmark"><span className="demo-mark">a<span>✳</span></span><strong>alto</strong></div><button className="icon-button" type="button" aria-label="Start a project" onClick={onContact}><Mail size={17}/></button></div>
    {selected ? <>
      <button className="app-back" type="button" onClick={() => setSelected(null)}><ChevronLeft size={17}/> Discover</button>
      <div className="detail-art"><span>✳</span><i/><i/></div>
      <span className="detail-kicker">DESIGNED TO FEEL DIFFERENT</span>
      <h2 className="discover-title">{selected}<span>.</span></h2>
      <p className="discover-copy">This is a small glimpse of how thoughtful design can make every tap feel clear, useful, and a little more delightful.</p>
      <button className="app-primary" type="button" onClick={onContact}>Build an app like this <ArrowUpRight size={17}/></button>
    </> : <>
      <div className="discover-heading"><span>EXPLORE ALTO</span><h2>Find something<br/><em>good today.</em></h2><p>Thoughtful experiences, all in one place.</p></div>
      <div className="search-visual"><Search size={16}/><span>Explore experiences</span></div>
      <div className="category-row" role="group" aria-label="Filter experiences">{(['All','Wellness','Lifestyle','Work'] as Category[]).map((item) => <button key={item} className={category === item ? 'selected' : ''} type="button" aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}</div>
      <div className="experience-list">{filtered.map((item) => <button key={item.title} className={`experience-item ${item.tone}`} type="button" onClick={() => setSelected(item.title)}><span className="experience-art">{item.icon}</span><span className="experience-text"><small>{item.category.toUpperCase()}</small><strong>{item.title}</strong><span>{item.detail}</span></span><ArrowUpRight size={16}/></button>)}</div>
      <button className="discover-footer-link" type="button" onClick={onContact}>Inspired? Let's create yours <ArrowRight size={16}/></button>
    </>}
  </div>
}

function ContactScreen() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [honey, setHoney] = useState('')
  const { captchaRef, error, setError } = useAppCaptcha(status)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (honey || status === 'sending') return
    setError('')
    setStatus('sending')
    const form = event.currentTarget
    try {
      await sendAppLead(form, 'lp-app-preview', captchaRef.current, honey)
      form.reset()
      setStatus('sent')
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : 'Your enquiry could not be sent. Please try again.')
      setStatus('error')
    }
  }

  return <div className="app-page app-contact">
    <div className="app-topline"><div className="demo-wordmark"><span className="demo-mark">a<span>✳</span></span><strong>alto</strong></div><span className="contact-top-icon"><Sparkles size={18}/></span></div>
    {status === 'sent' ? <div className="sent-state"><span className="sent-icon"><Check size={28}/></span><span className="contact-kicker">MESSAGE RECEIVED</span><h2>Thanks for<br/><em>reaching out.</em></h2><p>We have your project details. The Algofort team will be in touch soon.</p><button type="button" onClick={() => setStatus('idle')}>Send another idea <ArrowRight size={16}/></button></div> : <>
      <div className="contact-intro"><span className="contact-kicker">LET'S MAKE IT REAL</span><h2>Your idea<br/><em>starts here.</em></h2><p>Tell us a little about your app. We'll take it from there.</p></div>
      <form className="lead-form" onSubmit={handleSubmit}>
        <label>YOUR NAME<input name="name" type="text" placeholder="Alex Morgan" autoComplete="name" maxLength={80} required /></label>
        <label>EMAIL ADDRESS<input name="email" type="email" placeholder="alex@example.com" autoComplete="email" maxLength={120} required /></label>
        <label>WHAT ARE YOU BUILDING?<select name="project_type" defaultValue="" required><option value="" disabled>Select project type</option><option>iOS or Android app</option><option>Cross-platform app</option><option>Existing app redesign</option><option>Still exploring</option></select></label>
        <label>YOUR IDEA<textarea name="message" rows={3} placeholder="Tell us what you'd love to create..." maxLength={1500} required /></label>
        <label className="honey-field" aria-hidden="true">Leave this empty<input name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={(event) => setHoney(event.target.value)} /></label>
        <div className="app-recaptcha" ref={captchaRef} data-captcha-size="compact" aria-label="Security check" />
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="app-primary" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending your idea…' : 'Send my idea'}<Send size={16}/></button>
        <p className="form-note">We'll use your details to reply about your project.</p>
      </form>
    </>}
  </div>
}

function PreviewScreen({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  const [visibleScreen, setVisibleScreen] = useState(screen)
  const scrollRef = useRef<HTMLDivElement>(null)
  const firstRender = useRef(true)

  useLayoutEffect(() => {
    const element = scrollRef.current!
    gsap.killTweensOf(element)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleScreen(screen)
      gsap.set(element, { clearProps: 'transform,opacity,visibility' })
      return
    }
    if (screen === visibleScreen) {
      const restore = gsap.to(element, { autoAlpha: 1, y: 0, duration: 0.2, ease: 'power2.out' })
      return () => { restore.kill() }
    }
    const exit = gsap.to(element, {
      autoAlpha: 0, y: -10, duration: 0.16, ease: 'power1.in',
      onComplete: () => setVisibleScreen(screen),
    })
    return () => { exit.kill() }
  }, [screen])

  useLayoutEffect(() => {
    const element = scrollRef.current!
    element.scrollTop = 0
    if (firstRender.current) { firstRender.current = false; return }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const enter = gsap.fromTo(element, { autoAlpha: 0, y: 14 }, {
      autoAlpha: 1, y: 0, duration: 0.34, ease: 'power2.out', clearProps: 'transform,opacity,visibility',
    })
    return () => { enter.kill() }
  }, [visibleScreen])

  return <div className="app-scroll" ref={scrollRef} data-lenis-prevent aria-busy={screen !== visibleScreen}>
    {visibleScreen === 'home' ? <HomeScreen onDiscover={() => setScreen('discover')} onContact={() => setScreen('contact')}/> : visibleScreen === 'discover' ? <DiscoverScreen onContact={() => setScreen('contact')}/> : <ContactScreen/>}
  </div>
}

function PhonePreview({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return <div className="phone-composition" id="experience">
    <div className="preview-label"><span className="preview-dot"/> LIVE APP PREVIEW <span className="preview-line"/> TAP TO EXPLORE</div>
    <div className="phone-halo" aria-hidden="true"/>
    <div className="preview-layout">
      <aside className="preview-story" aria-label="Our approach to app development">
        <p className="rail-eyebrow"><span>01 /</span> BUILT WITH INTENTION</p>
        <h2>More than a<br/><em>beautiful screen.</em></h2>
        <p className="rail-intro">The best apps feel simple because every detail has been thought through. We bring the product thinking, design, and engineering together.</p>
        <div className="craft-list">
          <div><span className="craft-number">01</span><span><strong>Made for your users</strong><small>Clear journeys from the first tap.</small></span></div>
          <div><span className="craft-number">02</span><span><strong>Built for your business</strong><small>Useful features with a real purpose.</small></span></div>
          <div><span className="craft-number">03</span><span><strong>Ready to grow</strong><small>Strong foundations for what comes next.</small></span></div>
        </div>
        <ul className="story-signature" aria-label="Our expertise">
          <li><Target size={16} strokeWidth={1.5} aria-hidden="true"/><span>Strategy</span></li>
          <li><PenTool size={16} strokeWidth={1.5} aria-hidden="true"/><span>Design</span></li>
          <li><Code2 size={16} strokeWidth={1.5} aria-hidden="true"/><span>Development</span></li>
        </ul>
      </aside>

      <div className="phone-shell" aria-label="Interactive sample mobile app">
        <div className="phone-screen">
          <div className="phone-status"><strong>9:41</strong><span className="dynamic-island"/><span className="status-icons"><i/><i/><i/></span></div>
          <PreviewScreen screen={screen} setScreen={setScreen}/>
          <nav className="app-tabbar" aria-label="Sample app navigation">
            <button type="button" className={screen === 'home' ? 'active' : ''} aria-current={screen === 'home' ? 'page' : undefined} onClick={() => setScreen('home')}><Home size={20}/><span>Home</span></button>
            <button type="button" className={screen === 'discover' ? 'active' : ''} aria-current={screen === 'discover' ? 'page' : undefined} onClick={() => setScreen('discover')}><Compass size={20}/><span>Explore</span></button>
            <button type="button" className={screen === 'contact' ? 'active' : ''} aria-current={screen === 'contact' ? 'page' : undefined} onClick={() => setScreen('contact')}><Mail size={20}/><span>Start project</span></button>
          </nav>
          <div className="phone-home-indicator" aria-hidden="true"/>
        </div>
      </div>

      <aside className="preview-guide" aria-label="Explore the live app preview">
        <p className="rail-eyebrow"><span>02 /</span> YOUR TURN TO EXPLORE</p>
        <h2>Don't just look.<br/><em>Try it.</em></h2>
        <p className="rail-intro">Switch between screens to see how the experience works. When you're ready, tell us what you want to build.</p>
        <div className="screen-switcher" role="group" aria-label="Choose a preview screen">
          <button className={screen === 'home' ? 'selected' : ''} type="button" aria-pressed={screen === 'home'} onClick={() => setScreen('home')}><span className="switch-icon"><Home size={20}/></span><span><strong>Home</strong><small>See the first impression</small></span><ArrowUpRight className="switch-arrow" size={18}/></button>
          <button className={screen === 'discover' ? 'selected' : ''} type="button" aria-pressed={screen === 'discover'} onClick={() => setScreen('discover')}><span className="switch-icon"><Compass size={20}/></span><span><strong>Explore</strong><small>Browse the experience</small></span><ArrowUpRight className="switch-arrow" size={18}/></button>
          <button className={screen === 'contact' ? 'selected' : ''} type="button" aria-pressed={screen === 'contact'} onClick={() => setScreen('contact')}><span className="switch-icon"><Mail size={20}/></span><span><strong>Start a project</strong><small>Tell us your idea</small></span><ArrowUpRight className="switch-arrow" size={18}/></button>
        </div>
        <div className="preview-guide-footer"><span className="live-pulse"/> A working preview, made for this page.</div>
      </aside>
    </div>
  </div>
}

function SplitLink({ label, tone, onClick, className = '', href = '#experience', target, rel }: { label: string; tone: 'orange' | 'light'; onClick?: () => void; className?: string; href?: string; target?: string; rel?: string }) {
  return <a className={`split-cta split-cta-${tone} ${className}`} href={href} onClick={onClick} target={target} rel={rel}>
    <span className="split-cta-icon split-cta-icon-left" aria-hidden="true"><ArrowUpRight size={18}/></span>
    <span className="split-cta-pill">{label}</span>
    <span className="split-cta-icon split-cta-icon-right" aria-hidden="true"><ArrowUpRight size={18}/></span>
  </a>
}

const whoStatement = 'We turn bold ideas into mobile apps people return to, with thoughtful design and reliable engineering in every tap.'
const techLogos = [
  { name: 'React Native', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215734/algofort/lp/app-development/tech-logos/react.svg' },
  { name: 'Flutter', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215733/algofort/lp/app-development/tech-logos/flutter.svg' },
  { name: 'iOS', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215731/algofort/lp/app-development/tech-logos/apple.svg' },
  { name: 'Android', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215731/algofort/lp/app-development/tech-logos/android.svg' },
  { name: 'Firebase', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215733/algofort/lp/app-development/tech-logos/firebase.svg' },
  { name: 'Figma', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215731/algofort/lp/app-development/tech-logos/figma.svg' },
  { name: 'Swift', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215734/algofort/lp/app-development/tech-logos/swift.svg' },
  { name: 'Kotlin', icon: 'https://res.cloudinary.com/vfsp1egd/image/upload/v1792215733/algofort/lp/app-development/tech-logos/kotlin.svg' },
]

function useHeadingReveal(headingRef: RefObject<HTMLHeadingElement | null>, sectionRef: RefObject<HTMLElement | null>) {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    const media = gsap.matchMedia()

    media.add('(prefers-reduced-motion: no-preference)', () => {
      const heading = headingRef.current!
      const subtitle = sectionRef.current!.querySelector('.who-kicker')
      if (subtitle) gsap.fromTo(subtitle, { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: subtitle, start: 'top 91%', once: true },
      })
      let lineReveals: gsap.core.Tween[] = []
      const split = SplitText.create(heading, {
        type: 'lines',
        linesClass: 'heading-reveal-line',
        autoSplit: true,
        onSplit: (self) => {
          lineReveals.forEach((reveal) => {
            reveal.scrollTrigger?.kill()
            reveal.kill()
          })
          lineReveals = self.lines.map((line) => gsap.fromTo(line,
            { backgroundPositionX: '100%' },
            {
              backgroundPositionX: '0%',
              ease: 'none',
              scrollTrigger: {
                trigger: line,
                start: 'top 85%',
                end: 'clamp(bottom center)',
                scrub: 1,
                invalidateOnRefresh: true,
              },
            },
          ))
        },
      })

      return () => {
        lineReveals.forEach((reveal) => {
          reveal.scrollTrigger?.kill()
          reveal.kill()
        })
        split.revert()
      }
    }, sectionRef)

    return () => media.revert()
  }, [])

}

function WhoWeAre() {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  useHeadingReveal(headingRef, sectionRef)

  return <section className="who-section" id="who-we-are" aria-labelledby="who-heading" ref={sectionRef}>
    <div className="who-layout">
      <div className="who-aside"><span className="who-kicker"><i aria-hidden="true"/> Who we are</span></div>
      <div className="who-main">
        <h2 id="who-heading" ref={headingRef}>{whoStatement}</h2>
        <SplitLink className="who-more" label="Learn about Algofort" tone="orange" href="/about" target="_blank" rel="noopener noreferrer"/>
      </div>
    </div>
    <div className="who-logos" aria-label="Mobile platforms and tools">
      <div className="who-logos-viewport">
        <div className="who-logos-track">
          {[0, 1].map((copy) => <div className="who-logos-group" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
            {techLogos.map((logo) => <div className="who-logo" key={logo.name}><img src={logo.icon} alt="" loading="lazy"/><span>{logo.name}</span></div>)}
          </div>)}
        </div>
      </div>
    </div>
  </section>
}

const showcaseColumns = [
  [
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215731/algofort/lp/app-development/showcase/wellness.jpg', alt: 'Wellness app concept with a habit dashboard and guided breathing screen' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215729/algofort/lp/app-development/showcase/commerce.jpg', alt: 'Fashion shopping app concept with product and wishlist screens' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215730/algofort/lp/app-development/showcase/healthcare.jpg', alt: 'Telehealth app concept with consultation and care plan screens' },
  ],
  [
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215729/algofort/lp/app-development/showcase/finance.jpg', alt: 'Personal finance app concept with balance and spending analytics screens' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215730/algofort/lp/app-development/showcase/food.jpg', alt: 'Food delivery app concept with restaurant discovery and order tracking screens' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215729/algofort/lp/app-development/showcase/education.jpg', alt: 'Language learning app concept with lessons and quizzes' },
  ],
  [
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215731/algofort/lp/app-development/showcase/travel.jpg', alt: 'Travel app concept with destination discovery and itinerary screens' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215730/algofort/lp/app-development/showcase/productivity.jpg', alt: 'Productivity app concept with a project dashboard and daily plan' },
    { src: 'https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215730/algofort/lp/app-development/showcase/smarthome.jpg', alt: 'Smart home app concept with room controls and thermostat screens' },
  ],
]

function AppShowcase() {
  const stageRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const middleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stage = stageRef.current
    const grid = gridRef.current
    const middle = middleRef.current
    if (!stage || !grid || !middle || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const trigger = { trigger: stage, start: 'top bottom', end: 'bottom bottom', scrub: 1.5, invalidateOnRefresh: true }
      gsap.fromTo(middle, { y: () => window.innerWidth > 767 ? -192 : -32 }, { y: 0, ease: 'none', scrollTrigger: trigger })
      gsap.fromTo(grid, { scale: 1.5 }, { scale: 1, ease: 'power1.inOut', scrollTrigger: trigger })
    }, stage)
    return () => context.revert()
  }, [])

  return <section className="app-showcase" aria-label="App concept gallery">
    <div className="showcase-stage" ref={stageRef}>
      <div className="showcase-grid" ref={gridRef}>
        {showcaseColumns.map((column, index) => <div className="showcase-column" ref={index === 1 ? middleRef : undefined} key={index}>
          {column.map((app) => <div className="showcase-tile" key={app.src}>
            <img src={app.src} alt={app.alt} loading="lazy" />
          </div>)}
        </div>)}
      </div>
    </div>
  </section>
}

const servicesStatement = 'We help ambitious companies turn complex ideas into simple app experiences, from the first strategy session to the product people use every day.'
const services = [
  'Custom Web App Development',
  'Logistics App Development',
  'Classified App Development',
  'E-commerce App Development',
  'On-Demand App Development',
]

function ServicesSection({ onContact }: { onContact: () => void }) {
  const sectionRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const servicesMainRef = useRef<HTMLDivElement>(null)
  const [activeService, setActiveService] = useState<{ top: number; height: number } | null>(null)

  useHeadingReveal(headingRef, sectionRef)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!
      section.querySelectorAll('.services-story > p, .services-invitation > p, .services-invitation > .split-cta').forEach(element => {
        gsap.fromTo(element, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1, y: 0, duration: 0.7, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
      section.querySelectorAll('.services-list li').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1, y: 0, duration: 0.65, delay: index * 0.055, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        })
      })
    }, sectionRef)
    return () => media.revert()
  }, [])

  const showServiceHighlight = (row: HTMLLIElement) => {
    const main = servicesMainRef.current
    if (!main) return
    const rowBounds = row.getBoundingClientRect()
    const mainBounds = main.getBoundingClientRect()
    setActiveService({ top: rowBounds.top - mainBounds.top, height: rowBounds.height })
  }

  return <section className="services-section" id="services" aria-labelledby="services-heading" ref={sectionRef}>
    <div className="services-inner">
      <div className="services-heading-row">
        <div className="who-aside"><span className="who-kicker"><i aria-hidden="true"/> What we Build</span></div>
        <div className="services-heading-wrap who-main">
          <h2 id="services-heading" ref={headingRef}>{servicesStatement}</h2>
        </div>
      </div>
      <div className="services-content-row">
        <div className="services-story">
          <p>Every useful app begins with a real need. We bring product thinking, thoughtful design, and dependable development together to make your idea work for the people who use it.</p>
          <div className="services-invitation"><p>Have an idea worth building?<br/>Let’s give it a great start.</p><SplitLink label="Let's talk about your app" tone="orange" onClick={onContact}/></div>
        </div>
        <div className="services-main" ref={servicesMainRef} onMouseLeave={() => setActiveService(null)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setActiveService(null) }}>
          <span className="services-active-bg" aria-hidden="true" style={{ transform: `translateY(${activeService?.top ?? 0}px)`, height: activeService?.height ?? 0, opacity: activeService ? 1 : 0 }}/>
          <ul className="services-list">{services.map((service) => <li key={service} onMouseEnter={(event) => showServiceHighlight(event.currentTarget)} onFocus={(event) => showServiceHighlight(event.currentTarget)}><a className="service-row" href="#experience" onClick={onContact} aria-label={`Discuss ${service}`}><span>{service}</span><ArrowRight size={21} aria-hidden="true"/></a></li>)}</ul>
        </div>
      </div>
    </div>
  </section>
}

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [menuActive, setMenuActive] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    gsap.registerPlugin(SplitText)
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const hero = heroRef.current!
      gsap.fromTo(headerRef.current, { autoAlpha: 0 }, {
        autoAlpha: 1, duration: 0.85, ease: 'power2.out', clearProps: 'opacity,visibility',
      })
      const split = SplitText.create(hero.querySelector('#hero-heading')!, {
        type: 'lines', mask: 'lines', autoSplit: true,
        linesClass: 'hero-entrance-line',
        onSplit: self => gsap.fromTo(self.lines,
          { yPercent: 110, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 1.05, stagger: 0.12, delay: 0.15, ease: 'power4.out' },
        ),
      })
      const entrance = gsap.timeline({ defaults: { ease: 'power3.out' } })
      entrance.fromTo(hero.querySelector('.hero-badge'), { y: 14, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.65 }, 0)
      entrance.fromTo(hero.querySelector('.hero-description'), { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.55)
      entrance.fromTo(hero.querySelector('.hero-actions'), { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.72)
      entrance.fromTo(hero.querySelector('.preview-label'), { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.92)
      const phone = hero.querySelector<HTMLElement>('.phone-shell')!
      gsap.fromTo(phone, { y: 36, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1.1, ease: 'power3.out',
        delay: phone.getBoundingClientRect().top < window.innerHeight ? 0.95 : 0.08,
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: phone, start: 'top 96%', once: true },
      })
      const sideHeadingSplits = [...hero.querySelectorAll<HTMLElement>('.preview-story h2, .preview-guide h2')].map(heading => SplitText.create(heading, {
        type: 'lines,words,chars', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.fromTo(self.chars, { yPercent: 110, autoAlpha: 0 }, {
          yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.018, ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 90%', once: true },
        }),
      }))
      hero.querySelectorAll<HTMLElement>('.preview-story > *, .preview-guide > :not(.screen-switcher), .screen-switcher button').forEach((element, index) => {
        if (element.tagName === 'H2') return
        const isDescription = element.classList.contains('rail-intro')
        gsap.fromTo(element, { y: 22, autoAlpha: 0 }, {
          y: 0, autoAlpha: 1, duration: isDescription ? 0.45 : 0.8, ease: 'power3.out',
          delay: isDescription ? 0.08 : element.getBoundingClientRect().top < window.innerHeight ? 1.05 + index * 0.045 : 0.06,
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 93%', once: true },
        })
      })
      return () => { split.revert(); sideHeadingSplits.forEach(sideSplit => sideSplit.revert()) }
    }, heroRef)
    return () => media.revert()
  }, [])
  return <div className="site-shell" id="top">
    <SmoothScroll/>
    <header ref={headerRef} className={`site-header${menuActive ? ' mobile-menu-active' : ''}`} role={menuActive ? 'dialog' : undefined} aria-modal={menuActive ? true : undefined} aria-label={menuActive ? 'Mobile navigation' : undefined}>
      <a className="wordmark" href="#top" aria-label="Algofort home"><img src="https://res.cloudinary.com/vfsp1egd/image/upload/f_auto,q_auto:good/v1792215728/algofort/lp/app-development/brand/algofort-dark.png" alt="Algofort" width="220" height="35"/></a>
      <MobileMenu onActiveChange={setMenuActive}/>
      <nav className="site-nav" aria-label="Main navigation"><a className="nav-active" href="#top" aria-current="page">Overview</a><a href="#experience" onClick={() => setScreen('discover')}>Experience</a><a href="#experience" onClick={() => setScreen('contact')}>Contact</a></nav>
      <SplitLink className="header-cta" label="Get Started" tone="orange" onClick={() => setScreen('contact')}/>
    </header>
    <main><section className="hero" aria-labelledby="hero-heading" ref={heroRef}>
      <div className="hero-copy"><p className="hero-badge"><span>New</span> Custom App Development</p><h1 id="hero-heading">An app your users<br/><span>love</span> to open.</h1><p className="hero-description">We design and develop intuitive mobile apps that solve real problems, delight your customers, and grow with your business.</p><div className="hero-actions"><SplitLink label="Start your app project" tone="orange" onClick={() => setScreen('contact')}/></div></div>
      <PhonePreview screen={screen} setScreen={setScreen}/>
    </section><WhoWeAre/><AppShowcase/><ServicesSection onContact={() => setScreen('contact')}/><AppPortfolio action={<SplitLink label="Build your app" tone="orange" onClick={() => setScreen('contact')}/>}/><WhatMakesUsDifferent/><ClientReviews action={<SplitLink label="View All Reviews" tone="orange" href="/#sec-testimonials" target="_blank" rel="noopener noreferrer"/>}/><LeadTablet/></main>
    <SiteFooter/><EntrancePopup/>
  </div>
}

export default App
