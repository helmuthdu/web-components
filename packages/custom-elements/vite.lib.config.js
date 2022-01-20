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
        assetFileNames: `assets/[name].[ext]`
      },
      input: [
        './src/components/accordion/accordion.ts',
        './src/components/accordion/accordion-group.ts',
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
        './src/components/carousel/carousel-item.ts',
        './src/elements/box/box.ts',
        './src/elements/button/button.ts',
        './src/elements/button/button-group.ts'
      ]
    }
  },
  plugins: []
});
