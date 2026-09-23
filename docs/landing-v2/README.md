# IQONIC acquisition redesign v2

## Art direction
Product-first editorial layout: graphite and white, restrained coral, self-hosted Barlow Condensed and DM Sans (OFL licenses in docs/font-licenses), original rendered titanium phone hardware, screen-driven feature explorer, full-screen image viewer and filterable feature gallery. Mobile typography and product staging are separately composed.

## Assets and scope
16 feature previews are React Native Web renders of actual release-source components with illustrative data. They are NOT native iOS simulator captures, authenticated account captures or proof of live service functionality. Offline fixture banners are preserved. Source baseline and per-feature limitations are in feature-source-map.md and research-provenance.json.

No account authentication, customer records, real health data, camera, HealthKit permission, purchase or AI service was used. Meal review uses a synthetic API fixture. Native-only features remain unverified. Do not market Coming Soon insights, general data export, progress video, or placeholder shop as shipped.

The Blender hero uses protocols.png and nutrition.png without changing screen pixels. Original reusable geometry/light script: tools/render-hero.py. Render from two supplied source PNGs using Blender background mode and --transparent. Packed scene and raw render retained locally in ~/.hermes/workspace/iqonic-landing-v2/3d. No stock hardware models or third-party imagery are shipped.

## Feature coverage
Research: vial inventory, reconstitution, protocols, calendar, spending, supply estimator, education, library.
Daily life: nutrition, food logging, meal scan review, weight, sleep/hydration, cycle tracking, progress photos, Apple Health connection UI.

## Verification
Production build and lint pass. Browser checks cover 1440px, 390px and 320px widths; images and App Store links; 6 research tabs and keyboard navigation; gallery filters; dialog focus/Escape; FAQ; support/privacy/terms. WCAG A/AA automated axe checks at desktop/mobile report no violations. Automated checks do not establish full accessibility compliance. See JSON evidence, refreshed before delivery.

## Deployment
Preview branch: feat/iqonic-download-landing. Production promotion is a separate action after design review; this revision does not modify main.
