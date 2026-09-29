# IQONIC Website

Marketing and compliance site for the IQONIC mobile app, operated by IQON Health. Includes the approved IQONIC landing page and the support and legal pages used in the app listing.

## Pages

- `/` — landing page with app description and store badges
- `/support` — FAQ and support contact (info@iqonhealth.com, 1–2 business days)
- `/privacy` — Privacy Policy (effective August 28, 2026)
- `/terms` — Terms of Service (effective August 28, 2026)

## Stack

- [Vite](https://vite.dev) + React 19 + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) (via `@tailwindcss/vite`)
- [React Router](https://reactrouter.com) for client-side routing

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Production builds prerender the homepage, support, privacy, and terms routes as HTML, then hydrate their interactions in the browser. The output also includes a custom 404 page.

## Landing page

- Silver and charcoal presentation with locally hosted Inter from IQON Health.
- Responsive scroll journey, photographed phone mockups, and real IQONIC screenshots.
- Protocol, calculator, nutrition, lifestyle, and Apple Health feature sections.
- Accessible Radix tabs and FAQs; reduced-motion preferences are respected.
- Official App Store badges link to https://apps.apple.com/us/app/iqonic/id6765689488.
- Landing styles are scoped to `.iqonic-landing` so support and legal page layouts remain independent.
- Inter's license is included in `public/fonts/inter-OFL.txt`.

## Deployment

Publish `dist`. Vercel runs the build with the verified production origin:

```bash
NEXT_PUBLIC_SITE_URL=https://www.iqonicapp.com npm run build
npm run test:seo
```

Vercel clean URLs serve each prerendered page directly. The existing legal URL aliases return permanent redirects; unknown routes return the custom 404 rather than the homepage. The SSR bundle in `dist-ssr` is only a build intermediate and is not deployed.

## SEO and indexing

- Every route has its own title, description, production canonical, and social metadata in the initial HTML. Client navigation updates the same tags.
- The homepage defines IQONIC, IQON Health, the app's features, and visible FAQs in JSON-LD. The existing star graphic is not treated as verified review data. Software rich-result eligibility is not claimed without an eligible rating or review.
- `src/data/home-faqs.ts` is the shared source for displayed answers and FAQ schema. US App Store pricing was checked September 29, 2026; recheck before revising it.
- `robots.txt` allows public crawling in production, including search and AI search crawlers. Preview and unconfigured builds use `noindex` and disallow crawling; preview canonicals, when configured, point to production.
- The sitemap lists only the four canonical pages. Dates come from relevant committed source history. Dates are omitted for dirty files, shallow checkouts, or unavailable history; they are never the build time.
- Production builds require `NEXT_PUBLIC_SITE_URL=https://www.iqonicapp.com`. An unset origin intentionally produces non-indexable output; any other origin is rejected.
- `npm run test:seo` checks raw HTML content, H1s, metadata, canonical URLs, schema/FAQ parity, assets, redirects, 404 configuration, and crawler files.

## Conversion measurement

App Store links emit the named `iqonic_app_store_click` event to an existing `window.dataLayer`, when present, plus the `iqonic:app-store-click` browser event. Payloads contain only CTA placement and the destination category, not personal data or query strings. Global Privacy Control and Do Not Track are respected.

No analytics provider or tracking ID has been installed. Connect a consent-aware analytics container and configure that event as a conversion before claiming recorded downloads. These events measure outbound clicks, not completed App Store installs or purchases.

See `docs/seo-change-log.md` for the baseline, sources, remaining measurement work, and release gate.
