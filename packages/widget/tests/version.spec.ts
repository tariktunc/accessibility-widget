import { afterEach, describe, expect, it, vi } from 'vitest';
import { EVENT_NAMES, _resetDiagnostics, getIssues, on } from '@blakfy/a11y-core';
import { mount, _getActiveUnmount } from '../src/mount';

// Simulate a release without updating any source/build version literals.
vi.mock('../package.json', () => ({ default: { version: '9.8.7-test.1' } }));

afterEach(() => {
  _getActiveUnmount()?.();
  document.querySelectorAll('script[data-version]').forEach((node) => node.remove());
  _resetDiagnostics();
  vi.restoreAllMocks();
});

describe('widget package version', () => {
  it('accepts the package version in a CDN script declaration', () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.example/blakfy-accessibility-widget.js';
    script.dataset.version = '9.8.7-test.1';
    document.head.appendChild(script);
    vi.spyOn(console, 'error').mockImplementation(() => undefined);

    mount();

    expect(getIssues().map((issue) => issue.code)).not.toContain('CDN_VERSION_MISMATCH');
  });

  it('reports the package version through the public API', () => {
    mount();
    expect(window.BlakfyA11y?.version).toBe('9.8.7-test.1');
  });

  it('reports the package version in the ready event', () => {
    const ready = vi.fn();
    const off = on(EVENT_NAMES.READY, ready);
    try {
      mount();
      expect(ready).toHaveBeenCalledWith({ version: '9.8.7-test.1' });
    } finally {
      off();
    }
  });
});
