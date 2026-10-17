import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import './ClientReviews.css'

gsap.registerPlugin(ScrollTrigger, SplitText)

const reviews = [
  { name: 'Ahsan Raza', role: 'CEO', company: 'QuickBasket · Karachi', summary: 'Algofort helped QuickBasket turn an idea into a working app faster than expected. A responsive, professional team and skilled engineering made the experience feel like a true technology partnership.' },
  { name: 'Bilal Shahid', role: 'CTO', company: 'PayWell Solutions · Islamabad', summary: 'The team understood the complexity behind PayWell’s fintech product and delivered a secure, scalable solution on time. Clear understanding of the requirements made a real difference to the project.' },
  { name: 'Hira Javed', role: 'Marketing Head', company: 'Al-Karim Fabrics · Faisalabad', summary: 'Algofort’s website revamp brought Al-Karim Fabrics a sleek, fast, mobile-friendly experience. The result matched what the team wanted for its customers and gave the website a fresh direction.' },
  { name: 'Zainab Fatima', role: 'Founder', company: 'GlamNest · Lahore', summary: 'The branding work transformed GlamNest’s online presence. A more premium, professional look brought a clearer identity to the business and changed how the brand presented itself online.' },
]

export default function ClientReviews({ action }: { action: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null)
  const [viewportVersion, setViewportVersion] = useState(0)
  useEffect(() => {
    let resizeTimer: ReturnType<typeof setTimeout>
    const resize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => setViewportVersion(version => version + 1), 150)
    }
    window.addEventListener('resize', resize)
    return () => { clearTimeout(resizeTimer); window.removeEventListener('resize', resize) }
  }, [])
  useLayoutEffect(() => {
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!
      const header = section.querySelector<HTMLElement>('.reviews-header')!
      const list = section.querySelector<HTMLElement>('.reviews-scroll-list')!
      const cards = [...section.querySelectorAll<HTMLElement>('.review-card')]
      const button = section.querySelector('.reviews-link')!
      const height = window.innerHeight
      const travel = height * 0.5 + cards[0].clientHeight
      const heading = section.querySelector<HTMLElement>('#reviews-heading')!
      const split = SplitText.create(heading, {
        type: 'lines,words,chars', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.fromTo(self.chars, { autoAlpha: 0, yPercent: 110 }, {
          autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.018, ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
        }),
      })
      section.querySelectorAll('.reviews-header .who-kicker, .reviews-count').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1, y: 0, duration: 0.65, delay: index * 0.08, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 92%', once: true },
        })
      })
      // Reference: 400px perspective, 90-degree entrance, 750px depth,
      // 12.5% stack shrink and 10% darkening for each following card.
      const intro = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top bottom', end: 'bottom bottom', scrub: true } })
      intro.fromTo(header, { y: height * 0.25 }, { y: 0, ease: 'power4.out', duration: 2 }, 0)
      intro.fromTo(header, { scale: 1 }, { scale: 0.85, ease: 'none', duration: cards.length }, 1)
      intro.to({}, { duration: 0 }, 1 + cards.length)
      gsap.set(cards, { y: travel })
      const stack = gsap.timeline({ scrollTrigger: { trigger: list, start: 'top bottom', end: 'bottom bottom', scrub: true } })
      cards.forEach((card, index) => {
        stack.fromTo(card, { y: travel }, { y: 0, ease: 'power2.inOut', duration: 1.5 }, index)
        stack.fromTo(card, { rotateX: 90, z: 750 }, { rotateX: 0, z: 0, ease: 'power2.inOut', duration: 1.2 }, index)
        cards.slice(0, index).forEach((previous, previousIndex) => {
          const depth = index - previousIndex
          stack.fromTo(previous, { scale: 1 - (depth - 1) * 0.125 }, { scale: 1 - depth * 0.125, duration: 1, ease: 'none', immediateRender: false }, index)
          stack.fromTo(previous, { '--fade': (depth - 1) * 0.1 }, { '--fade': depth * 0.1, duration: 0.5, ease: 'none', immediateRender: false }, index + 0.75)
        })
      })
      stack.fromTo(button, { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.1 }, 4.4)
      return () => split.revert()
    }, sectionRef)
    return () => media.revert()
  }, [viewportVersion])

  return <section className="client-reviews" id="reviews" ref={sectionRef} aria-labelledby="reviews-heading">
    <div className="reviews-motion-layer">
      <header className="reviews-header who-main">
        <span className="who-kicker"><i aria-hidden="true"/>Reviews</span>
        <h2 id="reviews-heading">Client stories.<br/>Real experiences.</h2>
        <div className="reviews-count"><span>04</span><p>Client stories<br/><span>From our clients</span></p></div>
      </header>
      <div className="reviews-card-layers">
        {reviews.map(({name, role, company, summary}) => <div className="review-perspective" key={name}>
          <figure className="review-card">
            <blockquote cite="/#sec-testimonials">{summary}</blockquote>
            <figcaption className="review-author">
              <div><h3>{name}</h3><p>{role}<br/>{company}</p></div>
              <span className="review-quote"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M10 4H4v8h4c0 3-1 4-4 5v3c5-1 7-4 7-9V4h-1Zm12 0h-6v8h4c0 3-1 4-4 5v3c5-1 7-4 7-9V4h-1Z"/></svg></span>
            </figcaption>
            <div className="review-overlay" aria-hidden="true"/>
          </figure>
        </div>)}
      </div>
      <div className="reviews-link">{action}</div>
    </div>
    <ol className="reviews-scroll-list" aria-hidden="true">{reviews.map(review => <li key={review.name}/>)}</ol>
  </section>
}
