import { APP_STORE_URL, pageSeo } from '../data/site'
import { homeFaqs } from '../data/home-faqs'

export function getPageSeo(pathname: string) {
  const page = pageSeo[pathname]
  const indexable = Boolean(page) && __SEO_INDEXABLE__
  const canonical = page && __SITE_ORIGIN__ ? new URL(pathname, __SITE_ORIGIN__).href : null
  return {
    title: page?.title ?? 'Page not found | IQONIC',
    description: page?.description ?? 'This IQONIC page could not be found. Visit the app homepage or contact IQON Health support.',
    robots: indexable ? 'index,follow,max-image-preview:large' : 'noindex,follow',
    canonical,
    structuredData: page && canonical ? getStructuredData(pathname, canonical) : null,
  }
}

function getStructuredData(pathname: string, canonical: string) {
  const origin = __SITE_ORIGIN__!
  const home = `${origin}/`
  const page = pageSeo[pathname]
  const graph: Record<string, unknown>[] = [{
    '@type': pathname === '/' ? ['WebPage', 'FAQPage'] : pathname === '/support' ? 'ContactPage' : 'WebPage',
    '@id': `${canonical}#webpage`, url: canonical, name: page.title, description: page.description,
    isPartOf: { '@id': `${home}#website` }, inLanguage: 'en',
    ...(pathname === '/' ? {
      about: { '@id': `${home}#app` },
      mainEntity: homeFaqs.map(faq => ({ '@type': 'Question', name: faq.question, acceptedAnswer: { '@type': 'Answer', text: faq.answer } })),
    } : { breadcrumb: { '@id': `${canonical}#breadcrumbs` } }),
  }]
  if (pathname === '/') {
    graph.push(
      { '@type': 'Organization', '@id': `${home}#organization`, name: 'IQON Health', url: 'https://iqonhealth.com/', email: 'info@iqonhealth.com' },
      { '@type': 'WebSite', '@id': `${home}#website`, name: 'IQONIC', url: home, publisher: { '@id': `${home}#organization` }, inLanguage: 'en' },
      {
        '@type': 'MobileApplication', '@id': `${home}#app`, name: 'IQONIC', url: home,
        description: homeFaqs[0].answer, applicationCategory: 'HealthApplication', operatingSystem: 'iOS, iPadOS',
        publisher: { '@id': `${home}#organization` }, downloadUrl: APP_STORE_URL, sameAs: APP_STORE_URL,
        featureList: ['Peptide research protocol tracking', 'Reconstitution calculations', 'Supply estimation', 'Nutrition and hydration logging', 'Menstrual cycle tracking', 'Apple Health integration'],
        screenshot: ['/assets/iqonic-today.jpg', '/assets/iqonic-nutrition.jpg', '/assets/iqonic-lifestyle.jpg'].map(path => origin + path),
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: APP_STORE_URL, description: 'Free download with optional in-app purchases. See the App Store for current subscription prices.' },
      },
    )
  } else {
    graph.push({ '@type': 'BreadcrumbList', '@id': `${canonical}#breadcrumbs`, itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'IQONIC', item: home },
      { '@type': 'ListItem', position: 2, name: page.label, item: canonical },
    ] })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function safeJson(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c')
}

export function renderSeoHead(pathname: string) {
  const meta = getPageSeo(pathname)
  const escape = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  return [
    `<title>${escape(meta.title)}</title>`,
    `<meta name="description" content="${escape(meta.description)}">`,
    `<meta name="robots" content="${meta.robots}">`,
    meta.canonical ? `<link rel="canonical" href="${meta.canonical}">` : '',
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="IQONIC">`,
    `<meta property="og:locale" content="en_US">`,
    `<meta property="og:title" content="${escape(meta.title)}">`,
    `<meta property="og:description" content="${escape(meta.description)}">`,
    meta.canonical ? `<meta property="og:url" content="${meta.canonical}">` : '',
    `<meta name="twitter:card" content="summary">`,
    `<meta name="twitter:title" content="${escape(meta.title)}">`,
    `<meta name="twitter:description" content="${escape(meta.description)}">`,
    meta.structuredData ? `<script id="iqonic-structured-data" type="application/ld+json">${safeJson(meta.structuredData)}</script>` : '',
  ].filter(Boolean).join('\n    ')
}
