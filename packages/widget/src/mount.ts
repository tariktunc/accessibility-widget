/**
 * Programmatic mount entry. Used by:
 *  - IIFE auto-mount on DOMContentLoaded
 *  - Custom Element connectedCallback
 *  - NPM consumer `import { mount } from '@blakfy/accessibility-widget'`
 *
 * Lifecycle:
 *   1. Resolve config (defaults < script data-* < window.__BLAKFY_A11Y__ < opts)
 *   2. Apply persisted prefs to <html>
 *   3. Detect host CSS conflicts + subscribe to OS pref changes
 *   4. Create <blakfy-a11y-root>, attach Shadow (open mode)
 *   5. Inject <style> with widget.css
 *   6. Render Preact tree
 *   7. Lazy-load locale if not 'en' → re-render
 *   8. Set up window.BlakfyA11y
 *   9. Wire dev-pipe + onPreferencesChange listener
 *  10. Emit ready
 */
import { h, render } from 'preact';
import {
  _inspectStorage,
  EVENT_NAMES,
  RTL_LOCALES,
  addIssue,
  applyPreferences,
  detectHostCSSConflicts,
  detectOSPreferences,
  emit,
  getEnglishLocale,
  getPreferences,
  loadLocale,
  on,
  safeMergeOptions,
  setDevPipe,
  subscribeToOSChanges,
  type Locale,
  type Preferences,
  type Translation,
  type WidgetOptions,
} from '@blakfy/a11y-core';
import { Widget } from './components/Widget';
import widgetStyles from './styles/widget.css?raw';
import { setupPublicAPI } from './public-api';

const ROOT_TAG = 'blakfy-a11y-root';

declare const __VERSION__: string;
const VERSION_FALLBACK = '2.0.0-alpha.0';
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : VERSION_FALLBACK;

interface MountResult {
  unmount: () => void;
}

interface InternalState {
  config: WidgetOptions;
  translation: Translation;
  shadowRoot: ShadowRoot;
  host: HTMLElement;
  rerender: () => void;
}

function _readScriptDataAttrs(): Partial<WidgetOptions> & { devPipe?: string; version?: string } {
  if (typeof document === 'undefined') return {};
  let script: HTMLScriptElement | null = null;
  const current = document.currentScript as HTMLScriptElement | null;
  if (current && current.dataset) {
    script = current;
  } else {
    // Fallback: find any <script> whose src includes accessibility-widget
    const all = document.querySelectorAll<HTMLScriptElement>('script[src]');
    for (let i = 0; i < all.length; i++) {
      const s = all[i];
      if (s && s.src && /accessibility[-_]widget|blakfy/i.test(s.src)) {
        script = s;
        break;
      }
    }
  }
  if (!script) return {};
  const ds = script.dataset;
  const out: Partial<WidgetOptions> & { devPipe?: string; version?: string } = {};
  if (ds.locale) out.locale = ds.locale as Locale;
  if (ds.theme) out.theme = ds.theme as WidgetOptions['theme'];
  if (ds.position) out.position = ds.position as WidgetOptions['position'];
  if (ds.font) out.font = ds.font;
  if (ds.debug) out.debug = ds.debug === 'true';
  if (ds.devPipe) out.devPipe = ds.devPipe;
  if (ds.version) out.version = ds.version;
  return out;
}

/**
 * Detect missing OpenDyslexic CDN font when the dyslexia preference is on.
 * Heuristic: look for any <link rel=stylesheet> whose href references the
 * open-dyslexic font (case-insensitive). SSR-safe.
 */
function _detectOpenDyslexicCDN(): boolean {
  if (typeof document === 'undefined') return true;
  const links = document.querySelectorAll<HTMLLinkElement>('link[href]');
  for (let i = 0; i < links.length; i++) {
    const l = links[i];
    if (l && l.href && /open[-_]?dyslexic/i.test(l.href)) return true;
  }
  return false;
}

/**
 * Detect SSR hydration mismatch by comparing any pre-existing
 * `data-a11y-*` attributes on `<html>` (which a server may have inlined)
 * against the prefs computed from storage on the client. Only reports if
 * the server actually wrote attributes (i.e. at least one is present and
 * differs from the client value). SSR-safe.
 */
function _detectSSRMismatch(initialPrefs: Preferences): {
  mismatched: boolean;
  fields: string[];
} {
  if (typeof document === 'undefined') return { mismatched: false, fields: [] };
  const html = document.documentElement;
  if (!html) return { mismatched: false, fields: [] };
  const expected: Record<string, string> = {
    'data-a11y-fontscale': String(initialPrefs.fontScale),
    'data-a11y-contrast': initialPrefs.contrast,
    'data-a11y-focus': initialPrefs.focusRing ? 'enhanced' : 'default',
    'data-a11y-links': initialPrefs.linkUnderline ? 'underline' : 'default',
    'data-a11y-motion': initialPrefs.motion,
    'data-a11y-dyslexia': String(initialPrefs.dyslexiaFont),
    'data-a11y-reading': String(initialPrefs.readingMode),
  };
  const fields: string[] = [];
  let anyPresent = false;
  for (const key of Object.keys(expected)) {
    const present = html.hasAttribute(key);
    if (!present) continue;
    anyPresent = true;
    const got = html.getAttribute(key);
    if (got !== expected[key]) fields.push(key);
  }
  return { mismatched: anyPresent && fields.length > 0, fields };
}

function _baseFromScriptSrc(src: string): string {
  try {
    const url = new URL(src);
    return url.origin + url.pathname.replace(/\/[^/]*$/, '');
  } catch {
    return '';
  }
}

// Captured synchronously at module-eval time so the value survives the
// wait for DOMContentLoaded — `document.currentScript` is null inside
// async callbacks, which broke locale lazy-load.
const _CAPTURED_BASE_URL: string =
  typeof document !== 'undefined'
    ? _baseFromScriptSrc((document.currentScript as HTMLScriptElement | null)?.src ?? '')
    : '';

/** Derive CDN base from `currentScript.src` so locales can be lazy-loaded. */
export function _inferBaseURL(): string {
  if (typeof document === 'undefined') return '';
  if (_CAPTURED_BASE_URL) return _CAPTURED_BASE_URL;
  // Fallback: scan for our script (jsDelivr / unpkg / accessibility-widget paths)
  const all = document.querySelectorAll<HTMLScriptElement>('script[src]');
  for (let i = 0; i < all.length; i++) {
    const s = all[i];
    if (s && s.src && /accessibility[-_]widget|blakfy|widget\.js$/i.test(s.src)) {
      const got = _baseFromScriptSrc(s.src);
      if (got) return got;
    }
  }
  return '';
}

function _isRtl(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}

function _resolveTheme(theme: WidgetOptions['theme']): 'light' | 'dark' {
  if (theme === 'dark') return 'dark';
  if (theme === 'light') return 'light';
  // 'auto': first check host <html> element for explicit theme signals
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    const dt = html.getAttribute('data-theme');
    if (dt === 'dark') return 'dark';
    if (dt === 'light') return 'light';
    // GitHub / other frameworks use data-color-mode
    const cm = html.getAttribute('data-color-mode');
    if (cm === 'dark') return 'dark';
    // Tailwind / Next.js dark mode class strategy
    if (html.classList.contains('dark')) return 'dark';
    if (html.classList.contains('light')) return 'light';
  }
  // Fall back to OS prefers-color-scheme
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return 'light';
  try {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

/** Watch host <html> for class/data-theme changes when theme='auto'. */
function _watchHostTheme(callback: () => void): () => void {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return () => undefined;
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class', 'data-theme', 'data-color-mode'],
  });
  return () => observer.disconnect();
}

function _applyHostAttributes(host: HTMLElement, config: WidgetOptions): void {
  host.setAttribute('data-position', config.position);
  host.setAttribute('data-theme', _resolveTheme(config.theme));
  host.setAttribute('dir', _isRtl(config.locale) ? 'rtl' : 'ltr');
  if (config.font) host.style.setProperty('font-family', config.font);
}

function _injectStyles(shadowRoot: ShadowRoot): void {
  const styleEl = document.createElement('style');
  styleEl.textContent = widgetStyles;
  shadowRoot.appendChild(styleEl);
}

function _getOrCreateHost(): HTMLElement {
  const existing = document.querySelector(ROOT_TAG);
  if (existing && existing instanceof HTMLElement) return existing;
  const el = document.createElement(ROOT_TAG);
  document.body.appendChild(el);
  return el;
}

let _activeUnmount: (() => void) | null = null;

/**
 * Mount the widget. Idempotent: a second call returns the same result and
 * does not re-render.
 */
export function mount(opts: Partial<WidgetOptions> = {}): MountResult {
  const startTime = typeof performance !== 'undefined' ? performance.now() : Date.now();

  if (typeof document === 'undefined') {
    return { unmount: () => undefined };
  }

  // 1. Resolve config: defaults < script data-* < window globals < opts
  const scriptCfg = _readScriptDataAttrs();
  const winGlobal = (typeof window !== 'undefined' ? window.__BLAKFY_A11Y__ ?? {} : {}) as Partial<WidgetOptions> & {
    onPreferencesChange?: (record: import('@blakfy/a11y-core').PreferencesRecord) => void;
  };
  const merged = safeMergeOptions({ ...scriptCfg, ...winGlobal, ...opts });
  let config: WidgetOptions = merged;

  // 2. Apply persisted prefs immediately. Before mutating <html>, sample
  //    any server-rendered data-a11y-* to detect SSR hydration mismatch.
  const initialPrefs = getPreferences();
  const ssr = _detectSSRMismatch(initialPrefs);
  if (ssr.mismatched) {
    addIssue(
      'error',
      'SSR_HYDRATION_MISMATCH',
      `SSR-rendered prefs differ from client storage: ${ssr.fields.join(', ')}`,
    );
  }
  applyPreferences(initialPrefs);

  // 2b. CDN version mismatch — script tag may carry `data-version` to pin
  //     an expected build. If runtime VERSION differs, flag (error).
  if (scriptCfg.version && scriptCfg.version !== VERSION) {
    addIssue(
      'error',
      'CDN_VERSION_MISMATCH',
      `Expected version ${scriptCfg.version} but runtime is ${VERSION} — clear your CDN cache.`,
    );
  }

  // 2c. OpenDyslexic CDN check — when the user has the dyslexia font on
  //     and no <link href*=open-dyslexic> exists in the document, the
  //     font fallback will be active.
  if (initialPrefs.dyslexiaFont && !_detectOpenDyslexicCDN()) {
    addIssue(
      'warn',
      'OPENDYSLEXIC_CDN_MISSING',
      'dyslexiaFont=true but no OpenDyslexic CDN <link> found — system fallback active.',
    );
  }

  // 3. Diagnostics: host CSS + OS pref subscriptions
  if (detectHostCSSConflicts()) {
    addIssue('warn', 'HOST_CSS_IMPORTANT_CONFLICT', 'Host stylesheet uses !important on body/a — visual prefs may not apply.');
  }
  const osPrefs = detectOSPreferences();
  if (osPrefs.reducedMotion) {
    addIssue('info', 'OS_PREFERS_REDUCED_MOTION', 'OS prefers-reduced-motion=reduce detected.');
  }
  if (osPrefs.contrast === 'more') {
    addIssue('info', 'OS_PREFERS_CONTRAST_MORE', 'OS prefers-contrast=more detected.');
  }
  if (osPrefs.colorScheme === 'dark') {
    addIssue('info', 'OS_PREFERS_COLOR_SCHEME_DARK', 'OS prefers-color-scheme=dark detected.');
  }
  const offOSChanges = subscribeToOSChanges(() => {
    if (state.config.theme === 'auto') {
      _applyHostAttributes(state.host, state.config);
      state.rerender();
    }
  });

  // Watch host <html> class / data-theme changes for the theme bridge
  const offHostTheme = _watchHostTheme(() => {
    if (state.config.theme === 'auto') {
      _applyHostAttributes(state.host, state.config);
      state.rerender();
    }
  });

  // 4. Dev-pipe
  if (scriptCfg.devPipe) setDevPipe(scriptCfg.devPipe);

  // 5. onPreferencesChange forwarder (for window.__BLAKFY_A11Y__.onPreferencesChange)
  let offChangeForwarder: (() => void) | null = null;
  if (typeof winGlobal.onPreferencesChange === 'function') {
    const handler = winGlobal.onPreferencesChange;
    offChangeForwarder = on(EVENT_NAMES.CHANGE, (record) => {
      try {
        handler(record);
      } catch {
        /* swallow user error */
      }
    });
  }

  // 6. Host element + Shadow DOM
  const host = _getOrCreateHost();
  const shadowRoot = host.shadowRoot ?? host.attachShadow({ mode: 'open' });
  // If Shadow already had content (re-mount), wipe it clean
  while (shadowRoot.firstChild) shadowRoot.removeChild(shadowRoot.firstChild);
  _injectStyles(shadowRoot);
  _applyHostAttributes(host, config);

  // 7. Render with bundled English first; lazy-load actual locale next.
  let translation: Translation = getEnglishLocale();

  const state: InternalState = {
    config,
    translation,
    shadowRoot,
    host,
    rerender: () => {
      render(
        h(Widget, {
          config: state.config,
          translation: state.translation,
          onThemeChange: (theme) => {
            state.config = { ...state.config, theme };
            _applyHostAttributes(host, state.config);
            state.rerender();
          },
        }),
        shadowRoot,
      );
    },
  };

  state.rerender();

  // 8. Lazy-load locale
  if (config.locale !== 'en') {
    const baseURL = _inferBaseURL();
    void loadLocale(config.locale, baseURL).then((tr) => {
      translation = tr;
      state.translation = tr;
      state.rerender();
    });
  }

  // 9. Public API
  const storage = _inspectStorage();
  const mountTimeMs = (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startTime;
  setupPublicAPI({
    config,
    mountTimeMs,
    bundleSizeGz: 0, // populated by build pipeline if/when known
    storage,
    configure: (newOpts) => {
      const next = safeMergeOptions({ ...state.config, ...newOpts });
      // Reload translation if locale changed
      const localeChanged = next.locale !== state.config.locale;
      state.config = next;
      _applyHostAttributes(host, next);
      if (localeChanged) {
        if (next.locale === 'en') {
          state.translation = getEnglishLocale();
          state.rerender();
        } else {
          const baseURL = _inferBaseURL();
          void loadLocale(next.locale, baseURL).then((tr) => {
            state.translation = tr;
            state.rerender();
          });
        }
      } else {
        state.rerender();
      }
    },
  });

  // 10. Emit ready
  addIssue('info', 'INITIALIZED', `Widget mounted in ${mountTimeMs.toFixed(1)}ms`);
  emit(EVENT_NAMES.READY, { version: VERSION });

  // 11. Unmount
  const unmount = (): void => {
    offOSChanges();
    offHostTheme();
    if (offChangeForwarder) offChangeForwarder();
    render(null, shadowRoot);
    if (host.parentNode) host.parentNode.removeChild(host);
    _activeUnmount = null;
  };
  _activeUnmount = unmount;

  return { unmount };
}

/** Test helper: re-export for unmount-from-anywhere semantics. */
export function _getActiveUnmount(): (() => void) | null {
  return _activeUnmount;
}
