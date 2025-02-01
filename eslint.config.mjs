import eslint from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist';
import eslintConfigPrettier from 'eslint-plugin-prettier/recommended';
import storybook from 'eslint-plugin-storybook';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/public/**',
      '**/build/**',
      '**/dist/**',
      '**/lib/**',
      '**/.cache/**',
      '**/.vscode/**',
      '**/.idea/**',
      '**/.storybook/**',
      '**/vite.*',
      '**/vitest.*',
      '**/stylelint.*',
      '**/postcss.*',
      '**/*.d.ts',
      '**/tsconfig.json',
      '**/package.json',
    ],
  },
  {
    files: ['packages/**/*.js', 'packages/**/*.ts', 'packages/**/*.json'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    // recommended configuration included in the plugin
    ...storybook.configs['flat/recommended'],
    files: ['packages/**/*.stories.ts'],
  },
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-imports': 'error',
      'perfectionist/sort-jsx-props': 'error',
      'perfectionist/sort-object-types': 'error',
      'perfectionist/sort-objects': 'error',
      'perfectionist/sort-switch-case': 'error',
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }],
      'padding-line-between-statements': [
        'error',
        // After directives (like 'use-strict'), except between directives
        { blankLine: 'always', next: '*', prev: 'directive' },
        { blankLine: 'any', next: 'directive', prev: 'directive' },
        // After imports, except between imports
        { blankLine: 'always', next: '*', prev: 'import' },
        { blankLine: 'any', next: 'import', prev: 'import' },
        // Before and after every sequence of variable declarations
        { blankLine: 'always', next: ['const', 'let', 'var'], prev: '*' },
        { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
        { blankLine: 'any', next: ['const', 'let', 'var'], prev: ['const', 'let', 'var'] },
        // Before and after class declaration, if, while, switch, try
        { blankLine: 'always', next: ['class', 'if', 'while', 'switch', 'try'], prev: '*' },
        { blankLine: 'always', next: '*', prev: ['class', 'if', 'while', 'switch', 'try'] },
        // Before return statements
        { blankLine: 'always', next: 'return', prev: '*' },
      ],
    },
  },
);
