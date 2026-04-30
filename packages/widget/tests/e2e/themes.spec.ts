// Theme switch E2E.
// data-theme = light | dark | auto, where `auto` follows
// `prefers-color-scheme`.  We assert that the right CSS variable is
// resolved on the dialog when the panel is open.
import { test, expect } from '@playwright/test';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

async function getDialogBg(page: import('@playwright/test').Page): Promise<string> {
  return page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    const sr = (root as HTMLElement | null)?.shadowRoot;
    const dlg = sr?.querySelector<HTMLElement>('.dialog');
    if (!dlg) return '';
    return getComputedStyle(dlg).backgroundColor;
  });
}

test('light theme: panel background resolves to light value', async ({ page }) => {
  await page.goto(`${FIXTURE}?theme=light`);
  await waitForMount(page);
  await openPanel(page);
  const bg = await getDialogBg(page);
  // #ffffff → rgb(255, 255, 255)
  expect(bg).toMatch(/rgb\s*\(\s*255\s*,\s*255\s*,\s*255\s*\)/);
});

test('dark theme: panel background resolves to dark value', async ({ page }) => {
  await page.goto(`${FIXTURE}?theme=dark`);
  await waitForMount(page);
  await openPanel(page);
  const bg = await getDialogBg(page);
  // #0a0a0a → rgb(10, 10, 10)
  expect(bg).toMatch(/rgb\s*\(\s*10\s*,\s*10\s*,\s*10\s*\)/);
});

test('auto + emulated prefers-color-scheme=dark uses dark vars', async ({ page, browser }) => {
  const ctx = await browser.newContext({ colorScheme: 'dark' });
  const p = await ctx.newPage();
  await p.goto(`${FIXTURE}?theme=auto`);
  await waitForMount(p);
  await openPanel(p);
  const bg = await getDialogBg(p);
  expect(bg).toMatch(/rgb\s*\(\s*10\s*,\s*10\s*,\s*10\s*\)/);
  await ctx.close();
});

test('CSS custom properties are queryable on the host', async ({ page }) => {
  await page.goto(FIXTURE);
  await waitForMount(page);
  const value = await page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    const sr = (root as HTMLElement | null)?.shadowRoot;
    // The variable is declared on :host; read it via the host element.
    return root ? getComputedStyle(root as HTMLElement).getPropertyValue('--blakfy-a11y-primary').trim() : '';
  });
  expect(value).toBe('#2563eb');
});
