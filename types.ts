export type FontScale = 100 | 110 | 125;
export type Contrast = 'normal' | 'high';
export type Motion = 'auto' | 'reduce';

export type Preferences = {
  fontScale: FontScale;
  contrast: Contrast;
  focusRing: boolean;
  linkUnderline: boolean;
  motion: Motion;
  dyslexiaFont: boolean;
  readingMode: boolean;
};

export type PreferencesRecord = {
  prefs: Preferences;
  version: string;
  timestamp: string;
  locale: string;
};

export type Locale =
  | 'tr' | 'en' | 'de' | 'fr' | 'es' | 'it' | 'ar' | 'he' | 'ru';

export type Theme = 'light' | 'dark' | 'auto';

export type Position = 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';

export type IconStyle = 'walking' | 'access' | 'eye';

export type PreferencesChangeHandler = (record: PreferencesRecord) => void;

export type Translation = {
  fab: {
    label: string;
  };
  panel: {
    title: string;
    description: string;
    reset: string;
    close: string;
    disclaimer: string;
    preferences: {
      fontScale: { title: string; description: string; values: { '100': string; '110': string; '125': string } };
      contrast: { title: string; description: string };
      focusRing: { title: string; description: string };
      linkUnderline: { title: string; description: string };
      motion: { title: string; description: string };
      dyslexiaFont: { title: string; description: string; note: string };
      readingMode: { title: string; description: string };
    };
  };
};
