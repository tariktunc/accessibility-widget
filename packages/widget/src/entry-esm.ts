/**
 * ESM entry — what NPM consumers import.
 * Re-exports core's public types/APIs for one-stop consumption.
 */
export { mount } from './mount';
export { defineCustomElement } from './element';
export type { BlakfyA11yAPI } from './public-api';
export * from '@blakfy/a11y-core';
