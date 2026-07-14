# IQONIC Website

Minimal marketing and compliance site for the IQONIC mobile app, operated by IQON Health. Built to satisfy App Store / Google Play listing requirements.

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

## Brand

- Colors: ink `#12201C`, sage `#5A6B65`, lime `#D4FF9E`, dark `#1E1E1E`, warm off-whites `#FDFBF7` / `#F2F1ED`, hairline borders `rgba(18,32,28,0.08)`
- Type: Inter (300–600) for text, JetBrains Mono for uppercase eyebrow labels and button text
