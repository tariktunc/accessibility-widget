import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import type {} from '../../src/public-api';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

for (const theme of ['light', 'dark'] as const) {
  for (const state of ['normal', 'hover', 'selected'] as const) {
    test(`${theme}: muted text contrast on ${state} cards`, async ({ page }) => {
      await page.goto(FIXTURE);
      await waitForMount(page);
      await page.evaluate((theme) => window.BlakfyA11y?.configure({ theme }), theme);
      await expect(page.locator('blakfy-a11y-root')).toHaveAttribute('data-theme', theme);
      await openPanel(page);

      const card = page.locator('.profile-list-item').first();
      if (state === 'hover') await card.hover();
      if (state === 'selected') {
        await card.focus();
        await page.keyboard.press('Space');
        await expect(card).toHaveAttribute('aria-pressed', 'true');
      }
      // Measure settled colors, not the intermediate background transition.
      await expect.poll(() => card.evaluate((el) => el.getAnimations().length)).toBe(0);

      const results = await new AxeBuilder({ page })
        .include('blakfy-a11y-root')
        .withRules(['color-contrast'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
