import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import checker from 'vite-plugin-checker';

// https://vite.dev/config/
export default defineConfig({
  base: '/literature_edit',
  plugins: [react(),  checker({ typescript: true }) ],
})
