import { useState, type FormEvent } from 'react'
import { useAppCaptcha } from '../../../app-development/src/lead'
import { captchaToken, resetCaptcha } from '../../../web-development/src/captcha.js'
import { submitContactForm } from '../../../../src/utils/submitContactForm.js'

export function useSaasLead(status: string) {
  const captcha = useAppCaptcha(status)
  async function send(form: HTMLFormElement, source: string) {
    const token = captchaToken(captcha.captchaRef.current)
    if (!token) throw new Error('Please complete the security check and try again.')
    const fields = new FormData(form)
    try {
      await submitContactForm({ fullName: String(fields.get('name') || '').trim(), email: String(fields.get('email') || '').trim(), phone: String(fields.get('phone') || '').trim(), website: String(fields.get('website') || ''), selectedServices: ['Software Development'], message: String(fields.get('message') || '').trim(), recaptchaToken: token }, source)
    } finally { resetCaptcha(captcha.captchaRef.current) }
  }
  return { ...captcha, send }
}

export default function SaasInquiry() {
  const [status, setStatus] = useState('idle')
  const { captchaRef, error, setError, send } = useSaasLead(status)
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    setError(''); setStatus('sending')
    try { await send(form, 'lp-saas-inquiry'); form.reset(); setStatus('sent') }
    catch (failure) { setError(failure instanceof Error ? failure.message : 'Please try again.'); setStatus('idle') }
  }
  return <section id="alp_contact" className="saas-inquiry alp_container" aria-labelledby="saas-inquiry-title"><div className="alp_intro-inner"><div className="saas-inquiry-intro"><div><p className="saas-inquiry-kicker">+ Start a project</p><h2 id="saas-inquiry-title">Have a project<br/>in mind?</h2></div><p className="saas-inquiry-lead">A new SaaS product, an MVP, or a platform ready for its next chapter—tell us what you have in mind.</p></div>{status === 'sent' ? <p role="status">Thank you! Your enquiry has been sent.</p> : <form onSubmit={submit}><div className="saas-inquiry-fields"><label>Name *<input name="name" placeholder="Your name" autoComplete="name" minLength={2} maxLength={100} required/></label><label>Email *<input name="email" type="email" placeholder="you@company.com" autoComplete="email" maxLength={254} required/></label><label>Phone / WhatsApp <span>(optional)</span><input name="phone" type="tel" placeholder="Your number" autoComplete="tel" maxLength={40}/></label><label className="saas-inquiry-message">About your project *<textarea name="message" placeholder="What do you have in mind?" minLength={10} maxLength={3000} rows={3} required/></label></div><label className="saas-honey" aria-hidden="true">Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label><div className="saas-inquiry-actions"><div ref={captchaRef} className="saas-captcha" aria-label="Security check"/><button className="alp_button alp_button-3d alp_button-orange" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send enquiry'}</button></div>{error && <p role="alert">{error}</p>}</form>}</div></section>
}
