import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5173,
    cors: true, // 允许跨域
    allowedHosts: ["army-yorozuya.art"],
    headers: {
      'Access-Control-Allow-Origin': '*', // 允许所有来源
    },
  },
})
