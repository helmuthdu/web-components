/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('postcss-mixins'), require('postcss-preset-env')({ stage: 1 })]
    }
  },
  build: {
    outDir: 'lib',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `css/[name].[ext]`
      },
      input: [
        './src/components/accordion/accordion.tsx',
        './src/components/accordion/accordion-item.tsx',
        './src/components/alert/alert.tsx',
        './src/components/avatar/avatar.tsx',
        './src/components/avatar/avatar-group.tsx',
        './src/components/badge/badge.tsx',
        './src/components/card/card.tsx',
        './src/components/card/card-body.tsx',
        './src/components/card/card-footer.tsx',
        './src/components/card/card-header.tsx',
        './src/components/card/card-image.tsx',
        './src/components/card/card-meta.tsx',
        './src/components/carousel/carousel.tsx',
        './src/components/carousel/carousel-item.tsx',
        './src/components/toast/toast.tsx',
        './src/elements/box/box.tsx',
        './src/elements/button/button.tsx',
        './src/elements/button/button-group.tsx',
        './src/elements/close-button/close-button.tsx'
      ]
    }
  },
  plugins: []
});
