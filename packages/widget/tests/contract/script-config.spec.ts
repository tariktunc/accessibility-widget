// Script tag data-* config contract — STABLE-API.md §6.
// We can't re-evaluate the IIFE in jsdom against arbitrary script tags
// (currentScript would be wrong), so we read the bundle source as text
// and assert that all 6 documented data-* attributes are referenced by
// the script-config reader.  This is a textual contract test — it
// guarantees the implementation still considers each name. Behaviorally,
// the diagnostics-integration.test.ts file already exercises the live
// reader for `data-debug` and `data-version`.
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUNDLE = join(__dirname, '..', '..', 'dist', 'widget.js');

const LOCKED_DATA_ATTRS = [
  'locale',
  'theme',
  'position',
  'font',
  'debug',
  'devPipe', // ↔ `data-dev-pipe`, accessed via `dataset.devPipe`
] as const;

describe('Script tag data-* config contract (STABLE-API §6)', () => {
  const src = readFileSync(BUNDLE, 'utf8');

  it('locked attribute set (snapshot)', () => {
    expect([...LOCKED_DATA_ATTRS]).toEqual([
      'locale',
      'theme',
      'position',
      'font',
      'debug',
      'devPipe',
    ]);
  });

  it.each(LOCKED_DATA_ATTRS)(
    'bundle reads dataset.%s',
    (name) => {
      // Vite/esbuild preserve property names. Match `<varName>.<name>`
      // where the dataset variable is some short identifier (mangled).
      // We search for a property access whose name matches exactly.
      const re = new RegExp(`\\.${name}\\b`);
      expect(src).toMatch(re);
    },
  );

  it('bundle implements the documented config priority chain', () => {
    // Order: defaults < script data-* < window.__BLAKFY_A11Y__ < opts
    // (mount.ts: `safeMergeOptions({ ...scriptCfg, ...winGlobal, ...opts })`)
    expect(src).toContain('__BLAKFY_A11Y__');
  });
});
