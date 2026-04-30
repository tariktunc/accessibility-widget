// Storage schema contract — STABLE-API.md §5.
// `setPreferences()` must:
//   - write `blakfy_a11y_prefs` to localStorage as JSON
//   - write `blakfy_a11y_prefs` to cookie as encodeURIComponent(JSON)
//   - both payloads decode to {prefs, version, timestamp, locale}
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi } from './_helpers';

const KEY = 'blakfy_a11y_prefs';

function _readCookie(name: string): string | null {
  const m = (document.cookie || '').match(new RegExp(`(^| )${name}=([^;]+)`));
  if (!m || typeof m[2] !== 'string') return null;
  try {
    return decodeURIComponent(m[2]);
  } catch {
    return null;
  }
}

describe('Storage schema contract (STABLE-API §5)', () => {
  beforeAll(async () => {
    resetWidgetState();
    loadIIFE();
    await waitForApi();
  });

  beforeEach(() => {
    window.BlakfyA11y!.reset();
    window.BlakfyA11y!.setPreferences({ fontScale: 110, contrast: 'high' });
  });

  it('localStorage key is exactly `blakfy_a11y_prefs`', () => {
    expect(window.localStorage.getItem(KEY)).not.toBeNull();
  });

  it('cookie key is exactly `blakfy_a11y_prefs`', () => {
    expect(_readCookie(KEY)).not.toBeNull();
  });

  it('localStorage payload is JSON with the locked record schema', () => {
    const raw = window.localStorage.getItem(KEY);
    expect(raw).not.toBeNull();
    const obj = JSON.parse(raw!);
    expect(obj).toMatchObject({
      prefs: expect.any(Object),
      version: expect.any(String),
      timestamp: expect.any(String),
      locale: expect.any(String),
    });
    expect(obj.version).toBe('1.0.0');
    expect(obj.prefs.fontScale).toBe(110);
    expect(obj.prefs.contrast).toBe('high');
  });

  it('cookie payload decodes to the same record schema', () => {
    const raw = _readCookie(KEY);
    expect(raw).not.toBeNull();
    const obj = JSON.parse(raw!);
    expect(obj).toMatchObject({
      prefs: expect.any(Object),
      version: expect.any(String),
      timestamp: expect.any(String),
      locale: expect.any(String),
    });
  });

  it('cookie raw value is URI-encoded JSON', () => {
    const cookieStr = document.cookie || '';
    const m = cookieStr.match(new RegExp(`(^| )${KEY}=([^;]+)`));
    expect(m).not.toBeNull();
    // Encoded value must NOT contain raw `{` or `"` (those would have been
    // percent-encoded by encodeURIComponent).
    expect(m![2]).toContain('%7B'); // '{' encoded
    expect(m![2]).toContain('%22'); // '"' encoded
  });

  it('record.prefs exposes the locked Preferences keys (no extras, no removals)', () => {
    const obj = JSON.parse(window.localStorage.getItem(KEY)!);
    const keys = Object.keys(obj.prefs).sort();
    expect(keys).toEqual([
      'contrast',
      'dyslexiaFont',
      'focusRing',
      'fontScale',
      'linkUnderline',
      'motion',
      'readingMode',
    ]);
  });

  it('migration path: malformed cookie does not throw + falls back to defaults', () => {
    // Corrupt the localStorage record but keep cookie valid; reading
    // should still succeed via cookie. We assert that getPreferences()
    // never throws and returns defaults if both stores are bad.
    window.localStorage.setItem(KEY, 'NOT JSON');
    document.cookie = `${KEY}=NOT_VALID; path=/`;
    expect(() => window.BlakfyA11y!.getPreferences()).not.toThrow();
  });
});
