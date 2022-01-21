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
        './src/components/accordion/accordion.tsx',
        './src/components/accordion/accordion-group.tsx',
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
        './src/elements/button/button-group.tsx'
      ]
    }
  },
  plugins: []
});
