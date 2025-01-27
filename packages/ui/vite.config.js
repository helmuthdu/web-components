import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    minify: true
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'wc-ui',
      fileName: 'wc-ui'
    },
    rollupOptions: {
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: info => `css/${info.originalFileNames[0]}`
      }
    }
  }
});
