// Reset 2-click confirm flow.
import { test, expect } from '@playwright/test';
import { FIXTURE, openPanel, resetButton, waitForMount } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
  await page.evaluate(() => (window as any).BlakfyA11y.reset());
});

test('first click switches button to confirm state, second click resets prefs', async ({ page }) => {
  // Toggle three preferences first
  await openPanel(page);
  const sw = page.locator('blakfy-a11y-root').locator('[role="switch"]');
  await sw.nth(0).click(); // contrast
  await sw.nth(1).click(); // focusRing
  await sw.nth(2).click(); // linkUnderline

  // First reset click → confirm state
  const btn = resetButton(page);
  await btn.click();
  await expect(btn).toHaveAttribute('data-confirm', 'true');
  await expect(btn).toHaveAttribute('aria-pressed', 'true');

  // Second click → actual reset
  await btn.click();
  await expect(btn).not.toHaveAttribute('data-confirm', 'true');
  const prefs = await page.evaluate(() => (window as any).BlakfyA11y.getPreferences());
  expect(prefs.contrast).toBe('normal');
  expect(prefs.focusRing).toBe(false);
  expect(prefs.linkUnderline).toBe(false);
});

test('confirm state expires after 3+ seconds', async ({ page }) => {
  await openPanel(page);
  const btn = resetButton(page);
  await btn.click();
  await expect(btn).toHaveAttribute('data-confirm', 'true');

  // Wait > 3s and re-check.
  await page.waitForTimeout(3500);
  await expect(btn).not.toHaveAttribute('data-confirm', 'true');
});
