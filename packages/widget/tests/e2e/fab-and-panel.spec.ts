// FAB + Panel + Badge E2E.
// Asserts the locked surface from STABLE-API.md §9 (badge always visible).
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, dialog, badge, closeButton, backdrop, waitForMount, openPanel } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
});

test('FAB is visible at the configured position', async ({ page }) => {
  const fabEl = fab(page);
  await expect(fabEl).toBeVisible();
  const box = await fabEl.boundingBox();
  expect(box).not.toBeNull();
  // Default position is bottom-left (LTR locale "tr" but locale != RTL).
  // We assert the element is anchored near the bottom-left of the
  // viewport: y near the bottom, x near the left (within 64px).
  const viewport = page.viewportSize()!;
  expect(box!.y + box!.height).toBeGreaterThan(viewport.height - 96);
  expect(box!.x).toBeLessThan(96);
});

test('clicking the FAB opens the panel', async ({ page }) => {
  await openPanel(page);
  await expect(dialog(page)).toBeVisible();
  await expect(dialog(page)).toHaveAttribute('aria-modal', 'true');
});

test('clicking the close button closes the panel', async ({ page }) => {
  await openPanel(page);
  await closeButton(page).click();
  await expect(dialog(page)).toHaveCount(0);
});

test('ESC closes the panel without leaving focus stranded on the host page', async ({ page }) => {
  await openPanel(page);
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toHaveCount(0);
  // The locked surface does not require a specific focus restoration
  // target across Shadow DOM. We only assert focus does not get
  // stranded on a random light-DOM element.
  const activeOk = await page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    const active = document.activeElement;
    if (!active || active === document.body) return true;
    if (active === root) return true;
    if (root && root.contains(active)) return true;
    return false;
  });
  expect(activeOk).toBe(true);
});

test('clicking the backdrop closes the panel', async ({ page }) => {
  await openPanel(page);
  // Click in a corner of the backdrop, far from the dialog.
  const bd = backdrop(page);
  const box = await bd.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.click(box!.x + 4, box!.y + 4);
  await expect(dialog(page)).toHaveCount(0);
});

test('floating badge is visible regardless of panel state', async ({ page }) => {
  await expect(badge(page)).toBeVisible();
  await openPanel(page);
  await expect(badge(page)).toBeVisible();
});

test('badge href is exactly https://blakfy.com (LOCKED — STABLE-API §9)', async ({ page }) => {
  await expect(badge(page)).toHaveAttribute('href', 'https://blakfy.com');
});

test('badge target/rel are correct', async ({ page }) => {
  await expect(badge(page)).toHaveAttribute('target', '_blank');
  await expect(badge(page)).toHaveAttribute('rel', 'noopener noreferrer');
});

test('badge text contains "Powered by Blakfy Studio"', async ({ page }) => {
  const text = (await badge(page).textContent()) ?? '';
  expect(text.replace(/\s+/g, ' ').trim()).toContain('Powered by Blakfy Studio');
});
