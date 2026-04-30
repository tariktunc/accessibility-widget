/**
 * Main accessibility panel content — accordion layout.
 *
 * 4 collapsible sections (text / vision / navigation / motion).
 * Active-pref count badge on each header keeps the compact view informative.
 * Toggle size reduced via CSS; descriptions enriched in locale files.
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

type SectionKey = 'text' | 'vision' | 'navigation' | 'motion';

const FONT_SCALES: FontScale[] = [100, 110, 125];
const THEMES: Theme[] = ['auto', 'light', 'dark'];

function ChevronIcon(): JSX.Element {
  return (
    <svg class="accordion-chevron" aria-hidden="true" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 4.5l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function Panel({ translation, locale, currentTheme, onClose, onThemeChange, titleId, descriptionId }: Props): JSX.Element {
  const t = translation.panel;
  const [prefs, setPrefs] = useState<Preferences>(() => getPreferences());
  const [resetConfirm, setResetConfirm] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Track which sections are open — start with sections that have active prefs
  const [openSections, setOpenSections] = useState<Set<SectionKey>>(() => {
    const p = getPreferences();
    const s = new Set<SectionKey>();
    if (p.fontScale !== 100 || p.dyslexiaFont) s.add('text');
    if (p.contrast === 'high') s.add('vision');
    if (p.focusRing || p.linkUnderline) s.add('navigation');
    if (p.motion === 'reduce' || p.readingMode) s.add('motion');
    // Default: open first section if nothing is active
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

  // Active pref counts per section (for badge display)
  const active: Record<SectionKey, number> = {
    text: (prefs.fontScale !== 100 ? 1 : 0) + (prefs.dyslexiaFont ? 1 : 0),
    vision: (prefs.contrast === 'high' ? 1 : 0),
    navigation: (prefs.focusRing ? 1 : 0) + (prefs.linkUnderline ? 1 : 0),
    motion: (prefs.motion === 'reduce' ? 1 : 0) + (prefs.readingMode ? 1 : 0),
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

      <div class="acc-list" role="list">

        {/* Section 1 — Metin / Text */}
        <AccordionSection skey="text" title={t.sections.text}>
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
            title={t.preferences.dyslexiaFont.title}
            description={t.preferences.dyslexiaFont.description}
            note={t.preferences.dyslexiaFont.note}
            checked={prefs.dyslexiaFont}
            onChange={(v) => update('dyslexiaFont', v)}
          />
        </AccordionSection>

        {/* Section 2 — Görünüm / Vision */}
        <AccordionSection skey="vision" title={t.sections.vision}>
          <Toggle
            title={t.preferences.contrast.title}
            description={t.preferences.contrast.description}
            checked={prefs.contrast === 'high'}
            onChange={(v) => update('contrast', v ? 'high' : 'normal')}
          />
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

        {/* Section 3 — Gezinme / Navigation */}
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
        </AccordionSection>

        {/* Section 4 — Hareket & Okuma / Motion & Reading */}
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
