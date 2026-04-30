// Playwright E2E + axe-core config (Phase 7).
// See docs/STABLE-API.md §13 (RED LINE testleri).
//
// Static fixture page lives at tests/e2e/fixtures/test-page.html and pulls
// the IIFE bundle via a relative <script src="../../dist/widget.js">. We
// serve the entire widget package root so that relative path resolves.
import { defineConfig, devices } from '@playwright/test';

const FIXTURE_PATH = '/tests/e2e/fixtures/test-page.html';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },
  webServer: {
    // `.` is the widget package root (where this config lives). We serve
    // it so that /tests/e2e/fixtures/test-page.html and /dist/widget.js
    // are both reachable.
    command: 'pnpm exec http-server . -p 5173 -s -c-1',
    url: `http://localhost:5173${FIXTURE_PATH}`,
    timeout: 30_000,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
