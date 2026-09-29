import { readFile, writeFile } from 'node:fs/promises'
import { execFileSync } from 'node:child_process'
import { renderPage, pageSeo, legalAliases } from '../dist-ssr/entry-server.js'
import { resolveSeoConfig } from './seo-config.mjs'

const seo = resolveSeoConfig()
const template = await readFile('dist/index.html', 'utf8')
if (!template.includes('<!--seo-head-->') || !template.includes('<!--app-html-->')) throw new Error('Prerender placeholders are missing')

for (const pathname of [...Object.keys(pageSeo), '/404']) {
  const { head, body } = renderPage(pathname)
  if (!body.includes('<h1')) throw new Error(`Missing rendered page content: ${pathname}`)
  const html = template.replace('<!--seo-head-->', head).replace('<!--app-html-->', body)
  await writeFile(pathname === '/' ? 'dist/index.html' : `dist${pathname}.html`, html)
}

// Preserve every existing legal alias as an HTTP permanent redirect, before routing.
const config = JSON.parse(await readFile('vercel.json', 'utf8'))
for (const [source, destination] of Object.entries(legalAliases)) {
  if (!config.redirects?.some(rule => rule.source === source && rule.destination === destination && rule.permanent)) {
    throw new Error(`Vercel redirect missing for ${source}`)
  }
}

function lastModified(source) {
  try {
    // A shallow checkout can attribute untouched files to its boundary commit.
    // Omit dates rather than publish a deployment date as a content update.
    if (execFileSync('git', ['rev-parse', '--is-shallow-repository'], { encoding: 'utf8' }).trim() === 'true') return null
    const paths = [source, 'src/data/site.ts', ...(source === 'src/pages/Home.tsx' ? ['src/data/home-faqs.ts'] : [])]
    if (execFileSync('git', ['status', '--porcelain', '--', ...paths], { encoding: 'utf8' }).trim()) return null
    return execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], { encoding: 'utf8' }).trim() || null
  } catch { return null }
}

const urls = seo.indexable ? Object.entries(pageSeo).map(([path, page]) => {
  const modified = lastModified(page.source)
  return `  <url><loc>${new URL(path, seo.origin).href}</loc>${modified ? `<lastmod>${modified}</lastmod>` : ''}</url>`
}) : []
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`)
await writeFile('dist/robots.txt', seo.indexable
  ? `User-agent: *\nAllow: /\n\nSitemap: ${seo.origin}/sitemap.xml\n`
  : 'User-agent: *\nDisallow: /\n')
console.log(`Prerendered 4 pages and a 404 page. Search indexing: ${seo.indexable ? 'enabled' : 'disabled (preview or unconfigured origin)'}.`)
