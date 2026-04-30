// @blakfy/accessibility-widget-next — public exports

export { A11yServerHelper } from './A11yServerHelper';
export { A11yScript } from './A11yScript';
export { A11yPreconnect } from './A11yPreconnect';
export type { ServerSideAttrs } from './cookie-parser';

// Re-export public types from core for convenience.
export type {
  Preferences,
  PreferencesRecord,
  WidgetOptions,
  Locale,
  Theme,
  Position,
} from '@blakfy/a11y-core';
