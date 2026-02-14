import { defineConfig, transformWithEsbuild } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from 'vite-plugin-commonjs';
import { VitePWA } from 'vite-plugin-pwa';
import manifest from './public/manifest.json'

export default defineConfig({
  plugins: [
    commonjs(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "assets/*"],
      manifest,
    }),
    {
      name: 'treat-js-files-as-jsx',
      async transform(code, id) {
        if (!id.match(/src\/.*\.js$/)) return null;
        return transformWithEsbuild(code, id, {
          loader: 'jsx',
          jsx: 'automatic',
        });
      },
    },
  ],
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  server: {
    hmr: {
      overlay: false,
    },
    port: 4000,
  },
});
