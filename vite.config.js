import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isDev = process.env.NODE_ENV.trim() === 'dev'

// https://vitejs.dev/config/
export default defineConfig({
  base: isDev ? '' : '/idiary_vue3_frontend/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
