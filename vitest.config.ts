/// <reference types="vitest" />
import { defineConfig } from 'vite';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@trungk18/interface': resolve(__dirname, 'src/app/interface'),
      '@trungk18': resolve(__dirname, 'src/app'),
      'src/environments': resolve(__dirname, 'src/environments'),
      '@ngneat/until-destroy': resolve(
        __dirname,
        'node_modules/@ngneat/until-destroy/fesm2015/ngneat-until-destroy.js'
      ),
    },
    mainFields: ['module', 'main'],
  },
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    environment: 'jsdom',
    reporters: ['default'],
    server: {
      deps: {
        inline: [/node_modules/],
      },
    },
  },
});
