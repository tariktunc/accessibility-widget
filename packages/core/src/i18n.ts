// @blakfy/a11y-core — i18n.ts
import en from '../locales/en.json';
import { addIssue } from './diagnostics';
import type { Locale, Translation } from './types';

const _cache = new Map<Locale, Translation>();
_cache.set('en', en as Translation);

function _isValidTranslation(input: unknown): input is Translation {
  if (!input || typeof input !== 'object') return false;
  const obj = input as Record<string, unknown>;
  const fab = obj.fab as Record<string, unknown> | undefined;
  const panel = obj.panel as Record<string, unknown> | undefined;
  if (!fab || typeof fab.label !== 'string') return false;
  if (!panel || typeof panel.title !== 'string') return false;
  return true;
}

/**
 * Lazy-load a locale's translation bundle from `${baseURL}/locales/{code}.json`.
 * On failure raises `LOCALE_FETCH_FAILED` and falls back to the bundled `en`
 * translation. Subsequent calls hit the in-memory cache.
 */
export async function loadLocale(code: Locale, baseURL: string): Promise<Translation> {
  const cached = _cache.get(code);
  if (cached) return cached;

  if (typeof fetch !== 'function') {
    addIssue('warn', 'LOCALE_FETCH_FAILED', `fetch unavailable, using en fallback for ${code}`);
    return en as Translation;
  }

  const trimmed = (baseURL || '').replace(/\/$/, '');
  const url = `${trimmed}/locales/${code}.json`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      addIssue('warn', 'LOCALE_FETCH_FAILED', `Locale fetch failed (${res.status}): ${url}`);
      return en as Translation;
    }
    const json = (await res.json()) as unknown;
    if (!_isValidTranslation(json)) {
      addIssue('warn', 'LOCALE_FETCH_FAILED', `Locale ${code} payload missing required fields`);
      return en as Translation;
    }
    _cache.set(code, json);
    return json;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    addIssue('warn', 'LOCALE_FETCH_FAILED', `Locale fetch threw for ${code}: ${msg}`);
    return en as Translation;
  }
}

/** Synchronous cache lookup. Returns null if the locale has not been loaded. */
export function getCachedLocale(code: Locale): Translation | null {
  return _cache.get(code) ?? null;
}

/** Always returns the bundled English translation. */
export function getEnglishLocale(): Translation {
  return en as Translation;
}

/** For tests: clear cached locales (preserves bundled `en`). */
export function _resetLocaleCache(): void {
  _cache.clear();
  _cache.set('en', en as Translation);
}
