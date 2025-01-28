import { reactRouter } from '@react-router/dev/vite';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
// import react from '@vitejs/plugin-react';

export default defineConfig({
  // envPrefix: '',
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
  plugins: [reactRouter(), tsconfigPaths()],
});
