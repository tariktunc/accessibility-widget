// OS preference signals E2E (issue #32): prefers-reduced-transparency and
// prefers-reduced-data.
//
// prefers-reduced-transparency ships in Chromium since 118, so it is driven
// through CDP — Playwright's emulateMedia() has no option for it yet.
// prefers-reduced-data is implemented by no Chromium today, yet the widget has
// to honour it, so the feature is faked at the matchMedia layer to exercise the
// path real browsers take once they ship it.
import { test, expect } from '@playwright/test';
import { FIXTURE, openPanel, waitForMount } from './_helpers';

async function emulateFeature(
  page: import('@playwright/test').Page,
  name: string,
  value: string,
): Promise<void> {
  const client = await page.context().newCDPSession(page);
  await client.send('Emulation.setEmulatedMedia', { features: [{ name, value }] });
}

async function backdropStyle(
  page: import('@playwright/test').Page,
): Promise<{ background: string; filter: string }> {
  return page.evaluate(() => {
    const root = document.querySelector('blakfy-a11y-root');
    const el = (root as HTMLElement | null)?.shadowRoot?.querySelector<HTMLElement>('.backdrop');
    if (!el) return { background: '', filter: '' };
    const cs = getComputedStyle(el);
    return { background: cs.backgroundColor, filter: cs.backdropFilter };
  });
}

test('reduced transparency: scrim goes opaque and both hosts carry the signal', async ({
  page,
}) => {
  await emulateFeature(page, 'prefers-reduced-transparency', 'reduce');
  await page.goto(FIXTURE, { waitUntil: 'domcontentloaded' });
  await waitForMount(page);

  expect(
    await page.evaluate(() => matchMedia('(prefers-reduced-transparency: reduce)').matches),
  ).toBe(true);
  expect(
    await page.evaluate(() =>
      document.documentElement.getAttribute('data-a11y-reduced-transparency'),
    ),
  ).toBe('true');
  expect(
    await page.evaluate(() =>
      document.querySelector('blakfy-a11y-root')?.getAttribute('data-a11y-reduced-transparency'),
    ),
  ).toBe('true');

  // The FAB re-renders once the non-English locale lands; let it settle before
  // clicking (the widget renders bundled English first).
  await page.waitForTimeout(1200);
  await openPanel(page);
  const { background, filter } = await backdropStyle(page);
  expect(background).toBe('rgb(0, 0, 0)');
  expect(filter.toLowerCase()).toBe('none');
});

test('default transparency: the scrim keeps its blur and tint', async ({ page }) => {
  await page.goto(FIXTURE, { waitUntil: 'domcontentloaded' });
  await waitForMount(page);
  await page.waitForTimeout(1200);
  await openPanel(page);

  const { background, filter } = await backdropStyle(page);
  expect(background).toMatch(/rgba?\(\s*0\s*,\s*0\s*,\s*0/);
  expect(filter.toLowerCase()).toContain('blur');
});

test('reduced data: remote locale files are not fetched', async ({ page }) => {
  const localeRequests: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('locales/')) localeRequests.push(r.url());
  });
  // Chromium has no prefers-reduced-data yet: fake the media query so the
  // widget takes the reduced-data path.
  await page.addInitScript(() => {
    const original = window.matchMedia.bind(window);
    window.matchMedia = ((query: string) => {
      if (query.includes('prefers-reduced-data')) {
        return {
          matches: true,
          media: query,
          onchange: null,
          addEventListener: () => undefined,
          removeEventListener: () => undefined,
          addListener: () => undefined,
          removeListener: () => undefined,
          dispatchEvent: () => false,
        } as unknown as MediaQueryList;
      }
      return original(query);
    }) as typeof window.matchMedia;
  });

  // The fixture ships data-locale="tr", a locale that is not bundled: without
  // the fix this request is made.
  await page.goto(FIXTURE, { waitUntil: 'domcontentloaded' });
  await waitForMount(page);
  await page.waitForTimeout(750);

  expect(
    await page.evaluate(() => document.documentElement.getAttribute('data-a11y-reduced-data')),
  ).toBe('true');
  expect(
    await page.evaluate(() =>
      document.querySelector('blakfy-a11y-root')?.getAttribute('data-a11y-reduced-data'),
    ),
  ).toBe('true');
  expect(localeRequests).toHaveLength(0);
});

test('default data: the remote locale is still fetched', async ({ page }) => {
  const localeRequests: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('locales/')) localeRequests.push(r.url());
  });

  await page.goto(FIXTURE, { waitUntil: 'domcontentloaded' });
  await waitForMount(page);
  await page.waitForTimeout(1500);

  expect(localeRequests.length).toBeGreaterThan(0);
});
