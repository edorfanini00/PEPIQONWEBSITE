import { readFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { pageSeo, homeFaqs, getPageSeo } from '../dist-ssr/entry-server.js'

const decode = text => text.replaceAll('&amp;', '&').replaceAll('&quot;', '"').replaceAll('&#x27;', "'").replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
const titles = new Set()
for (const path of [...Object.keys(pageSeo), '/404']) {
  const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8')
  const head = html.split('</head>')[0]
  const meta = getPageSeo(path)
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: exactly one H1`)
  assert.equal((head.match(/<title>/g) ?? []).length, 1, `${path}: one title`)
  assert.equal((head.match(/name="description"/g) ?? []).length, 1, `${path}: one description`)
  assert.equal((head.match(/rel="canonical"/g) ?? []).length, meta.canonical ? 1 : 0)
  assert(head.includes(`content="${meta.robots}"`))
  assert(!html.includes('<!--app-html-->'))
  assert(!head.includes('localhost') && !head.includes('vercel.app'))
  assert(!titles.has(meta.title)); titles.add(meta.title)
  if (meta.canonical) assert(head.includes(`href="${meta.canonical}"`))
  const rawSchema = head.match(/<script id="iqonic-structured-data" type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1]
  if (rawSchema) {
    const schema = JSON.parse(rawSchema)
    assert(!rawSchema.includes('aggregateRating') && !rawSchema.includes('ratingValue'))
    assert.equal(schema['@context'], 'https://schema.org')
  }
  if (path === '/') {
    const readable = decode(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ''))
    for (const faq of homeFaqs) {
      assert(readable.includes(faq.question), `Missing visible FAQ question: ${faq.id}`)
      assert(readable.includes(faq.answer), `Missing HTML answer: ${faq.id}`)
    }
    assert(readable.includes('Reconstitution calculator'))
    assert(html.includes('https://apps.apple.com/us/app/iqonic/id6765689488'))
    assert(html.includes('Five yellow stars'))
  }
  for (const [, asset] of html.matchAll(/(?:src|href)="(\/(?:assets|fonts)\/[^"?]+)"/g)) {
    await readFile(`dist${asset}`)
  }
}
const config = JSON.parse(await readFile('vercel.json', 'utf8'))
assert.equal(config.cleanUrls, true)
assert.equal(config.trailingSlash, false)
assert(!config.rewrites?.some(rule => rule.source.includes('.*')), 'Do not send unknown URLs to a 200 homepage')
const robots = await readFile('dist/robots.txt', 'utf8')
const sitemap = await readFile('dist/sitemap.xml', 'utf8')
const indexable = getPageSeo('/').robots.startsWith('index,')
assert.equal((sitemap.match(/<loc>/g) ?? []).length, indexable ? 4 : 0)
assert.equal(robots.includes('Allow: /'), indexable)
assert(!sitemap.includes('/404') && !sitemap.includes('vercel.app'))
for (const [, date] of sitemap.matchAll(/<lastmod>(.*?)<\/lastmod>/g)) assert(Number.isFinite(Date.parse(date)) && Date.parse(date) <= Date.now())
console.log('SEO checks passed: raw HTML, single H1s, metadata, canonicals, schema/FAQ parity, assets, aliases, 404 configuration, robots and sitemap.')
