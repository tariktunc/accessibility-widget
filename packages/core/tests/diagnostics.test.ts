// @blakfy/a11y-core — diagnostics.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  addIssue,
  getIssues,
  getMode,
  getDiagnostics,
  setDevPipe,
  _resetDiagnostics,
} from '../src/diagnostics';
import type { WidgetOptions } from '../src/types';

const baseConfig: WidgetOptions = {
  locale: 'en',
  theme: 'auto',
  position: 'bottom-left',
  font: '',
  debug: false,
};

beforeEach(() => {
  _resetDiagnostics();
  // Strip query string between tests
  if (typeof window !== 'undefined' && window.history) {
    window.history.replaceState(null, '', '/');
  }
  // Remove debug script tags between tests
  document.querySelectorAll('script[data-debug="true"]').forEach((n) => n.remove());
});

describe('diagnostics issues buffer', () => {
  it('persists warn and error, ignores info in silent mode', () => {
    addIssue('info', 'INITIALIZED', 'mounted');
    addIssue('warn', 'OPENDYSLEXIC_CDN_MISSING', 'cdn missing');
    addIssue('error', 'STORAGE_PARSE_ERROR', 'bad json');
    const issues = getIssues();
    expect(issues.map((i) => i.level)).toEqual(['warn', 'error']);
  });

  it('FIFO caps at 50 issues', () => {
    for (let i = 0; i < 60; i++) {
      addIssue('warn', 'STORAGE_PARSE_ERROR', `msg-${i}`);
    }
    const issues = getIssues();
    expect(issues.length).toBe(50);
    expect(issues[0]?.msg).toBe('msg-10');
    expect(issues[49]?.msg).toBe('msg-59');
  });
});

describe('getMode', () => {
  it('returns verbose when ?a11y-debug=1', () => {
    window.history.replaceState(null, '', '/?a11y-debug=1');
    expect(getMode()).toBe('verbose');
  });

  it('returns verbose when script[data-debug="true"] is present', () => {
    window.history.replaceState(null, '', '/');
    const s = document.createElement('script');
    s.setAttribute('data-debug', 'true');
    document.body.appendChild(s);
    expect(getMode()).toBe('verbose');
  });
});

describe('getDiagnostics snapshot', () => {
  it('returns a complete shape', () => {
    addIssue('warn', 'OPENDYSLEXIC_CDN_MISSING', 'cdn missing');
    const snap = getDiagnostics({
      config: baseConfig,
      performance: { mountTimeMs: 12, bundleSizeGz: 17834, timeToFirstClick: null },
      storage: { version: '1.0.0', migratedFrom: null, keysFound: ['localStorage'] },
    });
    expect(snap.locale).toBe('en');
    expect(snap.theme).toBe('auto');
    expect(snap.storage.version).toBe('1.0.0');
    expect(snap.performance.mountTimeMs).toBe(12);
    expect(Array.isArray(snap.issues)).toBe(true);
    expect(snap.issues[0]?.code).toBe('OPENDYSLEXIC_CDN_MISSING');
    expect(typeof snap.timestamp).toBe('string');
  });
});

describe('setDevPipe', () => {
  it('does not throw when pipe URL is set', () => {
    setDevPipe('/api/__blakfy_a11y_log');
    expect(() => addIssue('warn', 'STORAGE_PARSE_ERROR', 'msg')).not.toThrow();
    setDevPipe(null);
  });

  it('uses fetch when verbose with pipe URL', () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;
    window.history.replaceState(null, '', '/?a11y-debug=1');
    setDevPipe('/api/log');
    addIssue('error', 'STORAGE_PARSE_ERROR', 'oops');
    expect(fetchMock).toHaveBeenCalled();
    globalThis.fetch = originalFetch;
    setDevPipe(null);
  });
});
