import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'lib',
    rollupOptions: {
      input: [
        './src/styles/styles.css',
        './src/components/accordion/accordion.ts',
        './src/components/accordion/accordion-item.ts',
        './src/components/alert/alert.ts',
        './src/components/avatar/avatar.ts',
        './src/components/avatar/avatar-group.ts',
        './src/components/avatar/avatar-image.ts',
        './src/components/avatar/avatar-text.ts',
        './src/components/badge/badge.ts',
        './src/components/breadcrumb/breadcrumb.ts',
        './src/components/breadcrumb/breadcrumbs.ts',
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
        './src/elements/close-button/close-button.ts',
      ],
      output: {
        assetFileNames: `css/[name].[ext]`,
        chunkFileNames: `js/[name].js`,
        entryFileNames: `[name].js`,
      },
    },
  },
});
