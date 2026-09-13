import { expect, it, vi } from 'vitest';
import { getDiagnostics } from '../src/diagnostics';

vi.mock('../package.json', () => ({ default: { version: '9.8.7-core-test' } }));

it('reports the core package version without a build-time define', () => {
  const result = getDiagnostics({
    config: { locale: 'en', theme: 'auto', position: 'bottom-left', font: '', debug: false },
    performance: { mountTimeMs: 0, bundleSizeGz: 0, timeToFirstClick: null },
    storage: { version: '1.0.0', migratedFrom: null, keysFound: [] },
  });
  expect(result.version).toBe('9.8.7-core-test');
});
