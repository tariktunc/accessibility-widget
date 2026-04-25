'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';
import type { Preferences, PreferencesRecord } from './types';

const VERSION = '1.0.0';
const STORAGE_KEY = 'wf_a11y_prefs';
const COOKIE_KEY = 'wf_a11y_prefs';
const COOKIE_DAYS = 365;
const CHANGE_EVENT = 'wf:a11y:change';
const OPEN_EVENT = 'wf:a11y:open';

export const DEFAULT_PREFS: Preferences = {
  fontScale: 100,
  contrast: 'normal',
  focusRing: false,
  linkUnderline: false,
  motion: 'auto',
  dyslexiaFont: false,
  readingMode: false,
};

function setCookie(name: string, value: string, days: number) {
  const d = new Date();
  d.setTime(d.getTime() + days * 864e5);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${d.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

function readPrefs(): Preferences {
  if (typeof window === 'undefined') return DEFAULT_PREFS;
  const fromLs = window.localStorage.getItem(STORAGE_KEY);
  if (fromLs) {
    try {
      const r = JSON.parse(fromLs) as PreferencesRecord;
      return { ...DEFAULT_PREFS, ...r.prefs };
    } catch { /* fall through */ }
  }
  const fromCookie = getCookie(COOKIE_KEY);
  if (fromCookie) {
    try {
      const r = JSON.parse(fromCookie) as PreferencesRecord;
      return { ...DEFAULT_PREFS, ...r.prefs };
    } catch { /* fall through */ }
  }
  return DEFAULT_PREFS;
}

function writePrefs(prefs: Preferences, locale: string): PreferencesRecord {
  const record: PreferencesRecord = {
    prefs,
    version: VERSION,
    timestamp: new Date().toISOString(),
    locale,
  };
  const json = JSON.stringify(record);
  window.localStorage.setItem(STORAGE_KEY, json);
  setCookie(COOKIE_KEY, json, COOKIE_DAYS);
  applyPrefs(prefs);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: record }));
  return record;
}

let _dyslexiaFontWarned = false;

function checkDyslexiaFont() {
  if (_dyslexiaFontWarned || typeof document === 'undefined') return;
  _dyslexiaFontWarned = true;
  // Heuristic: try detecting OpenDyslexic font availability
  const test = document.createElement('span');
  test.style.fontFamily = "'OpenDyslexic', monospace";
  test.style.position = 'absolute';
  test.style.visibility = 'hidden';
  test.textContent = 'mmmmm';
  document.body.appendChild(test);
  const w1 = test.offsetWidth;
  test.style.fontFamily = "monospace";
  const w2 = test.offsetWidth;
  document.body.removeChild(test);
  if (w1 === w2) {
    console.warn(
      '[a11y-widget] OpenDyslexic font yuklenmemis. Layout <head>\'ine ekleyin:\n' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-dyslexic@1.0.3/open-dyslexic-regular.css" />'
    );
  }
}

export function applyPrefs(prefs: Preferences) {
  if (typeof document === 'undefined') return;
  const html = document.documentElement;
  html.dataset.a11yFontscale = String(prefs.fontScale);
  html.dataset.a11yContrast = prefs.contrast;
  html.dataset.a11yFocus = prefs.focusRing ? 'enhanced' : 'default';
  html.dataset.a11yLinks = prefs.linkUnderline ? 'underline' : 'default';
  html.dataset.a11yMotion = prefs.motion;
  html.dataset.a11yDyslexia = String(prefs.dyslexiaFont);
  html.dataset.a11yReading = String(prefs.readingMode);
  if (prefs.dyslexiaFont) checkDyslexiaFont();
}

export function getPrefs(): Preferences {
  return readPrefs();
}

export function savePrefs(prefs: Preferences, locale = 'en'): PreferencesRecord {
  return writePrefs(prefs, locale);
}

export function resetPrefs(locale = 'en'): PreferencesRecord {
  return writePrefs(DEFAULT_PREFS, locale);
}

export function openA11yPanel() {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

function subscribe(cb: () => void) {
  window.addEventListener(CHANGE_EVENT, cb);
  return () => window.removeEventListener(CHANGE_EVENT, cb);
}

function snapshot(): string { return JSON.stringify(getPrefs()); }
function serverSnapshot(): string { return JSON.stringify(DEFAULT_PREFS); }

export function usePreferences(): Preferences {
  const json = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return JSON.parse(json) as Preferences;
}

export function useOpenPanelEvent(handler: () => void) {
  useEffect(() => {
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, [handler]);
}

export const A11Y_VERSION = VERSION;
export { CHANGE_EVENT, OPEN_EVENT };
