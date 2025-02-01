import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      fileName: 'wc-ui',
      name: 'wc-ui',
    },
    rollupOptions: {
      output: {
        assetFileNames: (info) => `css/${info.originalFileNames[0]}`,
        chunkFileNames: `js/[name].js`,
        entryFileNames: `index.js`,
      },
    },
  },
  esbuild: {
    minify: true,
  },
});
