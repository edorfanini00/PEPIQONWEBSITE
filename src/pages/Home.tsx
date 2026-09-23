import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import DownloadLink from '../components/DownloadLink'
import './Home.css'
import { screenDimensions } from '../screenDimensions'

type Feature = { id: string; name: string; title: string; description: string; details: string[]; image: string }
const research: Feature[] = [
  { id: 'vials', name: 'Vial inventory', title: 'Know what you have.\nSee what remains.', description: 'A visual home for your research inventory. See vial counts and remaining volume, then open the details without losing the bigger picture.', details: ['Visual vial levels', 'Inventory adjustments', 'Purchase records'], image: 'vials' },
  { id: 'reconstitution', name: 'Reconstitution', title: 'The calculation.\nNot the guesswork.', description: 'Keep vial size, solution volume, and concentration in the same view. A dedicated calculator for organizing your research math.', details: ['Concentration calculation', 'Reconstitution reference', 'Supply estimation'], image: 'reconstitution' },
  { id: 'protocols', name: 'Protocols & cycles', title: 'Give every protocol\na clear structure.', description: 'Organize compounds, schedules, and cycle lengths. Build a research protocol, review it, and make changes as your records evolve.', details: ['Custom protocol builder', 'Cycle dates and schedules', 'Protocol templates'], image: 'protocols' },
  { id: 'calendar', name: 'Schedule & history', title: 'The plan.\nAnd the record.', description: 'Move between the daily view and calendar to see your schedule and recorded activity in context.', details: ['Daily schedule', 'Calendar navigation', 'Logging and history'], image: 'calendar' },
  { id: 'spending', name: 'Spending', title: 'Every purchase.\nA clearer total.', description: 'Keep research purchases connected to your inventory. Review spending and cost projections without maintaining another spreadsheet.', details: ['Vial purchase costs', 'Spending overview', 'Cost projections'], image: 'spending' },
  { id: 'library', name: 'Compound library', title: 'Look it up.\nKeep the context.', description: 'Explore compound profiles and educational references alongside your research tools. Information to read, not treatment advice.', details: ['Searchable compound library', 'Compound profiles', 'Educational references'], image: 'library' },
]
const lifestyle = [
  { id: 'nutrition', title: 'Nutrition', subtitle: 'A place for every meal.', body: 'Food logging, meal photo scanning, barcode lookup, and daily calories and macros.', image: 'nutrition' },
  { id: 'weight', title: 'Weight', subtitle: 'A record over time.', body: 'Track weigh ins, review your trend, and keep your goals in view.', image: 'weight' },
  { id: 'lifestyle', title: 'Sleep & hydration', subtitle: 'The rest of your routine.', body: 'Record sleep and water alongside your daily activity and nutrition.', image: 'lifestyle' },
  { id: 'cycle', title: 'Cycle tracking', subtitle: 'Your own timeline.', body: 'Keep cycle dates and recorded symptoms together in a dedicated view.', image: 'cycle' },
]
const gallery = [
  { image: 'vials', name: 'Vial inventory', category: 'Research' },
  { image: 'reconstitution', name: 'Reconstitution', category: 'Research' },
  { image: 'protocols', name: 'Protocols', category: 'Research' },
  { image: 'calendar', name: 'Calendar', category: 'Research' },
  { image: 'spending', name: 'Spending', category: 'Research' },
  { image: 'supply', name: 'Supply estimator', category: 'Research' },
  { image: 'learn', name: 'Education', category: 'Research' },
  { image: 'library', name: 'Compound library', category: 'Research' },
  { image: 'nutrition', name: 'Nutrition & macros', category: 'Daily life' },
  { image: 'meal-scan-input', name: 'Food logging', category: 'Daily life' },
  { image: 'meal-scan', name: 'Meal scan review', category: 'Daily life' },
  { image: 'weight', name: 'Weight tracking', category: 'Daily life' },
  { image: 'lifestyle', name: 'Sleep & hydration', category: 'Daily life' },
  { image: 'cycle', name: 'Cycle tracking', category: 'Daily life' },
  { image: 'progress', name: 'Progress photos', category: 'Daily life' },
  { image: 'health', name: 'Apple Health', category: 'Daily life' },
]
const faqs = [
  ['What is IQONIC?', 'IQONIC is an iPhone app for organizing research protocols, vial inventory, calculations, schedules, and spending, with everyday tools for nutrition, weight, sleep, hydration, and more.'],
  ['Is it free to download?', 'Yes. IQONIC is free to download and offers in app subscriptions. Review current subscription plans and pricing in the app before purchasing.'],
  ['Does it work with Apple Health?', 'IQONIC supports Apple Health integration for supported activity data, including steps and calories burned. You control access through your iPhone settings.'],
  ['Does IQONIC provide medical advice?', 'No. IQONIC is an organizational and educational tool, not medical advice, diagnosis, or treatment. Research compounds are not approved for human consumption. The screens on this page use illustrative sample data, not recommendations.'],
]
function Arrow({ diagonal = false }: { diagonal?: boolean }) { return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span> }
function Screen({ image, className = '', eager = false }: { image: string; className?: string; eager?: boolean }) { return <div className={`app-screen ${className}`}><img src={`/screens/v2/${image}.png`} alt={`IQONIC ${gallery.find(x => x.image === image)?.name || image} screen with illustrative demo data`} loading={eager ? 'eager' : 'lazy'} width={screenDimensions[image][0]} height={screenDimensions[image][1]} /></div> }

export default function Home() {
  const [active, setActive] = useState(0)
  const [daily, setDaily] = useState(0)
  const [filter, setFilter] = useState('All screens')
  const [lightbox, setLightbox] = useState<(typeof gallery)[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)
  const rail = useRef<HTMLDivElement>(null)
  const feature = research[active]
  const dailyFeature = lifestyle[daily]
  useEffect(() => { if (lightbox) dialog.current?.showModal(); else dialog.current?.close() }, [lightbox])
  function tabKey(e: React.KeyboardEvent, current: number, total: number, choose: (i: number) => void) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft' && e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    e.preventDefault(); const next = (current + (e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : -1) + total) % total; choose(next)
    const group = e.currentTarget.parentElement; (group?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next])?.focus()
  }
  return <div className="iqonic-home v2">
    <section className="v2-hero" aria-labelledby="hero-title">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-editorial">
        <p className="eyeline"><span className="availability-dot" /> IQONIC FOR IPHONE</p>
        <h1 id="hero-title">YOUR{' '}<br />RESEARCH.<br /><span>IN FULL VIEW.</span></h1>
        <p className="hero-intro">Every vial. Every calculation. Every detail.<br />Your research tools and daily tracking,<br className="wide-only" /> finally in one place.</p>
        <div className="hero-actions"><DownloadLink /><a className="quiet-link" href="#research">Explore the app <Arrow diagonal /></a></div>
        <p className="micro-note">Free to download. In app subscriptions available.</p>
      </div>
      <div className="hero-product"><img src="/screens/v2/hero-phones.webp" alt="Three dimensional IQONIC product showcase with real app screens and illustrative sample data" fetchPriority="high" width="1200" height="1300" /></div>
      <div className="hero-bottom"><span>BUILT AROUND THE WAY YOU TRACK.</span><a href="#research">Discover IQONIC <span aria-hidden="true">↓</span></a></div>
    </section>

    <div className="feature-marquee" aria-label="IQONIC capabilities"><span>VIAL INVENTORY</span><i /> <span>RECONSTITUTION</span><i /><span>PROTOCOLS</span><i /><span>NUTRITION</span><i /><span>HEALTH TRACKING</span></div>

    <section className="research-explorer editorial-shell" id="research" aria-labelledby="research-title">
      <div className="section-topline"><span>01 / THE RESEARCH TOOLKIT</span><p>Less switching between notes, calculators,<br />and spreadsheets. More of the complete picture.</p></div>
      <h2 id="research-title">EVERY VIAL.<br /><span>EVERY DETAIL.</span></h2>
      <div className="explorer-layout">
        <div className="explorer-controls">
          <div className="feature-tabs" role="tablist" aria-label="Research features" aria-orientation="vertical">{research.map((item, i) => <button key={item.id} id={`tab-${item.id}`} role="tab" aria-selected={i === active} aria-controls="research-panel" tabIndex={i === active ? 0 : -1} onClick={() => setActive(i)} onKeyDown={e => tabKey(e, i, research.length, setActive)}><span className="tab-index">0{i + 1}</span><span>{item.name}</span><Arrow /></button>)}</div>
          <div className="research-note">Research organization and calculation tools.<br />Not medical advice or instructions for human use.</div>
        </div>
        <div className="research-panel" role="tabpanel" id="research-panel" aria-labelledby={`tab-${feature.id}`} key={feature.id}>
          <div className="panel-copy"><span className="feature-kicker">{feature.name}</span><h3>{feature.title}</h3><p>{feature.description}</p><ul>{feature.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div>
          <div className={`panel-visual ${feature.id === 'reconstitution' ? 'calculation-visual' : ''}`}><Screen image={feature.image} /><button className="image-expand" onClick={() => setLightbox(gallery.find(x => x.image === feature.image)!)} aria-label={`Enlarge ${feature.name} screenshot`}><span aria-hidden="true">↗</span></button></div>
        </div>
      </div>
      <p className="source-note">Real app interfaces rendered with illustrative sample data. Appearance may vary by device.</p>
    </section>

    <section className="math-story" id="calculator" aria-labelledby="math-title"><div className="editorial-shell math-layout"><div className="math-copy"><p className="eyeline">THE RECONSTITUTION CALCULATOR</p><h2 id="math-title">THE MATH.<br /><span>MADE VISIBLE.</span></h2><p>Vial size. Solution volume. Concentration.<br />Connected in a single calculation view.</p><a href="#research" className="underline-link" onClick={() => setActive(1)}>Explore the calculator <Arrow /></a><span className="math-disclaimer">Illustrative research calculation only. Not a dosing recommendation.</span></div><div className="math-display"><span className="instrument-label">IQONIC / CALCULATION VIEW</span><Screen image="reconstitution" className="math-screen" /><span className="instrument-bottom">A closer look at the actual interface <Arrow diagonal /></span></div></div></section>

    <section className="daily-story editorial-shell" id="daily" aria-labelledby="daily-title"><div className="section-topline"><span>02 / THE REST OF YOUR DAY</span><p>Your research is one part of the picture.<br />Keep your everyday records close, too.</p></div><div className="daily-intro"><h2 id="daily-title">ONE APP.<br /><span>MORE OF YOU.</span></h2><p>Food. Rest. Movement. The patterns you choose to track, brought together.</p></div>
      <div className="daily-layout"><div className="daily-art"><div className="daily-art-word" aria-hidden="true">EVERY<br />DAY.</div><Screen image={dailyFeature.image} className="daily-front" /><Screen image={daily === 0 ? 'weight' : 'nutrition'} className="daily-back" /></div><div className="daily-content"><div className="daily-tabs" role="tablist" aria-label="Everyday features">{lifestyle.map((item, i) => <button key={item.id} role="tab" id={`daily-${item.id}`} aria-controls="daily-panel" aria-selected={daily === i} tabIndex={daily === i ? 0 : -1} onClick={() => setDaily(i)} onKeyDown={e => tabKey(e, i, lifestyle.length, setDaily)}>{item.title}</button>)}</div><div role="tabpanel" id="daily-panel" aria-labelledby={`daily-${dailyFeature.id}`}><h3>{dailyFeature.subtitle}</h3><p>{dailyFeature.body}</p></div><div className="daily-extra"><p><strong>Apple Health</strong><span>Supported steps and activity data, with your permission.</span></p><p><strong>Progress photos</strong><span>A visual record you create and control.</span></p></div></div></div>
    </section>

    <section className="gallery-section" id="screens" aria-labelledby="gallery-title"><div className="editorial-shell"><div className="section-topline"><span>03 / NOTHING HIDDEN</span><span className="gallery-count">THE APP, UP CLOSE.</span></div><div className="gallery-heading"><h2 id="gallery-title">SEE WHAT<br /><span>YOU CAN DO.</span></h2><div className="gallery-navigation"><button onClick={() => rail.current?.scrollBy({ left: -330, behavior: 'smooth' })} aria-label="Previous app screenshots">←</button><button onClick={() => rail.current?.scrollBy({ left: 330, behavior: 'smooth' })} aria-label="Next app screenshots">→</button></div></div><div className="gallery-filters" aria-label="Filter screenshots">{['All screens', 'Research', 'Daily life'].map(label => <button key={label} aria-pressed={filter === label} onClick={() => { setFilter(label); rail.current?.scrollTo({ left: 0 }) }}>{label}</button>)}</div></div><div className="screenshot-rail" ref={rail}>{gallery.filter(item => filter === 'All screens' || item.category === filter).map((item, i) => <button className="gallery-item" key={item.image} onClick={() => setLightbox(item)} aria-label={`View ${item.name} screenshot`}><div className="gallery-image-wrap"><Screen image={item.image} /></div><div className="gallery-item-caption"><span><small>{String(i + 1).padStart(2, '0')} / {item.category}</small><strong>{item.name}</strong></span><Arrow diagonal /></div></button>)}</div><p className="editorial-shell source-note">Tap any screen to explore. Demo records are illustrative, not personal health data or recommendations.</p></section>

    <section className="essentials editorial-shell"><div className="essentials-heading"><span className="eyeline">BUILT FOR YOUR IPHONE</span><h2>THE TOOLS.<br /><span>ALL TOGETHER.</span></h2></div><div className="capability-directory"><div><h3>Research, organized.</h3><p>Vial inventory · Protocol builder · Cycle schedules · Calendar · Activity history · Reconstitution · Supply estimator · Spending · Compound library · Educational references</p></div><div><h3>Your everyday record.</h3><p>Meal photo scanning · Barcode lookup · Food diary · Calories and macros · Water logging · Weight trends · Sleep logging · Progress photos · Cycle tracking · Apple Health</p></div><div><h3>A place to make it yours.</h3><p>Account and profile settings · Notification preferences · Subscription management · Support</p></div></div></section>

    <section className="faq-section editorial-shell" id="questions"><div><span className="eyeline">BEFORE YOU GET STARTED</span><h2>A LITTLE<br /><span>MORE CLARITY.</span></h2><Link to="/support" className="underline-link">Visit support <Arrow /></Link></div><div className="faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></section>

    <section className="closing-scene"><div className="editorial-shell"><span className="eyeline">YOUR NEXT DOWNLOAD</span><h2>GET THE<br /><span>FULL PICTURE.</span></h2><div className="closing-bottom"><p>Your research tools.<br />Your daily record. IQONIC.</p><div><DownloadLink /><p className="micro-note">Free to download. In app subscriptions available.</p></div></div></div></section>

    <dialog ref={dialog} className="screen-dialog" aria-labelledby="screenshot-title" onClose={() => setLightbox(null)} onClick={e => { if (e.target === e.currentTarget) setLightbox(null) }}><div className="dialog-header"><div><span>IQONIC / APP PREVIEW</span><h2 id="screenshot-title">{lightbox?.name}</h2></div><button onClick={() => setLightbox(null)} autoFocus aria-label="Close screenshot">×</button></div>{lightbox && <img src={`/screens/v2/${lightbox.image}.png`} alt={`IQONIC ${lightbox.name}, illustrative demo data`} />}<p>Real app interface. Illustrative demo data.</p></dialog>
  </div>
}
