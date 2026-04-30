// Web Component contract — STABLE-API.md §7.
// `<blakfy-a11y>` registers as a custom element and respects the
// documented attribute set (locale/theme/position/font/debug).
import { describe, it, expect, beforeAll } from 'vitest';
import { loadIIFE, resetWidgetState, waitForApi } from './_helpers';

const TAG = 'blakfy-a11y';

describe('Web Component contract (STABLE-API §7)', () => {
  beforeAll(async () => {
    resetWidgetState();
    loadIIFE();
    await waitForApi();
  });

  it('customElements.get("blakfy-a11y") returns a class', () => {
    const ctor = customElements.get(TAG);
    expect(ctor).toBeDefined();
    expect(typeof ctor).toBe('function');
  });

  it('class declares the 5 locked observedAttributes (locale/theme/position/font/debug)', () => {
    const ctor = customElements.get(TAG) as
      | (CustomElementConstructor & { observedAttributes?: readonly string[] })
      | undefined;
    expect(ctor).toBeDefined();
    const observed = ctor!.observedAttributes ?? [];
    expect([...observed].sort()).toEqual(['debug', 'font', 'locale', 'position', 'theme']);
  });

  it('connecting <blakfy-a11y locale="tr"> attaches the host element', () => {
    // The IIFE auto-mounted earlier; remove the host and let the element
    // self-mount via connectedCallback.
    document.querySelectorAll('blakfy-a11y-root').forEach((n) => n.remove());

    const el = document.createElement(TAG);
    el.setAttribute('locale', 'tr');
    document.body.appendChild(el);

    // connectedCallback runs synchronously; mount() creates host.
    const host = document.querySelector('blakfy-a11y-root');
    expect(host).not.toBeNull();
    expect(window.BlakfyA11y).toBeDefined();
  });
});
