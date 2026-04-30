// @blakfy/a11y-core — preferences.ts
import { applyPreferences } from './apply-styles';
import { addIssue } from './diagnostics';
import { emit } from './events';
import { safeMergePrefs, safeParseRecord } from './schema';
import {
  COOKIE_DAYS,
  COOKIE_KEY,
  DEFAULT_PREFS,
  EVENT_NAMES,
  STORAGE_KEY,
  STORAGE_VERSION,
  type Preferences,
  type PreferencesRecord,
} from './types';

interface ReadResult {
  source: 'localStorage' | 'cookie' | null;
  record: PreferencesRecord | null;
  migrated: boolean;
  migratedFrom: string | null;
  keysFound: Array<'localStorage' | 'cookie'>;
}

function _hasWindow(): boolean {
  return typeof window !== 'undefined';
}

function _hasDocument(): boolean {
  return typeof document !== 'undefined';
}

function _setCookie(name: string, value: string, days: number): void {
  if (!_hasDocument()) return;
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  const secure = _hasWindow() && window.location && window.location.protocol === 'https:';
  const parts = [
    `${name}=${encodeURIComponent(value)}`,
    `expires=${d.toUTCString()}`,
    'path=/',
    'SameSite=Lax',
  ];
  if (secure) parts.push('Secure');
  document.cookie = parts.join(';');
}

function _getCookie(name: string): string | null {
  if (!_hasDocument()) return null;
  const cookieStr = document.cookie || '';
  const match = cookieStr.match(new RegExp(`(^| )${name}=([^;]+)`));
  if (!match || typeof match[2] !== 'string') return null;
  try {
    return decodeURIComponent(match[2]);
  } catch {
    return null;
  }
}

function _safeReadLocalStorage(key: string): string | null {
  if (!_hasWindow()) return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function _safeWriteLocalStorage(key: string, value: string): void {
  if (!_hasWindow()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* quota / private mode — silent */
  }
}

function _parseJSON(raw: string | null): unknown {
  if (raw == null) return null;
  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return null;
  }
}

function _migrateIfNeeded(record: PreferencesRecord): {
  record: PreferencesRecord;
  migrated: boolean;
  migratedFrom: string | null;
} {
  if (record.version === STORAGE_VERSION) {
    return { record, migrated: false, migratedFrom: null };
  }
  // TODO: add per-version migrations as schema evolves.
  // For v1 the only safe move is a defaults-merge — schema's `.catch()`
  // handles unknown fields.
  const merged: PreferencesRecord = {
    prefs: { ...DEFAULT_PREFS, ...record.prefs },
    version: STORAGE_VERSION,
    timestamp: new Date().toISOString(),
    locale: record.locale || 'en',
  };
  return { record: merged, migrated: true, migratedFrom: record.version };
}

function _readRaw(): ReadResult {
  const keysFound: Array<'localStorage' | 'cookie'> = [];

  // 1. localStorage
  const lsRaw = _safeReadLocalStorage(STORAGE_KEY);
  if (lsRaw != null) keysFound.push('localStorage');

  // 2. cookie
  const ckRaw = _getCookie(COOKIE_KEY);
  if (ckRaw != null) keysFound.push('cookie');

  let raw: string | null = null;
  let source: 'localStorage' | 'cookie' | null = null;
  if (lsRaw != null) {
    raw = lsRaw;
    source = 'localStorage';
  } else if (ckRaw != null) {
    raw = ckRaw;
    source = 'cookie';
  }

  if (raw == null) {
    return { source: null, record: null, migrated: false, migratedFrom: null, keysFound };
  }

  const parsed = _parseJSON(raw);
  if (parsed == null) {
    addIssue('error', 'STORAGE_PARSE_ERROR', `Failed to parse stored preferences from ${source}`);
    return { source, record: null, migrated: false, migratedFrom: null, keysFound };
  }

  const validated = safeParseRecord(parsed);
  if (!validated) {
    addIssue(
      'error',
      'STORAGE_PARSE_ERROR',
      `Stored preferences in ${source} did not match schema`,
    );
    return { source, record: null, migrated: false, migratedFrom: null, keysFound };
  }

  const { record, migrated, migratedFrom } = _migrateIfNeeded(validated);
  if (migrated) {
    addIssue(
      'info',
      'STORAGE_MIGRATED',
      `Storage migrated: ${migratedFrom ?? 'unknown'} → ${STORAGE_VERSION}`,
    );
  }
  return { source, record, migrated, migratedFrom, keysFound };
}

function _writeRaw(record: PreferencesRecord): void {
  const json = JSON.stringify(record);
  _safeWriteLocalStorage(STORAGE_KEY, json);
  _setCookie(COOKIE_KEY, json, COOKIE_DAYS);
}

/** Return the active `Preferences` (defaults if nothing stored). */
export function getPreferences(): Preferences {
  const result = _readRaw();
  if (result.record) return { ...DEFAULT_PREFS, ...result.record.prefs };
  return { ...DEFAULT_PREFS };
}

/** Return the full persisted `PreferencesRecord` or `null` if none exists. */
export function getPreferencesRecord(): PreferencesRecord | null {
  const result = _readRaw();
  return result.record;
}

/**
 * Merge `input` into the existing prefs, persist to both stores, **apply**
 * to `<html>` (per STABLE-API §1.1), fire `blakfy:a11y:change`, and return
 * the new record. `applyPreferences` is SSR-safe (no-ops without
 * `document`), so calling it from core is safe in non-browser environments.
 */
export function setPreferences(
  input: Partial<Preferences>,
  locale: string = 'en',
): PreferencesRecord {
  const current = getPreferences();
  const merged = safeMergePrefs({ ...current, ...input });
  const record: PreferencesRecord = {
    prefs: merged,
    version: STORAGE_VERSION,
    timestamp: new Date().toISOString(),
    locale,
  };
  _writeRaw(record);
  applyPreferences(merged);
  emit(EVENT_NAMES.CHANGE, record);
  return record;
}

/** Reset preferences to `DEFAULT_PREFS`. */
export function resetPreferences(locale: string = 'en'): PreferencesRecord {
  return setPreferences({ ...DEFAULT_PREFS }, locale);
}

/** Internal: read raw storage state for diagnostics consumers. */
export function _inspectStorage(): {
  version: string;
  migratedFrom: string | null;
  keysFound: Array<'localStorage' | 'cookie'>;
} {
  const result = _readRaw();
  return {
    version: result.record?.version ?? STORAGE_VERSION,
    migratedFrom: result.migratedFrom,
    keysFound: result.keysFound,
  };
}
