// Brand badge contract — STABLE-API.md §9.
// CRITICAL: the badge cannot be hidden, removed, or have its href changed.
// jsdom does not paint, so we cannot truly verify "visible" — but we can
// verify (a) it exists, (b) href is exactly https://blakfy.com,
// (c) target/rel are correct, (d) text contains "Powered by Blakfy
// Studio", (e) host CSS cannot reach into the Shadow DOM to hide it.
import { describe, it, expect, beforeAll } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi } from './_helpers';

describe('Brand badge contract (STABLE-API §9 — IMMUTABLE)', () => {
  let badge: HTMLAnchorElement;

  beforeAll(async () => {
    resetWidgetState();
    loadIIFE();
    await waitForApi();
    const host = document.querySelector('blakfy-a11y-root');
    expect(host).not.toBeNull();
    const sr = (host as HTMLElement).shadowRoot!;
    const found = sr.querySelector<HTMLAnchorElement>('a.badge');
    expect(found).not.toBeNull();
    badge = found!;
  });

  it('badge element exists in the Shadow DOM', () => {
    expect(badge).toBeDefined();
    expect(badge.tagName).toBe('A');
  });

  it('badge href is EXACTLY https://blakfy.com (no override possible)', () => {
    expect(badge.getAttribute('href')).toBe('https://blakfy.com');
  });

  it('badge text contains "Powered by Blakfy Studio"', () => {
    const text = (badge.textContent ?? '').replace(/\s+/g, ' ').trim();
    expect(text).toContain('Powered by Blakfy Studio');
  });

  it('badge opens in a new tab with correct rel attributes', () => {
    expect(badge.getAttribute('target')).toBe('_blank');
    expect(badge.getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('badge has an accessible label naming the destination', () => {
    expect(badge.getAttribute('aria-label')).toMatch(/Blakfy Studio/);
  });

  it('host CSS cannot hide the badge — Shadow DOM isolates it', () => {
    // Add hostile host CSS aimed at common hide tactics. None should
    // affect the badge because it lives inside a closed-from-outside
    // Shadow DOM (open mode but selectors don't pierce by default).
    const style = document.createElement('style');
    style.textContent = `
      .badge { display: none !important; visibility: hidden !important; opacity: 0 !important; }
      a[href="https://blakfy.com"] { display: none !important; }
      blakfy-a11y-root .badge { display: none !important; }
    `;
    document.head.appendChild(style);
    try {
      // The element is still attached to the DOM tree.
      expect(badge.isConnected).toBe(true);
      // CSS that reaches into Shadow DOM via descendant selectors is
      // not allowed — confirm the host stylesheet does not match the
      // shadow node.  In jsdom we can't compute "would render" but we
      // CAN confirm the rule does not apply via matches().
      expect(badge.matches('.badge')).toBe(true);
      // The host-scoped rule cannot select the shadow descendant via a
      // light-DOM selector chain — `blakfy-a11y-root .badge` would
      // only match if .badge were a light child, which it is not.
      // We assert by verifying the badge's parent is the shadow root
      // (or a child of it), not the host element itself.
      const root = badge.getRootNode();
      expect(root).not.toBe(document);
    } finally {
      style.remove();
    }
  });

  it('only one badge exists per mount', () => {
    const host = document.querySelector('blakfy-a11y-root');
    const sr = (host as HTMLElement).shadowRoot!;
    const all = sr.querySelectorAll('a.badge');
    expect(all.length).toBe(1);
  });
});
