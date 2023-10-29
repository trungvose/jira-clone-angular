module.exports = {
  globDirectory: 'dist/', // Your Angular app's build output directory
  globPatterns: ['**/*.{html,js,css,png,jpg}'], // Cache HTML, JS, CSS, PNG, and JPG files,
  globIgnores: ['**/node_modules/**/*', 'sw.js', 'workbox-*.js'],
  swDest: 'dist/sw.js', // Service worker output file
  clientsClaim: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /\.(?:png|jpg)$/,
      handler: 'CacheFirst', // Cache images with CacheFirst strategy
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
        }
      }
    },
    {
      urlPattern: /\.(?:html|js|css)$/,
      handler: 'StaleWhileRevalidate', // Cache HTML, JS, and CSS with StaleWhileRevalidate strategy
      options: {
        cacheName: 'static-files',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 7 * 24 * 60 * 60 // 7 Days
        }
      }
    }
  ]
};
