export { AccessibilityWidget } from './AccessibilityWidget';
export { AccessibilityPanel } from './AccessibilityPanel';
export { BlakfyBadge } from './BlakfyBadge';
export { A11yServerHelper } from './A11yServerHelper';
export {
  applyPrefs,
  getPrefs,
  savePrefs,
  resetPrefs,
  usePreferences,
  openA11yPanel,
  DEFAULT_PREFS,
  A11Y_VERSION,
} from './preferences-store';
export type {
  Preferences,
  PreferencesRecord,
  PreferencesChangeHandler,
  FontScale,
  Contrast,
  Motion,
  Locale,
  Theme,
  Position,
  IconStyle,
  Translation,
} from './types';
