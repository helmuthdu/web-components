/// <reference types="vitest" />
import { join } from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [],
  test: {
    environment: 'jsdom',
    setupFiles: './vitest.setup.js',
    reporters: import.meta.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default'
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
});
