import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    plugins: {
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*'],
              message:
                'Do not import from the app layer outside src/app or src/main.tsx.',
            },
          ],
        },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports' },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
        {
          selector: 'variable',
          format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
          leadingUnderscore: 'allow',
        },
      ],
    },
  },
  {
    files: ['src/app/**/*.{ts,tsx}', 'src/main.tsx'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },
  {
    files: [
      'src/components/**/*.{ts,tsx}',
      'src/config/**/*.{ts,tsx}',
      'src/context/**/*.{ts,tsx}',
      'src/hooks/**/*.{ts,tsx}',
      'src/shared/**/*.{ts,tsx}',
      'src/types/**/*.{ts,tsx}',
    ],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/app/*', '@/features/*'],
              message:
                'Shared layers must not depend on app or feature implementation details.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/services/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/incidents/*'],
              message:
                'Services feature cannot import implementation from incidents feature.',
            },
          ],
        },
      ],
    },
  },
  {
    files: ['src/features/incidents/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/features/services/*'],
              message:
                'Incidents feature cannot import implementation from services feature.',
            },
          ],
        },
      ],
    },
  },
  prettierConfig,
]);
