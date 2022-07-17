/// <reference types="vitest" />
import { join } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts'
  },
  resolve: {
    alias: {
      '@': join(__dirname, 'src')
    }
  }
});
