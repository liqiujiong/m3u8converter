import { readFile, writeFile, access } from 'node:fs/promises'
import { constants } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = process.cwd()
const TEMPLATE_PATH = resolve(ROOT, 'blog/templates/article.template.html')
const DEFAULT_DOMAIN = 'https://www.m3u8converter.com'

function parseArgs(argv) {
  const args = {}
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue
    const eqIndex = raw.indexOf('=')
    if (eqIndex === -1) {
      args[raw.slice(2)] = 'true'
      continue
    }
    const key = raw.slice(2, eqIndex)
    const value = raw.slice(eqIndex + 1)
    args[key] = value
  }
  return args
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
}

function normalizeDate(value) {
  if (!value) return new Date().toISOString().slice(0, 10)
  return value
}

function required(args, key) {
  if (!args[key]) {
    throw new Error(`Missing required argument: --${key}`)
  }
  return args[key]
}

async function fileExists(path) {
  try {
    await access(path, constants.F_OK)
    return true
  } catch {
    return false
  }
}

function buildContentBlock(title) {
  return [
    `          <p>TODO: ${title} opening paragraph.</p>`,
    '',
    `          <h2>TODO: Main Section</h2>`,
    `          <p>TODO: Add your core article content here.</p>`,
    '',
    `          <h2>TODO: FAQ</h2>`,
    '          <ul>',
    '            <li>TODO: Question 1</li>',
    '            <li>TODO: Question 2</li>',
    '            <li>TODO: Question 3</li>',
    '          </ul>',
  ].join('\n')
}

async function main() {
  const args = parseArgs(process.argv.slice(2))

  const slug = required(args, 'slug')
  if (!/^[a-z0-9-]+$/.test(slug)) {
    throw new Error('Invalid --slug. Use lowercase letters, numbers, and hyphens only.')
  }

  const titleZh = required(args, 'title-zh')
  const titleEn = required(args, 'title-en')
  const descZh = required(args, 'desc-zh')
  const descEn = required(args, 'desc-en')

  const date = normalizeDate(args.date)
  const readMinutes = args['read-minutes'] || '8'
  const keywords = args.keywords || 'm3u8,m3u8 downloader,m3u8 to mp4,video download'
  const categoryZh = args['category-zh'] || '教程'
  const categoryEn = args['category-en'] || 'Tutorials'
  const ogImage = args['og-image'] || '/og-image.png'
  const canonical = args.canonical || `${DEFAULT_DOMAIN}/blog/${slug}.html`
  const pageTitle = args['page-title'] || `${titleEn} | M3U8 Converter`
  const force = args.force === 'true'

  const outputPath = resolve(ROOT, `blog/${slug}.html`)
  if (!force && (await fileExists(outputPath))) {
    throw new Error(`Target file already exists: ${outputPath}. Re-run with --force=true to overwrite.`)
  }

  const template = await readFile(TEMPLATE_PATH, 'utf8')
  const replacements = new Map([
    ['{{PAGE_TITLE}}', escapeHtml(pageTitle)],
    ['{{META_DESCRIPTION}}', escapeHtml(descEn)],
    ['{{META_KEYWORDS}}', escapeHtml(keywords)],
    ['{{CANONICAL_URL}}', escapeHtml(canonical)],
    ['{{OG_TITLE}}', escapeHtml(titleZh)],
    ['{{OG_DESCRIPTION}}', escapeHtml(descZh)],
    ['{{OG_IMAGE}}', escapeHtml(ogImage)],
    ['{{JSONLD_HEADLINE_JSON}}', JSON.stringify(titleEn)],
    ['{{JSONLD_DESCRIPTION_JSON}}', JSON.stringify(descEn)],
    ['{{DATE_PUBLISHED}}', escapeHtml(date)],
    ['{{DATE_MODIFIED}}', escapeHtml(date)],
    ['{{BREADCRUMB_EN}}', escapeHtml(categoryEn)],
    ['{{BREADCRUMB_ZH}}', escapeHtml(categoryZh)],
    ['{{TITLE_EN}}', escapeHtml(titleEn)],
    ['{{TITLE_ZH}}', escapeHtml(titleZh)],
    ['{{READ_MINUTES}}', escapeHtml(readMinutes)],
    ['{{CONTENT_EN}}', buildContentBlock(titleEn)],
    ['{{CONTENT_ZH}}', buildContentBlock(titleZh)],
  ])

  let html = template
  for (const [key, value] of replacements.entries()) {
    html = html.replaceAll(key, value)
  }

  await writeFile(outputPath, html)

  console.log(`Created: ${outputPath}`)
  console.log('Next steps:')
  console.log('1) Edit the TODO blocks in the new file.')
  console.log('2) Add the article to /blog/index.html and /index.html.')
  console.log('3) Add URL entry in /public/sitemap.xml.')
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})
