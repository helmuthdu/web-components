import pluginMetaUrl from '@uppercod/vite-meta-url';
import loadCss from '@uppercod/vite-meta-url-load-css';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./tailwindcss.css'],
  build: {
    rollupOptions: {
      input: [
        './src/components/alert/alert.ts',
        './src/elements/button/button.ts',
        './src/elements/button/button-group.ts'
      ]
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
