/// <reference types="vitest" />
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { defineConfig } from 'vite';
import GithubActionsReporter from 'vitest-github-actions-reporter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    name: 'UI',
    environment: 'jsdom',
    globals: true,
    reporters: process.env.GITHUB_ACTIONS ? ['default', new GithubActionsReporter()] : 'default',
    setupFiles: [path.resolve(__dirname, './vitest.setup.ts')],
  },
});
