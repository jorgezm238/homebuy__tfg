import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    laravel({
      input: [
        'resources/css/app.scss',
        'resources/js/app.jsx',
      ],
      refresh: true,
    }),
    react(),
  ],
  server: {
    // permite HMR desde Laravel Serve
    origin: 'http://localhost:5173',
    cors: true,
  },
});
