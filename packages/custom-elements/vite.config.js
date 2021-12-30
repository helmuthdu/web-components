import pluginMetaUrl from '@uppercod/vite-meta-url';
import loadCss from '@uppercod/vite-meta-url-load-css';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./tailwindcss.css'],
  build: {
    target: 'esnext',
    polyfillModulePreload: false,
    lib: {
      entry: './src/main.ts',
      name: 'tailwind-components',
      fileName: format => `tailwind.${format}.js`
    }
  },
  css: false,
  plugins: [
    pluginMetaUrl({
      css: loadCss(),
      md: true
    })
  ]
});
