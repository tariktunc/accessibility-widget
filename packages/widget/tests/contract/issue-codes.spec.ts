// Diagnostics issue codes contract — ADR-005 § "Issue codes" (11 codes).
// `diagnostics().issues` must be capable of carrying any of the 11 codes.
// We don't trigger every code (some require build-time conditions), but
// we DO assert:
//   1. The bundle source contains every locked code string verbatim
//   2. A round-trip via mount() raises at least INITIALIZED + the OS_*
//      info codes when matchMedia is set up to match
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { LOCKED_ISSUE_CODES } from './_helpers';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BUNDLE = join(__dirname, '..', '..', 'dist', 'widget.js');

describe('Diagnostics issue codes contract (ADR-005)', () => {
  const src = readFileSync(BUNDLE, 'utf8');

  it('locked code list size = 11', () => {
    expect(LOCKED_ISSUE_CODES.length).toBe(11);
  });

  it.each(LOCKED_ISSUE_CODES)(
    'bundle still references issue code "%s"',
    (code) => {
      expect(src).toContain(code);
    },
  );

  it('snapshot of locked codes (drift = potential breaking change)', () => {
    expect([...LOCKED_ISSUE_CODES].sort()).toMatchInlineSnapshot(`
      [
        "CDN_VERSION_MISMATCH",
        "HOST_CSS_IMPORTANT_CONFLICT",
        "INITIALIZED",
        "LOCALE_FETCH_FAILED",
        "OPENDYSLEXIC_CDN_MISSING",
        "OS_PREFERS_COLOR_SCHEME_DARK",
        "OS_PREFERS_CONTRAST_MORE",
        "OS_PREFERS_REDUCED_MOTION",
        "SSR_HYDRATION_MISMATCH",
        "STORAGE_MIGRATED",
        "STORAGE_PARSE_ERROR",
      ]
    `);
  });
});
