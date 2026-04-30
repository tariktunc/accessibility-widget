// Preferences round-trip E2E.
// For each of the 7 preferences (6 switches + 1 font-scale group):
//   - flip via UI
//   - assert <html> data-a11y-* attribute updates
//   - assert localStorage + cookie persist
//   - reload, assert preference survives
import { test, expect } from '@playwright/test';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
  // Reset to defaults so previous tests don't leak.
  await page.evaluate(() => (window as any).BlakfyA11y.reset());
});

async function getHtmlAttrs(page: import('@playwright/test').Page): Promise<Record<string, string | null>> {
  return page.evaluate(() => {
    const html = document.documentElement;
    return {
      fontscale: html.getAttribute('data-a11y-fontscale'),
      contrast: html.getAttribute('data-a11y-contrast'),
      focus: html.getAttribute('data-a11y-focus'),
      links: html.getAttribute('data-a11y-links'),
      motion: html.getAttribute('data-a11y-motion'),
      dyslexia: html.getAttribute('data-a11y-dyslexia'),
      reading: html.getAttribute('data-a11y-reading'),
    };
  });
}

test('fontScale → data-a11y-fontscale + persists', async ({ page }) => {
  await openPanel(page);
  // Three scale buttons in DOM order: 100% / 110% / 125%
  await page.locator('blakfy-a11y-root').locator('button.scale-btn').nth(1).click();
  expect((await getHtmlAttrs(page)).fontscale).toBe('110');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).fontscale).toBe('110');
});

test('contrast switch → data-a11y-contrast="high" + persists', async ({ page }) => {
  await openPanel(page);
  // First switch in the order is "contrast"
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').first().click();
  expect((await getHtmlAttrs(page)).contrast).toBe('high');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).contrast).toBe('high');
});

test('focusRing → data-a11y-focus="enhanced" + persists', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').nth(1).click();
  expect((await getHtmlAttrs(page)).focus).toBe('enhanced');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).focus).toBe('enhanced');
});

test('linkUnderline → data-a11y-links="underline" + persists', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').nth(2).click();
  expect((await getHtmlAttrs(page)).links).toBe('underline');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).links).toBe('underline');
});

test('motion → data-a11y-motion="reduce" + persists', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').nth(3).click();
  expect((await getHtmlAttrs(page)).motion).toBe('reduce');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).motion).toBe('reduce');
});

test('dyslexiaFont → data-a11y-dyslexia="true" + persists', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').nth(4).click();
  expect((await getHtmlAttrs(page)).dyslexia).toBe('true');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).dyslexia).toBe('true');
});

test('readingMode → data-a11y-reading="true" + persists', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').nth(5).click();
  expect((await getHtmlAttrs(page)).reading).toBe('true');
  await page.reload();
  await waitForMount(page);
  expect((await getHtmlAttrs(page)).reading).toBe('true');
});

test('localStorage + cookie both record changes', async ({ page }) => {
  await openPanel(page);
  await page.locator('blakfy-a11y-root').locator('[role="switch"]').first().click();
  const ls = await page.evaluate(() => window.localStorage.getItem('blakfy_a11y_prefs'));
  const ck = await page.evaluate(() => document.cookie);
  expect(ls).not.toBeNull();
  expect(ls!).toContain('"contrast":"high"');
  expect(ck).toContain('blakfy_a11y_prefs=');
});
