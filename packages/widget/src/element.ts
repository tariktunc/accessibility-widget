/**
 * `<blakfy-a11y>` custom element. STABLE-API.md §7.
 *
 * Attributes mirror the script `data-*` set (without prefix):
 *   locale, theme, position, font, debug
 *
 * The element re-mounts (configure call) when attributes change after mount.
 */
import { mount } from './mount';
import type { Locale, WidgetOptions } from '@blakfy/a11y-core';

const ELEMENT_TAG = 'blakfy-a11y';

class BlakfyA11yElement extends HTMLElement {
  static readonly observedAttributes = ['locale', 'theme', 'position', 'font', 'debug'];

  private _unmount: (() => void) | null = null;

  connectedCallback(): void {
    if (this._unmount) return;
    const opts = this._readAttributes();
    const result = mount(opts);
    this._unmount = result.unmount;
  }

  disconnectedCallback(): void {
    if (this._unmount) {
      this._unmount();
      this._unmount = null;
    }
  }

  attributeChangedCallback(_name: string, oldValue: string | null, newValue: string | null): void {
    if (oldValue === newValue) return;
    if (!this._unmount) return; // not yet connected
    if (typeof window === 'undefined' || !window.BlakfyA11y) return;
    const opts = this._readAttributes();
    window.BlakfyA11y.configure(opts);
  }

  private _readAttributes(): Partial<WidgetOptions> {
    const out: Partial<WidgetOptions> = {};
    const locale = this.getAttribute('locale');
    if (locale) out.locale = locale as Locale;
    const theme = this.getAttribute('theme');
    if (theme) out.theme = theme as WidgetOptions['theme'];
    const position = this.getAttribute('position');
    if (position) out.position = position as WidgetOptions['position'];
    const font = this.getAttribute('font');
    if (font) out.font = font;
    const debug = this.getAttribute('debug');
    if (debug != null) out.debug = debug === 'true';
    return out;
  }
}

/**
 * Register `<blakfy-a11y>` if not already defined. Idempotent.
 */
export function defineCustomElement(): void {
  if (typeof customElements === 'undefined') return;
  if (customElements.get(ELEMENT_TAG)) return;
  customElements.define(ELEMENT_TAG, BlakfyA11yElement);
}
