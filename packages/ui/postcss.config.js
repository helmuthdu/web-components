import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';
import postcssNano from 'cssnano';

const plugins = [postcssImport, postcssMixins, postcssPresetEnv({ stage: 1 })];

if (import.meta.env.NODE_ENV === 'production') {
  plugins.push(postcssNano);
}

export default {
  plugins
};
