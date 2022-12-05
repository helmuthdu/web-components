/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default'
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
});
