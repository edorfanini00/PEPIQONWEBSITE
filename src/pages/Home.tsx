import { Link } from 'react-router-dom'
import DownloadLink from '../components/DownloadLink'
import './Home.css'

function Phone({ screen, label, className = '', priority = false }: { screen: string; label: string; className?: string; priority?: boolean }) {
  return <div className={`product-phone product-${screen} ${className}`}><img src={`/screens/${screen}.png`} alt={label} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} width={978} height={screen === 'spending' ? 1022 : 1998} /></div>
}

const questions = [
  { question: 'What is IQONIC?', answer: 'IQONIC brings daily overview, nutrition logging, sleep, weight, research protocol organization, and inventory and spending into one iPhone app. It gives the things you track a shared home.' },
  { question: 'Is IQONIC free to download?', answer: 'Yes. IQONIC is free to download on the App Store and offers in app subscriptions. You can review current plans, prices, and terms in the app before subscribing.' },
  { question: 'Does it connect with Apple Health?', answer: 'Yes. IQONIC supports Apple Health integration. You choose which supported health data to share and can manage access in your iPhone settings.' },
  { question: 'What are the research tools for?', answer: 'The research tools help organize protocols, inventory, and spending for informational and research purposes. They do not provide medical advice, diagnosis, treatment, or instructions for human use.' },
  { question: 'Where can I get help?', answer: <>Visit our <Link to="/support">support page</Link> or email <a href="mailto:info@iqonhealth.com">info@iqonhealth.com</a>. You can also read our <Link to="/privacy">privacy policy</Link> and <Link to="/terms">terms of service</Link>.</> },
]

export default function Home() {
  return (
    <div className="iqonic-home">
      <section className="home-hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="section-label">A clearer view of your every day</p>
          <h1 id="hero-title">Your daily picture.<br /><span>Beautifully connected.</span></h1>
          <p className="hero-description">Nutrition, sleep, weight, and research.<br className="desktop-break" /> Together in one thoughtfully designed iPhone app.</p>
          <DownloadLink />
          <p className="download-note">Free to download. In app subscriptions available.</p>
        </div>
        <div className="hero-stage" aria-label="A look inside IQONIC">
          <div className="stage-word" aria-hidden="true">IQONIC</div>
          <Phone screen="nutrition" label="IQONIC Lifestyle preview published on the App Store" className="hero-phone hero-phone-center" priority />
          <Phone screen="spending" label="IQONIC Spending preview published on the App Store" className="hero-phone hero-phone-right" priority />
        </div>
        <div className="hero-caption"><span>App Store previews. Screens shown for illustration.</span><a href="#overview">Meet IQONIC <span aria-hidden="true">↓</span></a></div>
      </section>

      <section className="overview-section section-shell" id="overview" aria-labelledby="overview-title">
        <div className="section-heading"><p className="section-label">Your daily lifestyle</p><h2 id="overview-title">Your day.<br /><span>At a glance.</span></h2></div>
        <div className="overview-composition">
          <div className="overview-art"><div className="orbit orbit-one" aria-hidden="true" /><div className="orbit orbit-two" aria-hidden="true" /><Phone screen="nutrition" label="IQONIC Lifestyle preview published on the App Store" /><span className="art-caption">One place to come back to.</span></div>
          <div className="overview-copy"><h3>A little perspective.<br />A lot less switching.</h3><p>See nutrition, water, and weight in your lifestyle view. Connect Apple Health to bring steps, calories, and sleep into IQONIC.</p><div className="feature-lines"><div><span>01</span><p><strong>The essentials, together.</strong> Track protein, calories, and water alongside your weight records.</p></div><div><span>02</span><p><strong>Room for the details.</strong> Explore weight trends and weekly sleep charts.</p></div><div><span>03</span><p><strong>Made for your iPhone.</strong> A considered interface with Apple Health integration.</p></div></div></div>
        </div>
      </section>

      <section className="research-section" id="research" aria-labelledby="research-title">
        <div className="research-inner section-shell">
          <div className="research-copy"><p className="section-label">A place for your research</p><h2 id="research-title">Organized.<br />Down to<br /><span>the details.</span></h2><p>Keep research protocols, inventory, and spending in one place. More structure for your records. More clarity about what you have.</p><div className="research-topics"><span>Protocol organization</span><span>Inventory tracking</span><span>Spending overview</span></div><p className="research-disclaimer">For research and informational purposes only.<br />Not medical advice or instructions for human use.</p></div>
          <div className="research-art"><span className="research-art-label">A clearer view of spending</span><Phone screen="spending" label="IQONIC spending and inventory organization" /><span className="research-art-bottom">Every detail has its place.</span></div>
        </div>
      </section>

      <section className="nutrition-section section-shell" id="nutrition" aria-labelledby="nutrition-title">
        <div className="nutrition-heading"><p className="section-label">The everyday details</p><h2 id="nutrition-title">Small moments.<br /><span>A fuller picture.</span></h2><p>What you eat. How you sleep. Where your weight is heading. Give your daily records a place to live.</p></div>
        <div className="nutrition-composition"><div className="nutrition-art"><div className="nutrition-art-copy"><span className="section-label">Nutrition</span><h3>Scan a meal.<br />Log your food.</h3></div><Phone screen="nutrition" label="IQONIC Lifestyle preview published on the App Store" /></div><div className="daily-details"><article><span className="detail-marker" aria-hidden="true">↗</span><h3>Food, logged.</h3><p>Use AI meal scanning, barcode lookup, or manual logging to build your food diary.</p></article><article><span className="detail-marker" aria-hidden="true">◐</span><h3>Rest, recorded.</h3><p>Explore weekly sleep charts alongside the rest of your daily tracking.</p></article><article><span className="detail-marker" aria-hidden="true">↔</span><h3>Weight, in view.</h3><p>Follow your weight trends over time, not just a number in the moment.</p></article></div></div>
      </section>

      <section className="health-section" aria-labelledby="health-title"><div className="section-shell health-inner"><div className="health-symbol" aria-hidden="true">♥</div><div><p className="section-label">Works with Apple Health</p><h2 id="health-title">Connected by you.<br /><span>For your daily view.</span></h2></div><div className="health-copy"><p>Bring supported Apple Health data into IQONIC. You choose what to share, with access managed in your iPhone settings.</p><Link to="/privacy" className="text-link">Read our privacy policy <span aria-hidden="true">↗</span></Link></div></div></section>

      <section className="faq-section section-shell" id="questions" aria-labelledby="faq-title"><div><p className="section-label">A few things to know</p><h2 id="faq-title">Good questions.<br /><span>Clear answers.</span></h2><Link to="/support" className="text-link">Visit support <span aria-hidden="true">↗</span></Link></div><div className="faq-list">{questions.map(({ question, answer }) => <details key={question}><summary>{question}<span className="faq-toggle" aria-hidden="true" /></summary><div className="faq-answer">{answer}</div></details>)}</div></section>

      <section className="closing-section" aria-labelledby="closing-title"><p className="section-label">This is your daily picture</p><h2 id="closing-title">Make it<br /><span>come together.</span></h2><p>Meet your new everyday app.</p><DownloadLink /><p className="download-note">Available for iPhone. Free to download.<br />In app subscriptions available.</p></section>
    </div>
  )
}
