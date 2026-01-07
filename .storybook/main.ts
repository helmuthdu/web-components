// Storybook has automatically migrated this file to valid ESM format.
import { createRequire } from "node:module";
import type { StorybookConfig } from '@storybook/html-vite';

import { join, dirname } from 'path';

const require = createRequire(import.meta.url);

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../packages/**/__docs__/**/*.mdx', '../packages/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest")
  ],
  framework: {
    name: getAbsolutePath('@storybook/html-vite'),
    options: {},
  },
};
export default config;
