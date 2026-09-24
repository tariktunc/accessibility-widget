// Hand-rolled validators (no Zod) — keeps bundle ≤18KB gz per ADR-002
// @blakfy/a11y-core — schema.ts
import { addIssue } from './diagnostics';
import {
  DEFAULT_PREFS,
  LOCALE_CODES,
  STORAGE_VERSION,
  type Contrast,
  type CursorSize,
  type FontScale,
  type IconStyle,
  type LetterSpacing,
  type LineHeight,
  type Locale,
  type Motion,
  type Position,
  type Preferences,
  type PreferencesRecord,
  type Saturation,
  type TextAlign,
  type ReadingWidth,
  type Theme,
  type WidgetOptions,
} from './types';

function warnInvalid(field: string, received: unknown, fallback: unknown): void {
  if (received === undefined) return;
  addIssue(
    'warn',
    'INVALID_PREF_VALUE',
    `Invalid ${field} value received: ${JSON.stringify(received)} — falling back to '${String(fallback)}'.`,
    { field, received },
  );
}

/** Default `WidgetOptions` returned when input is invalid or missing. */
const DEFAULT_OPTIONS: WidgetOptions = {
  locale: 'en',
  theme: 'light',
  position: 'bottom-left',
  font: '',
  debug: false,
  iconStyle: 'access',
  keyboardShortcut: true,
};

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function pickFontScale(v: unknown): FontScale {
  if (v === 100 || v === 110 || v === 125) return v;
  warnInvalid('fontScale', v, DEFAULT_PREFS.fontScale);
  return DEFAULT_PREFS.fontScale;
}

function pickContrast(v: unknown): Contrast {
  if (v === 'normal' || v === 'high') return v;
  warnInvalid('contrast', v, DEFAULT_PREFS.contrast);
  return DEFAULT_PREFS.contrast;
}

function pickBoolean(v: unknown, fallback: boolean): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

function pickMotion(v: unknown): Motion {
  if (v === 'auto' || v === 'reduce') return v;
  warnInvalid('motion', v, DEFAULT_PREFS.motion);
  return DEFAULT_PREFS.motion;
}

function pickLineHeight(v: unknown): LineHeight {
  if (v === 'normal' || v === 'medium' || v === 'large') return v;
  warnInvalid('lineHeight', v, DEFAULT_PREFS.lineHeight);
  return DEFAULT_PREFS.lineHeight;
}

function pickLetterSpacing(v: unknown): LetterSpacing {
  if (v === 'normal' || v === 'medium' || v === 'large') return v;
  warnInvalid('letterSpacing', v, DEFAULT_PREFS.letterSpacing);
  return DEFAULT_PREFS.letterSpacing;
}

function pickTextAlign(v: unknown): TextAlign {
  if (v === 'default' || v === 'left' || v === 'center' || v === 'right') return v;
  warnInvalid('textAlign', v, DEFAULT_PREFS.textAlign);
  return DEFAULT_PREFS.textAlign;
}

function pickReadingWidth(v: unknown): ReadingWidth {
  if (v === 'default' || v === 'narrow' || v === 'narrower') return v;
  warnInvalid('readingWidth', v, DEFAULT_PREFS.readingWidth);
  return DEFAULT_PREFS.readingWidth;
}

function pickSaturation(v: unknown): Saturation {
  if (v === 'normal' || v === 'high' || v === 'low' || v === 'none') return v;
  warnInvalid('saturation', v, DEFAULT_PREFS.saturation);
  return DEFAULT_PREFS.saturation;
}

function pickCursorSize(v: unknown): CursorSize {
  if (v === 'default' || v === 'large-dark' || v === 'large-light') return v;
  warnInvalid('cursorSize', v, DEFAULT_PREFS.cursorSize);
  return DEFAULT_PREFS.cursorSize;
}

function pickLocale(v: unknown): Locale {
  return typeof v === 'string' && (LOCALE_CODES as readonly string[]).includes(v)
    ? (v as Locale)
    : 'en';
}

function pickTheme(v: unknown): Theme {
  return v === 'light' || v === 'dark' || v === 'auto' ? v : DEFAULT_OPTIONS.theme;
}

function pickPosition(v: unknown): Position {
  return v === 'bottom-left' || v === 'bottom-right' || v === 'top-left' || v === 'top-right'
    ? v
    : 'bottom-left';
}

function pickString(v: unknown, fallback: string): string {
  return typeof v === 'string' ? v : fallback;
}

function pickIconStyle(v: unknown): IconStyle {
  return v === 'walking' || v === 'access' || v === 'eye' ? v : DEFAULT_OPTIONS.iconStyle;
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
    readingWidth: pickReadingWidth(input.readingWidth),
    highlightHeadings: pickBoolean(input.highlightHeadings, DEFAULT_PREFS.highlightHeadings),
    saturation: pickSaturation(input.saturation),
    cursorSize: pickCursorSize(input.cursorSize),
    hideImages: pickBoolean(input.hideImages, DEFAULT_PREFS.hideImages),
    readAloud: pickBoolean(input.readAloud, DEFAULT_PREFS.readAloud),
    readingMask: pickBoolean(input.readingMask, DEFAULT_PREFS.readingMask),
    magnifier: pickBoolean(input.magnifier, DEFAULT_PREFS.magnifier),
    stopAutoplay: pickBoolean(input.stopAutoplay, DEFAULT_PREFS.stopAutoplay),
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
    iconStyle: pickIconStyle(input.iconStyle),
    keyboardShortcut: pickBoolean(input.keyboardShortcut, DEFAULT_OPTIONS.keyboardShortcut),
  };
}
