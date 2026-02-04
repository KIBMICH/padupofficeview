import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api/submit_customers': {
        target: 'https://www.padupoffice.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace('/api/submit_customers', '/api/submit_customers/')
      }
    }
  }
})
