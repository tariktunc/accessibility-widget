'use client';

import { useEffect, useState } from 'react';
import { AccessibilityPanel } from './AccessibilityPanel';
import { applyPrefs, getPrefs, useOpenPanelEvent } from './preferences-store';
import translations from './translations.json';
import type { Locale, Theme, Position, IconStyle, Translation, PreferencesChangeHandler } from './types';
import { CHANGE_EVENT } from './preferences-store';

type Props = {
  locale?: Locale;
  theme?: Theme;
  font?: string;
  borderWidth?: string;
  borderRadius?: string;
  position?: Position;
  iconStyle?: IconStyle;
  keyboardShortcut?: boolean;
  blakfyBadgeUrl?: string;
  onPreferencesChange?: PreferencesChangeHandler;
};

const DEFAULT_FONT = "'Poppins', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

function useThemeClass(theme: Theme) {
  const [resolved, setResolved] = useState<'light' | 'dark'>('light');
  useEffect(() => {
    if (theme === 'light' || theme === 'dark') { setResolved(theme); return; }
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setResolved(mql.matches ? 'dark' : 'light');
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, [theme]);
  return resolved;
}

const POSITION_CLASSES: Record<Position, string> = {
  'bottom-left': 'bottom-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'top-left': 'top-4 left-4',
  'top-right': 'top-4 right-4',
};

export function AccessibilityWidget({
  locale = 'en',
  theme = 'auto',
  font = DEFAULT_FONT,
  borderWidth = '3px',
  borderRadius = '0.5rem',
  position = 'bottom-left',
  iconStyle = 'access',
  keyboardShortcut = true,
  blakfyBadgeUrl,
  onPreferencesChange,
}: Props) {
  const [open, setOpen] = useState(false);
  const t = (translations as Record<Locale, Translation>)[locale] ?? (translations as Record<string, Translation>).en;
  const resolvedTheme = useThemeClass(theme);
  const themeClass = resolvedTheme === 'dark' ? 'wf-a11y dark' : 'wf-a11y';
  const isRtl = locale === 'ar' || locale === 'he';

  useEffect(() => {
    applyPrefs(getPrefs());
  }, []);

  useOpenPanelEvent(() => setOpen(true));

  useEffect(() => {
    if (!keyboardShortcut) return;
    const handler = (e: KeyboardEvent) => {
      if (e.altKey && e.key === '0') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [keyboardShortcut]);

  useEffect(() => {
    if (!onPreferencesChange) return;
    const h = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail) onPreferencesChange(detail);
    };
    window.addEventListener(CHANGE_EVENT, h);
    return () => window.removeEventListener(CHANGE_EVENT, h);
  }, [onPreferencesChange]);

  return (
    <div className={themeClass} style={{ fontFamily: font }} dir={isRtl ? 'rtl' : 'ltr'}>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.fab.label}
        title={t.fab.label}
        style={{ borderRadius: '9999px' }}
        className={`fixed z-[9998] ${POSITION_CLASSES[position]} flex h-12 w-12 items-center justify-center bg-blue-600 text-white shadow-2xl hover:bg-blue-700 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-blue-300 transition-transform hover:scale-110`}
      >
        {iconStyle === 'walking' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="4" r="2" />
            <path d="M12 6v8" />
            <path d="M5 9h14" />
            <path d="M9 14l-2 7" />
            <path d="M15 14l2 7" />
          </svg>
        )}
        {iconStyle === 'access' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <circle cx="12" cy="3" r="2" />
            <path d="M19 8.5c0 .55-.45 1-1 1h-4v3l3 7c.16.4-.04.86-.45 1l-1.42.5c-.4.16-.86-.04-1-.45L11.5 14h-1l-2.65 6.55c-.16.4-.6.6-1 .45l-1.42-.5c-.4-.16-.6-.6-.45-1l3-7v-3H6c-.55 0-1-.45-1-1v-1c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v1z" />
          </svg>
        )}
        {iconStyle === 'eye' && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>

      <AccessibilityPanel
        locale={locale}
        theme={theme}
        font={font}
        borderWidth={borderWidth}
        borderRadius={borderRadius}
        blakfyBadgeUrl={blakfyBadgeUrl}
        open={open}
        onOpenChange={setOpen}
      />
    </div>
  );
}
