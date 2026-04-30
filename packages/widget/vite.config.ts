// Three build targets, selected via BUILD_TARGET env var:
//   - iife    : single self-contained bundle for jsDelivr (auto-mount)
//   - esm     : NPM consumers (named `mount`, `defineCustomElement`)
//   - element : side-effect-only Custom Element registration
// CSS is inlined into the JS bundle (?raw import in mount.ts) so a single
// <script> drops the full UI on a page. See ADR-001 / ADR-002 / ADR-003.
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import dts from 'vite-plugin-dts';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { resolve } from 'node:path';
import { copyFileSync } from 'node:fs';

type BuildTarget = 'iife' | 'esm' | 'element';

interface EntryDef {
  entry: string;
  format: 'iife' | 'es';
  fileName: string;
  name?: string;
}

const ENTRIES: Record<BuildTarget, EntryDef> = {
  iife: {
    entry: 'src/entry-iife.ts',
    format: 'iife',
    fileName: 'widget.js',
    name: 'BlakfyA11y',
  },
  esm: {
    entry: 'src/entry-esm.ts',
    format: 'es',
    fileName: 'widget.esm.js',
  },
  element: {
    entry: 'src/entry-element.ts',
    format: 'es',
    fileName: 'widget-element.js',
  },
};

const target = (process.env.BUILD_TARGET ?? 'esm') as BuildTarget;
const cfg = ENTRIES[target];

if (!cfg) {
  throw new Error(`Unknown BUILD_TARGET: ${target}. Use one of: iife, esm, element.`);
}

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, cfg.entry),
      formats: [cfg.format],
      fileName: () => cfg.fileName,
      name: cfg.name,
    },
    rollupOptions: {
      // ESM: keep peers external so consumers dedupe; IIFE/element bundle everything.
      external: target === 'esm' ? ['preact', 'preact/hooks', '@blakfy/a11y-core'] : [],
      output: {
        inlineDynamicImports: true,
        // IIFE: extend existing window.BlakfyA11y so setupPublicAPI's Object.assign
        // can write the full API BEFORE Rollup appends exported stubs.
        extend: target === 'iife',
      },
    },
    cssCodeSplit: false,
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2020',
    // Only the first build clears /dist; subsequent passes append.
    emptyOutDir: target === 'iife',
  },
  plugins: [
    preact(),
    // Copy locale JSON files into dist/locales so jsDelivr serves them
    // alongside widget.js. mount.ts derives the baseURL from
    // `currentScript.src` and fetches `${baseURL}/locales/${code}.json`.
    // Run only on the IIFE pass so we don't duplicate copies (all three
    // builds share the same dist directory).
    target === 'iife' && {
      name: 'copy-to-test-site',
      closeBundle() {
        copyFileSync(
          resolve(__dirname, 'dist/widget.js'),
          resolve(__dirname, '../../test-site/widget.js'),
        );
      },
    },
    target === 'iife' &&
      viteStaticCopy({
        targets: [
          {
            src: '../core/locales/*.json',
            dest: 'locales',
          },
        ],
      }),
    target === 'esm' &&
      dts({
        entryRoot: 'src',
        outDir: 'dist',
        rollupTypes: true,
      }),
  ].filter(Boolean),
  define: {
    __VERSION__: JSON.stringify('2.0.0-alpha.0'),
  },
});
