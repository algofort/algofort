import { useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './HowWeBuild.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const steps = [
  { title: 'The Consultation', description: 'The initial part is to listen to your expectations, issues, and short-term vision.', images: ['productivity', 'healthcare', 'finance'] },
  { title: 'Planning & UI/UX Design', description: 'We prepare an interface that is very logical to use and will give a comfortable user experience.', images: ['wellness', 'commerce', 'travel'] },
  { title: 'Development & Testing', description: 'Our applications are scalable, quality-checked and well-designed.', images: ['finance', 'smarthome', 'education'] },
  { title: 'Launch & Support', description: 'We offer hands-off implementation.', images: ['food', 'healthcare', 'productivity'] },
]

export default function HowWeBuild() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!
      const heading = section.querySelector<HTMLElement>('#build-heading')!
      const split = SplitText.create(heading, {
        type: 'lines,words,chars', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.fromTo(self.chars, { autoAlpha: 0, yPercent: 110 }, {
          autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.018, ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
        }),
      })
      section.querySelectorAll('.build-header .who-kicker, .build-header > p').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1, y: 0, duration: 0.65, delay: index * 0.08, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
      section.querySelectorAll('.build-card').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 28 }, {
          autoAlpha: 1, y: 0, duration: 0.8, delay: index * 0.07, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 94%', once: true },
        })
      })
      gsap.fromTo(section.querySelector('.build-progress'), { autoAlpha: 0 }, {
        autoAlpha: 1, duration: 0.65, clearProps: 'opacity,visibility',
        scrollTrigger: { trigger: section.querySelector('.build-steps'), start: 'top 94%', once: true },
      })
      return () => split.revert()
    }, sectionRef)
    return () => media.revert()
  }, [])

  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(min-width: 1101px) and (prefers-reduced-motion: no-preference)', () => {
      const trigger = ScrollTrigger.create({
        trigger: sectionRef.current, start: 'top top', end: 'bottom bottom',
        onUpdate: self => {
          setActive(Math.min(3, Math.floor(self.progress * 4)))
          progressRef.current!.style.transform = `scaleX(${self.progress})`
        },
      })
      setActive(Math.min(3, Math.floor(trigger.progress * 4)))
      progressRef.current!.style.transform = `scaleX(${trigger.progress})`
    }, sectionRef)
    return () => media.revert()
  }, [])

  return <section className="how-build" id="how-we-build" ref={sectionRef} aria-labelledby="build-heading">
    <div className="build-stage">
      <div className="build-inner">
        <header className="build-header who-main">
          <span className="who-kicker"><i aria-hidden="true"/>How we Build</span>
          <h2 id="build-heading">Our Development Process</h2>
          <p>Seamless custom app development, from the first conversation to launch and beyond.</p>
        </header>
        <ol className="build-steps">
          {steps.map((step, index) => <li className={`build-card${active === index ? ' is-active' : ''}`} key={step.title}>
            <span className="build-card-number" aria-hidden="true">{String(index + 1).padStart(3, '0')}</span>
            <button className="build-card-toggle" onClick={() => setActive(index)} aria-expanded={active === index} aria-label={`Explore step ${index + 1}: ${step.title}`}><span aria-hidden="true">+</span></button>
            <div className="build-card-content">
              <h3><span className="build-sr-only">Step {index + 1} — </span>{step.title}</h3>
              <p>{step.description}</p>
              <div className="build-card-images" aria-hidden="true">
                {step.images.map(image => <img src={assetUrl(`/showcase/${image}.jpg`)} alt="" loading="lazy" key={image}/>) }
              </div>
            </div>
            <span className="build-corner build-corner-left" aria-hidden="true">✦</span>
            <span className="build-corner build-corner-right" aria-hidden="true">□</span>
          </li>)}
        </ol>
        <div className="build-progress" aria-hidden="true"><div ref={progressRef}/></div>
      </div>
    </div>
  </section>
}
import { assetUrl } from './assets'
