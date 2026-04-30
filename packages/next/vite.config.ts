// Library build for @blakfy/accessibility-widget-next.
// Externalises Next.js + React peers and core so the published bundle is
// just the glue (parsing + JSX shells). See ADR-001 + STABLE-API.md §6.
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  // Use the automatic JSX runtime so emitted code imports
  // `react/jsx-runtime` instead of relying on a `React` global. Required
  // because we externalise React (consumers' Next.js app supplies it).
  esbuild: {
    jsx: 'automatic',
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: [
        'next/headers',
        'next/script',
        'react',
        'react/jsx-runtime',
        '@blakfy/a11y-core',
      ],
    },
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2022',
  },
  plugins: [
    dts({
      rollupTypes: true,
      tsconfigPath: './tsconfig.json',
    }),
  ],
});
