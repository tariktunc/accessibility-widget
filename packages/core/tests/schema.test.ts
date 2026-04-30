// @blakfy/a11y-core — schema.test.ts
import { describe, it, expect } from 'vitest';
import { safeMergePrefs, safeParseRecord } from '../src/schema';
import { DEFAULT_PREFS, STORAGE_VERSION } from '../src/types';

describe('safeMergePrefs', () => {
  it('parses a fully valid Preferences object', () => {
    const valid = {
      fontScale: 110 as const,
      contrast: 'high' as const,
      focusRing: true,
      linkUnderline: true,
      motion: 'reduce' as const,
      dyslexiaFont: true,
      readingMode: true,
    };
    const parsed = safeMergePrefs(valid);
    expect(parsed).toEqual(valid);
  });

  it('falls back to default for invalid fontScale', () => {
    const result = safeMergePrefs({ ...DEFAULT_PREFS, fontScale: 999 });
    expect(result.fontScale).toBe(100);
  });

  it('fills missing fields from defaults', () => {
    const result = safeMergePrefs({});
    expect(result).toEqual(DEFAULT_PREFS);
  });

  it('falls back when contrast is unknown', () => {
    const result = safeMergePrefs({ contrast: 'mega' });
    expect(result.contrast).toBe('normal');
  });

  it('safeMergePrefs returns defaults for non-object input', () => {
    expect(safeMergePrefs(null)).toEqual(DEFAULT_PREFS);
    expect(safeMergePrefs('string')).toEqual(DEFAULT_PREFS);
    expect(safeMergePrefs(42)).toEqual(DEFAULT_PREFS);
  });
});

describe('safeParseRecord', () => {
  it('parses a full record', () => {
    const record = {
      prefs: DEFAULT_PREFS,
      version: STORAGE_VERSION,
      timestamp: '2026-04-30T00:00:00.000Z',
      locale: 'tr',
    };
    const parsed = safeParseRecord(record);
    expect(parsed).not.toBeNull();
    expect(parsed?.locale).toBe('tr');
    expect(parsed?.version).toBe(STORAGE_VERSION);
  });

  it('safeParseRecord returns null for non-object input', () => {
    expect(safeParseRecord(null)).toBeNull();
    expect(safeParseRecord(undefined)).toBeNull();
    expect(safeParseRecord('not an object')).toBeNull();
  });

  it('salvages a partially-bad record via per-field guards', () => {
    const result = safeParseRecord({
      prefs: { fontScale: 999, contrast: 'normal' },
      version: 'whatever',
      timestamp: '2026-04-30',
      locale: 'tr',
    });
    expect(result).not.toBeNull();
    expect(result?.prefs.fontScale).toBe(100);
  });
});
