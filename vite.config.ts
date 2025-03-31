import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths({
  projects:['./tsconfig.app.json'],
    })
  ],
  define: {
    global: 'window',
  },
  build: {
    outDir: 'build',
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.i-contact.link',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
