import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import { config } from 'dotenv'
config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_GITHUB_KEY': JSON.stringify(process.env.REACT_APP_GITHUB_KEY)
  }
})
