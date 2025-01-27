import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: [
      '**/public/',
      '**/build/',
      '**/dist/',
      '**/lib/',
      '**/.cache/',
      '**/.vscode/',
      '**/.idea/',
      '**/.storybook/',
      '**/package.json'
    ]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_', varsIgnorePattern: 'dom|fragment' }],
      '@typescript-eslint/ban-ts-comment': 'off'
    }
  }
);
