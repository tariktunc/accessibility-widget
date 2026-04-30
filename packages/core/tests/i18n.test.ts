// @blakfy/a11y-core — i18n.test.ts
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getCachedLocale,
  getEnglishLocale,
  loadLocale,
  _resetLocaleCache,
} from '../src/i18n';

beforeEach(() => {
  _resetLocaleCache();
});

describe('i18n', () => {
  it('getEnglishLocale returns valid Translation', () => {
    const en = getEnglishLocale();
    expect(en.fab.label).toBe('Accessibility preferences');
    expect(typeof en.panel.title).toBe('string');
  });

  it('getCachedLocale returns null for unloaded locales', () => {
    expect(getCachedLocale('tr')).toBeNull();
    expect(getCachedLocale('fr')).toBeNull();
  });

  it('getCachedLocale returns "en" since it is bundled', () => {
    const en = getCachedLocale('en');
    expect(en).not.toBeNull();
    expect(en?.fab.label).toBe('Accessibility preferences');
  });

  it('loadLocale fetches once then uses cache', async () => {
    const trPayload = {
      fab: { label: 'Erisilebilirlik tercihleri' },
      panel: {
        title: 'TR',
        description: 'desc',
        reset: 'r',
        close: 'c',
        disclaimer: 'd',
        preferences: {
          fontScale: { title: '', description: '', values: { '100': '', '110': '', '125': '' } },
          contrast: { title: '', description: '' },
          focusRing: { title: '', description: '' },
          linkUnderline: { title: '', description: '' },
          motion: { title: '', description: '' },
          dyslexiaFont: { title: '', description: '', note: '' },
          readingMode: { title: '', description: '' },
        },
      },
    };

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => trPayload,
    });
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const first = await loadLocale('tr', 'https://cdn.example/');
    expect(first.fab.label).toBe('Erisilebilirlik tercihleri');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const second = await loadLocale('tr', 'https://cdn.example/');
    expect(second).toBe(first);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    globalThis.fetch = originalFetch;
  });

  it('loadLocale falls back to en when fetch fails', async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error('network down'));
    const originalFetch = globalThis.fetch;
    globalThis.fetch = fetchMock as unknown as typeof fetch;

    const result = await loadLocale('fr', 'https://cdn.example');
    expect(result.fab.label).toBe('Accessibility preferences');

    globalThis.fetch = originalFetch;
  });
});
