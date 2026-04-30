// @blakfy/a11y-core — events.ts
import { EVENT_NAMES, type PreferencesRecord } from './types';

/** Mapping of event name → CustomEvent detail payload type. */
export type EventDetailMap = {
  [EVENT_NAMES.READY]: { version: string };
  [EVENT_NAMES.CHANGE]: PreferencesRecord;
  [EVENT_NAMES.OPEN]: Record<string, never>;
  [EVENT_NAMES.CLOSE]: Record<string, never>;
};

/** Event name string literal accepted by `emit`/`on`. */
export type EventName = keyof EventDetailMap;

/**
 * Dispatch a typed CustomEvent on `window`. SSR-safe: no-op when `window`
 * is not defined.
 */
export function emit<K extends EventName>(name: K, detail: EventDetailMap[K]): void {
  if (typeof window === 'undefined') return;
  try {
    const ev = new CustomEvent(name, { detail });
    window.dispatchEvent(ev);
  } catch {
    // Some hardened browsers throw if CustomEvent constructor unavailable —
    // fail silent rather than break the host page.
  }
}

/**
 * Subscribe to a typed widget event. Returns an unsubscribe function. SSR-safe:
 * returns a no-op when `window` is not defined.
 */
export function on<K extends EventName>(
  name: K,
  cb: (detail: EventDetailMap[K]) => void,
): () => void {
  if (typeof window === 'undefined') {
    return () => {
      /* no-op SSR */
    };
  }
  const handler = (e: Event): void => {
    const ce = e as CustomEvent<EventDetailMap[K]>;
    cb(ce.detail);
  };
  window.addEventListener(name, handler as EventListener);
  return () => {
    if (typeof window === 'undefined') return;
    window.removeEventListener(name, handler as EventListener);
  };
}
