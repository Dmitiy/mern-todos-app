import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  // envPrefix: '',
  plugins: [reactRouter(), tsconfigPaths()],

  server: {
    proxy: {
      '/api/v1/todos': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
  css: {
    postcss: {
      plugins: [autoprefixer],
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '@assets': path.resolve(__dirname, './app/assets'),
      '@images': path.resolve(__dirname, './app/assets/images'),
      '@styles': path.resolve(__dirname, './app/assets/styles'),
      '@Types': path.resolve(__dirname, './app/types'),
      '@utils': path.resolve(__dirname, './app/utils'),
      '@components': path.resolve(__dirname, './app/components'),
    },
  },
});
