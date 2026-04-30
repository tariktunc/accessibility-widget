// Unit-test config (jsdom + preact testing utils).
// Phase 7: explicitly exclude contract specs (run via vitest.contract.config.ts)
// and Playwright e2e specs (run via playwright.config.ts).
import { defineConfig } from 'vitest/config';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  test: {
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{ts,tsx}', 'tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'tests/contract/**',
      'tests/e2e/**',
    ],
  },
});
