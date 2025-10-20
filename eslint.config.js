import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // ✅ Ensures correct paths when deployed on Render
  build: {
    outDir: 'dist', // ✅ This is the folder Render serves
    sourcemap: true, // Optional, helps debugging production errors
  },
  server: {
    port: 5173, // Default local dev port
    open: true, // Automatically open browser on dev start
  },
  preview: {
    port: 4173, // Port for vite preview
  },
});
