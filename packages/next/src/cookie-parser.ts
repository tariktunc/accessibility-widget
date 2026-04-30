// @blakfy/accessibility-widget-next — cookie-parser.ts (internal)
//
// Pure server-side parser that converts the persisted preferences cookie
// (URL-encoded JSON `PreferencesRecord`) into the locked `data-a11y-*`
// attribute strings defined in `docs/STABLE-API.md` §3.
//
// Design notes:
//   - No imports from `next/*` so this module stays trivially testable.
//   - Validation is inlined (mirrors `safeMergePrefs` from core) instead of
//     pulling the runtime schema/zod, because this code paths runs on every
//     RSC render and we want to keep the dependency surface minimal.
//   - Always returns a fully-populated `ServerSideAttrs`; on any failure we
//     fall back to defaults from `DEFAULT_PREFS`.

import { DEFAULT_PREFS, type Preferences } from '@blakfy/a11y-core';

/**
 * Locked `data-a11y-*` attribute set rendered onto `<html>` server-side.
 *
 * Order and naming match `docs/STABLE-API.md` §3 — do not rename without a
 * major bump.
 */
export type ServerSideAttrs = {
  'data-a11y-fontscale': string;
  'data-a11y-contrast': string;
  'data-a11y-focus': string;
  'data-a11y-links': string;
  'data-a11y-motion': string;
  'data-a11y-dyslexia': string;
  'data-a11y-reading': string;
};

function isFontScale(v: unknown): v is Preferences['fontScale'] {
  return v === 100 || v === 110 || v === 125;
}

function isContrast(v: unknown): v is Preferences['contrast'] {
  return v === 'normal' || v === 'high';
}

function isMotion(v: unknown): v is Preferences['motion'] {
  return v === 'auto' || v === 'reduce';
}

function isBoolean(v: unknown): v is boolean {
  return typeof v === 'boolean';
}

function _validatePrefs(input: unknown): Preferences {
  if (input == null || typeof input !== 'object') return { ...DEFAULT_PREFS };
  const raw = input as Record<string, unknown>;
  return {
    fontScale: isFontScale(raw.fontScale) ? raw.fontScale : DEFAULT_PREFS.fontScale,
    contrast: isContrast(raw.contrast) ? raw.contrast : DEFAULT_PREFS.contrast,
    focusRing: isBoolean(raw.focusRing) ? raw.focusRing : DEFAULT_PREFS.focusRing,
    linkUnderline: isBoolean(raw.linkUnderline)
      ? raw.linkUnderline
      : DEFAULT_PREFS.linkUnderline,
    motion: isMotion(raw.motion) ? raw.motion : DEFAULT_PREFS.motion,
    dyslexiaFont: isBoolean(raw.dyslexiaFont)
      ? raw.dyslexiaFont
      : DEFAULT_PREFS.dyslexiaFont,
    readingMode: isBoolean(raw.readingMode)
      ? raw.readingMode
      : DEFAULT_PREFS.readingMode,
  };
}

function _toAttrs(prefs: Preferences): ServerSideAttrs {
  return {
    'data-a11y-fontscale': String(prefs.fontScale),
    'data-a11y-contrast': prefs.contrast,
    'data-a11y-focus': prefs.focusRing ? 'enhanced' : 'default',
    'data-a11y-links': prefs.linkUnderline ? 'underline' : 'default',
    'data-a11y-motion': prefs.motion,
    'data-a11y-dyslexia': prefs.dyslexiaFont ? 'true' : 'false',
    'data-a11y-reading': prefs.readingMode ? 'true' : 'false',
  };
}

/**
 * Parse a cookie value (URL-encoded JSON `PreferencesRecord`) into the
 * locked `data-a11y-*` attribute set. Returns defaults on any failure
 * (missing cookie, malformed JSON, schema mismatch).
 *
 * @param cookieValue Raw cookie value as returned by `cookies().get()?.value`.
 * @returns Fully-populated `ServerSideAttrs`.
 */
export function parseServerCookie(cookieValue: string | undefined): ServerSideAttrs {
  if (cookieValue == null || cookieValue === '') {
    return _toAttrs({ ...DEFAULT_PREFS });
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(cookieValue);
  } catch {
    // Not URL-encoded? Try the raw value — some hosts store as-is.
    decoded = cookieValue;
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(decoded);
  } catch {
    return _toAttrs({ ...DEFAULT_PREFS });
  }

  if (parsed == null || typeof parsed !== 'object') {
    return _toAttrs({ ...DEFAULT_PREFS });
  }

  const record = parsed as { prefs?: unknown };
  const prefs = _validatePrefs(record.prefs);
  return _toAttrs(prefs);
}
