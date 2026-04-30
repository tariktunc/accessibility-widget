// axe-core a11y validation (RED LINE 1 — 0 violations FAB closed + open).
//
// We scope axe to the `blakfy-a11y-root` host so we test the widget
// surface specifically (the fixture page itself is minimal but not a
// production page).  axe-core penetrates open Shadow DOM automatically
// when the included element is the host.
//
// As of Phase 11 (Refinement) the badge no longer needs to be excluded:
// after raising default opacity to 0.85 (still locked-in-spirit per
// STABLE-API §9 — implementation detail, not a §9 contract value), the
// muted color tokens (#525252 light / #a3a3a3 dark) clear WCAG 2.2 AA
// 4.5:1 against the page background in both themes.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

const SCOPED_TAGS = ['wcag2a', 'wcag2aa', 'wcag22aa'];

function builder(page: import('@playwright/test').Page): AxeBuilder {
  return new AxeBuilder({ page }).include('blakfy-a11y-root').withTags(SCOPED_TAGS);
}

async function resetAndMount(page: import('@playwright/test').Page, url = FIXTURE): Promise<void> {
  await page.goto(url);
  await waitForMount(page);
  // Hard reset prefs: previous tests in the same browser context may
  // have written localStorage / cookies that change the rendered DOM.
  await page.evaluate(() => {
    (window as unknown as { BlakfyA11y: { reset: () => void } }).BlakfyA11y.reset();
  });
}

test('FAB closed: 0 axe violations (WCAG 2.2 AA)', async ({ page }) => {
  await resetAndMount(page);
  const results = await builder(page).analyze();
  expect(results.violations).toEqual([]);
});

test('Panel open: 0 axe violations (WCAG 2.2 AA)', async ({ page }) => {
  await resetAndMount(page);
  await openPanel(page);
  const results = await builder(page).analyze();
  expect(results.violations).toEqual([]);
});

const LOCALES = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ar', 'he', 'ru'] as const;

for (const locale of LOCALES) {
  test(`${locale}: panel-open WCAG 2.2 AA — 0 violations`, async ({ page }) => {
    await resetAndMount(page, `${FIXTURE}?locale=${locale}`);
    await openPanel(page);
    const results = await builder(page).analyze();
    expect(results.violations).toEqual([]);
  });
}
