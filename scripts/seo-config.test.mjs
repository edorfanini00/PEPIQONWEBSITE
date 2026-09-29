import test from 'node:test'
import assert from 'node:assert/strict'
import { PRODUCTION_ORIGIN, resolveSeoConfig } from './seo-config.mjs'

test('indexing is disabled when the production origin is not configured', () => {
  assert.deepEqual(resolveSeoConfig({}), { origin: null, indexable: false })
})
test('production is indexable and previews stay noindex with a production canonical', () => {
  assert.equal(resolveSeoConfig({ NEXT_PUBLIC_SITE_URL: PRODUCTION_ORIGIN, VERCEL_ENV: 'production' }).indexable, true)
  assert.deepEqual(resolveSeoConfig({ NEXT_PUBLIC_SITE_URL: PRODUCTION_ORIGIN, VERCEL_ENV: 'preview' }), { origin: PRODUCTION_ORIGIN, indexable: false })
})
test('local, preview, credential-bearing, and path-specific canonicals are rejected', () => {
  for (const url of ['http://localhost:4173', 'https://iqonic-preview.vercel.app', `${PRODUCTION_ORIGIN}/privacy`, `${PRODUCTION_ORIGIN}?preview=1`, 'https://user:password@www.iqonicapp.com']) {
    assert.throws(() => resolveSeoConfig({ NEXT_PUBLIC_SITE_URL: url }))
  }
})
