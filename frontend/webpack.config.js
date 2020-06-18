
const whitelister = require('purgecss-whitelister')

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
                require('tailwindcss'),
                require('autoprefixer'),
                require('@fullhuman/postcss-purgecss')({
                  content: ['./src/**/*.html', './src/**/*.ts'],
                  whitelist: whitelister([
                    './node_modules/ng-zorro-antd/style/index.css',
                    './node_modules/ng-zorro-antd/tooltip/style/index.css',
                    './node_modules/ng-zorro-antd/spin/style/index.css'
                  ])
                })
              ]
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  }
};
