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
        "--blakfy-a11y-card-bg",
        "--blakfy-a11y-divider",
        "--blakfy-a11y-fab-size",
        "--blakfy-a11y-focus-ring",
        "--blakfy-a11y-panel-bg",
        "--blakfy-a11y-panel-border",
        "--blakfy-a11y-panel-muted",
        "--blakfy-a11y-panel-text",
        "--blakfy-a11y-primary",
        "--blakfy-a11y-primary-hover",
        "--blakfy-a11y-primary-text",
        "--blakfy-a11y-radius",
        "--blakfy-a11y-radius-pill",
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
      '--blakfy-a11y-primary': '#000000',
      '--blakfy-a11y-primary-hover': '#262626',
      '--blakfy-a11y-primary-text': '#ffffff',
      '--blakfy-a11y-panel-bg': '#ffffff',
      '--blakfy-a11y-panel-text': '#1c1c2e',
      '--blakfy-a11y-panel-muted': 'rgba(28, 28, 46, 0.45)',
      '--blakfy-a11y-panel-border': 'rgba(0, 0, 0, 0.08)',
      '--blakfy-a11y-toggle-on': '#000000',
      '--blakfy-a11y-toggle-off': '#d0d0d0',
      '--blakfy-a11y-focus-ring': '#000000',
      '--blakfy-a11y-fab-size': '40px',
      '--blakfy-a11y-radius': '3px',
      '--blakfy-a11y-radius-pill': '9999px',
      '--blakfy-a11y-card-bg': '#f5f5f5',
      '--blakfy-a11y-divider': 'rgba(0, 0, 0, 0.07)',
    };
    for (const [name, value] of Object.entries(expected)) {
      const re = new RegExp(`${name.replace(/-/g, '\\-')}\\s*:\\s*([^;]+);`);
      const m = cssText.match(re);
      expect(m![1].trim()).toBe(value);
    }
  });
});
