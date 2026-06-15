import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  base: './',
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        compare: resolve(import.meta.dirname, 'compare.html'),
        developers: resolve(import.meta.dirname, 'developers.html'),
        about: resolve(import.meta.dirname, 'about.html'),
      },
    },
  },
});
