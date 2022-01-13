const plugins = [
  require('postcss-import'),
  require('tailwindcss/nesting')(require('postcss-nesting')),
  require('tailwindcss'),
  require('@tailwindcss/typography'),
  require('autoprefixer')
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(require('cssnano'));
}

module.exports = {
  plugins
};
