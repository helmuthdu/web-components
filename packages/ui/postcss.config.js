import postcssNano from 'cssnano';
import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssPresetEnv from 'postcss-preset-env';

const plugins = [postcssImport, postcssMixins, postcssPresetEnv({ stage: 1 })];

if (process.env.NODE_ENV === 'production') {
  plugins.push(postcssNano);
}

export default {
  plugins,
};
