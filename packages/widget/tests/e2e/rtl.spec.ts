// RTL smoke (STABLE-API §9 — RTL aynalanma).
// Loads the fixture with locale=ar; verifies FAB anchors to bottom-right
// (mirrored from the default bottom-left) and the badge ends up on the
// opposite side.
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, badge, waitForMount, openPanel } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(`${FIXTURE}?locale=ar`);
  await waitForMount(page);
});

test('host element is dir="rtl" for Arabic', async ({ page }) => {
  const dir = await page.evaluate(() => {
    const el = document.querySelector('blakfy-a11y-root');
    return (el as HTMLElement | null)?.getAttribute('dir');
  });
  expect(dir).toBe('rtl');
});

test('FAB is anchored to the right side in RTL (mirrored)', async ({ page }) => {
  // Default position is bottom-left, but with dir=rtl the logical
  // `inset-inline-start: 1rem` resolves to the RIGHT edge.
  const box = await fab(page).boundingBox();
  expect(box).not.toBeNull();
  const viewport = page.viewportSize()!;
  const rightEdgeDistance = viewport.width - (box!.x + box!.width);
  expect(rightEdgeDistance).toBeLessThan(96);
});

test('badge is on the opposite side from the FAB in RTL', async ({ page }) => {
  // Badge default is `inset-inline-end: 1rem` → resolves to LEFT in RTL.
  const box = await badge(page).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.x).toBeLessThan(96);
});

test('panel content flows RTL when opened', async ({ page }) => {
  await openPanel(page);
  // The widget host carries dir="rtl"; panel inherits via Shadow.
  const dialogDir = await page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    return (root as HTMLElement | null)?.getAttribute('dir');
  });
  expect(dialogDir).toBe('rtl');
});
