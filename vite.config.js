import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' penting supaya asset path relatif -> aman untuk GitHub Pages
// maupun custom domain .my.id tanpa perlu ubah config lagi
export default defineConfig({
  plugins: [react()],
  base: './',
})
