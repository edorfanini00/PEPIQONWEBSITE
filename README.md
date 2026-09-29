# IQONIC Website

Marketing and compliance site for the IQONIC mobile app, operated by IQON Health. Includes the approved IQONIC landing page and the support and legal pages used in the app listing.

## Pages

- `/` — landing page with app description and store badges
- `/support` — FAQ and support contact (info@iqonhealth.com, 1–2 business days)
- `/privacy` — Privacy Policy (effective July 11, 2026)
- `/terms` — Terms of Service (effective July 11, 2026)

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

Note: this is a single-page app — when deploying, configure your host to rewrite all routes to `index.html` (e.g. Vercel/Netlify SPA fallback) so `/privacy` and `/terms` resolve directly.

## Landing page

- Silver and charcoal presentation with locally hosted Inter from IQON Health.
- Responsive scroll journey, photographed phone mockups, and real IQONIC screenshots.
- Protocol, calculator, nutrition, lifestyle, and Apple Health feature sections.
- Accessible Radix tabs and FAQs; reduced-motion preferences are respected.
- Official App Store badges link to https://apps.apple.com/us/app/iqonic/id6765689488.
- Landing styles are scoped to `.iqonic-landing` so support and legal page layouts remain independent.
- Inter's license is included in `public/fonts/inter-OFL.txt`.

## Deployment

The existing Vercel configuration is retained. Build with `npm run build`; publish `dist`. The SPA rewrite preserves direct access to support, privacy, terms, and their existing aliases.
