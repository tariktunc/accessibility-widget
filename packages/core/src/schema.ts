// Hand-rolled validators (no Zod) — keeps bundle ≤18KB gz per ADR-002
// @blakfy/a11y-core — schema.ts
import {
  DEFAULT_PREFS,
  LOCALE_CODES,
  STORAGE_VERSION,
  type Contrast,
  type CursorSize,
  type FontScale,
  type LetterSpacing,
  type LineHeight,
  type Locale,
  type Motion,
  type Position,
  type Preferences,
  type PreferencesRecord,
  type Saturation,
  type TextAlign,
  type Theme,
  type WidgetOptions,
} from './types';

/** Default `WidgetOptions` returned when input is invalid or missing. */
const DEFAULT_OPTIONS: WidgetOptions = {
  locale: 'en',
  theme: 'auto',
  position: 'bottom-left',
  font: '',
  debug: false,
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function pickFontScale(v: unknown): FontScale {
  return v === 100 || v === 110 || v === 125 ? v : DEFAULT_PREFS.fontScale;
}

function pickContrast(v: unknown): Contrast {
  return v === 'normal' || v === 'high' ? v : DEFAULT_PREFS.contrast;
}

function pickBoolean(v: unknown, fallback: boolean): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

function pickMotion(v: unknown): Motion {
  return v === 'auto' || v === 'reduce' ? v : DEFAULT_PREFS.motion;
}

function pickLineHeight(v: unknown): LineHeight {
  return v === 'normal' || v === 'medium' || v === 'large' ? v : DEFAULT_PREFS.lineHeight;
}

function pickLetterSpacing(v: unknown): LetterSpacing {
  return v === 'normal' || v === 'medium' || v === 'large' ? v : DEFAULT_PREFS.letterSpacing;
}

function pickTextAlign(v: unknown): TextAlign {
  return v === 'default' || v === 'left' || v === 'center' || v === 'right' ? v : DEFAULT_PREFS.textAlign;
}

function pickSaturation(v: unknown): Saturation {
  return v === 'normal' || v === 'high' || v === 'low' || v === 'none' ? v : DEFAULT_PREFS.saturation;
}

function pickCursorSize(v: unknown): CursorSize {
  return v === 'default' || v === 'large-dark' || v === 'large-light' ? v : DEFAULT_PREFS.cursorSize;
}

function pickLocale(v: unknown): Locale {
  return typeof v === 'string' && (LOCALE_CODES as readonly string[]).includes(v)
    ? (v as Locale)
    : 'en';
}

function pickTheme(v: unknown): Theme {
  return v === 'light' || v === 'dark' || v === 'auto' ? v : 'auto';
}

function pickPosition(v: unknown): Position {
  return v === 'bottom-left' ||
    v === 'bottom-right' ||
    v === 'top-left' ||
    v === 'top-right'
    ? v
    : 'bottom-left';
}

function pickString(v: unknown, fallback: string): string {
  return typeof v === 'string' ? v : fallback;
}

/**
 * Merge unknown input with `DEFAULT_PREFS` and return a fully-valid
 * `Preferences`. Never throws — invalid fields are replaced with defaults.
 */
export function safeMergePrefs(input: unknown): Preferences {
  if (!isPlainObject(input)) return { ...DEFAULT_PREFS };
  return {
    fontScale: pickFontScale(input.fontScale),
    contrast: pickContrast(input.contrast),
    focusRing: pickBoolean(input.focusRing, DEFAULT_PREFS.focusRing),
    linkUnderline: pickBoolean(input.linkUnderline, DEFAULT_PREFS.linkUnderline),
    motion: pickMotion(input.motion),
    dyslexiaFont: pickBoolean(input.dyslexiaFont, DEFAULT_PREFS.dyslexiaFont),
    readingMode: pickBoolean(input.readingMode, DEFAULT_PREFS.readingMode),
    lineHeight: pickLineHeight(input.lineHeight),
    letterSpacing: pickLetterSpacing(input.letterSpacing),
    textAlign: pickTextAlign(input.textAlign),
    highlightHeadings: pickBoolean(input.highlightHeadings, DEFAULT_PREFS.highlightHeadings),
    saturation: pickSaturation(input.saturation),
    cursorSize: pickCursorSize(input.cursorSize),
    hideImages: pickBoolean(input.hideImages, DEFAULT_PREFS.hideImages),
  };
}

/**
 * Parse a candidate `PreferencesRecord`. Returns `null` when the input is not
 * an object — otherwise per-field type guards salvage what they can and return
 * a sane record.
 */
export function safeParseRecord(input: unknown): PreferencesRecord | null {
  if (!isPlainObject(input)) return null;
  const prefs = safeMergePrefs(input.prefs);
  const version = pickString(input.version, STORAGE_VERSION);
  const timestamp = pickString(input.timestamp, new Date().toISOString());
  // Record `locale` is a free-form string per STABLE-API §5.2 — but we still
  // fall back to 'en' when missing/invalid so consumers never see undefined.
  const locale = pickString(input.locale, 'en');
  return { prefs, version, timestamp, locale };
}

/** Validate a partial `WidgetOptions` patch — invalid fields drop to defaults. */
export function safeMergeOptions(input: unknown): WidgetOptions {
  if (!isPlainObject(input)) return { ...DEFAULT_OPTIONS };
  return {
    locale: pickLocale(input.locale),
    theme: pickTheme(input.theme),
    position: pickPosition(input.position),
    font: pickString(input.font, ''),
    debug: pickBoolean(input.debug, false),
  };
}
