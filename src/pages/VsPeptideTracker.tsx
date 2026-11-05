import { Link } from 'react-router-dom'
import { APP_STORE_URL } from '../data/site'

// Facts verified against the public App Store listings on 4 November 2026.
// Peptide Tracker 3.1.0 release notes (published 30 October 2026) state that the
// app "no longer calculates doses or draws". Re-check before editing this page.
const ROWS = [
  { feature: 'Protocol tracking and schedules', iqonic: 'Yes', rival: 'Yes' },
  { feature: 'Reconstitution calculator', iqonic: 'Concentration, volume and supply estimate in one view', rival: 'Removed in version 3.1.0' },
  { feature: 'Spending tracker', iqonic: 'Vial purchases, monthly spend and projections', rival: 'Not listed in the App Store description' },
  { feature: 'Compound library', iqonic: '25+ research profiles with pharmacokinetics and timing', rival: 'Not listed in the App Store description' },
  { feature: 'Apple Health', iqonic: 'Steps, calories burned and sleep', rival: 'Yes' },
  { feature: 'App Store rating', iqonic: '5.0 from 3 ratings', rival: '4.9 from 2,906 ratings' },
]

const FAQS = [
  { q: 'Does Peptide Tracker still calculate doses?', a: 'Peptide Tracker 3.1.0, released on 30 October 2026, states in its own release notes that it "no longer calculates doses or draws". Anyone who wants the math inside the app has to bring it from somewhere else.' },
  { q: 'Is IQONIC a replacement for Peptide Tracker?', a: 'They overlap on protocol tracking. IQONIC keeps the reconstitution calculation, the spending record and the compound library in the same app, which is the difference this page is about. Peptide Tracker carries a much larger review base, and it is free to use.' },
  { q: 'Which one should I choose?', a: 'If the calculation is the part you keep redoing by hand, IQONIC does it for you. If you only need a log and a reminder, either works. IQONIC is free to download, with an optional Premium subscription.' },
  { q: 'Is IQONIC medical advice?', a: 'No. IQONIC is an organizational and educational tool. It does not recommend doses and is not a substitute for medical advice.' },
]

export default function VsPeptideTracker() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob blob-blue right-[-10%] top-[-5%] h-[22rem] w-[22rem]" aria-hidden="true" />
      <article className="relative mx-auto w-full max-w-[860px] px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">Comparison</p>
        <h1 className="text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">IQONIC vs Peptide Tracker</h1>
        <p className="mt-6 text-lg leading-relaxed text-sage">
          Peptide Tracker Log &amp; Reminder is the closest app to IQONIC in focus, so this page compares the two
          on the parts that differ. Everything below was checked against the public App Store listings on
          4 November 2026.
        </p>

        <div className="mt-12 overflow-hidden rounded-2xl border border-hairline">
          <table className="vs-table w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-cream text-ink">
                <th scope="col" className="px-4 py-4 font-medium">Feature</th>
                <th scope="col" className="px-4 py-4 font-medium">IQONIC</th>
                <th scope="col" className="px-4 py-4 font-medium">Peptide Tracker 3.1.0</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map(row => (
                <tr key={row.feature} className="border-t border-hairline align-top">
                  <th scope="row" className="px-4 py-4 font-normal text-ink">{row.feature}</th>
                  <td data-label="IQONIC" className="px-4 py-4 text-sage">{row.iqonic}</td>
                  <td data-label="Peptide Tracker 3.1.0" className="px-4 py-4 text-sage">{row.rival}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-14 text-2xl font-medium tracking-[-0.02em] text-ink">The calculator that stayed</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          A reconstitution calculation is the step people repeat most often, and it is the step most likely to be
          done on paper. IQONIC keeps vial size, solution volume and concentration in a single view, shows the
          breakdown as you type, and pairs it with a supply estimate. Peptide Tracker removed its own calculator
          in version 3.1.0: you now enter the draw yourself.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">Questions</h2>
        <dl className="mt-6 divide-y divide-[rgba(18,32,28,0.08)] border-y border-hairline">
          {FAQS.map(item => (
            <div key={item.q} className="py-5">
              <dt className="text-base font-medium text-ink">{item.q}</dt>
              <dd className="mt-2 text-base leading-relaxed text-sage">{item.a}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-sm text-sage">
          Peptide Tracker is a product of Flat Six Labs LLC. Names are used for identification only, and this page
          is not endorsed by them. See{' '}
          <Link to="/about" className="underline transition-colors duration-300 hover:text-ink">about IQONIC</Link>{' '}
          or read the{' '}
          <Link to="/privacy" className="underline transition-colors duration-300 hover:text-ink">privacy policy</Link>.
        </p>

        <p className="mt-8">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-300 hover:text-ink">
            Get IQONIC on the App Store
          </a>
        </p>
      </article>
    </div>
  )
}
