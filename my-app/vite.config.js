import { defineConfig } from 'vite';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';


export default defineConfig({
 root: 'src/',
 publicDir: '../static/',
 base: './',
 build: {
   outDir: '../dist', // Output directory relative to the project root
   emptyOutDir: true  // Ensures the directory is emptied before building
 },
 plugins: [
   wasm(),
   topLevelAwait()
 ]
});
