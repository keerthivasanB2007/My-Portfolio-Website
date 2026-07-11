import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/My-Portfolio-Website/',
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) {
              return 'vendor-three'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            return 'vendor-libs'
          }
        }
      }
    }
  }
})