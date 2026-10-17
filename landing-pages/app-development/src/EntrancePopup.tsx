import { useEffect, useRef, useState } from 'react'
import LeadTablet from './LeadTablet'
import { assetUrl } from './assets'
import '../../shared/popup.css'

const preference = 'algofort:hide-app-popup'
function suppressed() {
  try { if (localStorage.getItem(preference) === '1') return true } catch {}
  return document.cookie.split(';').some(value => value.trim() === 'algofort_hide_app_popup=1')
}

export default function EntrancePopup() {
  const dialog = useRef<HTMLDialogElement>(null)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (suppressed()) return
    const timer = setTimeout(() => setOpen(true), 1800)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!open) return
    const node = dialog.current!
    const previousFocus = document.activeElement as HTMLElement | null
    node.showModal()
    window.dispatchEvent(new CustomEvent('algofort:menu-state', { detail: true }))
    return () => {
      node.close()
      window.dispatchEvent(new CustomEvent('algofort:menu-state', { detail: false }))
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open])
  function dismiss() {
    try { localStorage.setItem(preference, '1') } catch {}
    document.cookie = 'algofort_hide_app_popup=1; Max-Age=31536000; Path=/; SameSite=Lax'
    setOpen(false)
  }
  return <dialog ref={dialog} className="welcome-inquiry app-entrance-popup" aria-labelledby="app-popup-title" onCancel={event => { event.preventDefault(); setOpen(false) }}>
    <button type="button" className="welcome-close" aria-label="Close popup" onClick={() => setOpen(false)}>×</button>
    <div className="welcome-photo" aria-hidden="true"><img src={assetUrl('/showcase/commerce.jpg')} alt=""/></div>
    <div className="welcome-content"><header className="welcome-header"><p className="welcome-kicker">+ Let’s talk</p><h2 id="app-popup-title">Have an app in mind?</h2><p>Tell us about your idea. We’ll help you find the right way forward.</p></header>{open && <LeadTablet popup/>}<div className="welcome-preferences"><button className="welcome-dismiss" type="button" onClick={dismiss}>Don’t show again</button></div></div>
  </dialog>
}
