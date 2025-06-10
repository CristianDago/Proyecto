// vite.config.ts

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000', // Redirige todas las solicitudes a "/api" al backend
    },
  },
});