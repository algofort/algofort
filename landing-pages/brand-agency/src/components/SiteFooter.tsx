import { Footer } from '../../../../src/components/common/Footer.jsx'
import { useLayoutEffect } from 'react'
import './SiteFooter.css'

export default function SiteFooter() {
  useLayoutEffect(() => {
    const syncWidth = () => document.documentElement.style.setProperty('--brand-footer-width', `${document.documentElement.clientWidth}px`)
    syncWidth()
    window.addEventListener('resize', syncWidth)
    return () => window.removeEventListener('resize', syncWidth)
  }, [])
  return <Footer className="lp-main-footer" newsletterPreview />
}
