# IQONIC reference-only handoff

No website source modified. Captured with isolated headless system Chrome through the specified Playwright installation at 1440×1000. PNG captures and DOM typography/text evidence are in this directory.

## Primary recommendation: Apple Fitness+ editorial product-film composition

Use https://www.apple.com/apple-fitness-plus/ as the primary composition, not a generic wellness/SaaS template. Its first viewport is a real training scene with restrained navigation, a compact two-line white headline near the lower center and a single high-contrast CTA. Environment/materials (wood, foliage, skin, apparel) carry the depth; there is no stack of decorative UI cards.

Translate, do not clone: a broad lifestyle image/film band followed immediately by an oversized, upright, uncropped real IQONIC screen demonstration on white. Keep the headline substantially smaller than the rejected version. Feature real app screens in a selectable editorial sequence: Overview → Research protocols → Vial inventory → Reconstitution calculator. Keep research-only context beside these tools, without dosage/treatment claims. Follow with one lifestyle/app pairing for training, nutrition and recovery. Do not replace research tools with lifestyle imagery. Use photographic depth and actual screen pixels, not floating fictitious widgets, tilted cropped phones or pastel bento blocks.

Suggested type direction (proposal, not extracted token): licensed Neue Haas Grotesk Display/Text or an appropriately licensed similarly precise grotesk; one family, few weights, strong numeric legibility. Verify license; do not redistribute Apple's SF web fonts. Use black/white structure with IQONIC accent reserved for actions and real UI status. The app screens should be the visual proof.

## Inspected sources and evidence

1. Apple Fitness+ — https://www.apple.com/apple-fitness-plus/
   - `apple-fitness-hero.png`, `apple-fitness-section-1.png`, `apple-fitness-section-3.png`.
   - Hero shown: three trainers in a wood/plant studio, photographic full-width stage, white two-line headline low in frame, bright lime CTA. Borrow scene-first confidence and compact type/image hierarchy, not Apple's lime identity or footage.
   - DOM font evidence stored in `apple-fitness.json`; Apple uses SF families.

2. Apple Health — https://www.apple.com/health/ (https://www.apple.com/ios/health/ redirects here).
   - `apple-health-hero.png`, `apple-health-section-1.png`, `apple-health-section-3.png`.
   - Health detail section gives substantial space to recognizable device/UI imagery and directly attached explanation; the captured heart-health section contains large watch faces/notification imagery. Borrow product legibility and explicit feature-to-screen association. Do NOT borrow its pink rounded carousel cards: that would repeat the rejected pastel-block direction.
   - DOM evidence in `apple-health.json`.

3. Oura — https://ouraring.com/
   - Awwwards listing: https://www.awwwards.com/sites/oura-ring — Honorable Mention, not SOTD. Listing links to this official site; current live design is not asserted to be the historical awarded version.
   - Use `oura-clean-hero.png` and `oura-clean-section.png`; early `oura-hero.png` includes a signup popup and is not the preferred reference.
   - Hero: gold ring on rough dark stone, tiny ladybug as an explicit size cue, largely neutral background, centered 'Subtle. Power.' serif headline, small blue Explore CTA. Realistic metal/stone contrast provides material value without abstract glows.
   - Verified DOM font declarations: Editorial New for headline (110px captured desktop h1), AkkuratLL sans for supporting content. Borrow material specificity and scale storytelling, NOT its giant headline or another muted wellness palette.

4. NEUROFIT product demo — https://neurofit.app/product-demo
   - Awwwards listing: https://www.awwwards.com/sites/neurofit-app-product-demo — Nominee, not SOTD or Honorable Mention.
   - `neurofit-hero.png`, `neurofit-section-2.png`, `neurofit-section-3.png`.
   - A concrete app-demo reference rather than an icon grid. However its tilted phone treatment is specifically NOT appropriate for IQONIC after the rejection. Transfer the focused product demonstration only; keep IQONIC screens upright and fully readable. Programmatic scroll captures are not proof that the entire interactive demo was exercised.

## WHOOP blocker

Attempted https://www.whoop.com/us/en/, https://www.whoop.com/ and https://www.whoop.com/us/en/the-difference/. All returned Cloudflare 'Sorry, you have been blocked' in isolated Chrome. `whoop-hero.png`, `whoop-root.png`, `whoop-experience.png` are blocker evidence, NOT inspected landing-page references. No WHOOP visual/font claim is made. WHOOP visual verification remains incomplete.

## Scope and practical next gate

Four actual live sites were visually inspected, including two sites listed by Awwwards (one Honorable Mention, one Nominee). This is not a claim that both are SOTD winners. Existing rejected screenshot was also loaded for comparison. Only research scripts, JSON evidence and PNGs were created here. Next implementation gate: show one above-the-fold + first app-demo composition beside Apple Fitness+, before extending the entire landing page.
