import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: true,
  },
  ssr: {
    noExternal: ['react-router-dom', 'react-router'],
  },
});
