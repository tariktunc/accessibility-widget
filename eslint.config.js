// ESLint flat config (ESLint 10+).

import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/.next/**',
      '**/.turbo/**',
      '**/coverage/**',
      '**/playwright-report/**',
      '**/test-results/**',
      '**/public/**',
      'test-site/**',
      'examples/nextjs/next-env.d.ts',
      // Legacy v1 root files — not part of the v2 monorepo lint surface
      'AccessibilityWidget.tsx',
      'AccessibilityPanel.tsx',
      'BlakfyBadge.tsx',
      'A11yServerHelper.tsx',
      'preferences-store.ts',
      'types.ts',
      'index.ts',
      'setup.mjs',
      'tests/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'log'] }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  {
    files: ['scripts/**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
  {
    files: ['**/tests/**/*.{ts,tsx}', '**/*.spec.ts', '**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
