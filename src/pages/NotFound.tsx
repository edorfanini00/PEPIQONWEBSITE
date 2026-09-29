import { Link } from 'react-router-dom'

export default function NotFound() {
  return <section className="mx-auto max-w-[720px] px-6 py-24">
    <p className="eyebrow mb-4">404</p>
    <h1 className="text-3xl text-ink">This page could not be found.</h1>
    <p className="mt-4 text-sage">Explore the IQONIC app or contact our support team.</p>
    <div className="mt-8 flex gap-6"><Link to="/" className="underline">IQONIC homepage</Link><Link to="/support" className="underline">Contact support</Link></div>
  </section>
}
