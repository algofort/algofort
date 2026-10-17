import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { UsersRound, Gauge, BadgeCheck, Headset } from 'lucide-react'
import './WhatMakesUsDifferent.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const differences = [
  { title: 'User-Centric Design', description: 'Intuitive apps built around real user needs, making everyday tasks simpler and more enjoyable.', icon: UsersRound },
  { title: 'High Performance', description: 'Fast, secure and scalable applications that stay responsive as your users and business grow.', icon: Gauge },
  { title: 'Experience', description: 'Years of industry experience guide every decision, from the first idea to a polished product.', icon: BadgeCheck },
  { title: 'End-to-End Support', description: 'From concept to launch and beyond, we keep your app supported, maintained and ready to evolve.', icon: Headset },
]

export default function WhatMakesUsDifferent() {
  const sectionRef = useRef<HTMLElement>(null)
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!
      const heading = section.querySelector<HTMLElement>('#differences-heading')!
      const split = SplitText.create(heading, {
        type: 'lines,words,chars', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.fromTo(self.chars, { autoAlpha: 0, yPercent: 110 }, {
          autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.018, ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
        }),
      })
      const subtitle = section.querySelector('.who-kicker')!
      gsap.fromTo(subtitle, { autoAlpha: 0, y: 16 }, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: subtitle, start: 'top 92%', once: true },
      })
      section.querySelectorAll('.difference-item').forEach((item, index) => {
        gsap.fromTo(item.children, { autoAlpha: 0, y: 22 }, {
          autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.08, delay: index * 0.06, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: item, start: 'top 93%', once: true },
        })
      })
      return () => split.revert()
    }, sectionRef)
    return () => media.revert()
  }, [])

  return <section className="differences-section" id="different" ref={sectionRef} aria-labelledby="differences-heading">
    <div className="differences-inner">
      <header className="differences-header who-main">
        <span className="who-kicker"><i aria-hidden="true"/>Different</span>
        <h2 id="differences-heading">What Makes Us Different?</h2>
      </header>
      <div className="differences-grid">
        {differences.map(item => <article className="difference-item" key={item.title}>
          <div className="difference-icon"><item.icon size={42} strokeWidth={1.4} aria-hidden="true"/></div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </article>)}
      </div>
    </div>
  </section>
}
