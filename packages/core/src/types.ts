// @blakfy/a11y-core — types.ts

/** Font scaling percentage values. */
export type FontScale = 100 | 110 | 125;

/** Color contrast mode. */
export type Contrast = 'normal' | 'high';

/** Motion preference. */
export type Motion = 'auto' | 'reduce';

/** Line height preference. */
export type LineHeight = 'normal' | 'medium' | 'large';

/** Letter spacing preference. */
export type LetterSpacing = 'normal' | 'medium' | 'large';

/** Text alignment preference. */
export type TextAlign = 'default' | 'left' | 'center' | 'right';

/** Color saturation filter. */
export type Saturation = 'normal' | 'high' | 'low' | 'none';

/** Custom cursor size. */
export type CursorSize = 'default' | 'large-dark' | 'large-light';

/** Locked locale codes shipped with v1. */
export type Locale = 'tr' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'ar' | 'he' | 'ru';

/** Visual theme for the widget UI. */
export type Theme = 'light' | 'dark' | 'auto';

/** FAB anchor on the page. */
export type Position = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

/** FAB icon style preset. */
export type IconStyle = 'walking' | 'access' | 'eye';

/** End-user accessibility preferences. */
export interface Preferences {
  fontScale: FontScale;
  contrast: Contrast;
  focusRing: boolean;
  linkUnderline: boolean;
  motion: Motion;
  dyslexiaFont: boolean;
  readingMode: boolean;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  textAlign: TextAlign;
  highlightHeadings: boolean;
  saturation: Saturation;
  cursorSize: CursorSize;
  hideImages: boolean;
}

/** Persisted preferences envelope written to localStorage and cookie. */
export interface PreferencesRecord {
  prefs: Preferences;
  version: string;
  timestamp: string;
  locale: string;
}

/** Runtime configuration for the widget shell. */
export interface WidgetOptions {
  locale: Locale;
  theme: Theme;
  position: Position;
  font: string;
  debug: boolean;
}

/** Listener callback invoked whenever preferences change. */
export type PreferencesChangeHandler = (record: PreferencesRecord) => void;

/** Localized UI strings shipped per locale. */
export interface Translation {
  fab: {
    label: string;
  };
  panel: {
    title: string;
    description: string;
    reset: string;
    close: string;
    disclaimer: string;
    theme: {
      label: string;
      auto: string;
      light: string;
      dark: string;
    };
    branding: string;
    sections: {
      profiles: string;
      text: string;
      vision: string;
      navigation: string;
      motion: string;
    };
    profiles: {
      epilepsy: { name: string; description: string };
      vision: { name: string; description: string };
      cognitive: { name: string; description: string };
      adhd: { name: string; description: string };
      blindness: { name: string; description: string };
    };
    preferences: {
      fontScale: {
        title: string;
        description: string;
        values: { '100': string; '110': string; '125': string };
      };
      lineHeight: {
        title: string;
        description: string;
        values: { normal: string; medium: string; large: string };
      };
      letterSpacing: {
        title: string;
        description: string;
        values: { normal: string; medium: string; large: string };
      };
      textAlign: {
        title: string;
        description: string;
        values: { default: string; left: string; center: string; right: string };
      };
      highlightHeadings: { title: string; description: string };
      contrast: { title: string; description: string };
      saturation: {
        title: string;
        description: string;
        values: { normal: string; high: string; low: string; none: string };
      };
      focusRing: { title: string; description: string };
      linkUnderline: { title: string; description: string };
      cursorSize: {
        title: string;
        description: string;
        values: { default: string; largeDark: string; largeLight: string };
      };
      motion: { title: string; description: string };
      dyslexiaFont: { title: string; description: string; note: string };
      readingMode: { title: string; description: string };
      hideImages: { title: string; description: string };
    };
  };
}

/** Severity of a diagnostics issue. */
export type IssueLevel = 'info' | 'warn' | 'error';

/** Single diagnostics issue persisted in the snapshot. */
export interface Issue {
  level: IssueLevel;
  code: string;
  timestamp: string;
  msg: string;
  extra?: Record<string, unknown>;
}

/** Full diagnostics snapshot returned from `diagnostics()`. */
export interface DiagnosticsSnapshot {
  version: string;
  locale: string;
  theme: string;
  storage: {
    version: string;
    migratedFrom: string | null;
    keysFound: Array<'localStorage' | 'cookie'>;
  };
  osPreferences: {
    reducedMotion: boolean;
    contrast: 'normal' | 'more' | 'less';
    colorScheme: 'light' | 'dark' | 'no-preference';
  };
  performance: {
    mountTimeMs: number;
    bundleSizeGz: number;
    timeToFirstClick: number | null;
  };
  issues: Array<{
    level: IssueLevel;
    code: string;
    timestamp: string;
    msg: string;
  }>;
  config: WidgetOptions;
  timestamp: string;
}

/** localStorage / cookie key used to persist preferences. */
export const STORAGE_KEY = 'blakfy_a11y_prefs';

/** Cookie key (matches STORAGE_KEY by design). */
export const COOKIE_KEY = 'blakfy_a11y_prefs';

/** Cookie expiry in days. */
export const COOKIE_DAYS = 365;

/** Schema version for the persisted PreferencesRecord. */
export const STORAGE_VERSION = '1.0.0';

/** Locked custom event names (v1 contract). */
export const EVENT_NAMES = {
  READY: 'blakfy:a11y:ready',
  CHANGE: 'blakfy:a11y:change',
  OPEN: 'blakfy:a11y:open',
  CLOSE: 'blakfy:a11y:close',
} as const;

/** Default Preferences applied to new users and on reset. */
export const DEFAULT_PREFS: Preferences = {
  fontScale: 100,
  contrast: 'normal',
  focusRing: false,
  linkUnderline: false,
  motion: 'auto',
  dyslexiaFont: false,
  readingMode: false,
  lineHeight: 'normal',
  letterSpacing: 'normal',
  textAlign: 'default',
  highlightHeadings: false,
  saturation: 'normal',
  cursorSize: 'default',
  hideImages: false,
};

/** Locked ordered list of supported locale codes. */
export const LOCALE_CODES = ['tr', 'en', 'de', 'fr', 'es', 'it', 'ar', 'he', 'ru'] as const;

/** Locale codes whose script direction is right-to-left. */
export const RTL_LOCALES = ['ar', 'he'] as const;

/** Diagnostics issue codes raised by core. */
export const ISSUE_CODES = {
  INITIALIZED: 'INITIALIZED',
  OPENDYSLEXIC_CDN_MISSING: 'OPENDYSLEXIC_CDN_MISSING',
  STORAGE_MIGRATED: 'STORAGE_MIGRATED',
  STORAGE_PARSE_ERROR: 'STORAGE_PARSE_ERROR',
  SSR_HYDRATION_MISMATCH: 'SSR_HYDRATION_MISMATCH',
  HOST_CSS_IMPORTANT_CONFLICT: 'HOST_CSS_IMPORTANT_CONFLICT',
  LOCALE_FETCH_FAILED: 'LOCALE_FETCH_FAILED',
  CDN_VERSION_MISMATCH: 'CDN_VERSION_MISMATCH',
  OS_PREFERS_REDUCED_MOTION: 'OS_PREFERS_REDUCED_MOTION',
  OS_PREFERS_CONTRAST_MORE: 'OS_PREFERS_CONTRAST_MORE',
  OS_PREFERS_COLOR_SCHEME_DARK: 'OS_PREFERS_COLOR_SCHEME_DARK',
} as const;

/** Issue code identifier — keys of `ISSUE_CODES`. */
export type IssueCode = keyof typeof ISSUE_CODES;
