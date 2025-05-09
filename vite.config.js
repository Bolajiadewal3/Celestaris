import { defineConfig } from 'vite';

import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  base: process.env.NODE_ENV === 'production' ? '/Celestaris/' : '/',

  build: {
    outDir: 'dist'
  }
});