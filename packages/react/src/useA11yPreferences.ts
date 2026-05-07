import { useState, useEffect } from 'react';
import { getPreferences, EVENT_NAMES } from '@blakfy/a11y-core';
import type { Preferences, PreferencesRecord } from '@blakfy/a11y-core';

/**
 * Returns the current accessibility preferences and re-renders whenever
 * the user changes a preference in the widget panel.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefs = useA11yPreferences();
 *   return <p style={{ fontSize: prefs.fontScale === 125 ? '1.25rem' : '1rem' }}>Hello</p>;
 * }
 * ```
 */
export function useA11yPreferences(): Preferences {
  const [prefs, setPrefs] = useState<Preferences>(getPreferences);

  useEffect(() => {
    function handler(e: Event) {
      const record = (e as CustomEvent<PreferencesRecord>).detail;
      setPrefs(record.prefs);
    }
    window.addEventListener(EVENT_NAMES.CHANGE, handler);
    return () => window.removeEventListener(EVENT_NAMES.CHANGE, handler);
  }, []);

  return prefs;
}
