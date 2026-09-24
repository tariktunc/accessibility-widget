// Blind combined-stack E2E — T-01-test (spec.md acceptance criteria 3 and 4).
//
// This test is written FROM spec.md, not from the implementation. It never
// imports or inspects widget.css / schema.ts / styles.js / config.js /
// fab.js / badge.js source. Everything about DOM structure (host elements,
// shadow-root mode, selectors, the fact that the cookie FAB only appears
// after a consent decision) was discovered at runtime against the BUILT
// dists before this file was written — never assumed.
//
// Loads:
//   - the a11y widget from this package's own dist (via the existing
//     fixture page, unmodified, no site overrides beyond data-locale="tr"
//     already present there)
//   - the cookie widget from the BUILT dist at process.env.BLAKFY_COOKIE_DIST,
//     defaulting to the sibling repo's dist/cookie.min.js — injected with no
//     data-blakfy-* attributes (no site overrides)
import { test, expect, type Page, type ElementHandle } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { FIXTURE, fab as a11yFab, badge as a11yBadge, dialog as a11yDialog, waitForMount, openPanel } from './_helpers';

const DEFAULT_COOKIE_DIST =
  'C:/Users/tarkt/OneDrive/Desktop/Github/Eklentiler/blakfy-cookie/dist/cookie.min.js';
const COOKIE_DIST_PATH = process.env.BLAKFY_COOKIE_DIST || DEFAULT_COOKIE_DIST;
const COOKIE_SRC = readFileSync(COOKIE_DIST_PATH, 'utf8');

const VIEWPORTS = [1200, 758, 350, 280];

interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

function intersects(a: Box, b: Box): boolean {
  return (
    a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
  );
}

/** Inject the cookie widget with zero attributes/config — no site overrides. */
async function loadCookieWidget(page: Page): Promise<void> {
  await page.evaluate((src) => {
    const s = document.createElement('script');
    s.textContent = src;
    document.body.appendChild(s);
  }, COOKIE_SRC);
  await page.waitForFunction(
    () => typeof window !== 'undefined' && !!(window as unknown as { BlakfyCookie?: unknown }).BlakfyCookie,
    null,
    { timeout: 10_000 },
  );
  // Consent banner render is async after bootstrap; wait for its card.
  await page.waitForFunction(
    () => {
      const root = document.getElementById('blakfy-cookie-root');
      const sr = (root as HTMLElement | null)?.shadowRoot;
      return !!sr?.querySelector('.blakfy-card');
    },
    null,
    { timeout: 10_000 },
  );
}

function cookieCardHandle(page: Page) {
  return page.evaluateHandle(() => {
    const root = document.getElementById('blakfy-cookie-root') as HTMLElement;
    return root.shadowRoot!.querySelector('.blakfy-card') as HTMLElement;
  });
}

function cookieDescHandle(page: Page) {
  return page.evaluateHandle(() => {
    const root = document.getElementById('blakfy-cookie-root') as HTMLElement;
    return root.shadowRoot!.querySelector('#blakfy-desc') as HTMLElement;
  });
}

/** Click "reject all" in the cookie banner to reach the collapsed FAB state
 *  (discovered at runtime: the cookie FAB only exists after a consent
 *  decision is made — there is no FAB while the banner is open). */
async function rejectCookieBanner(page: Page): Promise<void> {
  await page.evaluate(() => {
    const root = document.getElementById('blakfy-cookie-root') as HTMLElement;
    const btns = Array.from(root.shadowRoot!.querySelectorAll('button.blakfy-btn')) as HTMLElement[];
    const rejectBtn = btns.find((b) => /redd|reject|decline/i.test(b.textContent || '')) || btns[0];
    rejectBtn.click();
  });
  await page.waitForFunction(
    () => {
      const root = document.getElementById('blakfy-cookie-root') as HTMLElement;
      return !!root.shadowRoot!.querySelector('button.blakfy-fab');
    },
    null,
    { timeout: 10_000 },
  );
}

function cookieFabHandle(page: Page) {
  return page.evaluateHandle(() => {
    const root = document.getElementById('blakfy-cookie-root') as HTMLElement;
    return root.shadowRoot!.querySelector('button.blakfy-fab') as HTMLElement;
  });
}

async function box(handle: ElementHandle<HTMLElement> | ReturnType<typeof cookieFabHandle> extends Promise<infer T> ? T : never): Promise<Box> {
  return handle.evaluate((el: HTMLElement) => {
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, width: r.width, height: r.height };
  });
}

/** The cookie FAB's visible circle is painted by ::before (discovered at
 *  runtime — the <button class="blakfy-fab"> element itself is transparent
 *  with no radius; the pseudo-element carries bg/shadow/radius/opacity). */
async function cookieFabCircleStyle(page: Page, handle: ReturnType<typeof cookieFabHandle> extends Promise<infer T> ? T : never) {
  return handle.evaluate((el: HTMLElement) => {
    const cs = getComputedStyle(el, '::before');
    return {
      backgroundColor: cs.backgroundColor,
      boxShadow: cs.boxShadow,
      borderRadius: cs.borderRadius,
      opacity: cs.opacity,
    };
  });
}

for (const width of VIEWPORTS) {
  test.describe(`combined stack @ ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test(`criterion 3+4 — rendered defaults, stacking, no overlap @ ${width}px`, async ({ page }) => {
      await page.goto(FIXTURE);
      await waitForMount(page);
      await loadCookieWidget(page);

      // --- Banner theme (part of criterion 4: "cookie banner compute a
      // white background and text ... near-black") ---
      const card = await cookieCardHandle(page);
      const cardBg = await card.evaluate((el: HTMLElement) => getComputedStyle(el).backgroundColor);
      expect(cardBg).toBe('rgb(255, 255, 255)');
      const desc = await cookieDescHandle(page);
      const descColor = await desc.evaluate((el: HTMLElement) => getComputedStyle(el).color);
      const descRgb = descColor.match(/\d+/g)!.map(Number);
      for (const ch of descRgb.slice(0, 3)) expect(ch).toBeLessThanOrEqual(26);

      // --- Reach the collapsed FAB state FIRST ---
      // Discovered at runtime (758/350/280px): while the cookie banner is
      // open, it renders as a full-viewport modal <dialog> whose backdrop
      // (<div id="blakfy-cookie-root">) intercepts pointer events across
      // the ENTIRE page, including the a11y FAB's position — standard
      // modal-blocks-background behaviour, not a bug. Opening the a11y
      // panel is therefore ordered AFTER the consent decision so the click
      // is never attempted through an intercepting overlay. Criterion 4's
      // "opened a11y panel and cookie banner compute ..." does not require
      // both to be open simultaneously; each theme check stands on its own.
      await rejectCookieBanner(page);

      // --- a11y panel theme ---
      await openPanel(page);
      const dialogBg = await a11yDialog(page).evaluate((el) => getComputedStyle(el).backgroundColor);
      expect(dialogBg).toBe('rgb(255, 255, 255)');
      const dialogColor = await a11yDialog(page).evaluate((el) => getComputedStyle(el).color);
      const dialogRgb = dialogColor.match(/\d+/g)!.map(Number);
      for (const ch of dialogRgb.slice(0, 3)) expect(ch).toBeLessThanOrEqual(26);
      await page.keyboard.press('Escape');
      // Discovered at runtime: Playwright's real mouse click leaves the
      // cursor resting on the FAB, which then renders its CSS :hover
      // darkened shade (measured rgb(10,10,10) idle -> rgb(38,38,38) while
      // hovered, reverting once the pointer moves away). Move the mouse
      // off both FABs before reading any "default/idle" computed style
      // below, so the assertions measure the idle state the spec targets,
      // not an artifact of the test's own click.
      await page.mouse.move(0, 0);
      await page.waitForTimeout(50);

      // --- Criterion 3: cookie FAB visible-circle rendered defaults ---
      const cookieFab = await cookieFabHandle(page);
      const circle = await cookieFabCircleStyle(page, cookieFab);
      expect(circle.backgroundColor).toBe('rgb(10, 10, 10)');
      expect(circle.borderRadius).toBe('50%');
      expect(circle.opacity).toBe('1');
      expect(circle.boxShadow).toContain('0px 1px 3px 0px');
      expect(circle.boxShadow).toContain('rgba(0, 0, 0, 0.03)');

      const cookieFabBox = await box(cookieFab);
      const expectedOffsetX = width >= 758 ? 16 : 12;
      expect(Math.round(cookieFabBox.x)).toBeCloseTo(expectedOffsetX, 0);
      const viewportH = page.viewportSize()!.height;
      const bottomGap = viewportH - (cookieFabBox.y + cookieFabBox.height);
      expect(Math.round(bottomGap)).toBeCloseTo(116, 0);

      // --- Criterion 4: combined stack, no overlap, ordering, a11y FAB paint ---
      const a11yFabEl = a11yFab(page);
      const a11yFabBox = (await a11yFabEl.boundingBox())!;
      const a11yBadgeBox = (await a11yBadge(page).boundingBox())!;

      const a11yFabStyle = await a11yFabEl.evaluate((el) => {
        const cs = getComputedStyle(el);
        return { backgroundColor: cs.backgroundColor, boxShadow: cs.boxShadow, borderRadius: cs.borderRadius, width: el.getBoundingClientRect().width };
      });
      expect(a11yFabStyle.backgroundColor).toBe('rgb(10, 10, 10)');
      expect(a11yFabStyle.boxShadow).toContain('0px 1px 3px 0px');
      expect(a11yFabStyle.boxShadow).toContain('rgba(0, 0, 0, 0.03)');
      const radiusPx = parseFloat(a11yFabStyle.borderRadius);
      expect(radiusPx >= a11yFabStyle.width / 2 || a11yFabStyle.borderRadius.includes('9999')).toBe(true);

      const iconColor = await a11yFabEl.evaluate((el) => {
        const icon = el.querySelector('svg');
        return icon ? getComputedStyle(icon).color : getComputedStyle(el).color;
      });
      expect(iconColor).toBe('rgb(255, 255, 255)');

      // Both FABs anchored on the left (small x, well inside the viewport edge).
      expect(cookieFabBox.x).toBeLessThan(50);
      expect(a11yFabBox.x).toBeLessThan(50);

      // Ordering: cookie FAB above a11y FAB, badge label between them,
      // a11y FAB is the lowest of the three.
      const cookieBottom = cookieFabBox.y + cookieFabBox.height;
      const badgeTop = a11yBadgeBox.y;
      const badgeBottom = a11yBadgeBox.y + a11yBadgeBox.height;
      const a11yFabTop = a11yFabBox.y;
      expect(cookieBottom).toBeLessThanOrEqual(badgeTop + 2);
      expect(badgeBottom).toBeLessThanOrEqual(a11yFabTop + 2);
      expect(a11yFabBox.y + a11yFabBox.height).toBeGreaterThan(cookieFabBox.y + cookieFabBox.height);
      expect(a11yFabBox.y + a11yFabBox.height).toBeGreaterThan(a11yBadgeBox.y + a11yBadgeBox.height);

      // No two of the three bounding boxes intersect.
      const boxes: Box[] = [
        { x: cookieFabBox.x, y: cookieFabBox.y, width: cookieFabBox.width, height: cookieFabBox.height },
        { x: a11yBadgeBox.x, y: a11yBadgeBox.y, width: a11yBadgeBox.width, height: a11yBadgeBox.height },
        { x: a11yFabBox.x, y: a11yFabBox.y, width: a11yFabBox.width, height: a11yFabBox.height },
      ];
      expect(intersects(boxes[0], boxes[1])).toBe(false);
      expect(intersects(boxes[1], boxes[2])).toBe(false);
      expect(intersects(boxes[0], boxes[2])).toBe(false);
    });
  });
}
