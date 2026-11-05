// Built-page regression checks. Reuse an installed Playwright and Chrome; no downloads.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4178';
const evidence = process.env.HERO_EVIDENCE_DIR;
const cases = [[320,700], [360,800], [390,844], [390,700], [430,932], [768,1024], [1024,900], [1440,1000]];
const results = [];
const errors = [];
const started = Date.now();
if (evidence) fs.mkdirSync(evidence, { recursive: true });
const overlaps = (a, b) => Math.min(a.right, b.right) > Math.max(a.left, b.left) && Math.min(a.bottom, b.bottom) > Math.max(a.top, b.top);
async function capture(page, name, fullPage = false) {
  if (evidence) await page.screenshot({ path: path.join(evidence, `${name}.png`), fullPage });
}
async function geometry(page) {
  return page.evaluate(() => {
    const rect = selector => document.querySelector(selector).getBoundingClientRect().toJSON();
    return {
      title: rect('h1'), copy: rect('.hero-copy > p'), cta: rect('.hero-copy .store-link, .journey-download a'),
      image: rect('.hero-proof img, .journey-screen'), note: rect('.hero-copy .download-note'),
      width: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth,
      pageHeight: document.documentElement.scrollHeight,
      visibleWords: document.body.innerText.trim().split(/\s+/).length,
      allWords: document.querySelector('main').textContent.trim().split(/\s+/).length,
    };
  });
}
(async () => {
  const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH, headless: true });
  try {
    for (const reducedMotion of ['no-preference', 'reduce']) {
      for (const [width, height] of cases) {
        const context = await browser.newContext({ viewport: { width, height }, reducedMotion, isMobile: width < 768, hasTouch: width < 768 });
        const page = await context.newPage();
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(base, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const name = `${width}x${height}-${reducedMotion}`;
        const g = await geometry(page);
        // This same overlap assertion fails on ecaba1c; see the preserved baseline red run.
        assert(!overlaps(g.image, g.cta), `${name}: The hero download CTA must not overlap the product screen`);
        for (const item of [g.title, g.copy, g.cta, g.note]) {
          assert(item.top >= 0 && item.bottom <= height, `${name}: all hero copy and download information fit the first viewport`);
          assert(!overlaps(item, g.image), `${name}: copy clears product image`);
          assert(item.left >= 0 && item.right <= width, `${name}: copy fits the viewport`);
        }
        assert(g.title.bottom <= g.copy.top && g.copy.bottom <= g.cta.top && g.cta.bottom <= g.note.top, `${name}: hero reading order and separation`);
        assert.equal(g.scrollWidth, width, `${name}: no page overflow`);
        if (width === 390) assert(g.pageHeight < 8041, 'Mobile page is materially shorter than the 12370px baseline');
        for (const img of await page.locator('img').all()) {
          await img.scrollIntoViewIfNeeded();
          await img.evaluate(img => img.decode());
        }
        assert(await page.evaluate(() => [...document.images].every(img => img.complete && img.naturalWidth > 0)), `${name}: every real asset loaded`);
        // Exempt only the intentionally clipped schedule detail from intrinsic image bounds.
        const overflow = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p, main a, summary, .screen-frame')].filter(el => {
          const r = el.getBoundingClientRect(); return r.width && (r.left < -1 || r.right > innerWidth + 1);
        }).map(el => el.textContent.slice(0, 80)));
        assert.deepEqual(overflow, [], `${name}: no clipped text or controls`);
        await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
        await capture(page, `${name}-hero`);
        if ([390, 1440].includes(width) && height !== 700) await capture(page, `${name}-full`, true);
        // Always-visible anchor navigation works without a menu or hydration flag.
        for (const id of ['features', 'tools', 'pricing', 'questions']) {
          await page.locator(`.home-header a[href="#${id}"]`).click();
          await page.waitForFunction(id => {
            const top = document.getElementById(id).getBoundingClientRect().top;
            const atBottom = Math.abs(scrollY + innerHeight - document.documentElement.scrollHeight) < 3;
            return Math.abs(top - 28) < 3 || (atBottom && top >= 28 && top < innerHeight);
          }, id, { timeout: 5000 });
          assert.equal(new URL(page.url()).hash, `#${id}`);
        }
        await page.keyboard.press('Tab'); // Switch from anchor-click pointer modality to keyboard modality.
        const summaries = page.locator('summary');
        for (let i = 0; i < await summaries.count(); i++) {
          const summary = summaries.nth(i);
          await summary.focus();
          assert(await summary.evaluate(el => el.matches(':focus-visible') && getComputedStyle(el).outlineWidth === '3px'), `${name}: keyboard focus ring`);
          await page.keyboard.press('Enter');
          assert(await summary.evaluate(el => el.parentElement.open), `${name}: Enter opens FAQ`);
          assert(await summary.locator('..').locator('.question-answer').isVisible());
          await page.keyboard.press('Space');
          assert(!await summary.evaluate(el => el.parentElement.open), `${name}: Space closes FAQ`);
        }
        // Opening a FAQ makes its link the next sequential focus target.
        const downloadFaq = page.locator('details').filter({ has: page.locator('summary', { hasText: 'Where can I download' }) });
        await downloadFaq.locator('summary').focus();
        await page.keyboard.press('Enter');
        await page.keyboard.press('Tab');
        assert(await downloadFaq.locator('a').evaluate(el => el === document.activeElement), `${name}: FAQ link follows summary in Tab order`);
        await downloadFaq.locator('summary').click();
        const storeLinks = page.locator('a[href*="apps.apple.com"]');
        for (const link of await storeLinks.all()) {
          assert.equal(await link.getAttribute('href'), 'https://apps.apple.com/us/app/iqonic/id6765689488');
          assert.equal(await link.getAttribute('rel'), 'noopener noreferrer');
        }
        results.push({ name, ...g });
        await context.close();
      }
    }
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      window.dataLayer = [];
      document.addEventListener('click', event => { if (event.target.closest('a[href*="apps.apple.com"]')) event.preventDefault(); }, true);
    });
    await page.locator('.hero-copy .store-link').click();
    await page.locator('.pricing-download .store-link').click();
    for (const question of ['Where can I download', 'How much does IQONIC cost']) {
      const faq = page.locator('details').filter({ has: page.locator('summary', { hasText: question }) });
      await faq.locator('summary').click(); await faq.locator('a').click();
    }
    assert.deepEqual(await page.evaluate(() => window.dataLayer.map(e => e.placement)), ['hero', 'pricing', 'faq', 'faq'], 'All remaining App Store placements retain analytics');
    await page.evaluate(() => Object.defineProperty(navigator, 'doNotTrack', { value: '1', configurable: true }));
    await page.locator('.hero-copy .store-link').click();
    assert.equal(await page.evaluate(() => window.dataLayer.length), 4, 'Do Not Track suppresses analytics');
    await page.evaluate(() => { Object.defineProperty(navigator, 'doNotTrack', { value: '0', configurable: true }); Object.defineProperty(navigator, 'globalPrivacyControl', { value: true }); });
    await page.locator('.hero-copy .store-link').click();
    assert.equal(await page.evaluate(() => window.dataLayer.length), 4, 'Global Privacy Control suppresses analytics');
    await page.close();
    // Prerendered first paint stays readable while the main bundle is held back.
    for (const width of [390, 1440]) {
      const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 1000 }, reducedMotion: 'reduce' });
      let release;
      const gate = new Promise(resolve => { release = resolve; });
      await context.route('**/assets/*.js', async route => { await gate; await route.continue(); });
      const page = await context.newPage();
      await page.goto(base, { waitUntil: 'commit' });
      await page.locator('.hero-copy .store-link').waitFor({ state: 'visible' });
      await page.waitForFunction(() => ['grid', 'flex'].includes(getComputedStyle(document.querySelector('.landing-hero')).display));
      await page.evaluate(() => document.fonts.ready);
      const before = await geometry(page);
      assert(before.note.bottom < before.height && !overlaps(before.image, before.cta), 'First paint is readable before JavaScript');
      await capture(page, `first-paint-${width}`);
      release();
      await page.waitForLoadState('networkidle');
      const after = await geometry(page);
      assert.deepEqual(after, before, 'Hydration does not change initial layout');
      await context.close();
    }
    const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await nojs.newPage();
    await fallback.goto(base);
    await fallback.locator('summary').first().focus();
    await fallback.keyboard.press('Enter');
    assert(await fallback.locator('details').first().locator('.question-answer').isVisible(), 'Native FAQ works without JavaScript');
    await nojs.close();
    assert.deepEqual(errors, [], 'No browser runtime errors');
    if (evidence) fs.writeFileSync(path.join(evidence, 'layout-results.json'), JSON.stringify(results, null, 2));
    console.log(`PASS (${Math.round((Date.now() - started) / 1000)}s): ${results.length} viewport/motion cases; geometry, images, anchors, FAQ keyboard/focus, download links, analytics/privacy, delayed first paint and no-JS FAQ.`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
