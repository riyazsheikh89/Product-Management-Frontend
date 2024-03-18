import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://product-management-backend-o2h1.onrender.com"
    }
  },
  plugins: [react()],
})
