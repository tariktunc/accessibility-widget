// window.__BLAKFY_A11Y__ contract — STABLE-API.md §8.
// Globally pre-set config is read at mount time. To test this we must
// re-mount with a fresh global. The IIFE installs `window.BlakfyA11y`
// after reading window.__BLAKFY_A11Y__, so the test:
//   1. resets state
//   2. assigns window.__BLAKFY_A11Y__ = { locale: 'de', theme: 'dark' }
//   3. loads the IIFE again — auto-mount picks up the global
//   4. asserts the active config reflects the global
import { describe, it, expect, beforeAll } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi } from './_helpers';

describe('window.__BLAKFY_A11Y__ contract (STABLE-API §8)', () => {
  beforeAll(async () => {
    resetWidgetState();
    // @ts-expect-error — installing the global pre-mount
    window.__BLAKFY_A11Y__ = { locale: 'de', theme: 'dark', position: 'top-right' };
    loadIIFE();
    await waitForApi();
  });

  it('config from window.__BLAKFY_A11Y__ wins over defaults', () => {
    const snap = window.BlakfyA11y!.diagnostics();
    expect(snap.config.locale).toBe('de');
    expect(snap.config.theme).toBe('dark');
    expect(snap.config.position).toBe('top-right');
  });

  it('host element receives the resolved attributes from the global', () => {
    const host = document.querySelector('blakfy-a11y-root');
    expect(host).not.toBeNull();
    expect((host as HTMLElement).getAttribute('data-position')).toBe('top-right');
    expect((host as HTMLElement).getAttribute('data-theme')).toBe('dark');
  });
});
