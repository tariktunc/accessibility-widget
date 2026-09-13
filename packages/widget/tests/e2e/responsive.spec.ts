// Responsive / reflow E2E (280px minimum, 320×256 reflow, mobile, desktop).
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, dialog, waitForMount, openPanel } from './_helpers';

test.describe('Responsive viewports', () => {
  test('280×653 — FAB touch target and panel stay within the viewport', async ({ page }) => {
    const width = 280;
    const height = 653;
    await page.setViewportSize({ width, height });
    await page.goto(FIXTURE);
    await waitForMount(page);

    await expect(fab(page)).toBeVisible();
    const fabBox = await fab(page).boundingBox();
    expect(fabBox).not.toBeNull();
    expect(fabBox!.width).toBeGreaterThanOrEqual(44);
    expect(fabBox!.height).toBeGreaterThanOrEqual(44);
    expect(fabBox!.x).toBeGreaterThanOrEqual(0);
    expect(fabBox!.y).toBeGreaterThanOrEqual(0);
    expect(fabBox!.x + fabBox!.width).toBeLessThanOrEqual(width);
    expect(fabBox!.y + fabBox!.height).toBeLessThanOrEqual(height);

    // Clicking the FAB also checks that it can receive pointer input.
    await openPanel(page);
    await expect(dialog(page)).toBeVisible();
    await expect
      .poll(async () => {
        const box = await dialog(page).boundingBox();
        return box !== null && box.x >= 0 && box.x + box.width <= width;
      })
      .toBe(true);
    const overflow = await dialog(page).evaluate(
      (element) => element.scrollWidth - element.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 1,
    );
  });

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
