import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // 1. Added this

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 2. Added this
  ],
  server: {
    allowedHosts: ['all'],
    proxy: {
      '/gift-shop-backend': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})