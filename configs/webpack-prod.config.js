const purgecss = require('@fullhuman/postcss-purgecss');

module.exports = {
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              syntax: 'postcss-scss',
              plugins: () => [
                require('postcss-import'),
                require('tailwindcss')('./configs/tailwind.config.js'),
                require('autoprefixer'),
                purgecss({
                  content: ['./**/*.html', './**/*.ts'],
                  defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
                }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
