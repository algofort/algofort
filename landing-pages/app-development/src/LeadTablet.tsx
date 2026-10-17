import { useLayoutEffect, useRef, useState, type FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { ArrowUpRight, Check, CheckCircle2, Mail } from 'lucide-react'
import './LeadTablet.css'
import { useAppCaptcha, sendAppLead } from './lead'

gsap.registerPlugin(ScrollTrigger, SplitText)

export default function LeadTablet({ popup = false }: { popup?: boolean }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [honey, setHoney] = useState('')
  const { captchaRef, error, setError } = useAppCaptcha(status)
  const sectionRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (popup) return;
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const section = sectionRef.current!
      const splits = [...section.querySelectorAll<HTMLElement>('#lead-tablet-heading, .tablet-form-heading h3')].map(heading => SplitText.create(heading, {
        type: 'lines,words,chars', mask: 'lines', autoSplit: true,
        onSplit: self => gsap.fromTo(self.chars, { autoAlpha: 0, yPercent: 110 }, {
          autoAlpha: 1, yPercent: 0, duration: 0.8, stagger: 0.018, ease: 'power4.out',
          scrollTrigger: { trigger: heading, start: 'top 92%', once: true },
        }),
      }))
      section.querySelectorAll('.lead-tablet-copy .who-kicker, .lead-tablet-copy > p, .lead-next-steps li, .lead-email, .tablet-form-heading > p').forEach(element => {
        gsap.fromTo(element, { autoAlpha: 0, y: 18 }, {
          autoAlpha: 1, y: 0, duration: 0.65, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 93%', once: true },
        })
      })
      const tablet = section.querySelector('.lead-tablet-device')!
      gsap.fromTo(tablet, { autoAlpha: 0, y: 30 }, {
        autoAlpha: 1, y: 0, duration: 0.9, ease: 'power3.out', clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: tablet, start: 'top 94%', once: true },
      })
      section.querySelectorAll('.tablet-enquiry-form fieldset, .tablet-submit-row').forEach((element, index) => {
        gsap.fromTo(element, { autoAlpha: 0, y: 16 }, {
          autoAlpha: 1, y: 0, duration: 0.6, delay: index * 0.035, ease: 'power3.out',
          clearProps: 'transform,opacity,visibility',
          scrollTrigger: { trigger: element, start: 'top 95%', once: true },
        })
      })
      return () => splits.forEach(split => split.revert())
    }, sectionRef)
    return () => media.revert()
  }, [popup])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (honey || status === 'sending') return
    const form = event.currentTarget
    setError('')
    setStatus('sending')
    try {
      await sendAppLead(form, 'lp-app-inquiry', captchaRef.current, honey)
      form.reset()
      setStatus('sent')
    } catch (failure) { setError(failure instanceof Error ? failure.message : 'Your enquiry could not be sent. Please try again.'); setStatus('error') }
  }

  return <section className={`lead-tablet-section${popup ? ' app-popup-form' : ''}`} id={popup ? undefined : 'start-project'} ref={sectionRef} aria-label="App development enquiry">
    <div className="lead-tablet-layout">
      <div className="lead-tablet-copy who-main">
        <span className="who-kicker"><i aria-hidden="true"/>Let’s build together</span>
        <h2 id="lead-tablet-heading">Let’s build your next great app.</h2>
        <p>Have an idea, a challenge, or an app that needs a fresh start? Tell us what you have in mind. We’ll help you find the right way forward.</p>
        <ul className="lead-next-steps"><li><Check size={16}/>Share your idea and goals</li><li><Check size={16}/>Get a clear plan for your app</li><li><Check size={16}/>Build with a team that understands</li></ul>
        <a className="lead-email" href="mailto:hello@algofort.com"><Mail size={19}/><span>hello@algofort.com</span><ArrowUpRight size={18}/></a>
      </div>
      <div className="lead-tablet-device" aria-label="Algofort project enquiry workspace">
        <span className="tablet-camera" aria-hidden="true"/>
        <div className="lead-tablet-screen">
            <div className="tablet-enquiry">
              {status === 'sent' ? <div className="tablet-enquiry-success" role="status" aria-live="polite"><CheckCircle2 size={42}/><h3>Your idea is in good hands.</h3><p>Thanks for sharing your project. The Algofort team will get in touch at the email you provided.</p><button type="button" onClick={() => setStatus('idle')}>Send another enquiry<ArrowUpRight size={17}/></button></div> : <>
                <div className="tablet-form-heading">
                  <h3>Tell us about your app.</h3>
                  <p>Share your idea. Let’s turn it into something people love to use.</p>
                </div>
                <form className="tablet-enquiry-form" onSubmit={submit} aria-label="App development project enquiry">
                  <fieldset><div className="tablet-field-row"><label><span className="tablet-sr-only">Your name</span><input name="name" placeholder="Your name*" autoComplete="name" maxLength={80} required/></label><label><span className="tablet-sr-only">Email address</span><input name="email" type="email" placeholder="Email address*" autoComplete="email" maxLength={120} required/></label></div></fieldset>
                  <fieldset><div className="tablet-field-row"><label><span className="tablet-sr-only">Company name</span><input name="company" placeholder="Company name" autoComplete="organization" maxLength={120}/></label><label><span className="tablet-sr-only">Website</span><input name="website" placeholder="Website (optional)" autoComplete="url" maxLength={200}/></label></div></fieldset>
                  <fieldset><div className="tablet-field-row"><label><span className="tablet-sr-only">App platform</span><select name="project_type" defaultValue="" required><option value="" disabled>App platform*</option><option>iOS & Android app</option><option>iOS app</option><option>Android app</option><option>Custom web app</option><option>Existing app redesign</option><option>Help me decide</option></select></label><label><span className="tablet-sr-only">Budget range</span><select name="budget" defaultValue=""><option value="">Budget range</option><option>Still exploring</option><option>Under $5,000</option><option>$5,000–$10,000</option><option>$10,000–$25,000</option><option>$25,000+</option></select></label></div><label className="tablet-timeline-field"><span className="tablet-sr-only">Ideal timeline</span><select name="timeline" defaultValue=""><option value="">When would you like to start?</option><option>As soon as possible</option><option>Within 1–3 months</option><option>Within 3–6 months</option><option>Just exploring for now</option></select></label></fieldset>
                  <fieldset><label><span className="tablet-sr-only">Project brief</span><textarea name="message" placeholder="My app idea is…*" rows={3} maxLength={1500} required/></label></fieldset>
                  <label className="tablet-honey" aria-hidden="true">Leave this empty<input name="_honey" value={honey} onChange={event => setHoney(event.target.value)} tabIndex={-1} autoComplete="off"/></label>
                  <div className="app-recaptcha" ref={captchaRef} aria-label="Security check" />
                  {error && <p className="tablet-submit-error" role="alert">{error}</p>}
                  <div className="tablet-submit-row"><button className="tablet-submit split-cta" type="submit" disabled={status === 'sending'}><span className="split-cta-icon split-cta-icon-left"><ArrowUpRight/></span><span className="split-cta-pill">{status === 'sending' ? 'Sending…' : 'Send enquiry'}</span><span className="split-cta-icon split-cta-icon-right"><ArrowUpRight/></span></button></div>
                </form>
              </>}
            </div>
          <span className="tablet-home-bar" aria-hidden="true"/>
        </div>
      </div>
    </div>
  </section>
}
