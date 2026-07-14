import { useEffect } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'

const titles: Record<string, string> = {
  '/': 'IQONIC',
  '/support': 'Support — IQONIC',
  '/privacy': 'Privacy Policy — IQONIC',
  '/terms': 'Terms of Service — IQONIC',
}

export default function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.title = titles[pathname] ?? 'IQONIC'
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="border-b border-hairline">
        <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 py-5">
          <Link to="/" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-medium tracking-[-0.02em] text-ink">
              IQONIC
            </span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              to="/support"
              className="text-sm text-sage transition-colors duration-300 hover:text-ink"
            >
              Support
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-hairline bg-cream">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-6 py-8 text-sm text-sage md:flex-row md:items-center md:justify-between">
          <p>
            IQONIC is operated by IQON Health ·{' '}
            <a
              href="mailto:info@iqonhealth.com"
              className="underline transition-colors duration-300 hover:text-ink"
            >
              info@iqonhealth.com
            </a>
          </p>
          <nav className="flex gap-6">
            <Link to="/support" className="transition-colors duration-300 hover:text-ink">
              Support
            </Link>
            <Link to="/privacy" className="transition-colors duration-300 hover:text-ink">
              Privacy
            </Link>
            <Link to="/terms" className="transition-colors duration-300 hover:text-ink">
              Terms
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}

function Logo() {
  return (
    <svg width="30" height="30" viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="9" fill="#12201C" />
      <circle cx="12" cy="16" r="5" fill="none" stroke="#D4FF9E" strokeWidth="2.5" />
      <circle cx="21" cy="16" r="5" fill="none" stroke="#D4FF9E" strokeWidth="2.5" opacity="0.55" />
    </svg>
  )
}
