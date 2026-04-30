// HTML data-attributes contract — STABLE-API.md §3.
//
// On mount, the widget mirrors all 7 locked Preferences onto `<html>`
// using the documented value strings. We exercise each preference value
// by pre-seeding localStorage and triggering a fresh mount.
//
// `window.BlakfyA11y.setPreferences()` (and `reset()`) ALSO writes the
// data-a11y-* attributes via core's setPreferences calling
// applyPreferences — see STABLE-API §1.1 ("...persiste eder, uygular").
import { describe, it, expect } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi, LOCKED_HTML_ATTRS } from './_helpers';

const KEY = 'blakfy_a11y_prefs';

async function remountWith(prefs: Record<string, unknown>): Promise<void> {
  resetWidgetState();
  const record = {
    prefs: {
      fontScale: 100,
      contrast: 'normal',
      focusRing: false,
      linkUnderline: false,
      motion: 'auto',
      dyslexiaFont: false,
      readingMode: false,
      ...prefs,
    },
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    locale: 'en',
  };
  window.localStorage.setItem(KEY, JSON.stringify(record));
  loadIIFE();
  await waitForApi();
}

describe('HTML data-attributes contract (STABLE-API §3)', () => {
  it('locked attribute list (snapshot)', () => {
    expect([...LOCKED_HTML_ATTRS]).toEqual([
      'data-a11y-fontscale',
      'data-a11y-contrast',
      'data-a11y-focus',
      'data-a11y-links',
      'data-a11y-motion',
      'data-a11y-dyslexia',
      'data-a11y-reading',
    ]);
  });

  it('default values are written after mount', async () => {
    await remountWith({});
    const html = document.documentElement;
    expect(html.getAttribute('data-a11y-fontscale')).toBe('100');
    expect(html.getAttribute('data-a11y-contrast')).toBe('normal');
    expect(html.getAttribute('data-a11y-focus')).toBe('default');
    expect(html.getAttribute('data-a11y-links')).toBe('default');
    expect(html.getAttribute('data-a11y-motion')).toBe('auto');
    expect(html.getAttribute('data-a11y-dyslexia')).toBe('false');
    expect(html.getAttribute('data-a11y-reading')).toBe('false');
  });

  it('fontScale → data-a11y-fontscale ("100" | "110" | "125")', async () => {
    await remountWith({ fontScale: 110 });
    expect(document.documentElement.getAttribute('data-a11y-fontscale')).toBe('110');
    await remountWith({ fontScale: 125 });
    expect(document.documentElement.getAttribute('data-a11y-fontscale')).toBe('125');
  });

  it('contrast → data-a11y-contrast ("normal" | "high")', async () => {
    await remountWith({ contrast: 'high' });
    expect(document.documentElement.getAttribute('data-a11y-contrast')).toBe('high');
  });

  it('focusRing → data-a11y-focus ("default" | "enhanced")', async () => {
    await remountWith({ focusRing: true });
    expect(document.documentElement.getAttribute('data-a11y-focus')).toBe('enhanced');
    await remountWith({ focusRing: false });
    expect(document.documentElement.getAttribute('data-a11y-focus')).toBe('default');
  });

  it('linkUnderline → data-a11y-links ("default" | "underline")', async () => {
    await remountWith({ linkUnderline: true });
    expect(document.documentElement.getAttribute('data-a11y-links')).toBe('underline');
  });

  it('motion → data-a11y-motion ("auto" | "reduce")', async () => {
    await remountWith({ motion: 'reduce' });
    expect(document.documentElement.getAttribute('data-a11y-motion')).toBe('reduce');
  });

  it('dyslexiaFont → data-a11y-dyslexia ("true" | "false")', async () => {
    await remountWith({ dyslexiaFont: true });
    expect(document.documentElement.getAttribute('data-a11y-dyslexia')).toBe('true');
  });

  it('readingMode → data-a11y-reading ("true" | "false")', async () => {
    await remountWith({ readingMode: true });
    expect(document.documentElement.getAttribute('data-a11y-reading')).toBe('true');
  });

  it('programmatic setPreferences() applies attributes to <html> (STABLE-API §1.1)', async () => {
    await remountWith({});
    const api = (window as unknown as {
      BlakfyA11y: {
        setPreferences: (p: Record<string, unknown>) => void;
        reset: () => void;
      };
    }).BlakfyA11y;
    api.setPreferences({ fontScale: 125, contrast: 'high', dyslexiaFont: true });
    expect(document.documentElement.getAttribute('data-a11y-fontscale')).toBe('125');
    expect(document.documentElement.getAttribute('data-a11y-contrast')).toBe('high');
    expect(document.documentElement.getAttribute('data-a11y-dyslexia')).toBe('true');
  });

  it('programmatic reset() restores default attributes on <html> (STABLE-API §1.1)', async () => {
    await remountWith({ fontScale: 125, contrast: 'high', dyslexiaFont: true });
    const api = (window as unknown as {
      BlakfyA11y: { reset: () => void };
    }).BlakfyA11y;
    api.reset();
    expect(document.documentElement.getAttribute('data-a11y-fontscale')).toBe('100');
    expect(document.documentElement.getAttribute('data-a11y-contrast')).toBe('normal');
    expect(document.documentElement.getAttribute('data-a11y-dyslexia')).toBe('false');
  });
});
