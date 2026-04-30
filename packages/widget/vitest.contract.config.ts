// Contract tests: lock the v1 public surface (STABLE-API.md / ADR-004).
// Each spec runs the built IIFE bundle against jsdom and asserts a single
// locked surface. Snapshot drift = potential breaking change.
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['tests/contract/**/*.spec.ts'],
    globalSetup: ['./tests/contract/global-setup.ts'],
    // Run sequentially — each spec mutates window/document and shares
    // global storage (cookies, localStorage, <html> attrs). Parallel runs
    // would race on the singleton mount.
    fileParallelism: false,
    sequence: {
      concurrent: false,
    },
    // Allow inline snapshots for human-readable surface diffs.
    snapshotFormat: {
      printBasicPrototype: false,
    },
  },
});
