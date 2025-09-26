/// <reference types="vitest" />
import { defineConfig } from 'vite';
import GithubActionsReporter from 'vitest-github-actions-reporter';

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      headless: true,
      provider: 'playwright',
      instances: [
        { browser: 'chromium' },
      ],
    },
    environment: 'jsdom',
    globals: true,
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    setupFiles: './vitest.setup.ts',
  },
});
