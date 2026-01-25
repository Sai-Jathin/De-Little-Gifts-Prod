import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['unsensualistic-corban-nongraven.ngrok-free.dev'],
    proxy: {
      // This intercepts the request and sends it to your local backend
      '/gift-shop-backend': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})