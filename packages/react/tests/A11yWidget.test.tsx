import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useA11yPreferences } from '../src/useA11yPreferences';
import { EVENT_NAMES, DEFAULT_PREFS } from '@blakfy/a11y-core';

vi.mock('@blakfy/a11y-core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@blakfy/a11y-core')>();
  return {
    ...actual,
    getPreferences: () => actual.DEFAULT_PREFS,
  };
});

vi.mock('@blakfy/accessibility-widget', () => ({
  mount: vi.fn(() => ({ unmount: vi.fn() })),
}));

describe('useA11yPreferences', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns DEFAULT_PREFS on first render', () => {
    const { result } = renderHook(() => useA11yPreferences());
    expect(result.current).toEqual(DEFAULT_PREFS);
  });

  it('updates when blakfy:a11y:change fires', async () => {
    const { result } = renderHook(() => useA11yPreferences());

    const newPrefs = { ...DEFAULT_PREFS, fontScale: 125 as const };
    const event = new CustomEvent(EVENT_NAMES.CHANGE, {
      detail: { prefs: newPrefs, version: '2', timestamp: '', locale: 'tr' },
    });
    await act(async () => {
      window.dispatchEvent(event);
    });

    expect(result.current.fontScale).toBe(125);
  });

  it('removes event listener on unmount', () => {
    const spy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useA11yPreferences());
    unmount();
    expect(spy).toHaveBeenCalledWith(EVENT_NAMES.CHANGE, expect.any(Function));
  });
});
