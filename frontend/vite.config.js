import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const apiUrl = process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://chatonam.alwaysdata.net/"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      "/api":{
        target: apiUrl,
      }
    }
  }
})
