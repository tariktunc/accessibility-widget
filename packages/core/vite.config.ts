// @blakfy/a11y-core — vite.config.ts
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      output: { preserveModules: false },
    },
    minify: 'esbuild',
    sourcemap: true,
    target: 'es2022',
  },
  plugins: [
    dts({ rollupTypes: true, tsconfigPath: './tsconfig.json' }),
  ],
  define: {
    __VERSION__: JSON.stringify('2.0.0-alpha.0'),
  },
});
