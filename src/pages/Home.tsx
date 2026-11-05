import { APP_STORE_URL } from '../data/site'
import { homeFaqs } from '../data/home-faqs'
import { trackAppStoreClick } from '../lib/analytics'

function Download({ placement }: { placement: 'hero' | 'pricing' }) {
  return <a className="store-link" href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackAppStoreClick(placement)} aria-label="Download IQONIC on the App Store">
    <img src="/assets/app-store-badge.svg" alt="Download on the App Store" width={168} height={56} />
  </a>
}
function Screen({ name, alt, eager = false }: { name: string; alt: string; eager?: boolean }) {
  return <img src={`/assets/${name}.jpg`} srcSet={`/assets/${name}-400.webp 400w, /assets/${name}-600.webp 600w`} sizes="(max-width: 760px) 280px, 340px" alt={alt} width={600} height={1304} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : 'auto'} decoding="async" />
}
export default function Home() {
  return <div className="product-home">
    <a className="home-skip" href="#main">Skip to content</a>
    <header className="home-header wrap" id="top">
      <a className="home-wordmark" href="#top" aria-label="IQONIC home">IQONIC</a>
      <nav aria-label="Main navigation"><a href="#features">Features</a><a href="#tools">Calculator</a><a href="#pricing">Pricing</a><a href="#questions">FAQs</a></nav>
    </header>
    <main id="main">
      <section className="landing-hero wrap" aria-labelledby="hero-title">
        <div className="hero-copy"><h1 id="hero-title">Your peptide protocols.<br />In one daily view.</h1>
          <p>IQONIC brings your schedule, entries and calculations together, with nutrition and health tracking alongside.</p>
          <Download placement="hero" /><p className="download-note">For iPhone and iPad. Subscription required.</p>
        </div>
        <div className="hero-proof"><div className="screen-frame"><Screen name="iqonic-today" alt="IQONIC showing a weekly protocol schedule and completed daily entries" eager /></div></div>
      </section>
      <section className="schedule-story wrap story" id="features" aria-labelledby="schedule-title">
        <div className="story-copy"><h2 id="schedule-title">A place for every protocol.<br />A record of every entry.</h2><p>Keep the routine you already follow in order. Open your schedule, log an entry and return to your history.</p>
        </div>
        <div className="schedule-proof"><img src="/assets/schedule-detail.webp" alt="Detail of the IQONIC weekly schedule and completed daily protocol record" width={552} height={754} loading="lazy" decoding="async" /></div>
          <dl className="feature-lines"><div><dt>Plan your schedule</dt><dd>Set protocol timings and cycle lengths.</dd></div><div><dt>Log as you go</dt><dd>Record completed entries in your daily view.</dd></div><div><dt>Look back anytime</dt><dd>Keep previous entries with your protocol history.</dd></div></dl>
      </section>
      <section className="tools-band" id="tools" aria-labelledby="tools-title">
        <div className="wrap tools-layout">
          <div className="tools-intro"><h2 id="tools-title">The calculations.<br />The supply.<br />The cost.</h2><p>Keep the details of your protocol together, from the values you enter to the vials you have on hand.</p></div>
          <div className="calculator-detail"><h3>Reconstitution calculator</h3><p>Work through concentration and volume using your own inputs. Keep the breakdown and supply estimator in the same app.</p><figure><img src="/assets/calculator-concentration.webp" alt="IQONIC calculator detail showing vial size, water volume and the resulting concentration" width={892} height={660} loading="lazy" decoding="async" /></figure><p className="research-note">For research calculations. IQONIC does not recommend a dose or choose a protocol for you.</p></div>
          <div className="inventory-detail"><h3>Know what you have on hand</h3><p>Keep a vial inventory, log purchases and estimate how long your supply will last.</p></div>
          <div className="spend-detail"><h3>See what your protocol costs</h3><p>Review monthly spend and cost projections alongside your active protocols.</p></div>
        </div>
      </section>
      <section className="daily-story wrap" aria-labelledby="daily-title">
        <div className="section-intro"><h2 id="daily-title">The rest of your day<br />belongs here, too.</h2><p>Meals, water and health records, in the same app as your protocols.</p></div>
        <div className="daily-columns">
          <article><h3>Meals, macros and water</h3><p>Scan a meal, look up a barcode or log food yourself. Track calories, protein and macros, and add water throughout the day.</p><div className="daily-proof nutrition-proof"><div className="screen-frame"><Screen name="iqonic-nutrition" alt="IQONIC nutrition screen with calories, macros, meal logging and meal scan" /></div></div></article>
          <article><h3>Your health, alongside your routine</h3><p>Log periods and symptoms, and review cycle history. Connect Apple Health for steps, calories burned and sleep, with the permissions you choose.</p><div className="daily-proof health-proof"><div className="screen-frame"><Screen name="iqonic-lifestyle" alt="IQONIC lifestyle screen with nutrition, water, activity and Apple Health connection" /></div></div></article>
        </div>
      </section>
      <section className="reference-story wrap" aria-labelledby="reference-title"><h2 id="reference-title">Research reference,<br />close at hand.</h2><div><p>The compound library brings together profiles for 25+ research compounds, including pharmacokinetics, timing references and plain language notes.</p><p className="research-note">For organization and education. Reference material is not medical advice or a recommendation to use a compound.</p></div></section>
      <section className="home-pricing" id="pricing" aria-labelledby="pricing-title"><div className="wrap pricing-layout">
        <div className="pricing-intro"><h2 id="pricing-title">One app.<br />Two subscription options.</h2><p>Free to download. Full app access requires a subscription. There is no free tier.</p></div>
        <div className="price-options"><div><h3>Premium monthly</h3><p className="price">$8.99<span> / month</span></p><p>Billed monthly.</p></div><div><h3>Premium annual</h3><p className="price">$49.99<span> / year</span></p><p>About $4.17 a month, billed annually.</p></div></div>
        <div className="pricing-download"><Download placement="pricing" /><p className="download-note">Subscription required. Manage or cancel in your Apple account.</p></div>
        <p className="price-disclosure">US prices effective October 12, 2026. Prices vary by region and may change. The App Store price shown before subscribing applies. <a href="/pricing">Full pricing details</a></p>
      </div></section>
      <section className="home-faq wrap" id="questions" aria-labelledby="faq-title"><h2 id="faq-title">Frequently asked questions</h2><div className="questions-list">{homeFaqs.map(faq => <details key={faq.id}><summary>{faq.question}<span aria-hidden="true">+</span></summary><div className="question-answer"><p>{faq.answer}</p>{faq.link && <a href={faq.link.href} onClick={faq.link.href === APP_STORE_URL ? () => trackAppStoreClick('faq') : undefined} target={faq.link.href === APP_STORE_URL ? '_blank' : undefined} rel={faq.link.href === APP_STORE_URL ? 'noopener noreferrer' : undefined}>{faq.link.text}</a>}</div></details>)}</div></section>
    </main>
    <footer className="home-footer wrap"><div className="footer-line"><p>© {new Date().getFullYear()} IQON Health</p><nav aria-label="Legal and support"><a href="/pricing">Pricing</a><a href="/about">About</a><a href="/vs/peptide-tracker">Compare</a><a href="/changelog">Changelog</a><a href="/support">Support</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:info@iqonhealth.com">Contact</a></nav></div><p className="footer-note">For organization and education. Not medical advice.<br />Screens show an example account. Features may vary by app version.</p></footer>
  </div>
}
