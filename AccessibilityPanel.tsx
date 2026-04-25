'use client';

import * as Dialog from '@radix-ui/react-dialog';
import * as Switch from '@radix-ui/react-switch';
import { useEffect, useState, useRef } from 'react';
import { savePrefs, resetPrefs, getPrefs, DEFAULT_PREFS } from './preferences-store';
import { BlakfyBadge } from './BlakfyBadge';
import translations from './translations.json';
import type { Locale, Theme, Translation, Preferences, FontScale } from './types';

type Props = {
  locale?: Locale;
  theme?: Theme;
  font?: string;
  borderWidth?: string;
  borderRadius?: string;
  blakfyBadgeUrl?: string;
  open: boolean;
  onOpenChange: (v: boolean) => void;
};

const FONT_SCALES: FontScale[] = [100, 110, 125];

export function AccessibilityPanel({
  locale = 'en',
  theme = 'auto',
  font,
  borderWidth = '3px',
  borderRadius = '0.5rem',
  blakfyBadgeUrl,
  open,
  onOpenChange,
}: Props) {
  const t = ((translations as Record<Locale, Translation>)[locale] ?? (translations as Record<string, Translation>).en).panel;
  const isRtl = locale === 'ar' || locale === 'he';
  const [prefs, setPrefs] = useState<Preferences>(() => getPrefs());
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [resetConfirm, setResetConfirm] = useState(false);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (theme === 'light' || theme === 'dark') { setResolvedTheme(theme); return; }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setResolvedTheme(mql.matches ? 'dark' : 'light');
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [theme]);

  useEffect(() => {
    if (open) setPrefs(getPrefs());
  }, [open]);

  const update = <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    const next = { ...prefs, [key]: value };
    setPrefs(next);
    savePrefs(next, locale);
  };

  const onReset = () => {
    if (!resetConfirm) {
      setResetConfirm(true);
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      resetTimerRef.current = setTimeout(() => setResetConfirm(false), 3000);
      return;
    }
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    setResetConfirm(false);
    setPrefs(DEFAULT_PREFS);
    resetPrefs(locale);
  };

  useEffect(() => () => {
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
  }, []);

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={`${resolvedTheme === 'dark' ? 'dark' : ''} fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0`} />
        <Dialog.Content
          dir={isRtl ? 'rtl' : 'ltr'}
          style={font ? { fontFamily: font } : undefined}
          className={`${resolvedTheme === 'dark' ? 'dark' : ''} fixed left-1/2 top-1/2 z-[10000] w-[min(560px,calc(100%-1rem))] max-h-[90vh] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-4 sm:p-6 shadow-xl focus:outline-none dark:bg-neutral-950`}
        >
          <Dialog.Title className="text-[clamp(14px,3vw,18px)] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">
            {t.title}
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-[clamp(11px,2vw,14px)] text-neutral-600 dark:text-neutral-400 leading-snug">
            {t.description}
          </Dialog.Description>

          <div className="mt-6 space-y-3">
            {/* Font Scale */}
            <div style={{ borderWidth, borderRadius }} className="border-solid border-neutral-200 dark:border-neutral-800 p-3 sm:p-4">
              <p className="text-[clamp(11px,2.2vw,14px)] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">{t.preferences.fontScale.title}</p>
              <p className="mt-1 text-[clamp(10px,1.8vw,12px)] text-neutral-600 dark:text-neutral-400 leading-snug">{t.preferences.fontScale.description}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {FONT_SCALES.map((scale) => (
                  <button
                    key={scale}
                    type="button"
                    onClick={() => update('fontScale', scale)}
                    aria-pressed={prefs.fontScale === scale}
                    style={{ borderWidth, borderRadius }}
                    className={`min-h-[44px] px-3 text-[clamp(11px,2.2vw,14px)] font-medium border-solid transition-colors whitespace-nowrap ${
                      prefs.fontScale === scale
                        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                        : 'border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900'
                    }`}
                  >
                    {t.preferences.fontScale.values[String(scale) as '100' | '110' | '125']}
                  </button>
                ))}
              </div>
            </div>

            <ToggleRow
              title={t.preferences.contrast.title}
              description={t.preferences.contrast.description}
              checked={prefs.contrast === 'high'}
              onChange={(v) => update('contrast', v ? 'high' : 'normal')}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
            <ToggleRow
              title={t.preferences.focusRing.title}
              description={t.preferences.focusRing.description}
              checked={prefs.focusRing}
              onChange={(v) => update('focusRing', v)}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
            <ToggleRow
              title={t.preferences.linkUnderline.title}
              description={t.preferences.linkUnderline.description}
              checked={prefs.linkUnderline}
              onChange={(v) => update('linkUnderline', v)}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
            <ToggleRow
              title={t.preferences.motion.title}
              description={t.preferences.motion.description}
              checked={prefs.motion === 'reduce'}
              onChange={(v) => update('motion', v ? 'reduce' : 'auto')}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
            <ToggleRow
              title={t.preferences.dyslexiaFont.title}
              description={t.preferences.dyslexiaFont.description}
              note={t.preferences.dyslexiaFont.note}
              checked={prefs.dyslexiaFont}
              onChange={(v) => update('dyslexiaFont', v)}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
            <ToggleRow
              title={t.preferences.readingMode.title}
              description={t.preferences.readingMode.description}
              checked={prefs.readingMode}
              onChange={(v) => update('readingMode', v)}
              borderWidth={borderWidth}
              borderRadius={borderRadius}
            />
          </div>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onReset}
              style={{ borderWidth, borderRadius }}
              className={`min-h-[44px] border-solid px-3 sm:px-4 text-[clamp(11px,2.2vw,14px)] font-medium whitespace-nowrap transition-colors ${
                resetConfirm
                  ? 'border-red-500 bg-red-500 text-white hover:bg-red-600'
                  : 'border-neutral-300 text-neutral-900 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-100 dark:hover:bg-neutral-900'
              }`}
              aria-pressed={resetConfirm}
            >
              {resetConfirm ? `${t.reset}?` : t.reset}
            </button>
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              style={{ borderRadius }}
              className="min-h-[44px] bg-neutral-900 px-3 sm:px-4 text-[clamp(11px,2.2vw,14px)] font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 whitespace-nowrap"
            >
              {t.close}
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <p className="text-[clamp(9px,1.5vw,11px)] text-neutral-500 dark:text-neutral-500 italic leading-snug">{t.disclaimer}</p>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-center">
            <BlakfyBadge url={blakfyBadgeUrl} />
          </div>

          <Dialog.Close
            aria-label={t.close}
            className="absolute right-4 top-4 rounded p-1 text-neutral-500 hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:hover:bg-neutral-800 rtl:left-4 rtl:right-auto"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 5l10 10M15 5L5 15"/></svg>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ToggleRow({
  title, description, note, checked, onChange, borderWidth, borderRadius,
}: {
  title: string;
  description: string;
  note?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  borderWidth: string;
  borderRadius: string;
}) {
  return (
    <div
      style={{ borderWidth, borderRadius }}
      className="flex items-start justify-between gap-3 sm:gap-4 border-solid border-neutral-200 dark:border-neutral-800 p-3 sm:p-4"
    >
      <div className="flex-1 min-w-0">
        <p className="text-[clamp(11px,2.2vw,14px)] font-semibold text-neutral-900 dark:text-neutral-100 leading-tight">{title}</p>
        <p className="mt-1 text-[clamp(10px,1.8vw,12px)] text-neutral-600 dark:text-neutral-400 leading-snug">{description}</p>
        {note && (
          <p className="mt-1 text-[clamp(9px,1.5vw,11px)] text-amber-700 dark:text-amber-400 italic leading-snug">⚠ {note}</p>
        )}
      </div>
      <Switch.Root
        checked={checked}
        onCheckedChange={onChange}
        aria-label={title}
        className="relative h-6 w-11 shrink-0 rounded-full bg-neutral-300 transition data-[state=checked]:bg-neutral-900 dark:bg-neutral-700 dark:data-[state=checked]:bg-white"
      >
        <Switch.Thumb className="block h-5 w-5 translate-x-0.5 rounded-full bg-white shadow transition data-[state=checked]:translate-x-[22px] dark:bg-neutral-950 dark:data-[state=checked]:bg-neutral-900" />
      </Switch.Root>
    </div>
  );
}
