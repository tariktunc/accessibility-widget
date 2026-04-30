/**
 * Wires up `window.BlakfyA11y` — the locked v1 surface (STABLE-API.md §1).
 * Also augments the global Window type so consumers get type hints.
 */
import {
  EVENT_NAMES,
  emit,
  getDiagnostics,
  getPreferences,
  on,
  resetPreferences,
  setPreferences,
  type DiagnosticsSnapshot,
  type Preferences,
  type PreferencesRecord,
  type WidgetOptions,
} from '@blakfy/a11y-core';

declare const __VERSION__: string;
const VERSION_FALLBACK = '2.0.0-alpha.0';
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : VERSION_FALLBACK;

export interface BlakfyA11yAPI {
  open: () => void;
  close: () => void;
  getPreferences: () => Preferences;
  setPreferences: (p: Partial<Preferences>) => void;
  reset: () => void;
  onChange: (cb: (p: Preferences) => void) => () => void;
  configure: (opts: Partial<WidgetOptions>) => void;
  diagnostics: () => DiagnosticsSnapshot;
  version: string;
}

declare global {
  interface Window {
    BlakfyA11y?: BlakfyA11yAPI;
    __BLAKFY_A11Y__?: Partial<WidgetOptions> & {
      onPreferencesChange?: (record: PreferencesRecord) => void;
    };
  }
}

export interface ApiContext {
  config: WidgetOptions;
  mountTimeMs: number;
  bundleSizeGz: number;
  storage: {
    version: string;
    migratedFrom: string | null;
    keysFound: Array<'localStorage' | 'cookie'>;
  };
  configure: (opts: Partial<WidgetOptions>) => void;
}

/**
 * Install `window.BlakfyA11y`. Idempotent — overwrites any previous instance.
 */
export function setupPublicAPI(ctx: ApiContext): BlakfyA11yAPI {
  const api: BlakfyA11yAPI = {
    open: () => emit(EVENT_NAMES.OPEN, {}),
    close: () => emit(EVENT_NAMES.CLOSE, {}),
    getPreferences: () => getPreferences(),
    setPreferences: (patch) => {
      setPreferences(patch, ctx.config.locale);
    },
    reset: () => {
      resetPreferences(ctx.config.locale);
    },
    onChange: (cb) => on(EVENT_NAMES.CHANGE, (record) => cb(record.prefs)),
    configure: (opts) => ctx.configure(opts),
    diagnostics: () =>
      getDiagnostics({
        config: ctx.config,
        performance: {
          mountTimeMs: ctx.mountTimeMs,
          bundleSizeGz: ctx.bundleSizeGz,
          timeToFirstClick: null,
        },
        storage: ctx.storage,
      }),
    version: VERSION,
  };

  if (typeof window !== 'undefined') {
    // Mutate in-place when IIFE already created the global object (extend:true),
    // otherwise assign directly (ESM / Custom Element path).
    if (window.BlakfyA11y && typeof window.BlakfyA11y === 'object') {
      Object.assign(window.BlakfyA11y as object, api);
    } else {
      window.BlakfyA11y = api;
    }
  }
  return api;
}
