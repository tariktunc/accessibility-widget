import { afterEach, describe, expect, it, vi } from 'vitest';
import { EVENT_NAMES } from '@blakfy/a11y-core';
import { _getActiveUnmount, mount } from '../src/mount';

const results: ReturnType<typeof mount>[] = [];
function mountTracked(): ReturnType<typeof mount> {
  const result = mount({ locale: 'en' });
  results.push(result);
  return result;
}

afterEach(() => {
  for (const result of results.splice(0)) result.unmount();
  _getActiveUnmount()?.();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('mount lifecycle', () => {
  it('subscribes to OS changes once and removes those subscriptions on unmount', () => {
    const add = vi.fn();
    const remove = vi.fn();
    vi.stubGlobal('matchMedia', (media: string) => ({
      media,
      matches: false,
      onchange: null,
      addEventListener: add,
      removeEventListener: remove,
      addListener: add,
      removeListener: remove,
      dispatchEvent: () => false,
    }));
    const first = mountTracked();
    const subscriptions = add.mock.calls.length;
    expect(subscriptions).toBeGreaterThan(0);
    mountTracked();
    expect(add).toHaveBeenCalledTimes(subscriptions);
    first.unmount();
    expect(remove).toHaveBeenCalledTimes(subscriptions);
    first.unmount();
    expect(remove).toHaveBeenCalledTimes(subscriptions);
  });

  it('returns the same handle and preserves the rendered host on repeated mount', () => {
    const first = mountTracked();
    const host = document.querySelector('blakfy-a11y-root');
    const style = host?.shadowRoot?.firstChild;
    expect(style).toBeTruthy();
    expect(mountTracked()).toBe(first);
    expect(document.querySelector('blakfy-a11y-root')).toBe(host);
    expect(host?.shadowRoot?.firstChild).toBe(style);
  });

  it('does not create another host-theme observer on repeated mount', () => {
    const observe = vi.spyOn(MutationObserver.prototype, 'observe');
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const first = mountTracked();
    const count = observe.mock.calls.length;
    expect(count).toBeGreaterThan(0);
    mountTracked();
    expect(observe).toHaveBeenCalledTimes(count);
    first.unmount();
    expect(disconnect).toHaveBeenCalledTimes(count);
  });

  it('makes an old unmount handle harmless after a new mount', () => {
    const first = mountTracked();
    first.unmount();
    const second = mountTracked();
    const host = document.querySelector('blakfy-a11y-root');
    expect(second).not.toBe(first);
    first.unmount();
    expect(_getActiveUnmount()).toBe(second.unmount);
    expect(document.querySelector('blakfy-a11y-root')).toBe(host);
  });

  it('exposes the active result to a mount call from the ready event', () => {
    let fromReady: ReturnType<typeof mount> | undefined;
    window.addEventListener(
      EVENT_NAMES.READY,
      () => {
        fromReady = mountTracked();
      },
      { once: true },
    );
    const first = mountTracked();
    expect(fromReady).toBe(first);
  });

  it('cleans up a removed host before remounting, without letting its old handle clear the new mount', () => {
    const disconnect = vi.spyOn(MutationObserver.prototype, 'disconnect');
    const first = mountTracked();
    const oldHost = document.querySelector('blakfy-a11y-root');
    oldHost?.remove();
    const second = mountTracked();
    const host = document.querySelector('blakfy-a11y-root');
    expect(host).toBeTruthy();
    expect(host).not.toBe(oldHost);
    expect(second).not.toBe(first);
    expect(disconnect).toHaveBeenCalled();
    const disconnects = disconnect.mock.calls.length;
    first.unmount();
    expect(disconnect).toHaveBeenCalledTimes(disconnects);
    expect(_getActiveUnmount()).toBe(second.unmount);
    expect(document.querySelector('blakfy-a11y-root')).toBe(host);
  });

  it('mounts into a replacement host instead of returning the detached instance', () => {
    const first = mountTracked();
    const replacement = document.createElement('blakfy-a11y-root');
    document.querySelector('blakfy-a11y-root')!.replaceWith(replacement);
    const second = mountTracked();
    expect(second).not.toBe(first);
    expect(replacement.shadowRoot?.querySelector('style')).toBeTruthy();
    first.unmount();
    expect(document.querySelector('blakfy-a11y-root')).toBe(replacement);
    expect(_getActiveUnmount()).toBe(second.unmount);
  });
});
