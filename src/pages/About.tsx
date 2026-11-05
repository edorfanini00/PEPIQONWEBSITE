import { Link } from 'react-router-dom'
import { APP_STORE_URL } from '../data/site'

export default function About() {
  return (
    <div className="relative overflow-hidden">
      <div className="blob blob-blue right-[-10%] top-[-5%] h-[22rem] w-[22rem]" aria-hidden="true" />
      <article className="relative mx-auto w-full max-w-[760px] px-6 py-16 md:py-24">
        <p className="eyebrow mb-4">About</p>
        <h1 className="text-4xl font-medium tracking-[-0.03em] text-ink md:text-5xl">About IQONIC</h1>
        <p className="mt-6 text-lg leading-relaxed text-sage">
          IQONIC is a peptide protocol tracking app built by IQON Health. It exists because a protocol spread
          across notes, spreadsheets, forum threads and screenshots is easy to lose track of, and the parts that
          matter most, the schedule, the math and the spend, are the parts that get scattered first.
        </p>

        <section aria-labelledby="founder-name" className="mt-12 border-y border-hairline py-8">
          <p className="eyebrow mb-4">Behind IQONIC</p>
          <h2 id="founder-name" className="text-3xl font-medium tracking-[-0.02em] text-ink">Edoardo Orfanini</h2>
          <p className="mt-2 text-sm text-sage">Founder and CEO</p>
          <p className="mt-5 text-base leading-relaxed text-sage">
            Edoardo built and shipped IQONIC to bring the daily work of a health routine into one place.
            The app connects protocol scheduling and vial inventory with nutrition and health logs,
            so those records can sit together instead of being scattered across apps and notes.
          </p>
        </section>

        <h2 className="mt-14 text-2xl font-medium tracking-[-0.02em] text-ink">What the app does</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          You enter the protocol you have already decided on. IQONIC keeps the schedule, the log, the
          reconstitution calculation, the vial inventory and the spending in one place, and adds a compound
          library of 25+ research profiles for cross-checking.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">Who it is for</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          People running more than one compound who want their stack, doses, math and spend in a single record
          instead of several.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">Who it is not for</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          IQONIC is an organizational and educational tool. It does not recommend doses, it does not tell you
          what is safe, and it is not a substitute for medical advice from a licensed professional. Research
          compounds are not approved for human consumption.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">How we handle your data</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          Your protocol entries are stored in your IQONIC account. We do not sell your personal information.
          Apple processes subscription payments, so we never receive or store your card details. The{' '}
          <Link to="/privacy" className="underline transition-colors duration-300 hover:text-ink">Privacy Policy</Link>{' '}
          sets out what is collected, why, and how to delete your account.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-[-0.02em] text-ink">Contact</h2>
        <p className="mt-4 text-base leading-relaxed text-sage">
          IQON Health · <a href="mailto:info@iqonhealth.com" className="underline transition-colors duration-300 hover:text-ink">info@iqonhealth.com</a>
        </p>

        <p className="mt-14 border-t border-hairline pt-8 text-sm text-sage">
          <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="underline transition-colors duration-300 hover:text-ink">
            IQONIC on the App Store
          </a>
        </p>
      </article>
    </div>
  )
}
