import pluginMetaUrl from '@uppercod/vite-meta-url';
import loadCss from '@uppercod/vite-meta-url-load-css';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./tailwindcss.css'],
  build: {
    outDir: 'lib',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      },
      input: [
        './src/components/accordion/accordion.ts',
        './src/components/accordion/accordion-group.ts',
        './src/components/alert/alert.ts',
        './src/components/avatar/avatar.ts',
        './src/components/avatar/avatar-group.ts',
        './src/components/badge/badge.ts',
        './src/elements/box/box.ts',
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
