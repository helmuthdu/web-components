const { resolve } = require('path');
const { mergeConfig } = require('vite');
module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  staticDirs: ['./public'],
  framework: {
    name: '@storybook/html-vite',
    options: {}
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      esbuild: {
        jsxFactory: 'dom',
        jsxFragment: 'fragment'
      },
      alias: [
        {
          find: '@/',
          replacement: resolve(__dirname, '../src')
        }
      ]
    });
  },
  docs: {
    autodocs: true
  }
};
