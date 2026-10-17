import { useEffect, useRef, useState } from 'react'
import { captchaToken, observeCaptcha, resetCaptcha } from '../../web-development/src/captcha.js'
import { submitContactForm } from '../../../src/utils/submitContactForm.js'

export function useAppCaptcha(status: string) {
  const captchaRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')
  useEffect(() => {
    if (status === 'sent') return
    let active = true
    const disconnect = observeCaptcha(captchaRef.current, (failure: Error) => { if (active) setError(failure.message) })
    return () => { active = false; disconnect?.() }
  }, [status])
  return { captchaRef, error, setError }
}

export async function sendAppLead(form: HTMLFormElement, source: string, captcha: HTMLDivElement | null, honey: string) {
  const token = captchaToken(captcha)
  if (!token) throw new Error('Please complete the security check and try again.')
  const fields = new FormData(form)
  try {
    await submitContactForm({
      fullName: String(fields.get('name') || '').trim(),
      email: String(fields.get('email') || '').trim(),
      phone: '', website: honey, selectedServices: ['App Development'], recaptchaToken: token,
      message: [
        `Platform: ${fields.get('project_type') || 'Not provided'}`,
        `Company: ${fields.get('company') || 'Not provided'}`,
        `Business website: ${fields.get('website') || 'Not provided'}`,
        `Budget: ${fields.get('budget') || 'Not provided'}`,
        `Timeline: ${fields.get('timeline') || 'Flexible'}`,
        '', String(fields.get('message') || ''),
      ].join('\n'),
    }, source)
  } finally {
    resetCaptcha(captcha)
  }
}
