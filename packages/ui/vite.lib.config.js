import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `css/[name].[ext]`
      },
      input: [
        './src/styles/styles.css',
        './src/components/accordion/accordion.ts',
        './src/components/accordion/accordion-item.ts',
        './src/components/alert/alert.ts',
        './src/components/avatar/avatar.ts',
        './src/components/avatar/avatar-group.ts',
        './src/components/badge/badge.ts',
        './src/components/card/card.ts',
        './src/components/card/card-body.ts',
        './src/components/card/card-footer.ts',
        './src/components/card/card-header.ts',
        './src/components/card/card-image.ts',
        './src/components/card/card-meta.ts',
        './src/components/carousel/carousel.ts',
        './src/components/carousel/carousel-image.ts',
        './src/components/toast/toast.ts',
        './src/elements/box/box.ts',
        './src/elements/button/button.ts',
        './src/elements/button/button-group.ts',
        './src/elements/close-button/close-button.ts'
      ]
    }
  }
});
