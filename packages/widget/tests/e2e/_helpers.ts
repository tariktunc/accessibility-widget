// Shared helpers for Playwright E2E tests.
import type { Locator, Page } from '@playwright/test';

export const FIXTURE = '/tests/e2e/fixtures/test-page.html';

/**
 * The widget mounts inside `<blakfy-a11y-root>` with an open Shadow root.
 * Playwright's `>>` chain transparently pierces open shadow trees.
 */
export function fab(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('button.fab');
}

export function dialog(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('[role="dialog"]');
}

export function badge(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('a.badge');
}

export function closeButton(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('button.dialog-close');
}

export function backdrop(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('.backdrop');
}

export function resetButton(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('button.btn-secondary');
}

export function switches(page: Page): Locator {
  return page.locator('blakfy-a11y-root').locator('[role="switch"]');
}

/** Wait for the auto-mount to complete. */
export async function waitForMount(page: Page): Promise<void> {
  await page.waitForFunction(
    () =>
      typeof window !== 'undefined' &&
      !!(window as unknown as { BlakfyA11y?: unknown }).BlakfyA11y,
    null,
    { timeout: 10_000 },
  );
}

/** Open the panel via FAB click. Waits for the open animation to settle. */
export async function openPanel(page: Page): Promise<void> {
  await fab(page).click();
  await dialog(page).waitFor({ state: 'visible' });
  // The dialog plays a 200ms zoom-in animation. Wait for it to settle
  // so axe-core / boundingBox measurements are deterministic.
  await page.waitForFunction(
    () => {
      const root = document.querySelector('blakfy-a11y-root');
      const sr = (root as HTMLElement | null)?.shadowRoot;
      const dlg = sr?.querySelector('.dialog') as HTMLElement | null;
      if (!dlg) return false;
      const cs = getComputedStyle(dlg);
      // After settle: opacity == 1, no animation in progress.
      return parseFloat(cs.opacity) >= 0.99;
    },
    null,
    { timeout: 5_000 },
  );
  // Small buffer for backdrop-filter / animation paint.
  await page.waitForTimeout(50);
}
