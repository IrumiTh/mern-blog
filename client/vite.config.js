import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  server:{
    proxy:{
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:3000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
});
