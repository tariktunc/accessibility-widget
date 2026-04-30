// Public API contract — STABLE-API.md §1.
// `window.BlakfyA11y` must expose exactly the locked surface: 8 methods +
// `version`. Any drift (added or removed key) fails this snapshot.
import { describe, it, expect, beforeAll } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi, LOCKED_API_KEYS } from './_helpers';

describe('Public API contract (STABLE-API §1)', () => {
  beforeAll(async () => {
    resetWidgetState();
    loadIIFE();
    await waitForApi();
  });

  it('window.BlakfyA11y is defined', () => {
    expect(window.BlakfyA11y).toBeDefined();
  });

  it('exposes the 8 locked methods with correct types', () => {
    const api = window.BlakfyA11y!;
    expect(typeof api.open).toBe('function');
    expect(typeof api.close).toBe('function');
    expect(typeof api.getPreferences).toBe('function');
    expect(typeof api.setPreferences).toBe('function');
    expect(typeof api.reset).toBe('function');
    expect(typeof api.onChange).toBe('function');
    expect(typeof api.configure).toBe('function');
    expect(typeof api.diagnostics).toBe('function');
  });

  it('exposes `version` as a string', () => {
    const api = window.BlakfyA11y!;
    expect(typeof api.version).toBe('string');
    expect(api.version.length).toBeGreaterThan(0);
  });

  it('snapshot of API keys (locked surface — drift = potential breaking change)', () => {
    const keys = Object.keys(window.BlakfyA11y!).sort();
    expect(keys).toEqual([...LOCKED_API_KEYS]);
  });

  it('getPreferences() returns the locked Preferences shape', () => {
    const p = window.BlakfyA11y!.getPreferences();
    expect(p).toMatchObject({
      fontScale: expect.any(Number),
      contrast: expect.any(String),
      focusRing: expect.any(Boolean),
      linkUnderline: expect.any(Boolean),
      motion: expect.any(String),
      dyslexiaFont: expect.any(Boolean),
      readingMode: expect.any(Boolean),
    });
    // Locked enums
    expect([100, 110, 125]).toContain(p.fontScale);
    expect(['normal', 'high']).toContain(p.contrast);
    expect(['auto', 'reduce']).toContain(p.motion);
  });

  it('onChange() returns an unsubscribe function', () => {
    const off = window.BlakfyA11y!.onChange(() => undefined);
    expect(typeof off).toBe('function');
    off();
  });

  it('diagnostics() returns the locked DiagnosticsSnapshot shape', () => {
    const snap = window.BlakfyA11y!.diagnostics();
    expect(snap).toMatchObject({
      version: expect.any(String),
      locale: expect.any(String),
      theme: expect.any(String),
      storage: {
        version: expect.any(String),
        migratedFrom: null,
        keysFound: expect.any(Array),
      },
      osPreferences: {
        reducedMotion: expect.any(Boolean),
        contrast: expect.any(String),
        colorScheme: expect.any(String),
      },
      performance: {
        mountTimeMs: expect.any(Number),
        bundleSizeGz: expect.any(Number),
      },
      issues: expect.any(Array),
      config: expect.any(Object),
      timestamp: expect.any(String),
    });
  });
});
