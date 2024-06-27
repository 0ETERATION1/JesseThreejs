import { defineConfig } from 'vite';
import path from 'path';
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  root: 'src', // The root directory for Vite to serve
  publicDir: path.resolve(__dirname, 'public'), // Directory to serve as plain static assets
  base: './', // Base public path when served in production
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Output directory for build files
    assetsDir: 'assets', // Directory within outDir to place assets
    rollupOptions: {
        treeshake: false, // Disable tree shaking
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Alias for src directory
    },
  },
  plugins: [
    wasm(), // Plugin for handling WebAssembly files
    topLevelAwait() // Plugin for top-level await support
  ],
});
