// Shared helpers for contract specs.
//
// All contract specs share the same jsdom realm. We isolate them by:
//   1. Wiping cookies + localStorage
//   2. Stripping data-a11y-* attributes from <html>
//   3. Removing the host element + any leftover script tags
//   4. Resetting window.BlakfyA11y / window.__BLAKFY_A11Y__
//
// `loadIIFE()` (re-)evaluates dist/widget.js inside the current window so
// auto-mount runs and `window.BlakfyA11y` becomes available.

import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', '..', 'dist', 'widget.js');

let _bundleSrc: string | null = null;

function _readBundle(): string {
  if (_bundleSrc) return _bundleSrc;
  _bundleSrc = readFileSync(DIST, 'utf8');
  return _bundleSrc;
}

export function resetWidgetState(): void {
  // Cookies
  if (typeof document !== 'undefined') {
    document.cookie = 'blakfy_a11y_prefs=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
  // localStorage
  try {
    window.localStorage.removeItem('blakfy_a11y_prefs');
    window.localStorage.clear();
  } catch {
    /* ignore */
  }
  // <html> data-a11y-*
  if (typeof document !== 'undefined') {
    const html = document.documentElement;
    for (const a of Array.from(html.attributes)) {
      if (a.name.startsWith('data-a11y-')) html.removeAttribute(a.name);
    }
    html.removeAttribute('lang');
    html.removeAttribute('dir');
    html.style.overflow = '';
  }
  // Remove host element
  document.querySelectorAll('blakfy-a11y-root').forEach((n) => n.remove());
  document.querySelectorAll('blakfy-a11y').forEach((n) => n.remove());
  // Strip lingering script tags from prior mounts
  document.querySelectorAll('script[data-blakfy-test]').forEach((n) => n.remove());
  // Reset globals (cannot truly delete, but clear)
  if (typeof window !== 'undefined') {
    // @ts-expect-error — best effort cleanup
    window.BlakfyA11y = undefined;
    // @ts-expect-error — best effort cleanup
    window.__BLAKFY_A11Y__ = undefined;
  }
}

/**
 * Evaluate the IIFE bundle in the current window. The IIFE registers the
 * custom element and auto-mounts on next microtask (jsdom reports
 * readyState='complete' immediately).
 */
export function loadIIFE(): void {
  const src = _readBundle();
  // Use Function() to evaluate in global scope. Eval would also work but
  // Function() avoids accidental closure over caller scope.
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  new Function(src)();
}

/**
 * Wait until window.BlakfyA11y is populated (auto-mount completes).
 * Mount is synchronous after readyState !== 'loading', but the API is
 * installed only at the very end of mount(); a small busy-wait suffices.
 */
export async function waitForApi(timeoutMs = 1000): Promise<void> {
  const start = Date.now();
  while (typeof window === 'undefined' || !window.BlakfyA11y) {
    if (Date.now() - start > timeoutMs) {
      throw new Error('window.BlakfyA11y was never installed');
    }
    await new Promise((r) => setTimeout(r, 5));
  }
}

export const LOCKED_API_KEYS = [
  'close',
  'configure',
  'diagnostics',
  'getPreferences',
  'onChange',
  'open',
  'reset',
  'setPreferences',
  'version',
] as const;

export const LOCKED_HTML_ATTRS = [
  'data-a11y-fontscale',
  'data-a11y-contrast',
  'data-a11y-focus',
  'data-a11y-links',
  'data-a11y-motion',
  'data-a11y-dyslexia',
  'data-a11y-reading',
] as const;

export const LOCKED_CSS_VARS = [
  '--blakfy-a11y-primary',
  '--blakfy-a11y-primary-hover',
  '--blakfy-a11y-primary-text',
  '--blakfy-a11y-panel-bg',
  '--blakfy-a11y-panel-text',
  '--blakfy-a11y-panel-muted',
  '--blakfy-a11y-panel-border',
  '--blakfy-a11y-panel-bg-dark',
  '--blakfy-a11y-panel-text-dark',
  '--blakfy-a11y-panel-muted-dark',
  '--blakfy-a11y-panel-border-dark',
  '--blakfy-a11y-toggle-on',
  '--blakfy-a11y-toggle-off',
  '--blakfy-a11y-focus-ring',
  '--blakfy-a11y-fab-size',
] as const;

export const LOCKED_EVENTS = [
  'blakfy:a11y:ready',
  'blakfy:a11y:change',
  'blakfy:a11y:open',
  'blakfy:a11y:close',
] as const;

export const LOCKED_ISSUE_CODES = [
  'INITIALIZED',
  'OPENDYSLEXIC_CDN_MISSING',
  'STORAGE_MIGRATED',
  'STORAGE_PARSE_ERROR',
  'SSR_HYDRATION_MISMATCH',
  'HOST_CSS_IMPORTANT_CONFLICT',
  'LOCALE_FETCH_FAILED',
  'CDN_VERSION_MISMATCH',
  'OS_PREFERS_REDUCED_MOTION',
  'OS_PREFERS_CONTRAST_MORE',
  'OS_PREFERS_COLOR_SCHEME_DARK',
] as const;
