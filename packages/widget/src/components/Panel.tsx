/**
 * Accessibility panel — sağdan kayan tam yükseklik sidebar.
 * Koyu tema, dikey profil listesi, stepper kontrolü, accordion yok.
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
  DEFAULT_PREFS,
  type CursorSize,
  type FontScale,
  type LetterSpacing,
  type LineHeight,
  type Preferences,
  type Saturation,
  type TextAlign,
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

type ProfileKey = 'epilepsy' | 'vision' | 'cognitive' | 'adhd' | 'blindness';

const THEMES: Theme[] = ['auto', 'light', 'dark'];
const LINE_HEIGHTS: LineHeight[] = ['normal', 'medium', 'large'];
const LETTER_SPACINGS: LetterSpacing[] = ['normal', 'medium', 'large'];
const TEXT_ALIGNS: TextAlign[] = ['default', 'left', 'center', 'right'];
const SATURATIONS: Saturation[] = ['normal', 'high', 'low', 'none'];
const CURSOR_SIZES: CursorSize[] = ['default', 'large-dark', 'large-light'];

const PROFILE_PRESETS: Record<ProfileKey, Partial<Preferences>> = {
  epilepsy:  { motion: 'reduce', saturation: 'low' },
  vision:    { fontScale: 125, contrast: 'high' },
  cognitive: { readingMode: true, lineHeight: 'medium', motion: 'reduce' },
  adhd:      { motion: 'reduce', hideImages: true },
  blindness: { focusRing: true, linkUnderline: true, highlightHeadings: true },
};

function ProfileIcon({ profileKey }: { profileKey: ProfileKey }): JSX.Element {
  const icons: Record<ProfileKey, JSX.Element> = {
    epilepsy: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11 2L4 11h6l-1 7 7-9h-6l1-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    ),
    vision: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    ),
    cognitive: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 3C6.13 3 3 6.13 3 10c0 2.38 1.19 4.47 3 5.74V17h8v-1.26C15.81 14.47 17 12.38 17 10c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7 10h6M10 7v6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    ),
    adhd: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="10" r="7" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
        <circle cx="10" cy="10" r="1" fill="currentColor"/>
      </svg>
    ),
    blindness: (
      <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4a6 6 0 100 12A6 6 0 0010 4z" stroke="currentColor" stroke-width="1.5"/>
        <path d="M10 8v4M8 16l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
    ),
  };
  return icons[profileKey];
}

const StepperRow = ({
  title,
  value,
  options,
  labels,
  onChange,
}: {
  title: string;
  value: string;
  options: string[];
  labels: string[];
  onChange: (v: string) => void;
}): JSX.Element => {
  const idx = options.indexOf(value);
  const canDec = idx > 0;
  const canInc = idx < options.length - 1;
  return (
    <div class="stepper-row">
      <span class="stepper-row-title">{title}</span>
      <div class="stepper">
        <button
          type="button"
          class="stepper-btn"
          disabled={!canDec}
          onClick={() => canDec && onChange(options[idx - 1]!)}
          aria-label="azalt"
        >
          −
        </button>
        <span class="stepper-value">{labels[idx] ?? value}</span>
        <button
          type="button"
          class="stepper-btn"
          disabled={!canInc}
          onClick={() => canInc && onChange(options[idx + 1]!)}
          aria-label="artır"
        >
          +
        </button>
      </div>
    </div>
  );
};

export function Panel({ translation, locale, currentTheme, onClose, onThemeChange, titleId }: Props): JSX.Element {
  const t = translation.panel;
  const [prefs, setPrefs] = useState<Preferences>(() => getPreferences());
  const [resetConfirm, setResetConfirm] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return on(EVENT_NAMES.CHANGE, (record) => {
      setPrefs(record.prefs);
    });
  }, []);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    };
  }, []);

  const updateMany = (patch: Partial<Preferences>): void => {
    const next: Preferences = { ...prefs, ...patch };
    setPrefs(next);
    setPreferences(patch, locale);
    applyPreferences(next);
  };

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]): void => {
    updateMany({ [key]: value } as Partial<Preferences>);
  };

  const isProfileActive = (key: ProfileKey): boolean => {
    const preset = PROFILE_PRESETS[key];
    return Object.entries(preset).every(([k, v]) => prefs[k as keyof Preferences] === v);
  };

  const applyProfile = (key: ProfileKey): void => {
    const preset = PROFILE_PRESETS[key];
    if (isProfileActive(key)) {
      const reset: Partial<Preferences> = {};
      for (const k of Object.keys(preset) as (keyof Preferences)[]) {
        (reset as Record<string, unknown>)[k] = DEFAULT_PREFS[k];
      }
      updateMany(reset);
    } else {
      updateMany(preset);
    }
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
      {/* Sticky header */}
      <div class="panel-header">
        <h2 class="panel-title" id={titleId}>{t.title}</h2>
        <button type="button" class="dialog-close" aria-label={t.close} onClick={onClose}>
          <CloseIcon />
        </button>
      </div>

      {/* Profiller */}
      <p class="section-label">{t.sections.profiles}</p>
      <div class="profile-list">
        {(['epilepsy', 'vision', 'cognitive', 'adhd', 'blindness'] as ProfileKey[]).map((key) => {
          const isActive = isProfileActive(key);
          const profileT = t.profiles[key];
          return (
            <button
              key={key}
              type="button"
              class={`profile-list-item${isActive ? ' profile-list-item--active' : ''}`}
              aria-pressed={isActive}
              onClick={() => applyProfile(key)}
            >
              <span class="profile-list-icon"><ProfileIcon profileKey={key} /></span>
              <span class="profile-list-text">
                <span class="profile-list-name">{profileT.name}</span>
                <span class="profile-list-desc">{profileT.description}</span>
              </span>
              {/* Görsel switch — pointer-events: none, tıklama butona ait */}
              <span
                class="switch"
                aria-checked={isActive}
                role="presentation"
                aria-hidden="true"
              >
                <span class="switch-thumb" />
              </span>
            </button>
          );
        })}
      </div>

      {/* Metin bölümü */}
      <p class="section-label">{t.sections.text}</p>

      {/* Stepper: fontScale */}
      <StepperRow
        title={t.preferences.fontScale.title}
        value={String(prefs.fontScale)}
        options={['100', '110', '125']}
        labels={['100', '110', '125'].map((v) => t.preferences.fontScale.values[v as '100' | '110' | '125'])}
        onChange={(v) => update('fontScale', Number(v) as FontScale)}
      />

      {/* Stepper: lineHeight */}
      <StepperRow
        title={t.preferences.lineHeight.title}
        value={prefs.lineHeight}
        options={LINE_HEIGHTS}
        labels={LINE_HEIGHTS.map((v) => t.preferences.lineHeight.values[v])}
        onChange={(v) => update('lineHeight', v as LineHeight)}
      />

      {/* Stepper: letterSpacing */}
      <StepperRow
        title={t.preferences.letterSpacing.title}
        value={prefs.letterSpacing}
        options={LETTER_SPACINGS}
        labels={LETTER_SPACINGS.map((v) => t.preferences.letterSpacing.values[v])}
        onChange={(v) => update('letterSpacing', v as LetterSpacing)}
      />

      {/* textAlign opt buttons */}
      <div style="padding: 0 1rem 0.25rem">
        <p class="opt-section-title">{t.preferences.textAlign.title}</p>
      </div>
      <div class="opt-buttons">
        {TEXT_ALIGNS.map((opt) => (
          <button
            key={opt}
            type="button"
            class="opt-btn"
            aria-pressed={prefs.textAlign === opt}
            onClick={() => update('textAlign', opt)}
          >
            {t.preferences.textAlign.values[opt]}
          </button>
        ))}
      </div>

      {/* Dyslexia + Highlight toggles */}
      <Toggle
        title={t.preferences.dyslexiaFont.title}
        description={t.preferences.dyslexiaFont.description}
        note={t.preferences.dyslexiaFont.note}
        checked={prefs.dyslexiaFont}
        onChange={(v) => update('dyslexiaFont', v)}
      />
      <Toggle
        title={t.preferences.highlightHeadings.title}
        description={t.preferences.highlightHeadings.description}
        checked={prefs.highlightHeadings}
        onChange={(v) => update('highlightHeadings', v)}
      />

      {/* Görünüm */}
      <p class="section-label">{t.sections.vision}</p>
      <Toggle
        title={t.preferences.contrast.title}
        description={t.preferences.contrast.description}
        checked={prefs.contrast === 'high'}
        onChange={(v) => update('contrast', v ? 'high' : 'normal')}
      />
      <div style="padding: 0 1rem 0.25rem">
        <p class="opt-section-title">{t.preferences.saturation.title}</p>
      </div>
      <div class="opt-buttons">
        {SATURATIONS.map((opt) => (
          <button
            key={opt}
            type="button"
            class="opt-btn"
            aria-pressed={prefs.saturation === opt}
            onClick={() => update('saturation', opt)}
          >
            {t.preferences.saturation.values[opt]}
          </button>
        ))}
      </div>

      {/* Gezinme */}
      <p class="section-label">{t.sections.navigation}</p>
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
      <div style="padding: 0 1rem 0.25rem">
        <p class="opt-section-title">{t.preferences.cursorSize.title}</p>
      </div>
      <div class="opt-buttons">
        {CURSOR_SIZES.map((opt, i) => (
          <button
            key={opt}
            type="button"
            class="opt-btn"
            aria-pressed={prefs.cursorSize === opt}
            onClick={() => update('cursorSize', opt)}
          >
            {[
              t.preferences.cursorSize.values.default,
              t.preferences.cursorSize.values.largeDark,
              t.preferences.cursorSize.values.largeLight,
            ][i]}
          </button>
        ))}
      </div>

      {/* Hareket & Okuma */}
      <p class="section-label">{t.sections.motion}</p>
      <Toggle
        title={t.preferences.motion.title}
        description={t.preferences.motion.description}
        checked={prefs.motion === 'reduce'}
        onChange={(v) => update('motion', v ? 'reduce' : 'auto')}
      />
      <Toggle
        title={t.preferences.readingMode.title}
        description={t.preferences.readingMode.description}
        checked={prefs.readingMode}
        onChange={(v) => update('readingMode', v)}
      />
      <Toggle
        title={t.preferences.hideImages.title}
        description={t.preferences.hideImages.description}
        checked={prefs.hideImages}
        onChange={(v) => update('hideImages', v)}
      />

      {/* Tema */}
      <p class="section-label">{t.theme.label}</p>
      <div class="opt-buttons" role="group" aria-label={t.theme.label}>
        {THEMES.map((th) => (
          <button
            key={th}
            type="button"
            class="opt-btn"
            aria-pressed={currentTheme === th}
            onClick={() => onThemeChange(th)}
          >
            {themeLabel(th)}
          </button>
        ))}
      </div>

      {/* Footer */}
      <div class="panel-footer">
        <div class="sr-only" role="status" aria-live="polite">
          {resetConfirm ? `${t.reset}?` : ''}
        </div>
        <button
          type="button"
          class="btn-reset"
          onClick={onReset}
          aria-pressed={resetConfirm}
          data-confirm={resetConfirm ? 'true' : undefined}
        >
          {resetConfirm ? `${t.reset}?` : t.reset}
        </button>
        <p
          class="disclaimer"
          style="margin-top:0.75rem; font-size:10px; color:rgba(241,245,249,0.35); font-style:italic; line-height:1.5"
        >
          {t.disclaimer}
        </p>
        <a
          class="panel-branding"
          href="https://blakfy.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Blakfy Studio — blakfy.com"
        >
          <span class="panel-branding-powered">Powered by</span>
          <span class="panel-branding-name">Blakfy Studio</span>
        </a>
      </div>
    </>
  );
}
