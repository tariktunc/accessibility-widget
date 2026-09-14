// @blakfy/a11y-core — apply-styles.ts
import type { Preferences } from './types';

/** Result shape returned by `detectOSPreferences`. */
export interface OSPreferences {
  reducedMotion: boolean;
  contrast: 'normal' | 'more' | 'less';
  colorScheme: 'light' | 'dark' | 'no-preference';
  /** `prefers-reduced-transparency: reduce` — translucent surfaces should be opaque. */
  reducedTransparency: boolean;
  /** `prefers-reduced-data: reduce` — the user asked for fewer bytes over the network. */
  reducedData: boolean;
}

const HOST_STYLE_ID = 'blakfy-a11y-host';

const LINE_HEIGHT_SELECTOR =
  'html p, html li, html dd, html dt, html span, html div, html h1, html h2, html h3, html h4, html h5, html h6, html a, html label, html td, html th';

function _svgCursor(fill: string, stroke: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path d="M6 2L6 26L12 20L16 28L19 27L15 19L22 19Z" fill="${fill}" stroke="${stroke}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 6 2`;
}

function _buildHostCSS(prefs: Preferences): string {
  const rules: string[] = [];

  if (prefs.fontScale !== 100) {
    rules.push(`html { font-size: ${prefs.fontScale}% !important; }`);
  }

  if (prefs.contrast === 'high') {
    rules.push(
      `html body, html body * { background-color: #000000 !important; color: #ffffff !important; border-color: #333333 !important; }`,
      `html body a, html body a * { color: #ffff00 !important; }`,
      `html body img { filter: invert(1) hue-rotate(180deg) !important; }`,
    );
  }

  if (prefs.focusRing) {
    rules.push(
      `html *:focus, html *:focus-visible { outline: 4px solid #2563eb !important; outline-offset: 2px !important; }`,
    );
  }

  if (prefs.linkUnderline) {
    rules.push(`html a { text-decoration: underline !important; }`);
  }

  if (prefs.motion === 'reduce') {
    rules.push(
      `html *, html *::before, html *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; scroll-behavior: auto !important; }`,
    );
  }

  if (prefs.dyslexiaFont) {
    rules.push(
      `html * { font-family: 'OpenDyslexic', OpenDyslexic, Arial, sans-serif !important; }`,
    );
  }

  if (prefs.readingMode) {
    rules.push(
      `html aside, html [role="complementary"] { display: none !important; }`,
      `html [class*="sidebar"], html [id*="sidebar"] { display: none !important; }`,
      `html [class*="banner"]:not(main *) { display: none !important; }`,
    );
  }

  if (prefs.lineHeight === 'medium') {
    rules.push(`${LINE_HEIGHT_SELECTOR} { line-height: 1.8 !important; }`);
  } else if (prefs.lineHeight === 'large') {
    rules.push(`${LINE_HEIGHT_SELECTOR} { line-height: 2.4 !important; }`);
  }

  if (prefs.letterSpacing === 'medium') {
    rules.push(`html * { letter-spacing: 0.08em !important; }`);
  } else if (prefs.letterSpacing === 'large') {
    rules.push(`html * { letter-spacing: 0.16em !important; }`);
  }

  if (prefs.textAlign !== 'default') {
    rules.push(
      `html p, html li, html h1, html h2, html h3, html h4, html h5, html h6 { text-align: ${prefs.textAlign} !important; }`,
    );
  }

  if (prefs.readingWidth === 'narrow') {
    rules.push(`html p, html li, html blockquote { max-width: 80ch !important; }`);
  } else if (prefs.readingWidth === 'narrower') {
    rules.push(`html p, html li, html blockquote { max-width: 60ch !important; }`);
  }

  if (prefs.highlightHeadings) {
    rules.push(
      `html h1, html h2, html h3, html h4, html h5, html h6 { outline: 3px solid #2563eb !important; outline-offset: 3px !important; }`,
    );
  }

  if (prefs.saturation === 'none') {
    rules.push(`html { filter: grayscale(100%) !important; }`);
    rules.push(`blakfy-a11y-root { filter: none !important; }`);
  } else if (prefs.saturation === 'high') {
    rules.push(`html { filter: saturate(2) !important; }`);
    rules.push(`blakfy-a11y-root { filter: none !important; }`);
  } else if (prefs.saturation === 'low') {
    rules.push(`html { filter: saturate(0.3) !important; }`);
    rules.push(`blakfy-a11y-root { filter: none !important; }`);
  }

  if (prefs.cursorSize === 'large-dark') {
    const cur = _svgCursor('black', 'white');
    rules.push(`html *, html *::before, html *::after { cursor: ${cur}, default !important; }`);
  } else if (prefs.cursorSize === 'large-light') {
    const cur = _svgCursor('white', 'black');
    rules.push(`html *, html *::before, html *::after { cursor: ${cur}, default !important; }`);
  }

  if (prefs.hideImages) {
    rules.push(
      `html img, html picture, html [role="img"]:not(svg):not([aria-label*="accessibility"]) { opacity: 0 !important; }`,
      `html video { visibility: hidden !important; }`,
    );
  }

  return rules.join('\n');
}

function _injectHostStyles(prefs: Preferences): void {
  if (typeof document === 'undefined') return;
  let el = document.getElementById(HOST_STYLE_ID) as HTMLStyleElement | null;
  if (!el) {
    el = document.createElement('style');
    el.id = HOST_STYLE_ID;
    el.setAttribute('data-blakfy', '');
    const head = document.head || document.documentElement;
    head.appendChild(el);
  }
  el.textContent = _buildHostCSS(prefs);
}

/**
 * Write `data-a11y-*` attributes onto `<html>` and inject host-page styles.
 * SSR-safe.
 */
export function applyPreferences(prefs: Preferences): void {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  if (!html) return;

  html.setAttribute('data-a11y-fontscale', String(prefs.fontScale));
  html.setAttribute('data-a11y-contrast', prefs.contrast);
  html.setAttribute('data-a11y-focus', prefs.focusRing ? 'enhanced' : 'default');
  html.setAttribute('data-a11y-links', prefs.linkUnderline ? 'underline' : 'default');
  html.setAttribute('data-a11y-motion', prefs.motion);
  html.setAttribute('data-a11y-dyslexia', String(prefs.dyslexiaFont));
  html.setAttribute('data-a11y-reading', String(prefs.readingMode));
  html.setAttribute('data-a11y-lineheight', prefs.lineHeight);
  html.setAttribute('data-a11y-letterspacing', prefs.letterSpacing);
  html.setAttribute('data-a11y-textalign', prefs.textAlign);
  html.setAttribute('data-a11y-readingwidth', prefs.readingWidth);
  html.setAttribute('data-a11y-headings', String(prefs.highlightHeadings));
  html.setAttribute('data-a11y-saturation', prefs.saturation);
  html.setAttribute('data-a11y-cursor', prefs.cursorSize);
  html.setAttribute('data-a11y-hideimages', String(prefs.hideImages));
  html.setAttribute('data-a11y-readaloud', String(prefs.readAloud));
  html.setAttribute('data-a11y-readingmask', String(prefs.readingMask));
  html.setAttribute('data-a11y-magnifier', String(prefs.magnifier));
  html.setAttribute('data-a11y-stopautoplay', String(prefs.stopAutoplay));

  _injectHostStyles(prefs);
  applyReadAloud(prefs.readAloud);
  applyAutoplayControl(prefs.stopAutoplay);
}

let _autoplayObserver: MutationObserver | null = null;

function _pauseAutoplayMedia(root: ParentNode): void {
  const media = root.querySelectorAll<HTMLMediaElement>('video[autoplay], audio[autoplay]');
  media.forEach((el) => {
    if (!el.paused) el.pause();
    el.removeAttribute('autoplay');
  });
}

/**
 * When `enabled`, pauses all autoplaying <video>/<audio> on the host page
 * immediately and watches for dynamically-added ones via MutationObserver
 * (WCAG 2.2.2 Pause, Stop, Hide). Idempotent — safe to call on every
 * preference change. When `enabled` is false, disconnects the observer —
 * does NOT resume media that was already paused (resuming without user
 * intent would be its own accessibility violation). Cross-origin iframes
 * (e.g. an embedded YouTube player) cannot be controlled — out of scope.
 */
export function applyAutoplayControl(enabled: boolean): void {
  if (typeof document === 'undefined') return;
  if (!enabled) {
    _autoplayObserver?.disconnect();
    _autoplayObserver = null;
    return;
  }
  _pauseAutoplayMedia(document);
  if (_autoplayObserver) return; // already watching
  _autoplayObserver = new MutationObserver((mutations) => {
    for (const m of mutations) {
      m.addedNodes.forEach((node) => {
        if (node.nodeType !== 1) return;
        const el = node as HTMLElement;
        if (el.matches?.('video[autoplay], audio[autoplay]')) {
          _pauseAutoplayMedia(el.parentNode ?? document);
        } else {
          _pauseAutoplayMedia(el);
        }
      });
    }
  });
  _autoplayObserver.observe(document.body, { childList: true, subtree: true });
}

const READ_ALOUD_LISTENER_FLAG = '__blakfyReadAloudBound';
const _readAloudEnabledRef = { current: false };

/**
 * When `enabled`, binds a click listener on `document` that reads the
 * clicked element's text via the Web Speech API. Idempotent — safe to
 * call on every preference change. Reads `document.documentElement.lang`
 * at speak-time rather than threading a locale param through
 * `applyPreferences` (simpler, no API signature change).
 */
export function applyReadAloud(enabled: boolean): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  if (!('speechSynthesis' in window)) return; // graceful no-op, no diagnostics spam
  const doc = document as unknown as Record<string, unknown>;
  if (!doc[READ_ALOUD_LISTENER_FLAG]) {
    document.addEventListener('click', (e) => {
      if (!_readAloudEnabledRef.current) return;
      const target = e.target as HTMLElement | null;
      if (!target || target.closest('blakfy-a11y-root')) return; // never read our own panel
      const text = target.innerText?.trim();
      if (!text) return;
      window.speechSynthesis.cancel(); // stop any prior utterance
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = document.documentElement.lang || 'en';
      window.speechSynthesis.speak(utter);
    });
    doc[READ_ALOUD_LISTENER_FLAG] = true;
  }
  if (!enabled && _readAloudEnabledRef.current && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  _readAloudEnabledRef.current = enabled;
}

/**
 * Probe the user agent for relevant OS-level accessibility preferences via
 * `matchMedia`. SSR-safe: returns sensible defaults on the server.
 */
export function detectOSPreferences(): OSPreferences {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return {
      reducedMotion: false,
      contrast: 'normal',
      colorScheme: 'no-preference',
      reducedTransparency: false,
      reducedData: false,
    };
  }
  let reducedMotion = false;
  let contrast: OSPreferences['contrast'] = 'normal';
  let colorScheme: OSPreferences['colorScheme'] = 'no-preference';
  let reducedTransparency = false;
  let reducedData = false;
  try {
    reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    /* matchMedia may throw with malformed query in old engines */
  }
  try {
    if (window.matchMedia('(prefers-contrast: more)').matches) contrast = 'more';
    else if (window.matchMedia('(prefers-contrast: less)').matches) contrast = 'less';
  } catch {
    /* ignore */
  }
  try {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) colorScheme = 'dark';
    else if (window.matchMedia('(prefers-color-scheme: light)').matches) colorScheme = 'light';
  } catch {
    /* ignore */
  }
  try {
    reducedTransparency = window.matchMedia('(prefers-reduced-transparency: reduce)').matches;
  } catch {
    /* Safari/Chromium ship it; engines that do not, keep the default */
  }
  try {
    reducedData = window.matchMedia('(prefers-reduced-data: reduce)').matches;
  } catch {
    /* Chromium ships it; engines that do not, keep the default */
  }
  return { reducedMotion, contrast, colorScheme, reducedTransparency, reducedData };
}

/**
 * Reflect the OS-level signals that have no widget toggle of their own onto
 * `<html>`, so a host stylesheet can react to them the same way it reacts to
 * the `data-a11y-*` attributes written by `applyPreferences`. The widget's own
 * stylesheet is scoped to its shadow root and reads them off the host element
 * instead (`mount.ts` mirrors them there). SSR-safe.
 */
export function applyOSPreferences(osPrefs: OSPreferences): void {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  if (!html) return;
  html.setAttribute('data-a11y-reduced-transparency', String(osPrefs.reducedTransparency));
  html.setAttribute('data-a11y-reduced-data', String(osPrefs.reducedData));
}

/**
 * Best-effort heuristic that scans accessible stylesheets for `!important`
 * declarations targeting `body` / `a` color or background-color.
 */
export function detectHostCSSConflicts(): boolean {
  if (typeof document === 'undefined') return false;
  const sheets = document.styleSheets;
  if (!sheets) return false;
  for (let i = 0; i < sheets.length; i++) {
    const sheet = sheets[i];
    if (!sheet) continue;
    let rules: CSSRuleList | undefined;
    try {
      rules = sheet.cssRules ?? undefined;
    } catch {
      continue;
    }
    if (!rules) continue;
    for (let j = 0; j < rules.length; j++) {
      const rule = rules[j];
      if (!rule || rule.type !== 1 /* CSSRule.STYLE_RULE */) continue;
      const styleRule = rule as CSSStyleRule;
      const selector = styleRule.selectorText ?? '';
      if (!_selectorHits(selector)) continue;
      const decl = styleRule.style;
      if (!decl) continue;
      if (
        decl.getPropertyPriority('color') === 'important' ||
        decl.getPropertyPriority('background-color') === 'important' ||
        decl.getPropertyPriority('background') === 'important'
      ) {
        return true;
      }
    }
  }
  return false;
}

function _selectorHits(selector: string): boolean {
  const lower = selector.toLowerCase();
  return /(^|[\s,>+~])(body|a)([\s,:.#[>+~]|$)/.test(lower);
}

/**
 * Subscribe to changes on the three OS preferences. Returns an unsubscribe
 * function. SSR-safe.
 */
export function subscribeToOSChanges(cb: (osPrefs: OSPreferences) => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return () => {
      /* no-op SSR */
    };
  }
  const queries = [
    '(prefers-reduced-motion: reduce)',
    '(prefers-contrast: more)',
    '(prefers-contrast: less)',
    '(prefers-color-scheme: dark)',
    '(prefers-color-scheme: light)',
    '(prefers-reduced-transparency: reduce)',
    '(prefers-reduced-data: reduce)',
  ];
  const lists: MediaQueryList[] = [];
  const handler = (): void => {
    cb(detectOSPreferences());
  };
  for (const q of queries) {
    try {
      const list = window.matchMedia(q);
      if (typeof list.addEventListener === 'function') {
        list.addEventListener('change', handler);
      } else if (
        typeof (list as MediaQueryList & { addListener?: (l: () => void) => void }).addListener ===
        'function'
      ) {
        (list as MediaQueryList & { addListener: (l: () => void) => void }).addListener(handler);
      }
      lists.push(list);
    } catch {
      /* ignore unsupported queries */
    }
  }
  return () => {
    for (const list of lists) {
      try {
        if (typeof list.removeEventListener === 'function') {
          list.removeEventListener('change', handler);
        } else if (
          typeof (list as MediaQueryList & { removeListener?: (l: () => void) => void })
            .removeListener === 'function'
        ) {
          (list as MediaQueryList & { removeListener: (l: () => void) => void }).removeListener(
            handler,
          );
        }
      } catch {
        /* ignore */
      }
    }
  };
}
