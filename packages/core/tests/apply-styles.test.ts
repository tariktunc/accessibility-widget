// @blakfy/a11y-core — apply-styles.test.ts
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { applyAutoplayControl, applyOSPreferences, applyPreferences, detectOSPreferences } from '../src/apply-styles';
import { DEFAULT_PREFS, type Preferences } from '../src/types';

beforeEach(() => {
  const html = document.documentElement;
  html.removeAttribute('data-a11y-fontscale');
  html.removeAttribute('data-a11y-contrast');
  html.removeAttribute('data-a11y-focus');
  html.removeAttribute('data-a11y-links');
  html.removeAttribute('data-a11y-motion');
  html.removeAttribute('data-a11y-dyslexia');
  html.removeAttribute('data-a11y-reading');
});

describe('applyPreferences — lineHeight selector (#14)', () => {
  it('covers headings, links, labels and table cells for medium/large', () => {
    applyPreferences({ ...DEFAULT_PREFS, lineHeight: 'large' });
    const css = document.getElementById('blakfy-a11y-host')?.textContent ?? '';
    expect(css).toContain('line-height: 2.4 !important');
    for (const sel of [
      'html h1',
      'html h2',
      'html h3',
      'html h4',
      'html h5',
      'html h6',
      'html a',
      'html label',
      'html td',
      'html th',
      'html p',
      'html li',
      'html dd',
      'html dt',
      'html span',
      'html div',
    ]) {
      expect(css).toContain(sel);
    }
  });

  it('does not touch textAlign selector/logic', () => {
    applyPreferences({ ...DEFAULT_PREFS, lineHeight: 'large', textAlign: 'center' });
    const css = document.getElementById('blakfy-a11y-host')?.textContent ?? '';
    expect(css).toContain('text-align: center !important');
  });
});

describe('applyPreferences', () => {
  it('writes all 7 data-attrs with default contract strings', () => {
    applyPreferences(DEFAULT_PREFS);
    const html = document.documentElement;
    expect(html.getAttribute('data-a11y-fontscale')).toBe('100');
    expect(html.getAttribute('data-a11y-contrast')).toBe('normal');
    expect(html.getAttribute('data-a11y-focus')).toBe('default');
    expect(html.getAttribute('data-a11y-links')).toBe('default');
    expect(html.getAttribute('data-a11y-motion')).toBe('auto');
    expect(html.getAttribute('data-a11y-dyslexia')).toBe('false');
    expect(html.getAttribute('data-a11y-reading')).toBe('false');
  });

  it('writes "enhanced"/"underline" when toggles are on', () => {
    const prefs: Preferences = {
      fontScale: 125,
      contrast: 'high',
      focusRing: true,
      linkUnderline: true,
      motion: 'reduce',
      dyslexiaFont: true,
      readingMode: true,
    };
    applyPreferences(prefs);
    const html = document.documentElement;
    expect(html.getAttribute('data-a11y-fontscale')).toBe('125');
    expect(html.getAttribute('data-a11y-contrast')).toBe('high');
    expect(html.getAttribute('data-a11y-focus')).toBe('enhanced');
    expect(html.getAttribute('data-a11y-links')).toBe('underline');
    expect(html.getAttribute('data-a11y-motion')).toBe('reduce');
    expect(html.getAttribute('data-a11y-dyslexia')).toBe('true');
    expect(html.getAttribute('data-a11y-reading')).toBe('true');
  });
});

describe('applyAutoplayControl (#31)', () => {
  afterEach(() => {
    applyAutoplayControl(false);
    document.body.innerHTML = '';
  });

  it('removes the autoplay attribute from existing <video>/<audio> elements when enabled', () => {
    document.body.innerHTML = '<video autoplay></video><audio autoplay></audio>';
    applyAutoplayControl(true);
    expect(document.querySelector('video')?.hasAttribute('autoplay')).toBe(false);
    expect(document.querySelector('audio')?.hasAttribute('autoplay')).toBe(false);
  });

  it('catches dynamically-added autoplay media via MutationObserver', async () => {
    applyAutoplayControl(true);
    const video = document.createElement('video');
    video.setAttribute('autoplay', '');
    document.body.appendChild(video);
    await new Promise((r) => setTimeout(r, 0));
    expect(video.hasAttribute('autoplay')).toBe(false);
  });

  it('does not throw when disabled then re-enabled repeatedly (no observer leak)', () => {
    expect(() => {
      applyAutoplayControl(true);
      applyAutoplayControl(true);
      applyAutoplayControl(false);
      applyAutoplayControl(true);
      applyAutoplayControl(false);
    }).not.toThrow();
  });

  it('is a no-op with no media elements present', () => {
    expect(() => applyAutoplayControl(true)).not.toThrow();
  });
});

describe('detectOSPreferences', () => {
  it('returns a valid shape', () => {
    const os = detectOSPreferences();
    expect(typeof os.reducedMotion).toBe('boolean');
    expect(['normal', 'more', 'less']).toContain(os.contrast);
    expect(['light', 'dark', 'no-preference']).toContain(os.colorScheme);
  });
});

describe('detectOSPreferences — reduced-transparency and reduced-data', () => {
  const original = window.matchMedia;

  afterEach(() => {
    window.matchMedia = original;
  });

  it('reads both signals from matchMedia', () => {
    window.matchMedia = ((q: string) =>
      ({
        matches:
          q === '(prefers-reduced-transparency: reduce)' || q === '(prefers-reduced-data: reduce)',
      }) as MediaQueryList) as unknown as typeof window.matchMedia;
    const os = detectOSPreferences();
    expect(os.reducedTransparency).toBe(true);
    expect(os.reducedData).toBe(true);
  });

  it('leaves both false when the engine does not know the queries', () => {
    window.matchMedia = ((_q: string) =>
      ({ matches: false }) as MediaQueryList) as unknown as typeof window.matchMedia;
    const os = detectOSPreferences();
    expect(os.reducedTransparency).toBe(false);
    expect(os.reducedData).toBe(false);
  });

  it('survives matchMedia throwing on an unsupported query', () => {
    window.matchMedia = (() => {
      throw new Error('unsupported media query');
    }) as unknown as typeof window.matchMedia;
    const os = detectOSPreferences();
    expect(os.reducedTransparency).toBe(false);
    expect(os.reducedData).toBe(false);
    expect(os.reducedMotion).toBe(false);
  });
});

describe('applyOSPreferences', () => {
  it('writes the two OS signals onto <html> for host stylesheets', () => {
    applyOSPreferences({
      reducedMotion: false,
      contrast: 'normal',
      colorScheme: 'no-preference',
      reducedTransparency: true,
      reducedData: true,
    });
    const html = document.documentElement;
    expect(html.getAttribute('data-a11y-reduced-transparency')).toBe('true');
    expect(html.getAttribute('data-a11y-reduced-data')).toBe('true');
    applyOSPreferences({
      reducedMotion: false,
      contrast: 'normal',
      colorScheme: 'no-preference',
      reducedTransparency: false,
      reducedData: false,
    });
    expect(html.getAttribute('data-a11y-reduced-transparency')).toBe('false');
    expect(html.getAttribute('data-a11y-reduced-data')).toBe('false');
  });
});
