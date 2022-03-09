module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-google-analytics"
  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
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
              require('autoprefixer')
            ]
          }
        },
        {
          loader: 'sass-loader'
        }
      ]
    });

    // Return the altered config
    return config;
  },
}
