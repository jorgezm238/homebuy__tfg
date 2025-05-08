import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react   from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.scss','resources/js/app.jsx'],
      refresh: true,
    }),
    react(),
  ],
  server: {
    proxy: {
      // todo `/api/*` irá a tu Laravel
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/sanctum': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
    },
  },
});
