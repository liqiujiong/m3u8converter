import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    headers: {
      // Required for SharedArrayBuffer (multi-threaded ffmpeg)
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
})
