/**
 * Accessibility panel — profiles + accordion layout.
 *
 * Top: 5 preset profile cards (2-column grid).
 * Below: 4 collapsible sections (text / vision / navigation / motion).
 * Active-pref count badge on each accordion header.
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

type SectionKey = 'text' | 'vision' | 'navigation' | 'motion';
type ProfileKey = 'epilepsy' | 'vision' | 'cognitive' | 'adhd' | 'blindness';

const FONT_SCALES: FontScale[] = [100, 110, 125];
const THEMES: Theme[] = ['auto', 'light', 'dark'];
const LINE_HEIGHTS: LineHeight[] = ['normal', 'medium', 'large'];
const LETTER_SPACINGS: LetterSpacing[] = ['normal', 'medium', 'large'];
const TEXT_ALIGNS: TextAlign[] = ['default', 'left', 'center', 'right'];
const SATURATIONS: Saturation[] = ['normal', 'high', 'low', 'none'];
const CURSOR_SIZES: CursorSize[] = ['default', 'large-dark', 'large-light'];

const PROFILE_PRESETS: Record<ProfileKey, Partial<Preferences>> = {
  epilepsy: { motion: 'reduce', saturation: 'low' },
  vision:   { fontScale: 125, contrast: 'high' },
  cognitive: { readingMode: true, lineHeight: 'medium', motion: 'reduce' },
  adhd:     { motion: 'reduce', hideImages: true },
  blindness: { focusRing: true, linkUnderline: true, highlightHeadings: true },
};

function ChevronIcon(): JSX.Element {
  return (
    <svg class="accordion-chevron" aria-hidden="true" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

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

export function Panel({ translation, locale, currentTheme, onClose, onThemeChange, titleId, descriptionId }: Props): JSX.Element {
  const t = translation.panel;
  const [prefs, setPrefs] = useState<Preferences>(() => getPreferences());
  const [resetConfirm, setResetConfirm] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [openSections, setOpenSections] = useState<Set<SectionKey>>(() => {
    const p = getPreferences();
    const s = new Set<SectionKey>();
    if (p.fontScale !== 100 || p.dyslexiaFont || p.lineHeight !== 'normal' || p.letterSpacing !== 'normal' || p.textAlign !== 'default' || p.highlightHeadings) s.add('text');
    if (p.contrast === 'high' || p.saturation !== 'normal') s.add('vision');
    if (p.focusRing || p.linkUnderline || p.cursorSize !== 'default') s.add('navigation');
    if (p.motion === 'reduce' || p.readingMode || p.hideImages) s.add('motion');
    if (s.size === 0) s.add('text');
    return s;
  });

  const toggleSection = (key: SectionKey): void => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

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

  const active: Record<SectionKey, number> = {
    text: (prefs.fontScale !== 100 ? 1 : 0) + (prefs.dyslexiaFont ? 1 : 0)
        + (prefs.lineHeight !== 'normal' ? 1 : 0) + (prefs.letterSpacing !== 'normal' ? 1 : 0)
        + (prefs.textAlign !== 'default' ? 1 : 0) + (prefs.highlightHeadings ? 1 : 0),
    vision: (prefs.contrast === 'high' ? 1 : 0) + (prefs.saturation !== 'normal' ? 1 : 0),
    navigation: (prefs.focusRing ? 1 : 0) + (prefs.linkUnderline ? 1 : 0) + (prefs.cursorSize !== 'default' ? 1 : 0),
    motion: (prefs.motion === 'reduce' ? 1 : 0) + (prefs.readingMode ? 1 : 0) + (prefs.hideImages ? 1 : 0),
  };

  const AccordionSection = (
    { skey, title, children }: { skey: SectionKey; title: string; children: JSX.Element | JSX.Element[] }
  ): JSX.Element => {
    const isOpen = openSections.has(skey);
    const count = active[skey];
    return (
      <div class={`acc-section${isOpen ? ' acc-open' : ''}`}>
        <button
          type="button"
          class="acc-header"
          aria-expanded={isOpen}
          onClick={() => toggleSection(skey)}
        >
          <span class="acc-title">{title}</span>
          {count > 0 && (
            <span class="acc-badge" aria-label={`${count} aktif`}>{count}</span>
          )}
          <ChevronIcon />
        </button>
        {isOpen && (
          <div class="acc-body">
            {children}
          </div>
        )}
      </div>
    );
  };

  const OptionButtons = <T extends string>({
    value,
    options,
    labels,
    onChange,
    ariaLabel,
  }: {
    value: T;
    options: T[];
    labels: string[];
    onChange: (v: T) => void;
    ariaLabel?: string;
  }): JSX.Element => (
    <div class="opt-buttons" role="group" aria-label={ariaLabel}>
      {options.map((opt, i) => (
        <button
          key={opt}
          type="button"
          class="opt-btn"
          aria-pressed={value === opt}
          onClick={() => onChange(opt)}
        >
          {labels[i] ?? opt}
        </button>
      ))}
    </div>
  );

  return (
    <>
      <h2 class="panel-title" id={titleId}>
        {t.title}
      </h2>

      <button
        type="button"
        class="dialog-close"
        aria-label={t.close}
        onClick={onClose}
      >
        <CloseIcon />
      </button>

      {/* ── Profiles ───────────────────────────────────────────────── */}
      <div class="profiles-section">
        <p class="profiles-label">{t.sections.profiles}</p>
        <div class="profile-grid">
          {(['epilepsy', 'vision', 'cognitive', 'adhd', 'blindness'] as ProfileKey[]).map((key) => {
            const active = isProfileActive(key);
            const profileT = key === 'vision' ? t.profiles.vision : t.profiles[key];
            return (
              <button
                key={key}
                type="button"
                class={`profile-btn${active ? ' profile-btn--active' : ''}`}
                aria-pressed={active}
                onClick={() => applyProfile(key)}
              >
                <span class="profile-icon"><ProfileIcon profileKey={key} /></span>
                <span class="profile-name">{profileT.name}</span>
                <span class="profile-desc">{profileT.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Accordion ──────────────────────────────────────────────── */}
      <div class="acc-list" role="list">

        {/* Section 1 — Text */}
        <AccordionSection skey="text" title={t.sections.text}>
          {/* Font scale */}
          <div class="section">
            <p class="toggle-title">{t.preferences.fontScale.title}</p>
            <p class="toggle-desc">{t.preferences.fontScale.description}</p>
            <OptionButtons
              value={String(prefs.fontScale) as '100' | '110' | '125'}
              options={FONT_SCALES.map(String) as ('100' | '110' | '125')[]}
              labels={FONT_SCALES.map((s) => t.preferences.fontScale.values[String(s) as '100' | '110' | '125'])}
              onChange={(v) => update('fontScale', Number(v) as FontScale)}
              ariaLabel={t.preferences.fontScale.title}
            />
          </div>
          {/* Line height */}
          <div class="section">
            <p class="toggle-title">{t.preferences.lineHeight.title}</p>
            <p class="toggle-desc">{t.preferences.lineHeight.description}</p>
            <OptionButtons
              value={prefs.lineHeight}
              options={LINE_HEIGHTS}
              labels={LINE_HEIGHTS.map((v) => t.preferences.lineHeight.values[v])}
              onChange={(v) => update('lineHeight', v)}
              ariaLabel={t.preferences.lineHeight.title}
            />
          </div>
          {/* Letter spacing */}
          <div class="section">
            <p class="toggle-title">{t.preferences.letterSpacing.title}</p>
            <p class="toggle-desc">{t.preferences.letterSpacing.description}</p>
            <OptionButtons
              value={prefs.letterSpacing}
              options={LETTER_SPACINGS}
              labels={LETTER_SPACINGS.map((v) => t.preferences.letterSpacing.values[v])}
              onChange={(v) => update('letterSpacing', v)}
              ariaLabel={t.preferences.letterSpacing.title}
            />
          </div>
          {/* Text align */}
          <div class="section">
            <p class="toggle-title">{t.preferences.textAlign.title}</p>
            <p class="toggle-desc">{t.preferences.textAlign.description}</p>
            <OptionButtons
              value={prefs.textAlign}
              options={TEXT_ALIGNS}
              labels={TEXT_ALIGNS.map((v) => t.preferences.textAlign.values[v])}
              onChange={(v) => update('textAlign', v)}
              ariaLabel={t.preferences.textAlign.title}
            />
          </div>
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
        </AccordionSection>

        {/* Section 2 — Vision */}
        <AccordionSection skey="vision" title={t.sections.vision}>
          <Toggle
            title={t.preferences.contrast.title}
            description={t.preferences.contrast.description}
            checked={prefs.contrast === 'high'}
            onChange={(v) => update('contrast', v ? 'high' : 'normal')}
          />
          {/* Saturation */}
          <div class="section">
            <p class="toggle-title">{t.preferences.saturation.title}</p>
            <p class="toggle-desc">{t.preferences.saturation.description}</p>
            <OptionButtons
              value={prefs.saturation}
              options={SATURATIONS}
              labels={SATURATIONS.map((v) => t.preferences.saturation.values[v])}
              onChange={(v) => update('saturation', v)}
              ariaLabel={t.preferences.saturation.title}
            />
          </div>
          {/* Theme */}
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
        </AccordionSection>

        {/* Section 3 — Navigation */}
        <AccordionSection skey="navigation" title={t.sections.navigation}>
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
          {/* Cursor size */}
          <div class="section">
            <p class="toggle-title">{t.preferences.cursorSize.title}</p>
            <p class="toggle-desc">{t.preferences.cursorSize.description}</p>
            <OptionButtons
              value={prefs.cursorSize}
              options={CURSOR_SIZES}
              labels={[
                t.preferences.cursorSize.values.default,
                t.preferences.cursorSize.values.largeDark,
                t.preferences.cursorSize.values.largeLight,
              ]}
              onChange={(v) => update('cursorSize', v)}
              ariaLabel={t.preferences.cursorSize.title}
            />
          </div>
        </AccordionSection>

        {/* Section 4 — Motion & Reading */}
        <AccordionSection skey="motion" title={t.sections.motion}>
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
        </AccordionSection>

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

      <a
        class="panel-branding"
        href="https://blakfy.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Blakfy Studio — blakfy.com"
      >
        <span class="panel-branding-powered">Powered by</span>
        <span class="panel-branding-name">Blakfy Studio</span>
        <svg class="panel-branding-arrow" aria-hidden="true" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2.5 6h7M7 3.5l2.5 2.5L7 8.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </a>
    </>
  );
}
