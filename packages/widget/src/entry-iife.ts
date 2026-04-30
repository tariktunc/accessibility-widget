/**
 * IIFE entry — what jsDelivr serves. Auto-mounts on DOMContentLoaded
 * unless a `<blakfy-a11y>` element is already present (the element will
 * mount itself).
 */
import { mount } from './mount';
import { defineCustomElement } from './element';

const ROOT_TAG = 'blakfy-a11y-root';
const ELEMENT_TAG = 'blakfy-a11y';

function _autoMount(): void {
  if (typeof document === 'undefined') return;
  // Already mounted (e.g. via Custom Element)
  if (document.querySelector(ROOT_TAG)) return;
  // The Custom Element will self-mount when present
  if (document.querySelector(ELEMENT_TAG)) return;
  mount();
}

defineCustomElement();

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', _autoMount, { once: true });
  } else {
    _autoMount();
  }
}

export { mount, defineCustomElement };
