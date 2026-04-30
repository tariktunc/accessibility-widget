// Responsive / reflow E2E (RED LINE: 320×256 reflow, mobile, desktop).
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, dialog, waitForMount, openPanel } from './_helpers';

test.describe('Responsive viewports', () => {
  test('320×256 — no horizontal scroll, FAB visible, panel fits', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 256 });
    await page.goto(FIXTURE);
    await waitForMount(page);
    await expect(fab(page)).toBeVisible();
    // No horizontal scroll on host page
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(320 + 1);
    // Open the panel and check it fits the viewport
    await openPanel(page);
    const dlgBox = await dialog(page).boundingBox();
    expect(dlgBox).not.toBeNull();
    expect(dlgBox!.width).toBeLessThanOrEqual(320);
  });

  test('360×640 — mobile portrait remains functional', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto(FIXTURE);
    await waitForMount(page);
    await expect(fab(page)).toBeVisible();
    await openPanel(page);
    await expect(dialog(page)).toBeVisible();
  });

  test('1920×1080 — desktop large remains functional', async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto(FIXTURE);
    await waitForMount(page);
    await expect(fab(page)).toBeVisible();
    await openPanel(page);
    await expect(dialog(page)).toBeVisible();
  });
});
