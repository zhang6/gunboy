import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages deployment usually requires a base path if not on a custom domain.
  // usage: base: '/your-repo-name/', 
  base: '/gunboy/', 
  define: {
    // Polyfill for process.env to ensure compatibility if needed, 
    // though import.meta.env is preferred in Vite.
    'process.env': {} 
  }
})