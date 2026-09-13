// Project sizing checks: FAB/help buttons ≥ 44×44 bounds;
// other panel buttons and toggles ≥ 24×24 bounds.
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, dialog, openPanel, waitForMount } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
});

test('FAB is at least 44×44 px (project target)', async ({ page }) => {
  const box = await fab(page).boundingBox();
  expect(box).not.toBeNull();
  expect(box!.width).toBeGreaterThanOrEqual(44);
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

for (const width of [280, 350, 758, 1200]) {
  test(`panel controls have at least 24×24 bounds at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 });
    await openPanel(page);
    // Opacity can reach 1 before the slide-in transform has finished.
    await dialog(page).evaluate(async (element) => {
      await Promise.all(element.getAnimations().map((animation) => animation.finished));
    });
    // Scope: panel buttons and toggles. Links require separate checks.
    const targets = page.locator('blakfy-a11y-root').locator('button, [role="switch"]');
    const count = await targets.count();
    expect(count).toBeGreaterThan(0);
    for (let i = 0; i < count; i++) {
      const el = targets.nth(i);
      if (!(await el.isVisible())) continue;
      const box = await el.boundingBox();
      if (!box) continue;
      const minimum = (await el.evaluate((element) => element.matches('.info-btn'))) ? 44 : 24;
      // This is the project's direct sizing check, not an evaluation of
      // WCAG spacing exceptions or every possible target shape.
      expect(
        box.width >= minimum && box.height >= minimum,
        `target #${i} (${box.width.toFixed(2)}×${box.height.toFixed(2)}) below ${minimum}×${minimum} minimum`,
      ).toBe(true);
      expect(box.x).toBeGreaterThanOrEqual(0);
      expect(box.x + box.width).toBeLessThanOrEqual(width + 1);
    }
  });
}

test('reflow at 320×256 — no clipped controls', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 256 });
  await openPanel(page);
  // No element should overflow horizontally past the viewport
  const overflowing = await page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    const sr = (root as HTMLElement | null)?.shadowRoot;
    if (!sr) return [];
    const all = sr.querySelectorAll<HTMLElement>('button, [role="switch"], a[href]');
    const out: string[] = [];
    all.forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.right > 320 + 1) out.push(`${el.tagName}.${el.className}`);
    });
    return out;
  });
  expect(overflowing).toEqual([]);
});
