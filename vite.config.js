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
  build: {
    // Generate separate CSS file for better caching
    cssCodeSplit: true,
    // Rollup options for multi-page
    rollupOptions: {
      input: {
        main: 'index.html',
        blog: 'blog/index.html',
        article1: 'blog/how-to-download-m3u8-video.html',
        article2: 'blog/m3u8-to-mp4-guide.html',
        article3: 'blog/what-is-hls-streaming.html',
        article4: 'blog/merge-ts-files-to-mp4.html',
        article5: 'blog/best-m3u8-downloader-2026.html',
        article6: 'blog/ffmpeg-m3u8-commands.html',
        article7: 'blog/browser-extract-m3u8.html',
        article8: 'blog/m3u8-vs-mp4-difference.html',
      },
    },
  },
})
