import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['./tailwindcss.css'],
  esbuild: {
    minify: true
  },
  build: {
    lib: {
      entry: './src/main.ts',
      name: 'tailwind-components',
      fileName: format => `tailwind-components.${format}.js`
    }
  },
  plugins: []
});
