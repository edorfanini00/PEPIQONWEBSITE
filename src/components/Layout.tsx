import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import DownloadLink from './DownloadLink'
import './Layout.css'

const titles: Record<string, string> = {
  '/': 'IQONIC | Your daily picture, beautifully connected',
  '/support': 'Support | IQONIC',
  '/privacy': 'Privacy Policy | IQONIC',
  '/terms': 'Terms of Service | IQONIC',
}

export default function Layout() {
  const { pathname } = useLocation()
  useEffect(() => {
    document.title = titles[pathname] ?? 'IQONIC'
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', `https://iqonicapp.com${pathname === '/' ? '/' : pathname}`)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="site-layout">
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="site-header"><div className="site-nav-inner">
        <Link to="/" className="site-brand" aria-label="IQONIC home"><img src="/screens/app-icon.jpg" alt="" width="28" height="28" /><span>IQONIC</span></Link>
        <nav aria-label="Main navigation"><a className="nav-explore" href="/#overview">Explore</a><Link className="nav-support" to="/support">Support</Link><DownloadLink compact /></nav>
      </div></header>
      <main id="main-content" className="site-main"><Outlet /></main>
      <footer className="site-footer"><div className="footer-inner"><div className="footer-top"><Link to="/" className="site-brand">IQONIC</Link><p>Your daily picture. Beautifully connected.</p></div><div className="footer-bottom"><p>IQONIC · <a href="mailto:info@iqonhealth.com">info@iqonhealth.com</a></p><nav aria-label="Footer navigation"><Link to="/support">Support</Link><Link to="/privacy">Privacy</Link><Link to="/terms">Terms</Link></nav></div><p className="footer-disclaimer">IQONIC is for informational and research purposes and does not provide medical advice. Apple and the Apple logo are trademarks of Apple Inc. App Store is a service mark of Apple Inc.</p></div></footer>
    </div>
  )
}
