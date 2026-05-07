// @blakfy/accessibility-widget — diagnostics-integration.test.ts
//
// Boot-time diagnostics integration coverage for ADR-005 / Phase 5.
// Exercises the full mount() pipeline plus the public diagnostics() snapshot.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  _resetDiagnostics,
  addIssue,
  getDiagnostics,
  getIssues,
  getMode,
  type WidgetOptions,
} from '@blakfy/a11y-core';
import { mount, _getActiveUnmount } from '../src/mount';

const baseConfig: WidgetOptions = {
  locale: 'en',
  theme: 'auto',
  position: 'bottom-left',
  font: '',
  debug: false,
};

function _resetWindowState(): void {
  if (typeof window === 'undefined') return;
  // Strip URL search
  if (window.history) {
    window.history.replaceState(null, '', '/');
  }
  // Clear cookies
  if (typeof document !== 'undefined') {
    document.cookie = 'blakfy_a11y_prefs=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  // Clear localStorage
  try {
    window.localStorage.removeItem('blakfy_a11y_prefs');
  } catch {
    /* ignore */
  }
  // Drop tagged scripts
  document.querySelectorAll('script[data-debug="true"]').forEach((n) => n.remove());
  document.querySelectorAll('script[data-version]').forEach((n) => n.remove());
  // Drop OpenDyslexic CDN links
  document.querySelectorAll('link[href*="open-dyslexic"]').forEach((n) => n.remove());
  // Strip data-a11y-* attrs added by previous mounts
  const html = document.documentElement;
  for (const a of Array.from(html.attributes)) {
    if (a.name.startsWith('data-a11y-')) html.removeAttribute(a.name);
  }
  // Tear down any prior mount
  const off = _getActiveUnmount();
  if (off) off();
  // Drop any leftover host element
  document.querySelectorAll('blakfy-a11y-root').forEach((n) => n.remove());
}

describe('Diagnostics integration', () => {
  beforeEach(() => {
    _resetDiagnostics();
    _resetWindowState();
  });

  afterEach(() => {
    _resetWindowState();
    _resetDiagnostics();
  });

  it('emits OS_PREFERS_* for matching media queries', () => {
    const mqMock = (q: string): MediaQueryList =>
      ({
        matches:
          q === '(prefers-reduced-motion: reduce)' || q === '(prefers-color-scheme: dark)',
        media: q,
        onchange: null,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        addListener: () => undefined,
        removeListener: () => undefined,
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList;
    const original = window.matchMedia;
    window.matchMedia = mqMock as unknown as typeof window.matchMedia;
    // Force verbose so info-level OS_* lands in console (still not persisted),
    // but we can still observe via getMode + the real signal-detection branch.
    window.history.replaceState(null, '', '/?a11y-debug=1');

    const infoSpy = vi.spyOn(console, 'info').mockImplementation(() => undefined);
    try {
      mount();
      const lines = infoSpy.mock.calls.map((c) => String(c[0] ?? ''));
      expect(lines.some((l) => l.includes('OS_PREFERS_REDUCED_MOTION') || l.includes('reduced-motion'))).toBe(true);
      expect(lines.some((l) => l.includes('OS_PREFERS_COLOR_SCHEME_DARK') || l.includes('color-scheme=dark'))).toBe(true);
    } finally {
      infoSpy.mockRestore();
      window.matchMedia = original;
    }
  });

  it('emits STORAGE_PARSE_ERROR on corrupt cookie', () => {
    document.cookie = 'blakfy_a11y_prefs=NOT_VALID_JSON; path=/';
    // Suppress console.error from the print path
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      mount();
      const codes = getIssues().map((i) => i.code);
      expect(codes).toContain('STORAGE_PARSE_ERROR');
    } finally {
      errSpy.mockRestore();
    }
  });

  it('respects 50-issue FIFO limit', () => {
    for (let i = 0; i < 51; i++) {
      addIssue('warn', 'OPENDYSLEXIC_CDN_MISSING', `cdn-${i}`);
    }
    const issues = getIssues();
    expect(issues.length).toBe(50);
    // The oldest (cdn-0) should have been evicted.
    expect(issues[0]?.msg).toBe('cdn-1');
    expect(issues[49]?.msg).toBe('cdn-50');
  });

  it('getMode returns verbose when ?a11y-debug=1', () => {
    window.history.replaceState(null, '', '/?a11y-debug=1');
    expect(getMode()).toBe('verbose');
  });

  it('diagnostics() returns full snapshot shape', () => {
    addIssue('warn', 'HOST_CSS_IMPORTANT_CONFLICT', 'sample');
    const snap = getDiagnostics({
      config: baseConfig,
      performance: { mountTimeMs: 7, bundleSizeGz: 17834, timeToFirstClick: null },
      storage: { version: '1.0.0', migratedFrom: null, keysFound: ['localStorage'] },
    });
    expect(snap).toHaveProperty('version');
    expect(typeof snap.version).toBe('string');
    expect(snap).toHaveProperty('locale', 'en');
    expect(snap).toHaveProperty('theme', 'auto');
    expect(snap).toHaveProperty('storage.version', '1.0.0');
    expect(snap).toHaveProperty('storage.migratedFrom', null);
    expect(Array.isArray(snap.storage.keysFound)).toBe(true);
    expect(snap).toHaveProperty('osPreferences.reducedMotion');
    expect(snap).toHaveProperty('osPreferences.contrast');
    expect(snap).toHaveProperty('osPreferences.colorScheme');
    expect(snap).toHaveProperty('performance.mountTimeMs', 7);
    expect(snap).toHaveProperty('performance.bundleSizeGz', 17834);
    expect(snap).toHaveProperty('performance.timeToFirstClick', null);
    expect(Array.isArray(snap.issues)).toBe(true);
    expect(snap.issues[0]?.code).toBe('HOST_CSS_IMPORTANT_CONFLICT');
    expect(snap).toHaveProperty('config');
    expect(typeof snap.timestamp).toBe('string');
  });

  it('emits CDN_VERSION_MISMATCH when script data-version disagrees with runtime', () => {
    const s = document.createElement('script');
    s.setAttribute('data-version', '99.99.99');
    s.setAttribute('src', 'https://cdn.example/blakfy-accessibility-widget.js');
    document.head.appendChild(s);
    const errSpy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    try {
      mount();
      const codes = getIssues().map((i) => i.code);
      expect(codes).toContain('CDN_VERSION_MISMATCH');
    } finally {
      errSpy.mockRestore();
    }
  });
});
