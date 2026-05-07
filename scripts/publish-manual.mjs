#!/usr/bin/env node
/**
 * Manual publish helper — provenance flag'ini geçici kaldırır,
 * paketleri publishler, sonra geri alır.
 *
 * NOT: Bu script sadece CI dışında manuel publish için. Üretim
 * publish'leri changesets + GitHub Actions OIDC üzerinden gitmeli
 * (provenance otomatik üretilir).
 *
 * Kullanım:
 *   node scripts/publish-manual.mjs [--dry-run]
 *   node scripts/publish-manual.mjs --filter @blakfy/accessibility-widget-next
 */
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const PACKAGES = [
  'packages/core',
  'packages/widget',
  'packages/next',
  'packages/react',
];

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const filterIdx = args.indexOf('--filter');
const filter = filterIdx >= 0 ? args[filterIdx + 1] : null;

function readPkg(dir) {
  return JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8'));
}

function writePkg(dir, pkg) {
  writeFileSync(join(dir, 'package.json'), JSON.stringify(pkg, null, 2) + '\n');
}

function withProvenanceOff(dir, fn) {
  const path = join(dir, 'package.json');
  const original = readFileSync(path, 'utf8');
  const pkg = JSON.parse(original);
  const had = pkg.publishConfig?.provenance === true;
  if (had) {
    delete pkg.publishConfig.provenance;
    writePkg(dir, pkg);
  }
  try {
    fn();
  } finally {
    if (had) writeFileSync(path, original);
  }
}

const targets = filter
  ? PACKAGES.filter((d) => readPkg(d).name === filter)
  : PACKAGES;

if (targets.length === 0) {
  console.error(`No matching package for --filter ${filter}`);
  process.exit(1);
}

for (const dir of targets) {
  const pkg = readPkg(dir);
  console.log(`\n→ ${pkg.name}@${pkg.version}`);
  withProvenanceOff(dir, () => {
    const cmd = `pnpm --filter ${pkg.name} publish --access public --no-git-checks${dryRun ? ' --dry-run' : ''}`;
    console.log(`  $ ${cmd}`);
    execSync(cmd, { stdio: 'inherit' });
  });
}

console.log('\n✓ Done.');
