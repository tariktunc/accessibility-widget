// ESLint flat config (ESLint 9+).
// Phase 1: minimal sane defaults. Phase 2+ will extend with @typescript-eslint
// strict-type-checked, jsx-a11y, and project-specific rules.

import js from '@eslint/js';

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
  {
    files: ['**/*.{js,mjs,cjs,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
    },
    rules: {
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'prefer-const': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-unused-vars': 'off', // delegated to @typescript-eslint in Phase 2
    },
  },
];
