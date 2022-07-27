const { resolve } = require('path');
const { mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|mdx)'],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false
      }
    },
    '@storybook/addon-interactions'
  ],
  staticDirs: ['./public'],
  framework: '@storybook/html',
  core: {
    builder: '@storybook/builder-vite'
  },
  features: {
    storyStoreV7: true,
    previewMdx2: true
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      esbuild: {
        jsxFactory: 'dom',
        jsxFragment: 'fragment'
      },
      alias: [{ find: '@/', replacement: resolve(__dirname, '../src') }]
    });
  }
};
