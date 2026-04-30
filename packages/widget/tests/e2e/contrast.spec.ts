// Contrast checks via axe-core color-contrast rule.
//   - Light theme: text ≥ 4.5:1 (AA), non-text ≥ 3:1
//   - Dark theme:  text ≥ 4.5:1 (AA), non-text ≥ 3:1
//   - High contrast preference: data-a11y-contrast="high" → AAA (7:1)
//
// We isolate the color-contrast rule with `withRules` so that other
// (already-tested) violations don't pollute the signal.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

test('light theme color-contrast: 0 violations', async ({ page }) => {
  await page.goto(`${FIXTURE}?theme=light`);
  await waitForMount(page);
  await openPanel(page);
  const results = await new AxeBuilder({ page })
    .include('blakfy-a11y-root')
    .withRules(['color-contrast'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('dark theme color-contrast: 0 violations', async ({ page }) => {
  await page.goto(`${FIXTURE}?theme=dark`);
  await waitForMount(page);
  await openPanel(page);
  const results = await new AxeBuilder({ page })
    .include('blakfy-a11y-root')
    .withRules(['color-contrast'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('high-contrast preference: 0 color-contrast violations', async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
  await page.evaluate(() => (window as any).BlakfyA11y.setPreferences({ contrast: 'high' }));
  await openPanel(page);
  const results = await new AxeBuilder({ page })
    .include('blakfy-a11y-root')
    .withRules(['color-contrast'])
    .analyze();
  expect(results.violations).toEqual([]);
});
