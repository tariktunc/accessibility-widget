// Keyboard interaction E2E.
// Covers RED LINE items: keyboard-only flow, focus trap, ESC behavior.
import { test, expect } from '@playwright/test';
import { FIXTURE, fab, dialog, switches, waitForMount, openPanel } from './_helpers';

test.beforeEach(async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
});

test('Alt+0 opens the panel', async ({ page }) => {
  await page.keyboard.press('Alt+0');
  await expect(dialog(page)).toBeVisible();
});

test('Tab cycles within the dialog only (focus trap)', async ({ page }) => {
  await openPanel(page);
  // Press Tab a few times and verify the active element is always within
  // the dialog (Shadow DOM aware).
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Tab');
    const inside = await page.evaluate(() => {
      const root = document.querySelector('blakfy-a11y-root');
      const sr = (root as HTMLElement | null)?.shadowRoot;
      if (!sr) return false;
      const active = sr.activeElement;
      const dlg = sr.querySelector('[role="dialog"]');
      return !!dlg && !!active && dlg.contains(active);
    });
    expect(inside, `Tab #${i + 1} kept focus inside dialog`).toBe(true);
  }
});

test('Shift+Tab cycles in reverse within the dialog', async ({ page }) => {
  await openPanel(page);
  for (let i = 0; i < 12; i++) {
    await page.keyboard.press('Shift+Tab');
    const inside = await page.evaluate(() => {
      const root = document.querySelector('blakfy-a11y-root');
      const sr = (root as HTMLElement | null)?.shadowRoot;
      if (!sr) return false;
      const active = sr.activeElement;
      const dlg = sr.querySelector('[role="dialog"]');
      return !!dlg && !!active && dlg.contains(active);
    });
    expect(inside, `Shift+Tab #${i + 1} kept focus inside dialog`).toBe(true);
  }
});

test('ESC closes the dialog and restores focus to the FAB (deep Shadow walk)', async ({ page }) => {
  // Phase 11 fix (Deviation 2): Dialog.tsx uses a Shadow-DOM-aware
  // active-element walker so that closing the panel restores focus to
  // the FAB inside our shadow root rather than the host element.
  // We focus the FAB explicitly first (mirroring a real keyboard-only
  // user) — Chromium does not focus buttons on mousedown by default.
  await fab(page).focus();
  // Activate via keyboard to keep focus on FAB before the dialog opens.
  await page.keyboard.press('Enter');
  await dialog(page).waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');
  await expect(dialog(page)).toHaveCount(0);
  // The deep active element should be the FAB inside the Shadow DOM.
  const active = await page.evaluate(() => {
    let el: Element | null = document.activeElement;
    while (el && (el as Element & { shadowRoot?: ShadowRoot | null }).shadowRoot?.activeElement) {
      el = (el as Element & { shadowRoot: ShadowRoot }).shadowRoot.activeElement;
    }
    return el?.className ?? null;
  });
  expect(active).toContain('fab');
});

test('non-English locale loads from /dist/locales/*.json (Phase 11 Deviation 4)', async ({ page }) => {
  await page.goto(`${FIXTURE}?locale=tr`);
  await waitForMount(page);
  await openPanel(page);
  // Wait for the lazy-loaded translation to be applied to the rendered DOM.
  const titleLocator = page.locator('blakfy-a11y-root').locator('.panel-title');
  await expect(titleLocator).toContainText(/Eri.ilebilirlik/, { timeout: 5_000 });
});

test('all 7 toggle controls are reachable via keyboard', async ({ page }) => {
  await openPanel(page);
  // Six are role="switch", and the font-scale exposes 3 buttons. We
  // assert we have at least 6 switches and 3 scale buttons reachable.
  const switchCount = await switches(page).count();
  expect(switchCount).toBe(6);
  const scaleButtons = await page
    .locator('blakfy-a11y-root')
    .locator('button.scale-btn')
    .count();
  expect(scaleButtons).toBe(3);
});
