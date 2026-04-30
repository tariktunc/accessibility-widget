// @blakfy/a11y-core — apply-styles.ts
import type { Preferences } from './types';

/** Result shape returned by `detectOSPreferences`. */
export interface OSPreferences {
  reducedMotion: boolean;
  contrast: 'normal' | 'more' | 'less';
  colorScheme: 'light' | 'dark' | 'no-preference';
}

/**
 * Write the 7 locked `data-a11y-*` attributes onto `<html>`. SSR-safe.
 * Attribute string contract is locked in STABLE-API.md §3.
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
 * declarations targeting `body` / `a` color or background-color — a common
 * source of contrast/link customization conflicts. Cross-origin stylesheets
 * throw on `cssRules` access; those are skipped silently.
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
      // SecurityError on cross-origin sheets — skip.
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
  // Cheap match: the selector must contain a top-level `body` or `a` token.
  const lower = selector.toLowerCase();
  return /(^|[\s,>+~])(body|a)([\s,:.\[#>+~]|$)/.test(lower);
}

/**
 * Subscribe to changes on the three OS preferences. Returns an unsubscribe
 * function. SSR-safe: returns a no-op on the server.
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
        // Legacy Safari < 14
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
