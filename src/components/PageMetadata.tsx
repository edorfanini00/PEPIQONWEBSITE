import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { getPageSeo, safeJson } from '../lib/seo'

// Initial metadata is in prerendered HTML. Keep it accurate during client navigation.
export default function PageMetadata() {
  const { pathname } = useLocation()
  useEffect(() => {
    const meta = getPageSeo(pathname)
    document.title = meta.title
    const setMeta = (key: string, value: string, attribute = 'name') => {
      let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`)
      if (!element) { element = document.createElement('meta'); element.setAttribute(attribute, key); document.head.append(element) }
      element.content = value
    }
    setMeta('description', meta.description)
    setMeta('robots', meta.robots)
    setMeta('og:type', 'website', 'property')
    setMeta('og:site_name', 'IQONIC', 'property')
    setMeta('og:locale', 'en_US', 'property')
    setMeta('og:title', meta.title, 'property')
    setMeta('og:description', meta.description, 'property')
    setMeta('twitter:card', 'summary')
    setMeta('twitter:title', meta.title)
    setMeta('twitter:description', meta.description)
    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    if (meta.canonical) {
      if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical) }
      canonical.href = meta.canonical
      setMeta('og:url', meta.canonical, 'property')
    } else {
      canonical?.remove()
      document.head.querySelector('meta[property="og:url"]')?.remove()
    }
    let schema = document.getElementById('iqonic-structured-data')
    if (meta.structuredData) {
      if (!schema) { schema = document.createElement('script'); schema.id = 'iqonic-structured-data'; schema.setAttribute('type', 'application/ld+json'); document.head.append(schema) }
      schema.textContent = safeJson(meta.structuredData)
    } else schema?.remove()
  }, [pathname])
  return null
}
