// CSS Custom Properties contract — STABLE-API.md §4.
// All 15 locked variables must be queryable + non-empty on the host
// element after mount.
//
// jsdom does NOT implement the full CSS layout engine; getComputedStyle
// returns the raw cascaded value of custom properties when read via
// getPropertyValue. We assert against the inline `<style>` injected into
// the Shadow root, which jsdom can parse.
import { describe, it, expect, beforeAll } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi, LOCKED_CSS_VARS } from './_helpers';

describe('CSS custom properties contract (STABLE-API §4)', () => {
  let cssText: string;

  beforeAll(async () => {
    resetWidgetState();
    loadIIFE();
    await waitForApi();
    const host = document.querySelector('blakfy-a11y-root');
    expect(host).not.toBeNull();
    const sr = (host as HTMLElement).shadowRoot;
    expect(sr).not.toBeNull();
    const styleEl = sr!.querySelector('style');
    expect(styleEl).not.toBeNull();
    cssText = styleEl!.textContent ?? '';
  });

  it('locked variable list (snapshot — drift = potential breaking change)', () => {
    expect([...LOCKED_CSS_VARS].sort()).toMatchInlineSnapshot(`
      [
        "--blakfy-a11y-fab-size",
        "--blakfy-a11y-focus-ring",
        "--blakfy-a11y-panel-bg",
        "--blakfy-a11y-panel-bg-dark",
        "--blakfy-a11y-panel-border",
        "--blakfy-a11y-panel-border-dark",
        "--blakfy-a11y-panel-muted",
        "--blakfy-a11y-panel-muted-dark",
        "--blakfy-a11y-panel-text",
        "--blakfy-a11y-panel-text-dark",
        "--blakfy-a11y-primary",
        "--blakfy-a11y-primary-hover",
        "--blakfy-a11y-primary-text",
        "--blakfy-a11y-toggle-off",
        "--blakfy-a11y-toggle-on",
      ]
    `);
  });

  it('all 15 locked variables are declared with non-empty defaults in the Shadow stylesheet', () => {
    for (const name of LOCKED_CSS_VARS) {
      // Match `--blakfy-a11y-X: <value>;` ignoring whitespace.
      const re = new RegExp(`${name.replace(/-/g, '\\-')}\\s*:\\s*([^;]+);`);
      const m = cssText.match(re);
      expect(m, `${name} must be declared in widget.css`).not.toBeNull();
      expect(m![1].trim().length, `${name} must have a non-empty default`).toBeGreaterThan(0);
    }
  });

  it('default color values match the locked spec values', () => {
    const expected: Record<string, string> = {
      '--blakfy-a11y-primary': '#2563eb',
      '--blakfy-a11y-primary-hover': '#1d4ed8',
      '--blakfy-a11y-primary-text': '#ffffff',
      '--blakfy-a11y-panel-bg': '#ffffff',
      '--blakfy-a11y-panel-text': '#171717',
      '--blakfy-a11y-panel-muted': '#525252',
      '--blakfy-a11y-panel-border': '#e5e5e5',
      '--blakfy-a11y-panel-bg-dark': '#0a0a0a',
      '--blakfy-a11y-panel-text-dark': '#fafafa',
      '--blakfy-a11y-panel-muted-dark': '#a3a3a3',
      '--blakfy-a11y-panel-border-dark': '#262626',
      '--blakfy-a11y-toggle-on': '#171717',
      '--blakfy-a11y-toggle-off': '#d4d4d4',
      '--blakfy-a11y-focus-ring': '#2563eb',
      '--blakfy-a11y-fab-size': '48px',
    };
    for (const [name, value] of Object.entries(expected)) {
      const re = new RegExp(`${name.replace(/-/g, '\\-')}\\s*:\\s*([^;]+);`);
      const m = cssText.match(re);
      expect(m![1].trim()).toBe(value);
    }
  });
});
