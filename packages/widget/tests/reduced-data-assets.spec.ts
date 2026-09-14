// @blakfy/accessibility-widget — reduced-data assets test
//
// prefers-reduced-data (issue #32): the widget must not pull optional network
// assets when the OS asks for less data. The shadow stylesheet is the only
// place the widget itself reaches for the network (the Poppins webfont), so
// this guards that the request stays behind the media feature. The behavioural
// counterpart — no fonts.googleapis.com request with the feature emulated —
// lives in tests/e2e/reduced-data.spec.ts.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, it, expect } from 'vitest';

// vitest runs with the package root as cwd (jsdom rewrites import.meta.url, so
// it cannot be used to resolve the file).
const STYLESHEET = join(process.cwd(), 'src', 'styles', 'widget.css');

describe('prefers-reduced-data: optional assets', () => {
  it('keeps the webfont import behind not (prefers-reduced-data: reduce)', () => {
    const css = readFileSync(STYLESHEET, 'utf8');
    const importLine = css.split('\n').find((l) => l.includes('fonts.googleapis.com'));

    expect(importLine, 'webfont import should still exist for the default path').toBeTruthy();
    expect(importLine).toContain('not (prefers-reduced-data: reduce)');
  });
});
