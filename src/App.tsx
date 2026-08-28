import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'

// Hosting rewrites every path to index.html so the client router can handle
// deep links, which means an unknown path arrives here as a 200 rather than a
// 404. Without a match it would render nothing at all — a blank page, which is
// what an App Store reviewer sees as a broken legal link. So every plausible
// spelling of the two legal pages resolves, and anything else lands on Home.
const PRIVACY_ALIASES = [
  '/privacy-policy',
  '/privacypolicy',
  '/privacy_policy',
  '/legal/privacy',
  '/legal/privacy-policy',
  '/policies/privacy',
]

const TERMS_ALIASES = [
  '/terms-of-service',
  '/terms-of-use',
  '/termsofservice',
  '/terms_of_service',
  '/tos',
  '/eula',
  '/legal/terms',
  '/legal/terms-of-service',
  '/policies/terms',
]

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {PRIVACY_ALIASES.map(path => (
            <Route key={path} path={path} element={<Navigate to="/privacy" replace />} />
          ))}
          {TERMS_ALIASES.map(path => (
            <Route key={path} path={path} element={<Navigate to="/terms" replace />} />
          ))}

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
