module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2021
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': ['off', { argsIgnorePattern: '^_' }]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
};
