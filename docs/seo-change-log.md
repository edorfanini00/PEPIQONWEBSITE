# IQONIC SEO change log

## September 29, 2026 — Crawlable app landing page

**Status:** Implemented for review in the existing website pull request. Production release still requires approval. This is one foundation change, not a ranking or traffic result.

### Baseline

- Production origin verified: https://www.iqonicapp.com/. The apex domain redirects there, and the App Store developer website links there.
- Live homepage returned HTTP 200 and 894 bytes of HTML with an empty React root and no H1 or app content before JavaScript.
- `/robots.txt` and `/sitemap.xml` returned the same homepage HTML rather than their expected file formats.
- No canonical URL or route-specific initial metadata. Client-side code changed only page titles.
- Unknown routes used a blanket 200 homepage rewrite.
- An App Store CTA exists near the top and bottom; its destination remains unchanged.
- No Search Console, Bing Webmaster Tools, backlink, keyword-volume, or conversion account is connected here. No baseline impressions, rankings, conversions, or AI citations are claimed.

### Change

Prerender the actual React pages, with unique metadata, production canonicals, accurate app entities and answer content, crawler files, permanent legal-alias redirects, and genuine 404 handling. Hydrate the same components to retain the approved design and interactions.

The homepage remains the primary acquisition page. The target intent is peptide protocol tracking and reconstitution calculation software; no medical outcomes or regimen recommendations are added. No speculative blog pages, copied location pages, hidden keyword text, invented testimonials, or `llms.txt` are included.

Visible FAQs define the app, explain its tools, and disclose verified US App Store pricing and cancellation. The same answer data feeds the structured markup. FAQ markup does not guarantee a Google enhancement or AI citation. MobileApplication markup deliberately omits an aggregate rating rather than converting the hero's five-star artwork into a review score. The pre-existing “#1 peptide app” headline has no ranking evidence in this task; it is not used in titles, descriptions, or schema.

App Store buttons now emit a named event for a future consent-aware analytics integration. There is no active analytics provider, so click collection and install attribution remain unverified.

### Release and measurement

1. Approve and merge the website pull request, then verify the production deployment.
2. Check the live homepage, support, privacy, terms, sitemap, robots, legal redirects, and an unknown URL. Confirm production is indexable and previews remain noindex.
3. Submit `https://www.iqonicapp.com/sitemap.xml` through a verified Search Console property and inspect the homepage's indexed/rendered state. No submission or ownership verification has been performed.
4. Connect analytics and verify `iqonic_app_store_click` before treating it as a conversion. Report it as an outbound click, not an install.
5. Record page-level search impressions, clicks, relevant queries, and CTA conversions. Where available, record Bing AI citations. Compare the 28 days before launch with 2–4 weeks after launch before deciding on the next change.

### Sources checked

- App facts, pricing, and developer website: https://apps.apple.com/us/app/iqonic/id6765689488 (September 29, 2026).
- JavaScript SEO and rendering: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Canonicals: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- App structured data: https://developers.google.com/search/docs/appearance/structured-data/software-app
- AI search guidance: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- Vercel clean URLs: https://vercel.com/docs/project-configuration/vercel-json#cleanurls
- Vercel static 404 pages: https://vercel.com/kb/guide/custom-404-page
