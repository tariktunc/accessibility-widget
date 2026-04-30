// @blakfy/accessibility-widget-next — cookie-parser.test.ts
//
// Pure-function unit tests for `parseServerCookie`. Verifies that every
// pathological input falls back to defaults and that valid records map to
// the locked `data-a11y-*` attribute strings (STABLE-API.md §3).

import { describe, expect, it } from 'vitest';
import { parseServerCookie } from '../src/cookie-parser';

const DEFAULT_ATTRS = {
  'data-a11y-fontscale': '100',
  'data-a11y-contrast': 'normal',
  'data-a11y-focus': 'default',
  'data-a11y-links': 'default',
  'data-a11y-motion': 'auto',
  'data-a11y-dyslexia': 'false',
  'data-a11y-reading': 'false',
};

function buildCookie(prefs: unknown): string {
  const record = {
    prefs,
    version: '1.0.0',
    timestamp: '2026-04-30T00:00:00.000Z',
    locale: 'tr',
  };
  return encodeURIComponent(JSON.stringify(record));
}

describe('parseServerCookie', () => {
  it('returns defaults when cookie is undefined', () => {
    expect(parseServerCookie(undefined)).toEqual(DEFAULT_ATTRS);
  });

  it('returns defaults when cookie is empty string', () => {
    expect(parseServerCookie('')).toEqual(DEFAULT_ATTRS);
  });

  it('maps a fully-populated valid cookie to locked attr strings', () => {
    const cookie = buildCookie({
      fontScale: 125,
      contrast: 'high',
      focusRing: true,
      linkUnderline: true,
      motion: 'reduce',
      dyslexiaFont: true,
      readingMode: true,
    });

    expect(parseServerCookie(cookie)).toEqual({
      'data-a11y-fontscale': '125',
      'data-a11y-contrast': 'high',
      'data-a11y-focus': 'enhanced',
      'data-a11y-links': 'underline',
      'data-a11y-motion': 'reduce',
      'data-a11y-dyslexia': 'true',
      'data-a11y-reading': 'true',
    });
  });

  it('returns defaults when cookie contains invalid JSON', () => {
    expect(parseServerCookie('not-json-at-all')).toEqual(DEFAULT_ATTRS);
    expect(parseServerCookie('{broken')).toEqual(DEFAULT_ATTRS);
  });

  it('does not throw on malformed input', () => {
    expect(() => parseServerCookie('%E0%A4%A')).not.toThrow();
    expect(() => parseServerCookie('{"prefs":null}')).not.toThrow();
    expect(() => parseServerCookie('[]')).not.toThrow();
  });

  it('fills missing fields with defaults when prefs is partial', () => {
    const cookie = buildCookie({ fontScale: 110, contrast: 'high' });
    expect(parseServerCookie(cookie)).toEqual({
      ...DEFAULT_ATTRS,
      'data-a11y-fontscale': '110',
      'data-a11y-contrast': 'high',
    });
  });

  it('falls back safely when nested prefs is malformed', () => {
    const cookie = encodeURIComponent(
      JSON.stringify({ prefs: 'not-an-object', version: '1.0.0' }),
    );
    expect(parseServerCookie(cookie)).toEqual(DEFAULT_ATTRS);
  });

  it('falls back to defaults when prefs is missing entirely', () => {
    const cookie = encodeURIComponent(
      JSON.stringify({ version: '1.0.0', locale: 'tr' }),
    );
    expect(parseServerCookie(cookie)).toEqual(DEFAULT_ATTRS);
  });

  it('rejects out-of-range fontScale and substitutes the default', () => {
    const cookie = buildCookie({ fontScale: 150, contrast: 'high' });
    const out = parseServerCookie(cookie);
    expect(out['data-a11y-fontscale']).toBe('100');
    expect(out['data-a11y-contrast']).toBe('high');
  });

  it('rejects unknown enum values for contrast and motion', () => {
    const cookie = buildCookie({ contrast: 'inverted', motion: 'fast' });
    const out = parseServerCookie(cookie);
    expect(out['data-a11y-contrast']).toBe('normal');
    expect(out['data-a11y-motion']).toBe('auto');
  });

  it('rejects non-boolean toggle fields', () => {
    const cookie = buildCookie({
      focusRing: 'yes',
      linkUnderline: 1,
      dyslexiaFont: null,
      readingMode: undefined,
    });
    const out = parseServerCookie(cookie);
    expect(out['data-a11y-focus']).toBe('default');
    expect(out['data-a11y-links']).toBe('default');
    expect(out['data-a11y-dyslexia']).toBe('false');
    expect(out['data-a11y-reading']).toBe('false');
  });

  it('parses URL-encoded JSON cookie values produced by the browser write path', () => {
    // Mimic what `_setCookie` writes in core/preferences.ts: encodeURIComponent of JSON.
    const raw = JSON.stringify({
      prefs: {
        fontScale: 110,
        contrast: 'normal',
        focusRing: true,
        linkUnderline: false,
        motion: 'reduce',
        dyslexiaFont: false,
        readingMode: false,
      },
      version: '1.0.0',
      timestamp: '2026-04-30T12:00:00.000Z',
      locale: 'en',
    });
    const cookie = encodeURIComponent(raw);
    expect(parseServerCookie(cookie)).toEqual({
      'data-a11y-fontscale': '110',
      'data-a11y-contrast': 'normal',
      'data-a11y-focus': 'enhanced',
      'data-a11y-links': 'default',
      'data-a11y-motion': 'reduce',
      'data-a11y-dyslexia': 'false',
      'data-a11y-reading': 'false',
    });
  });
});
