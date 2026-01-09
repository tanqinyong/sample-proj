import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// React (Vite) runs on 5173
// Flask runs on 5000

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // forward all /api requests to port 5000 instead of 5173
    },
  },
})
