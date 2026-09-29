type Placement = 'header' | 'hero' | 'feature' | 'faq' | 'closing'

// A named, non-identifying conversion event for an existing/consented GTM setup.
// This does not install analytics or transmit data on its own.
export function trackAppStoreClick(placement: Placement) {
  if (typeof window === 'undefined' || (navigator as Navigator & { globalPrivacyControl?: boolean }).globalPrivacyControl || navigator.doNotTrack === '1') return
  const detail = { event: 'iqonic_app_store_click', placement, destination: 'apple_app_store' }
  const target = window as Window & { dataLayer?: Record<string, unknown>[] }
  if (Array.isArray(target.dataLayer)) target.dataLayer.push(detail)
  window.dispatchEvent(new CustomEvent('iqonic:app-store-click', { detail }))
}
