import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './AppPortfolio.css'
import HowWeBuild from './HowWeBuild'

gsap.registerPlugin(ScrollTrigger, SplitText)

const projects = [
  { image: 'wellness', title: 'A little more balance.', category: 'Wellness · App concept', alt: 'Wellness app with a daily habit dashboard and guided breathing experience' },
  { image: 'finance', title: 'Everyday money, simplified.', category: 'Fintech · App concept', alt: 'Personal finance app showing balance, spending insights and account activity' },
  { image: 'travel', title: 'Discover somewhere new.', category: 'Travel · App concept', alt: 'Travel discovery app with destinations, itineraries and interactive maps' },
  { image: 'productivity', title: 'Make room for good work.', category: 'Productivity · App concept', alt: 'Project management experience across a tablet and mobile app' },
  { image: 'food', title: 'Good food. One tap away.', category: 'On-demand delivery · App concept', alt: 'Food ordering app with restaurant discovery and live delivery tracking' },
  { image: 'commerce', title: 'A better way to browse.', category: 'E-commerce · App concept', alt: 'Fashion shopping app featuring product details, collections and a wishlist' },
]

export default function AppPortfolio({ action }: { action: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const root = rootRef.current!
      const circle = root.querySelector<HTMLElement>('.app-transition-circle')!
      const base = root.querySelector<HTMLElement>('.portfolio-dark-base')!
      const content = root.querySelector<HTMLElement>('.portfolio-inner')!
      let contentShown = false
      let contentReveal: gsap.core.Tween | undefined
      gsap.set(content, { autoAlpha: 0 })
      const heading = root.querySelector<HTMLElement>('.latest-work-heading')!
      const splits = [...heading.querySelectorAll<HTMLElement>('.latest-work-title-line > span')].map(line => SplitText.create(line, { type: 'words,chars' }))
      const chars = splits.flatMap(split => split.chars)
      let headingReached = heading.getBoundingClientRect().top <= window.innerHeight * 0.92
      const titleEntrance = gsap.timeline({ paused: true })
      titleEntrance.fromTo(heading.querySelector('.portfolio-label'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
      titleEntrance.fromTo(chars, { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.8, stagger: 0.018, ease: 'power4.out' }, 0.1)
      const revealTitle = () => { if (contentShown && headingReached) titleEntrance.play() }
      const titleTrigger = ScrollTrigger.create({
        trigger: heading, start: 'top 92%', once: true,
        onEnter: () => { headingReached = true; revealTitle() },
      })
      root.querySelectorAll('.latest-work-intro > p, .latest-work-intro > .split-cta').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1, y: 0, duration: 0.7, delay: index * 0.1, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
      // Match the reference's overdamped spring: mass 1, stiffness 150, damping 50.
      const restingScale = 0
      const spring = { scale: restingScale, velocity: 0, target: restingScale }
      const discriminant = Math.sqrt(50 * 50 - 4 * 150)
      const slowRoot = (-50 + discriminant) / 2
      const fastRoot = (-50 - discriminant) / 2
      const setScale = (scale: number) => { circle.style.transform = `scale(${scale})` }
      const setBaseOpacity = gsap.quickSetter(base, 'opacity')
      let previousTime = gsap.ticker.time

      const tick = (time: number) => {
        const elapsed = Math.min(time - previousTime, 0.064)
        previousTime = time
        const displacement = spring.scale - spring.target
        const slowAmplitude = (spring.velocity - fastRoot * displacement) / (slowRoot - fastRoot)
        const fastAmplitude = displacement - slowAmplitude
        const slowDecay = Math.exp(slowRoot * elapsed)
        const fastDecay = Math.exp(fastRoot * elapsed)
        spring.scale = spring.target + slowAmplitude * slowDecay + fastAmplitude * fastDecay
        spring.velocity = slowRoot * slowAmplitude * slowDecay + fastRoot * fastAmplitude * fastDecay
        const circleBounds = circle.getBoundingClientRect()
        const centerY = circleBounds.top + circleBounds.height / 2
        const coverScale = 2 * Math.hypot(root.clientWidth / 2, Math.max(Math.abs(centerY), Math.abs(window.innerHeight - centerY))) / 500 + 0.02
        const screenCovered = spring.target === 9 && spring.scale >= coverScale
        if (screenCovered || (Math.abs(spring.scale - spring.target) < 0.02 && Math.abs(spring.velocity) < 0.07)) {
          spring.scale = spring.target
          spring.velocity = 0
        }
        setScale(spring.scale)
        setBaseOpacity(spring.scale === 9 ? 1 : 0)
        if (spring.target === restingScale && contentShown) {
          contentReveal?.kill()
          gsap.set(content, { autoAlpha: 0 })
          contentShown = false
        } else if (spring.target === 9 && spring.scale === 9 && !contentShown) {
          contentShown = true
          contentReveal = gsap.to(content, { autoAlpha: 1, duration: 0.25, ease: 'power1.out' })
          revealTitle()
        }
      }

      const circleTrigger = ScrollTrigger.create({
        trigger: root.querySelector('.app-transition-anchor'),
        start: 'top bottom-=80',
        onEnter: () => { spring.target = 9 },
        onLeaveBack: () => { spring.target = restingScale },
        onRefresh: (self) => {
          spring.target = self.scroll() >= self.start ? 9 : restingScale
        },
      })
      spring.target = circleTrigger.scroll() >= circleTrigger.start ? 9 : restingScale
      // Restore the correct state when loading a deep link below the transition.
      spring.scale = spring.target
      setScale(spring.scale)
      setBaseOpacity(spring.scale === 9 ? 1 : 0)
      contentShown = spring.scale === 9
      gsap.set(content, { autoAlpha: contentShown ? 1 : 0 })
      revealTitle()
      gsap.ticker.add(tick)

      sectionRef.current!.querySelectorAll<HTMLElement>('.latest-project-media').forEach((frame) => {
        const reveal = gsap.timeline({
          defaults: { duration: 1, ease: 'power1.out' },
          scrollTrigger: { trigger: frame, start: 'top 95%', end: 'bottom top', toggleActions: 'play reverse play reverse' },
        })
        reveal.fromTo(frame, { scale: 0.9 }, { scale: 1 }, 0)
        reveal.fromTo(frame.querySelector('img'), { scale: 1.3 }, { scale: 1 }, 0)
      })
      return () => {
        gsap.ticker.remove(tick)
        circleTrigger.kill()
        contentReveal?.kill()
        titleTrigger.kill()
        titleEntrance.kill()
        splits.forEach(split => split.revert())
        gsap.set(content, { clearProps: 'opacity,visibility' })
        gsap.set(circle, { clearProps: 'transform' })
        gsap.set(base, { clearProps: 'opacity' })
      }
    }, rootRef)
    return () => media.revert()
  }, [])

  return <div className="app-portfolio" ref={rootRef}>
    <div className="app-transition-anchor" aria-hidden="true"/>
    <div className="portfolio-dark-base" aria-hidden="true"/>
    <div className="app-transition-layer" aria-hidden="true"><div className="app-transition-circle"/></div>
    <section ref={sectionRef} className="latest-work" id="work" aria-labelledby="latest-work-heading">
      <div className="portfolio-inner">
        <div className="latest-work-heading">
          <p className="portfolio-label who-kicker"><i aria-hidden="true"/>App concepts</p>
          <h2 className="latest-work-title" id="latest-work-heading">
            <span className="latest-work-title-line"><span>Take a look at</span></span>{' '}
            <span className="latest-work-title-line"><span>our app concepts</span></span>
          </h2>
        </div>
        <div className="latest-work-intro">
          <p>From everyday essentials to ambitious platforms. Explore a collection of app concepts that show what your next digital experience could look like.</p>
          {action}
        </div>
        <div className="latest-work-grid">
          {projects.map(({ image, title, category, alt }, index) => <article className="latest-project" key={image}>
            <div className="latest-project-media"><img src={assetUrl(`/showcase/${image}.jpg`)} alt={alt} width="900" height="630" loading="lazy" decoding="async"/></div>
            <div className="latest-project-caption">
              <div><h3>{title}</h3><p>{category}</p></div>
              <span className="latest-project-number" aria-hidden="true">({String(index + 1).padStart(2, '0')})</span>
            </div>
          </article>)}
        </div>
      </div>
    </section>
    <HowWeBuild/>
  </div>
}
import { assetUrl } from './assets'
