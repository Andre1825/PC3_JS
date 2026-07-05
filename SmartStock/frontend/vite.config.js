import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El frontend corre en http://localhost:5173 (origen permitido por el CORS de Spring Boot).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
