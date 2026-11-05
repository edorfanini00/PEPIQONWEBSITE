import { Link } from 'react-router-dom'
import { APP_STORE_URL } from '../data/site'

const INCLUDED = [
  'Protocol schedules, logging and history',
  'Reconstitution calculator with supply estimate',
  'Spending tracker with cost projections',
  'Compound library with 25+ research profiles',
  'Nutrition, hydration, weight, sleep and cycle tracking',
  'Apple Health integration',
]

export default function Pricing() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob blob-blue right-[-10%] top-[-5%] h-[22rem] w-[22rem]" aria-hidden="true" />
      <article className="relative mx-auto w-full max-w-[860px] px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">Pricing</p>
        <h1 className="text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">Free to download. Subscription required.</h1>
        <p className="mt-6 text-lg leading-relaxed text-sage">
          IQONIC is free to download. Full app access requires a monthly or annual Premium subscription. Cancel any
          time in your Apple account subscription settings.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-hairline bg-white p-6">
            <h2 className="text-base font-medium text-ink">Premium monthly</h2>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-medium tracking-[-0.03em] text-ink">$8.99</span>
              <span className="text-sm text-sage">/ month</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sage">Billed monthly through the App Store.</p>
          </section>
          <section className="rounded-2xl border border-ink bg-white p-6">
            <p className="mb-2 inline-block rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-white">Best value</p>
            <h2 className="text-base font-medium text-ink">Premium annual</h2>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-4xl font-medium tracking-[-0.03em] text-ink">$49.99</span>
              <span className="text-sm text-sage">/ year</span>
            </p>
            <p className="mt-3 text-sm leading-relaxed text-sage">
              About $4.17 a month, and less than six monthly payments. Saves $57.89 against twelve monthly payments.
            </p>
          </section>
        </div>

        <h2 className="mt-14 text-2xl font-medium tracking-[-0.02em] text-ink">What Premium includes</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {INCLUDED.map(item => (
            <li key={item} className="text-base leading-relaxed text-sage">{item}</li>
          ))}
        </ul>

        <h2 className="mt-14 text-2xl font-medium tracking-[-0.02em] text-ink">How billing works</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          Payment is charged to your Apple ID. Subscriptions renew automatically unless canceled at least 24 hours
          before the current period ends. Manage or cancel in your App Store account settings. Apple processes the
          payment, so we never receive or store your card details.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-sage">
          US prices, effective October 12, 2026. Prices vary by region and may change, and the App Store price
          shown before you subscribe is the one that applies.
        </p>

        <p className="mt-10">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-300 hover:text-ink">
            Get IQONIC on the App Store
          </a>
        </p>
        <p className="mt-10 border-t border-hairline pt-8 text-sm text-sage">
          See the <Link to="/" className="underline transition-colors duration-300 hover:text-ink">homepage</Link> for the full feature list, or read the{' '}
          <Link to="/terms" className="underline transition-colors duration-300 hover:text-ink">subscription terms</Link>.
        </p>
      </article>
    </div>
  )
}
