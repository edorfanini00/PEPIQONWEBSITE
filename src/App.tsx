import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Changelog from './pages/Changelog'
import VsPeptideTracker from './pages/VsPeptideTracker'
import Support from './pages/Support'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import PageMetadata from './components/PageMetadata'
import { legalAliases } from './data/site'

export function AppRoutes() {
  return <>
    <PageMetadata />
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/changelog" element={<Changelog />} />
        <Route path="/vs/peptide-tracker" element={<VsPeptideTracker />} />
        <Route path="/support" element={<Support />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        {Object.entries(legalAliases).map(([path, target]) => <Route key={path} path={path} element={<Navigate to={target} replace />} />)}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>
}
