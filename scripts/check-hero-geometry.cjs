// Run against a built preview. Uses an existing Playwright installation and browser;
// never downloads browsers. Optional evidence output stays outside the repository.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4178';
const evidence = process.env.HERO_EVIDENCE_DIR;
const cases = [[360,800], [390,844], [414,896], [430,932], [390,700], [1440,1000], [768,1024], [900,1200]];
const results = [];
const failures = [];
if (evidence) fs.mkdirSync(evidence, { recursive: true });
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  try {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      for (const [width, height] of cases) {
        const page = await browser.newPage({ viewport: { width, height }, reducedMotion, isMobile: width <= 900, hasTouch: width <= 900 });
        page.on('pageerror', error => failures.push(error.message));
        await page.goto(base, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        for (const [stage, label] of ['Overview', 'Protocols', 'Calculations', 'Daily health'].entries()) {
          const button = page.getByRole('button', { name: `Show ${label}`, exact: true });
          await button.click();
          await page.waitForFunction(label => document.querySelector(`button[aria-label="Show ${label}"]`).getAttribute('aria-pressed') === 'true', label);
          // Let native smooth scrolling and the existing opacity/size transitions settle.
          await page.waitForTimeout(900);
          const geometry = await page.evaluate(() => {
            const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
            const hand = document.querySelector('.journey-hand');
            const screenImage = document.querySelector('.journey-screen-layer.is-active img');
            return { phone: rect('.journey-phone'), hand: rect('.journey-hand'), screen: rect('.journey-screen'),
              heading: rect('.journey-heading.is-active'), download: rect('.journey-download a'),
              imageRatio: hand.naturalWidth / hand.naturalHeight,
              loaded: [hand, screenImage].every(image => image.complete && image.naturalWidth > 0),
              scrollWidth: document.documentElement.scrollWidth };
          });
          const name = `${width}x${height}-${reducedMotion}-${stage}`;
          results.push({ name, ...geometry });
          if (evidence) await page.screenshot({ path: path.join(evidence, `${name}.png`) });
          try {
            const { phone, hand, screen, heading, download } = geometry;
            assert(geometry.loaded, 'real frame and screen images load');
            assert.equal(geometry.scrollWidth, width, 'no horizontal overflow');
            // srcset density correction rounds naturalWidth/naturalHeight to whole pixels.
            assert(Math.abs(hand.width / hand.height - geometry.imageRatio) < .003, 'frame keeps source aspect ratio');
            assert(Math.abs(hand.width / hand.height - 2 / 3) < .001, 'frame keeps the original 1024:1536 ratio');
            assert(Math.abs(phone.height - hand.height) < 1, 'screen positioning box must match actual frame image height');
            assert(Math.abs(phone.top - hand.top) < 1 && Math.abs(phone.width - hand.width) < 1, 'frame and positioning box coincide');
            // Aperture measured in the original hand asset, not against the CSS wrapper.
            assert(Math.abs(screen.top - (hand.top + hand.height * .082)) < 1, 'screen top follows frame aperture');
            assert(Math.abs(screen.bottom - (hand.top + hand.height * .831)) < 1, 'screen bottom follows frame aperture');
            assert(Math.abs(screen.left - (hand.left + hand.width * .288)) < 1, 'screen left follows frame aperture');
            assert(Math.abs(screen.width - hand.width * .5055) < 1, 'screen width follows frame aperture');
            assert(heading.bottom <= screen.top, 'heading clears screen');
            if (width <= 900) {
              assert(hand.bottom <= download.top, 'phone clears App Store CTA');
              assert(download.bottom <= height, 'CTA stays inside viewport');
            }
          } catch (error) { failures.push(`${name}: ${error.message}`); }
        }
        await page.close();
      }
    }
  } finally { await browser.close(); }
  if (evidence) fs.writeFileSync(path.join(evidence, 'results.json'), JSON.stringify({ results, failures }, null, 2));
  assert.deepEqual(failures, [], 'hero geometry regression');
  console.log(`Passed ${results.length} hero cases: four stages, eight viewports, normal/reduced motion.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
