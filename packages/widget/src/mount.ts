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
import { PACKAGE_VERSION_FALLBACK } from './version';
import {
  _inspectStorage,
  EVENT_NAMES,
  RTL_LOCALES,
  addIssue,
  applyOSPreferences,
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
  type OSPreferences,
  type Preferences,
  type Translation,
  type WidgetOptions,
} from '@blakfy/a11y-core';
import { Widget } from './components/Widget';
import widgetStyles from './styles/widget.css?raw';
import { setupPublicAPI } from './public-api';

const ROOT_TAG = 'blakfy-a11y-root';

declare const __VERSION__: string;
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : PACKAGE_VERSION_FALLBACK;

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

/**
 * Map an HTML lang attribute (e.g. "tr-TR", "de", "zh-Hans") to a supported
 * Locale code. Returns undefined if not supported — caller falls back to 'en'.
 */
function _mapHtmlLang(lang: string): Locale | undefined {
  const base = lang.toLowerCase().split(/[-_]/)[0] ?? '';
  const MAP: Record<string, Locale> = {
    tr: 'tr',
    en: 'en',
    de: 'de',
    fr: 'fr',
    es: 'es',
    it: 'it',
    ar: 'ar',
    he: 'he',
    ru: 'ru',
    iw: 'he', // legacy Hebrew ISO 639-1 code
  };
  return MAP[base];
}

/** Detect locale from <html lang> when data-locale is not set. */
function _detectLocale(): Locale {
  if (typeof document === 'undefined') return 'en';
  const lang = document.documentElement.lang ?? '';
  return _mapHtmlLang(lang) ?? 'en';
}

function _readScriptDataAttrs(): Partial<WidgetOptions> & { devPipe?: string; version?: string } {
  if (typeof document === 'undefined') return {};
  // Prefer the element captured synchronously at module-eval time;
  // fall back to currentScript (non-null only during inline execution),
  // then scan all <script src> tags for a recognisable widget URL.
  let script: HTMLScriptElement | null =
    _CAPTURED_SCRIPT ?? (document.currentScript as HTMLScriptElement | null);
  if (!script) {
    const all = document.querySelectorAll<HTMLScriptElement>('script[src]');
    for (let i = 0; i < all.length; i++) {
      const s = all[i];
      if (s && s.src && /accessibility[-_]widget|blakfy|widget\.js$/i.test(s.src)) {
        script = s;
        break;
      }
    }
  }
  if (!script) return {};
  const ds = script.dataset;
  const out: Partial<WidgetOptions> & { devPipe?: string; version?: string } = {};
  if (ds.locale) out.locale = ds.locale as Locale;
  else out.locale = _detectLocale();
  if (ds.theme) out.theme = ds.theme as WidgetOptions['theme'];
  if (ds.position) out.position = ds.position as WidgetOptions['position'];
  if (ds.font) out.font = ds.font;
  if (ds.debug) out.debug = ds.debug === 'true';
  if (ds.iconStyle) out.iconStyle = ds.iconStyle as WidgetOptions['iconStyle'];
  if (ds.keyboardShortcut != null) out.keyboardShortcut = ds.keyboardShortcut !== 'false';
  if (ds.devPipe) out.devPipe = ds.devPipe;
  if (ds.version) out.version = ds.version;
  return out;
}

/**
 * Mirror the OS-level signals onto the widget host element. The widget's
 * stylesheet lives in a shadow root and cannot see `<html>` of the page, so
 * the CSS side of `prefers-reduced-transparency` reads them from here.
 */
function _applyOSAttributes(host: HTMLElement, os: OSPreferences): void {
  host.setAttribute('data-a11y-reduced-transparency', String(os.reducedTransparency));
  host.setAttribute('data-a11y-reduced-data', String(os.reducedData));
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

// Both captured synchronously at module-eval time so they survive the
// wait for DOMContentLoaded — `document.currentScript` is null inside
// async callbacks, which broke data-locale and base-URL detection.
const _CAPTURED_SCRIPT =
  typeof document !== 'undefined' ? (document.currentScript as HTMLScriptElement | null) : null;

const _CAPTURED_BASE_URL: string =
  typeof document !== 'undefined' ? _baseFromScriptSrc(_CAPTURED_SCRIPT?.src ?? '') : '';

// Fallback-path filename match is not itself a trust boundary (#54) — a
// hostile `<script src="https://evil.example/widget.js">` would also match
// the filename regex, so the resolved origin is checked against this
// allowlist before ever being used as a locale-fetch base.
const TRUSTED_LOCALE_ORIGINS = ['https://cdn.jsdelivr.net', 'https://unpkg.com'];

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
      if (got && TRUSTED_LOCALE_ORIGINS.some((o) => got.startsWith(o))) return got;
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
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined')
    return () => undefined;
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

function _isSandboxedCrossOriginIframe(): boolean {
  if (window.top === window.self) return false; // not in an iframe at all
  try {
    // Same-origin iframes can read window.top.location; cross-origin throws.
    void window.top?.location.href;
    return false;
  } catch {
    return true;
  }
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

  // Idempotency guard (fixes #44): a second mount() call while already
  // mounted must be a true no-op, matching the documented contract above.
  // Callers who need to change live options must use the returned
  // configure() instead of calling mount() again. Only treat it as "still
  // mounted" when the host element is actually still in the DOM — if it
  // was removed externally (page script, dev tools), _activeUnmount is
  // stale and a fresh mount must proceed instead of silently no-oping.
  if (_activeUnmount && document.querySelector(ROOT_TAG)) {
    return { unmount: _activeUnmount };
  }

  // 1. Resolve config: defaults < script data-* < window globals < opts
  const scriptCfg = _readScriptDataAttrs();
  const winGlobal = (
    typeof window !== 'undefined' ? (window.__BLAKFY_A11Y__ ?? {}) : {}
  ) as Partial<WidgetOptions> & {
    onPreferencesChange?: (record: import('@blakfy/a11y-core').PreferencesRecord) => void;
  };
  const merged = safeMergeOptions({ ...scriptCfg, ...winGlobal, ...opts });
  const config: WidgetOptions = merged;

  if (_isSandboxedCrossOriginIframe()) {
    addIssue(
      'warn',
      'SANDBOXED_IFRAME',
      'Widget mounted inside a cross-origin sandboxed iframe (e.g. Wix "Embed a Widget"). ' +
        'Preferences will not persist and the FAB will be trapped inside the iframe box. ' +
        'Use a same-origin embed point instead (e.g. Wix Site Settings → Custom Code).',
    );
  }

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
    addIssue(
      'warn',
      'HOST_CSS_IMPORTANT_CONFLICT',
      'Host stylesheet uses !important on body/a — visual prefs may not apply.',
    );
  }
  const osPrefs = detectOSPreferences();
  // The two signals below have no widget toggle: they are a statement about the
  // machine, not a preference about this site. Publish them on <html> (host CSS)
  // and on the widget host element (this widget's own stylesheet, step 7).
  applyOSPreferences(osPrefs);
  if (osPrefs.reducedMotion) {
    addIssue('info', 'OS_PREFERS_REDUCED_MOTION', 'OS prefers-reduced-motion=reduce detected.');
  }
  if (osPrefs.contrast === 'more') {
    addIssue('info', 'OS_PREFERS_CONTRAST_MORE', 'OS prefers-contrast=more detected.');
  }
  if (osPrefs.colorScheme === 'dark') {
    addIssue('info', 'OS_PREFERS_COLOR_SCHEME_DARK', 'OS prefers-color-scheme=dark detected.');
  }
  if (osPrefs.reducedTransparency) {
    addIssue(
      'info',
      'OS_PREFERS_REDUCED_TRANSPARENCY',
      'OS prefers-reduced-transparency=reduce detected — translucent surfaces render opaque.',
    );
  }
  if (osPrefs.reducedData) {
    addIssue(
      'info',
      'OS_PREFERS_REDUCED_DATA',
      'OS prefers-reduced-data=reduce detected — remote locale files are not fetched.',
    );
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

  // #50: real timeToFirstClick tracking. Only the FAB's own click handler
  // reports this (not a programmatic BlakfyA11y.open()) — recorded once,
  // on the first click only.
  let timeToFirstClick: number | null = null;
  const onFirstFabClick = (): void => {
    if (timeToFirstClick !== null) return;
    timeToFirstClick =
      (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startTime;
  };

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
          iconStyle: state.config.iconStyle,
          keyboardShortcut: state.config.keyboardShortcut,
          onFirstFabClick,
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

  // 7b. Mirror the OS signals the widget's own stylesheet reacts to. Done here
  //     rather than with the other diagnostics because the host element only
  //     exists once `state` is created.
  _applyOSAttributes(state.host, osPrefs);

  // 8. Lazy-load locale — skipped under prefers-reduced-data (step 3). The
  //    locale JSON files are the only network asset the widget fetches on its
  //    own, so honouring the signal means keeping the bundled English locale.
  if (config.locale !== 'en' && !osPrefs.reducedData) {
    const baseURL = _inferBaseURL();
    void loadLocale(config.locale, baseURL).then((tr) => {
      translation = tr;
      state.translation = tr;
      state.rerender();
    });
  }

  // 9. Public API
  const storage = _inspectStorage();
  const mountTimeMs =
    (typeof performance !== 'undefined' ? performance.now() : Date.now()) - startTime;
  setupPublicAPI({
    config,
    mountTimeMs,
    // #50: literal placeholder patched post-build with the real gzipped
    // dist size — see scripts/patch-bundle-size.mjs. Two-pass problem
    // (the number's own byte-length changes what it measures) is accepted
    // as approximation; the patch runs against the pre-patch gzip size.
    bundleSizeGz: 123454321 /* __BUNDLE_SIZE_GZ__ */,
    getTimeToFirstClick: () => timeToFirstClick,
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
        } else if (!osPrefs.reducedData) {
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
