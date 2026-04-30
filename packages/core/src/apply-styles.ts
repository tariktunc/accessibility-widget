// @blakfy/a11y-core — apply-styles.ts
import type { Preferences } from './types';

/** Result shape returned by `detectOSPreferences`. */
export interface OSPreferences {
  reducedMotion: boolean;
  contrast: 'normal' | 'more' | 'less';
  colorScheme: 'light' | 'dark' | 'no-preference';
}

const HOST_STYLE_ID = 'blakfy-a11y-host';

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
    rules.push(`html p, html li, html dd, html dt, html span, html div { line-height: 1.8 !important; }`);
  } else if (prefs.lineHeight === 'large') {
    rules.push(`html p, html li, html dd, html dt, html span, html div { line-height: 2.4 !important; }`);
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
  html.setAttribute('data-a11y-headings', String(prefs.highlightHeadings));
  html.setAttribute('data-a11y-saturation', prefs.saturation);
  html.setAttribute('data-a11y-cursor', prefs.cursorSize);
  html.setAttribute('data-a11y-hideimages', String(prefs.hideImages));

  _injectHostStyles(prefs);
}

/**
 * Probe the user agent for relevant OS-level accessibility preferences via
 * `matchMedia`. SSR-safe: returns sensible defaults on the server.
 */
export function detectOSPreferences(): OSPreferences {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return { reducedMotion: false, contrast: 'normal', colorScheme: 'no-preference' };
  }
  let reducedMotion = false;
  let contrast: OSPreferences['contrast'] = 'normal';
  let colorScheme: OSPreferences['colorScheme'] = 'no-preference';
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
  return { reducedMotion, contrast, colorScheme };
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
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules ?? null;
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
  return /(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(lower);
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
      } else if (typeof (list as MediaQueryList & { addListener?: (l: () => void) => void }).addListener === 'function') {
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
