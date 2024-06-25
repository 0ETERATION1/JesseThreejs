// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  //root: './',
  root: 'src',
  publicDir: path.resolve(__dirname, 'public'),
  build: {
    // outDir: 'dist',
    // assetsDir: 'assets',
    outDir: '../dist',
    assetsDir: 'assets',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
