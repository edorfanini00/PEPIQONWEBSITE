// Check the actual built pages through the existing preview server.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:4178';
const evidence = process.env.SECONDARY_EVIDENCE_DIR;
const routes = ['/pricing', '/about', '/changelog', '/vs/peptide-tracker', '/support', '/privacy', '/terms', '/404'];
const results = [];
const failures = [];
if (evidence) fs.mkdirSync(evidence, { recursive: true });

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  try {
    for (const width of [320, 390, 430, 768, 1440]) {
      for (const route of routes) {
        const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto(base + route, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        const result = { route, width, errors };
        try {
          assert(response.ok(), `HTTP ${response.status()}`);
          await page.locator('h1').waitFor({ state: 'visible' });
          assert((await page.locator('h1').innerText()).trim().length > 0, 'Page heading is populated');
          assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), 'No document overflow');
          // The catch-all has a separately documented pre-existing hydration warning.
          assert.deepEqual(errors.filter(error => route !== '/404' || !error.includes('418')), [], 'No unexpected runtime errors');
          if (route === '/vs/peptide-tracker') {
            result.table = await page.locator('.vs-table').evaluate(table => {
              const box = element => element.getBoundingClientRect().toJSON();
              return {
                wrapper: box(table.parentElement),
                cells: [...table.querySelectorAll('tbody th, tbody td')].map(cell => ({
                  rect: box(cell), text: cell.textContent, display: getComputedStyle(cell).display,
                  label: cell.getAttribute('data-label'), before: getComputedStyle(cell, '::before').content,
                  scrollWidth: cell.scrollWidth, clientWidth: cell.clientWidth,
                })),
              };
            });
            const { wrapper, cells } = result.table;
            assert.equal(cells.length, 15, 'All five comparison rows render');
            for (const cell of cells) {
              assert(cell.rect.width > 0 && cell.rect.height > 0, 'Cell has visible area');
              assert(cell.rect.left >= wrapper.left && cell.rect.right <= wrapper.right + 1, `${cell.text}: cell is inside clipping wrapper`);
              assert(cell.scrollWidth <= cell.clientWidth + 1, `${cell.text}: cell content fits`);
              if (width <= 620) {
                assert.equal(cell.display, 'block', 'Mobile cells stack');
                if (cell.label) assert(cell.before.includes(cell.label) && cell.before.includes('·'), 'Visible generated product label');
              }
            }
            if (width <= 620) {
              const accessible = await page.locator('.vs-table').ariaSnapshot();
              assert(accessible.includes('IQONIC · Yes'), 'IQONIC generated label appears in accessibility tree');
              assert(accessible.includes('Peptide Tracker 3.1.0 · Yes'), 'Competitor generated label appears in accessibility tree');
              result.accessible = accessible;
            }
          }
          result.passed = true;
        } catch (error) {
          result.passed = false;
          result.failure = error.message;
          failures.push(`${route} at ${width}: ${error.message}`);
        }
        if (evidence) {
          const name = `${route.slice(1).replaceAll('/', '-')}-${width}`;
          await page.screenshot({ path: path.join(evidence, `${name}.png`), fullPage: true });
          if (result.table) await page.locator('.vs-table').locator('..').screenshot({ path: path.join(evidence, `comparison-${width}.png`) });
        }
        results.push(result);
        await page.close();
      }
    }
  } finally {
    await browser.close();
    if (evidence) fs.writeFileSync(path.join(evidence, 'results.json'), JSON.stringify(results, null, 2));
  }
  console.log(`${results.filter(result => result.passed).length}/${results.length} secondary route/viewport checks passed`);
  assert.equal(failures.length, 0, failures.join('\n'));
})().catch(error => { console.error(error); process.exitCode = 1; });
