import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { aiApiPlugin } from './server/aiPlugin.js'

// https://vite.dev/config/
// Config with AI dev middleware
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      aiApiPlugin(env)
    ],
  }
})
