export const PRODUCTION_ORIGIN = 'https://www.iqonicapp.com'

export function resolveSeoConfig(env = process.env) {
  const raw = env.NEXT_PUBLIC_SITE_URL?.trim()
  let origin = null
  if (raw) {
    let url
    try { url = new URL(raw) } catch { throw new Error('NEXT_PUBLIC_SITE_URL must be an absolute production URL') }
    if (url.origin !== PRODUCTION_ORIGIN || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
      throw new Error(`NEXT_PUBLIC_SITE_URL must be ${PRODUCTION_ORIGIN}; preview and local canonicals are not allowed`)
    }
    origin = url.origin
  }
  return { origin, indexable: Boolean(origin) && (!env.VERCEL_ENV || env.VERCEL_ENV === 'production') }
}
