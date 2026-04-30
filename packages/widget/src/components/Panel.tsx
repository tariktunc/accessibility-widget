/**
 * Main accessibility panel content.
 *
 * - Title + description (referenced by Dialog's aria-labelledby/describedby)
 * - <fieldset> wraps the 6 toggles + 1 font-scale group
 * - Font-scale rendered as role="radiogroup" with aria-pressed buttons
 * - Theme switcher: Auto / Light / Dark buttons
 * - Reset button uses 2-click confirm (red, 3-second timeout)
 *   announced via role="status" + aria-live="polite"
 * - Blakfy Studio branding link at the bottom
 */
import { useEffect, useRef, useState } from 'preact/hooks';
import type { JSX } from 'preact';
import {
  applyPreferences,
  EVENT_NAMES,
  getPreferences,
  on,
  resetPreferences,
  setPreferences,
  type FontScale,
  type Preferences,
  type Theme,
  type Translation,
} from '@blakfy/a11y-core';
import { Toggle } from './Toggle';
import { CloseIcon } from './Icons';

type Props = {
  translation: Translation;
  locale: string;
  currentTheme: Theme;
  onClose: () => void;
  onThemeChange: (theme: Theme) => void;
  titleId: string;
  descriptionId: string;
};

const FONT_SCALES: FontScale[] = [100, 110, 125];
const THEMES: Theme[] = ['auto', 'light', 'dark'];

export function Panel({ translation, locale, currentTheme, onClose, onThemeChange, titleId, descriptionId }: Props): JSX.Element {
  const t = translation.panel;
  const [prefs, setPrefs] = useState<Preferences>(() => getPreferences());
  const [resetConfirm, setResetConfirm] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Subscribe to external preference changes (e.g. window.BlakfyA11y.setPreferences).
  useEffect(() => {
    return on(EVENT_NAMES.CHANGE, (record) => {
      setPrefs(record.prefs);
    });
  }, []);

  // Cleanup confirm timer on unmount
  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]): void => {
    const next: Preferences = { ...prefs, [key]: value };
    setPrefs(next);
    setPreferences({ [key]: value }, locale);
    applyPreferences(next);
  };

  const onReset = (): void => {
    if (!resetConfirm) {
      setResetConfirm(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setResetConfirm(false);
    const record = resetPreferences(locale);
    setPrefs(record.prefs);
    applyPreferences(record.prefs);
  };

  const themeLabel = (th: Theme): string => {
    if (th === 'auto') return t.theme.auto;
    if (th === 'light') return t.theme.light;
    return t.theme.dark;
  };

  return (
    <>
      <h2 class="panel-title" id={titleId}>
        {t.title}
      </h2>
      <p class="panel-desc" id={descriptionId}>
        {t.description}
      </p>

      <button
        type="button"
        class="dialog-close"
        aria-label={t.close}
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      <fieldset class="prefs">
        <legend class="sr-only">{t.title}</legend>

        {/* Font scale (radiogroup) */}
        <div class="section" role="radiogroup" aria-label={t.preferences.fontScale.title}>
          <p class="toggle-title">{t.preferences.fontScale.title}</p>
          <p class="toggle-desc">{t.preferences.fontScale.description}</p>
          <div class="scale-buttons">
            {FONT_SCALES.map((scale) => {
              const key = String(scale) as '100' | '110' | '125';
              return (
                <button
                  key={scale}
                  type="button"
                  class="scale-btn"
                  aria-pressed={prefs.fontScale === scale}
                  onClick={() => update('fontScale', scale)}
                >
                  {t.preferences.fontScale.values[key]}
                </button>
              );
            })}
          </div>
        </div>

        <Toggle
          title={t.preferences.contrast.title}
          description={t.preferences.contrast.description}
          checked={prefs.contrast === 'high'}
          onChange={(v) => update('contrast', v ? 'high' : 'normal')}
        />
        <Toggle
          title={t.preferences.focusRing.title}
          description={t.preferences.focusRing.description}
          checked={prefs.focusRing}
          onChange={(v) => update('focusRing', v)}
        />
        <Toggle
          title={t.preferences.linkUnderline.title}
          description={t.preferences.linkUnderline.description}
          checked={prefs.linkUnderline}
          onChange={(v) => update('linkUnderline', v)}
        />
        <Toggle
          title={t.preferences.motion.title}
          description={t.preferences.motion.description}
          checked={prefs.motion === 'reduce'}
          onChange={(v) => update('motion', v ? 'reduce' : 'auto')}
        />
        <Toggle
          title={t.preferences.dyslexiaFont.title}
          description={t.preferences.dyslexiaFont.description}
          note={t.preferences.dyslexiaFont.note}
          checked={prefs.dyslexiaFont}
          onChange={(v) => update('dyslexiaFont', v)}
        />
        <Toggle
          title={t.preferences.readingMode.title}
          description={t.preferences.readingMode.description}
          checked={prefs.readingMode}
          onChange={(v) => update('readingMode', v)}
        />
      </fieldset>

      {/* Theme switcher */}
      <div class="theme-switcher" role="group" aria-label={t.theme.label}>
        <p class="theme-switcher-label">{t.theme.label}</p>
        <div class="theme-buttons">
          {THEMES.map((th) => (
            <button
              key={th}
              type="button"
              class="theme-btn"
              aria-pressed={currentTheme === th}
              onClick={() => onThemeChange(th)}
            >
              {themeLabel(th)}
            </button>
          ))}
        </div>
      </div>

      {/* SR-only announcement for confirm state */}
      <div class="sr-only" role="status" aria-live="polite">
        {resetConfirm ? `${t.reset}?` : ''}
      </div>

      <div class="footer">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={onReset}
          aria-pressed={resetConfirm}
          data-confirm={resetConfirm ? 'true' : undefined}
        >
          {resetConfirm ? `${t.reset}?` : t.reset}
        </button>
        <button type="button" class="btn btn-primary" onClick={onClose}>
          {t.close}
        </button>
      </div>

      <p class="disclaimer">{t.disclaimer}</p>

      <p class="panel-branding">
        <a
          href="https://blakfy.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t.branding}
        </a>
      </p>
    </>
  );
}
