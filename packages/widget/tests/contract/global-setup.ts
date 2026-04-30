// Vitest globalSetup hook for contract tests.
//
// Builds the widget IIFE bundle once, before any contract spec executes.
// The contract specs assume `dist/widget.js` exists and exposes the
// auto-mount IIFE.  We detect a stale build by checking mtime against
// any source file under src/.
import { execSync } from 'node:child_process';
import { existsSync, statSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PKG_ROOT = join(__dirname, '..', '..');
const DIST_FILE = join(PKG_ROOT, 'dist', 'widget.js');
const SRC_DIR = join(PKG_ROOT, 'src');

function _newestMtime(dir: string): number {
  let newest = 0;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      newest = Math.max(newest, _newestMtime(p));
    } else {
      newest = Math.max(newest, statSync(p).mtimeMs);
    }
  }
  return newest;
}

export default async function setup(): Promise<void> {
  let stale = true;
  if (existsSync(DIST_FILE) && existsSync(SRC_DIR)) {
    const distMtime = statSync(DIST_FILE).mtimeMs;
    const srcMtime = _newestMtime(SRC_DIR);
    stale = srcMtime > distMtime;
  }
  if (!existsSync(DIST_FILE) || stale) {
    // eslint-disable-next-line no-console
    console.log('[contract] Building widget IIFE for contract tests...');
    execSync('pnpm --filter @blakfy/accessibility-widget build:iife', {
      stdio: 'inherit',
      cwd: join(PKG_ROOT, '..', '..'),
    });
  }
}
