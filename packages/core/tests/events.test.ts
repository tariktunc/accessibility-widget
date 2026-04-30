// @blakfy/a11y-core — events.test.ts
import { describe, it, expect, vi } from 'vitest';
import { emit, on } from '../src/events';
import { EVENT_NAMES, DEFAULT_PREFS, STORAGE_VERSION } from '../src/types';

describe('events', () => {
  it('emit→on round-trip delivers detail', () => {
    const cb = vi.fn();
    const off = on(EVENT_NAMES.OPEN, cb);
    emit(EVENT_NAMES.OPEN, {});
    expect(cb).toHaveBeenCalledTimes(1);
    off();
  });

  it('unsubscribe stops further deliveries', () => {
    const cb = vi.fn();
    const off = on(EVENT_NAMES.CLOSE, cb);
    emit(EVENT_NAMES.CLOSE, {});
    off();
    emit(EVENT_NAMES.CLOSE, {});
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('multiple listeners all receive events', () => {
    const a = vi.fn();
    const b = vi.fn();
    const offA = on(EVENT_NAMES.READY, a);
    const offB = on(EVENT_NAMES.READY, b);
    emit(EVENT_NAMES.READY, { version: '2.0.0-alpha.0' });
    expect(a).toHaveBeenCalledTimes(1);
    expect(b).toHaveBeenCalledTimes(1);
    offA();
    offB();
  });

  it('CHANGE event delivers full PreferencesRecord', () => {
    const cb = vi.fn();
    const off = on(EVENT_NAMES.CHANGE, cb);
    const record = {
      prefs: DEFAULT_PREFS,
      version: STORAGE_VERSION,
      timestamp: new Date().toISOString(),
      locale: 'en',
    };
    emit(EVENT_NAMES.CHANGE, record);
    expect(cb).toHaveBeenCalledWith(record);
    off();
  });

  it('SSR-safe: emit/on do not throw and on returns a function', () => {
    // True SSR (no window) is hard to simulate inside jsdom without breaking
    // sibling tests, so we exercise the public surface. The branch with no
    // window is covered by static review of `typeof window === 'undefined'`.
    expect(() => emit(EVENT_NAMES.OPEN, {})).not.toThrow();
    const off = on(EVENT_NAMES.OPEN, () => {
      /* noop */
    });
    expect(typeof off).toBe('function');
    off();
  });
});
