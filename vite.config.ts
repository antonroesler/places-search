import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 4000
  },
  resolve: {
    alias: [
      {
        find: /^lucide-react\/dist\/esm\/icons\/fingerprint/,
        replacement: '/src/assets/icons/custom-fingerprint'
      }
    ]
  }
});
