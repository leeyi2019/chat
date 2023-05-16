import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
      proxy: {
        '/api': {
          target: 'http://43.153.34.161:1234',
          changOrigin: true
        }
      }
    }
})
