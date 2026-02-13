import { defineConfig } from 'vite'
import { readdirSync } from 'node:fs'
import { extname, basename } from 'node:path'

function getHtmlInputs() {
  const input = {
    main: 'index.html',
    blog: 'blog/index.html',
  }

  const blogFiles = readdirSync('blog', { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => extname(name) === '.html' && name !== 'index.html')

  for (const fileName of blogFiles) {
    const slug = basename(fileName, '.html').replace(/[^a-zA-Z0-9]/g, '_')
    input[`article_${slug}`] = `blog/${fileName}`
  }

  return input
}

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
      input: getHtmlInputs(),
    },
  },
})
