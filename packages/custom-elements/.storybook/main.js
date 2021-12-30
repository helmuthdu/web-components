const { sep } = require('path');
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  staticDirs: ['./public'],
  webpackFinal: async config => {
    config.module.rules.find(r => String(r.test).includes('css')).use = ['raw-loader', 'postcss-loader'];
    config.entry = config.entry.filter(singleEntry => !singleEntry.includes(`${sep}webpack-hot-middleware${sep}`));
    return config;
  }
};
