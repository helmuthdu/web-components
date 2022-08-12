import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./dist/styles.css'],
  css: {
    postcss: {
      plugins: [require('postcss-import'), require('postcss-mixins'), require('postcss-preset-env')({ stage: 1 })]
    }
  },
  esbuild: {
    minify: true
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'web-components',
      fileName: format => `web-components.${format}.js`
    },
    rollupOptions: {
      output: {
        entryFileNames: `index.js`,
        chunkFileNames: `js/[name].js`,
        assetFileNames: `css/[name].[ext]`
      }
    }
  },
  plugins: []
});
