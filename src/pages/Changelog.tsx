import { Link } from 'react-router-dom'
import { APP_STORE_URL } from '../data/site'

// Entries are dated releases, newest first. Notes are the App Store release notes.
const RELEASES = [
  {
    version: '1.3.4',
    date: '27 October 2026',
    notes: [
      'Calculator results update correctly as you enter any vial and liquid amount.',
      'The syringe guide now shows when a draw is more than a 1 mL syringe holds.',
      'Layouts are easier to read at larger text sizes.',
      'Navigation stability fixes.',
    ],
  },
]

export default function Changelog() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob blob-blue right-[-10%] top-[-5%] h-[22rem] w-[22rem]" aria-hidden="true" />
      <article className="relative mx-auto w-full max-w-[760px] px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">Changelog</p>
        <h1 className="text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">What shipped, and when</h1>
        <p className="mt-6 text-lg leading-relaxed text-sage">
          Dated release notes for IQONIC on the App Store. The list starts with the current version.
        </p>

        <div className="mt-12 space-y-12">
          {RELEASES.map(release => (
            <section key={release.version} aria-labelledby={`v-${release.version}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-hairline pb-4">
                <h2 id={`v-${release.version}`} className="text-xl font-medium tracking-[-0.02em] text-ink">
                  Version {release.version}
                </h2>
                <p className="text-sm text-sage">
                  <time dateTime="2026-10-27">27 October 2026</time>
                </p>
              </div>
              <ul className="mt-5 space-y-3">
                {release.notes.map(note => (
                  <li key={note} className="pl-5 text-base leading-relaxed text-sage before:-ml-5 before:mr-2 before:content-['·']">
                    {note}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-hairline pt-8 text-sm text-sage">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-300 hover:text-ink">
            Version history on the App Store
          </a>
          {' · '}
          <Link to="/about" className="underline transition-colors duration-300 hover:text-ink">About IQONIC</Link>
        </p>
      </article>
    </div>
  )
}
