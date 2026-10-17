import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import ActionButton from './ActionButton'
import InquirySelect from './InquirySelect'
import { brandingServiceNames as services } from '../lib/brandingServices'
import { captchaToken, observeCaptcha, resetCaptcha } from '../../../web-development/src/captcha.js'
import { submitContactForm } from '../../../../src/utils/submitContactForm.js'
const budgets = ['Under $2,500', '$2,500–$5,000', '$5,000–$10,000', '$10,000+', 'Let’s discuss']
const startTimes = ['As soon as possible', 'Within a month', 'In 1–3 months', 'In 3–6 months', 'Just exploring']
type Field = 'name' | 'email' | 'website' | 'service' | 'message'
type Errors = Partial<Record<Field, string>>

export default function InquiryForm({ idPrefix, preserveHeight = true, variant = 'page' }: { idPrefix: string; preserveHeight?: boolean; variant?: 'page' | 'popup' }) {
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const captchaRef = useRef<HTMLDivElement>(null)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle')
  const [firstName, setFirstName] = useState('')
  const [formHeight, setFormHeight] = useState(0)
  const [requestError, setRequestError] = useState('')

  useEffect(() => {
    if (status === 'success') return
    let active = true
    const disconnect = observeCaptcha(captchaRef.current, (error: Error) => { if (active) setRequestError(error.message) })
    return () => { active = false; disconnect?.() }
  }, [status])
  useEffect(() => { if (status === 'success') successRef.current?.focus({ preventScroll: true }) }, [status])

  function clearError(field: Field) {
    setErrors(previous => {
      if (!previous[field]) return previous
      const next = { ...previous }
      delete next[field]
      return next
    })
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status !== 'idle') return
    setRequestError('')
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const website = String(data.get('website') ?? '').trim()
    const service = String(data.get('service') ?? '')
    const message = String(data.get('message') ?? '').trim()
    const nextErrors: Errors = {}
    if (name.length < 2) nextErrors.name = 'Please enter your name (at least 2 characters).'
    if (!email || !(form.elements.namedItem('email') as HTMLInputElement).validity.valid) nextErrors.email = 'Please enter a valid email address.'
    if (website) {
      try {
        const url = new URL(website)
        if (!['http:', 'https:'].includes(url.protocol) || !url.hostname.includes('.')) throw new Error('Invalid website')
      } catch { nextErrors.website = 'Please enter a website URL, such as https://yourcompany.com.' }
    }
    if (variant === 'page' && !services.includes(service)) nextErrors.service = 'Please choose a branding service.'
    if (message.length < 10) nextErrors.message = 'Tell us a little more (at least 10 characters).'
    setErrors(nextErrors)
    const firstError = (['name', 'email', 'website', 'service', 'message'] as Field[]).find(field => nextErrors[field])
    if (firstError) {
      document.getElementById(`${idPrefix}-project-${firstError}`)?.focus()
      return
    }

    const token = captchaToken(captchaRef.current)
    if (!token) {
      setRequestError('Please complete the security check and try again.')
      return
    }
    setFirstName(name.split(/\s+/)[0])
    setFormHeight(form.offsetHeight)
    setStatus('sending')
    try {
      await submitContactForm({
        fullName: name,
        email,
        phone: '',
        website: String(data.get('contactWebsite') || ''),
        selectedServices: ['Brand Identity'],
        recaptchaToken: token,
        message: [
          `Service: ${service || 'Brand identity'}`,
          `Company: ${data.get('company') || 'Not provided'}`,
          `Business website: ${website || 'Not provided'}`,
          `Budget: ${data.get('budget') || 'Not provided'}`,
          `Timeline: ${data.get('start') || 'Flexible'}`,
          '', message,
        ].join('\n'),
      }, variant === 'popup' ? 'lp-brand-popup' : 'lp-brand-inquiry')
      setStatus('success')
      form.reset()
    } catch (error) {
      setRequestError(error instanceof Error ? error.message : 'Your enquiry could not be sent. Please try again.')
      resetCaptcha(captchaRef.current)
      setStatus('idle')
    }
  }

  function startAgain() {
    setStatus('idle')
    setErrors({})
    setRequestError('')
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus({ preventScroll: true }))
  }

  return (
        <div className="inquiry-form-area" style={status === 'success' && preserveHeight ? { minHeight: formHeight } : undefined}>
          {status === 'success' ? (
            <div className="inquiry-success">
              <span className="inquiry-success-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="m8 16 5 5L25 9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg></span>
              <p className="studio-label">// A good start</p>
              <h3 ref={successRef} tabIndex={-1}>Thanks, {firstName}.</h3>
              <p>Your inquiry has been sent.<br />Our team will be in touch soon.</p>
              <ActionButton arrow onClick={startAgain}>Send another inquiry</ActionButton>
            </div>
          ) : (
            <form className="project-form" ref={formRef} onSubmit={submit} noValidate aria-label="Project inquiry" aria-busy={status === 'sending'}>
              <label className="brand-honeypot" aria-hidden="true">Leave this field empty<input name="contactWebsite" tabIndex={-1} autoComplete="off" /></label>
              <fieldset className="inquiry-fields" disabled={status === 'sending'}>
                <legend className="inquiry-sr-only">Tell us about your project</legend>
                <div className="inquiry-field-row">
                  <div className={`inquiry-field${errors.name ? ' has-error' : ''}`}>
                    <label htmlFor={`${idPrefix}-project-name`}>Your name <span aria-hidden="true">*</span></label>
                    <input id={`${idPrefix}-project-name`} name="name" autoComplete="name" placeholder="Alex Morgan" required minLength={2} maxLength={100} aria-invalid={!!errors.name} aria-describedby={errors.name ? `${idPrefix}-project-name-error` : undefined} onInput={() => clearError('name')} />
                    {errors.name && <span className="inquiry-error" id={`${idPrefix}-project-name-error`}>{errors.name}</span>}
                  </div>
                  <div className={`inquiry-field${errors.email ? ' has-error' : ''}`}>
                    <label htmlFor={`${idPrefix}-project-email`}>Email address <span aria-hidden="true">*</span></label>
                    <input id={`${idPrefix}-project-email`} name="email" type="email" autoComplete="email" placeholder="alex@company.com" required maxLength={254} aria-invalid={!!errors.email} aria-describedby={errors.email ? `${idPrefix}-project-email-error` : undefined} onInput={() => clearError('email')} />
                    {errors.email && <span className="inquiry-error" id={`${idPrefix}-project-email-error`}>{errors.email}</span>}
                  </div>
                </div>
                <div className="inquiry-field-row">
                  <div className="inquiry-field">
                    <label htmlFor={`${idPrefix}-project-company`}>Brand / company name</label>
                    <input id={`${idPrefix}-project-company`} name="company" autoComplete="organization" placeholder="Your brand or business" maxLength={150} />
                  </div>
                  <div className={`inquiry-field${errors.website ? ' has-error' : ''}`}>
                    <label htmlFor={`${idPrefix}-project-website`}>Website <span>(optional)</span></label>
                    <input id={`${idPrefix}-project-website`} name="website" type="url" autoComplete="url" placeholder="https://yourcompany.com" maxLength={1000} aria-invalid={!!errors.website} aria-describedby={errors.website ? `${idPrefix}-project-website-error` : undefined} onInput={() => clearError('website')} />
                    {errors.website && <span className="inquiry-error" id={`${idPrefix}-project-website-error`}>{errors.website}</span>}
                  </div>
                </div>
                {variant === 'page' && <div className="inquiry-field-row">
                  <div className={`inquiry-field inquiry-select${errors.service ? ' has-error' : ''}`}>
                    <label id={`${idPrefix}-project-service-label`} htmlFor={`${idPrefix}-project-service`}>What can we help with? <span aria-hidden="true">*</span></label>
                    <InquirySelect id={`${idPrefix}-project-service`} name="service" placeholder="Select a branding service" options={services} required error={errors.service} onChange={() => clearError('service')} />
                    {errors.service && <span className="inquiry-error" id={`${idPrefix}-project-service-error`}>{errors.service}</span>}
                  </div>
                  <div className="inquiry-field inquiry-select">
                    <label id={`${idPrefix}-project-budget-label`} htmlFor={`${idPrefix}-project-budget`}>Budget range</label>
                    <InquirySelect id={`${idPrefix}-project-budget`} name="budget" placeholder="Select a range" options={budgets} />
                  </div>
                </div>}
                <div className="inquiry-field inquiry-select">
                  <label id={`${idPrefix}-project-start-label`} htmlFor={`${idPrefix}-project-start`}>When would you like to start?</label>
                  <InquirySelect id={`${idPrefix}-project-start`} name="start" placeholder="Select a timeframe" options={startTimes} />
                </div>
                <div className={`inquiry-field inquiry-message${errors.message ? ' has-error' : ''}`}>
                  <label htmlFor={`${idPrefix}-project-message`}>Tell us about your brand <span aria-hidden="true">*</span></label>
                  <textarea id={`${idPrefix}-project-message`} name="message" placeholder="Your brand, what you need help with, and where you’d like to take it." rows={3} required minLength={10} maxLength={3000} aria-invalid={!!errors.message} aria-describedby={errors.message ? `${idPrefix}-project-message-error` : undefined} onInput={() => clearError('message')} data-lenis-prevent />
                  {errors.message && <span className="inquiry-error" id={`${idPrefix}-project-message-error`}>{errors.message}</span>}
                </div>
                <div className="inquiry-submit-row">
                  <div className="brand-recaptcha" data-captcha-size="auto-width" ref={captchaRef} aria-label="Security check" />
                  <ActionButton className="inquiry-submit" type="submit" arrow disabled={status === 'sending'}>{status === 'sending' ? 'Submitting…' : 'Send inquiry'}</ActionButton>
                </div>
              </fieldset>
              {requestError && <p className="inquiry-request-error" role="alert">{requestError}</p>}
              <p className="inquiry-sr-only" role="status">{status === 'sending' ? 'Sending your inquiry.' : Object.keys(errors).length ? 'Please check the highlighted fields.' : ''}</p>
            </form>
          )}
        </div>
  )
}
