# M3U8 Converter Blog Content Guidelines and Plan

> 📅 Last Updated: 2026-02-10  
> 🌐 Domain: https://www.m3u8converter.com/blog/

---

## 📋 Content Scope

### Core Topics
Blog content should focus on these core areas:

| Topic Category | Description | Priority |
|----------------|-------------|----------|
| **M3U8/HLS Technology** | Protocol principles, format parsing, technical depth | ⭐⭐⭐ |
| **Video Download Tutorials** | User guides, tool usage, problem solving | ⭐⭐⭐ |
| **Format Conversion** | MP4/WebM/MKV conversion methods | ⭐⭐⭐ |
| **Tool Reviews** | Downloader and converter comparisons | ⭐⭐ |
| **FFmpeg Tutorials** | Command-line usage, parameter details | ⭐⭐ |
| **Streaming Industry** | Technology trends, platform updates | ⭐ |

### Prohibited Content
- ❌ Guides for downloading copyrighted content
- ❌ Methods to bypass paid video paywalls
- ❌ Operations violating platform Terms of Service
- ❌ Malware promotion

---

## ✍️ Article Writing Guidelines

### Structure Template

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>[Article Title, English-First]</title>
  <meta name="description" content="[Description within 150 characters, English-First]">
  <meta name="keywords" content="[5-8 keywords, English-First]">
  <link rel="canonical" href="https://www.m3u8converter.com/blog/[slug].html">
  <!-- Schema.org Structured Data -->
</head>
<body>
  <!-- Breadcrumb Navigation -->
  <!-- Article Title + Meta Info (Date, Reading Time) -->
  <!-- Main Content -->
  <!-- CTA Link to Tool -->
  <!-- Back to Blog Link -->
</body>
</html>
```

### Content Requirements

| Item | Requirement |
|------|-------------|
| **Title** | Include primary keyword, 20-35 characters, English-First |
| **Body Text** | 1500-3000 words |
| **Paragraphs** | Max 4 lines per paragraph for readability |
| **Subheadings** | Use H2/H3 hierarchy with long-tail keywords |
| **Images** | At least 2 images, WebP format, stored in `/blog/images/` |
| **Internal Links** | At least 2 links to other blog articles |
| **External Links** | 1-2 authoritative source links |
| **CTA** | Must include tool usage guidance |

### Image Resources

| Item | Requirement |
|------|-------------|
| **Storage Directory** | `/blog/images/[article-slug]/` |
| **Naming Convention** | Lowercase, hyphenated, e.g., `step-1-open-browser.webp` |
| **Format** | WebP preferred, PNG/JPG for compatibility |
| **Dimensions** | Max width 1200px, file size < 200KB |
| **Alt Text** | Required, include relevant keywords |

### Bilingual Support
- All blog detail articles must provide both Chinese and English versions (mandatory)
- Single-language blog pages are forbidden
- Chinese-only blog pages are strictly prohibited
- 严禁发布单语中文 Blog（必须中英双语）
- Use `data-lang="zh"` / `data-lang="en"` tags for switching
- All blog detail pages must use the shared language switcher template
- Language switcher must be compact (pill style), not a full-width top bar
- Place switcher inside `.article-container`, above breadcrumb, right-aligned on desktop and left-aligned on mobile
- Bilingual pairing rule: key blocks (`breadcrumb`, `h1`, meta text, main paragraphs, CTA, back link) must have both `data-lang="zh"` and `data-lang="en"` variants
- Do not leave plain text-only sections in detail pages after adding language switcher
- If bilingual content is incomplete, the article must not be published
- Required shared files:
  - `/blog/lang-switcher.css`
  - `/blog/lang-switcher.js`
- Required markup snippet:

```html
<div class="lang-switcher-wrap">
  <div class="lang-switcher" data-lang-switcher>
    <button class="lang-btn" type="button" data-lang-target="zh" aria-pressed="false">中文</button>
    <button class="lang-btn" type="button" data-lang-target="en" aria-pressed="false">EN</button>
  </div>
</div>
```

### Language Switcher QA Gate (Required Before Publish)
1. Run structure check (must return no FAIL lines):

```bash
for f in blog/*.html; do
  [ "$(basename "$f")" = "index.html" ] && continue
  en=$(grep -o 'data-lang="en"' "$f" | wc -l | tr -d ' ')
  zh=$(grep -o 'data-lang="zh"' "$f" | wc -l | tr -d ' ')
  if [ "$en" -eq 0 ] || [ "$zh" -eq 0 ]; then
    echo "FAIL: $f is not fully bilingual (en:$en zh:$zh)"
  fi
done
```

2. Manual verification:
- Click `中文` and `EN`; breadcrumb, title, meta, and first screen body must visibly change
- Verify mobile layout keeps switcher compact and not full-width

---

## 🔍 SEO Requirements

### Page SEO Checklist

- [ ] **Title Tag**: Keyword first, brand last, within 60 characters
- [ ] **Meta Description**: Include keywords, 150-160 characters
- [ ] **Canonical URL**: Point to canonical page address
- [ ] **H1 Tag**: Unique per page, include primary keyword
- [ ] **URL Slug**: Lowercase, keywords hyphenated
- [ ] **Schema.org**: Add Article structured data
- [ ] **Open Graph**: og:title, og:description, og:image
- [ ] **Image Alt**: Descriptive text with keywords

### Keyword Strategy

#### Core Keywords (English)
```
m3u8 downloader, m3u8 to mp4, m3u8 converter, 
hls downloader, download m3u8 video, merge ts files,
convert m3u8 to mp4 online, free video downloader
```

#### Core Keywords (Chinese)
```
m3u8下载器, m3u8转mp4, m3u8视频下载, m3u8转换器, 
在线m3u8下载, TS合并MP4, 直播回放下载, 网页视频下载,
HLS下载, 视频流下载
```

#### Long-tail Keyword Examples
- How to download M3U8 video from webpage
- What software opens M3U8 files
- Methods to extract M3U8 link from browser
- Free online M3U8 to MP4 converter tools

### Internal Linking Strategy

Each article must link to:
1. **Tool Homepage** - Guide users to use the tool
2. **Related Tutorials** - Increase dwell time
3. **Technical Deep-dives** - Interconnect comprehensive content

---

## 📚 Current Article List

| # | Filename | Title (English) | Target Keywords | Status |
|---|----------|-----------------|-----------------|--------|
| 1 | `how-to-download-m3u8-video.html` | How to Download M3U8 Video - Complete Tutorial | m3u8 download tutorial | ✅ Published |
| 2 | `m3u8-to-mp4-guide.html` | Ultimate Guide to M3U8 to MP4 Conversion | m3u8 to mp4 | ✅ Published |
| 3 | `what-is-hls-streaming.html` | What is HLS Streaming? M3U8 Format Explained | HLS streaming, M3U8 format | ✅ Published |
| 4 | `merge-ts-files-to-mp4.html` | 3 Methods to Merge TS Files into MP4 | merge TS to MP4 | ✅ Published |
| 5 | `best-m3u8-downloader-2026.html` | Best M3U8 Downloaders in 2026 | best m3u8 downloader | ✅ Published |
| 6 | `ffmpeg-m3u8-commands.html` | Complete FFmpeg Commands for M3U8 Download | ffmpeg m3u8 | ✅ Published |
| 7 | `browser-extract-m3u8.html` | 5 Methods to Extract M3U8 Link from Browser | extract m3u8 link | ✅ Published |
| 8 | `m3u8-vs-mp4-difference.html` | M3U8 vs MP4: What's the Difference? | m3u8 vs mp4 | ✅ Published |
| 9 | `mobile-m3u8-download.html` | Mobile M3U8 Video Download Tutorial | mobile m3u8 download | ✅ Published |
| 10 | `fix-m3u8-download-errors.html` | Common M3U8 Download Errors and Fixes | m3u8 download failed | ✅ Published |
| 11 | `download-live-stream.html` | How to Download Live Stream Recordings | live stream download | ✅ Published |

---

## 📅 Future Article Plans

### Q1 2026 (Jan-Mar)

| Priority | Filename | Title | Target Keywords | Est. Release |
|----------|----------|-------|-----------------|--------------|
| ✅ | `ffmpeg-m3u8-commands.html` | Complete FFmpeg Commands for M3U8 Download | ffmpeg m3u8 | ✅ Jan 22 |
| ✅ | `browser-extract-m3u8.html` | 5 Methods to Extract M3U8 Link from Browser | extract m3u8 link | ✅ Jan 22 |
| ✅ | `m3u8-vs-mp4-difference.html` | M3U8 vs MP4: What's the Difference? | m3u8 vs mp4 | ✅ Jan 22 |
| 🟡 Medium | `download-live-stream.html` | How to Download Live Stream Recordings | live stream download | March |
| 🟢 Low | `fix-m3u8-download-errors.html` | Common M3U8 Download Errors and Fixes | m3u8 download failed | Q2 |

### Q2 2026 (Apr-Jun)

| Priority | Filename | Title | Target Keywords |
|----------|----------|-------|-----------------|
| 🔴 High | `encrypted-m3u8-guide.html` | How to Download Encrypted M3U8 Videos | encrypted m3u8 download |
| 🔴 High | `mobile-m3u8-download.html` | Mobile M3U8 Video Download Tutorial | mobile m3u8 download | ✅ Jan 23 |
| 🟡 Medium | `m3u8-batch-download.html` | Batch Download M3U8 Videos Method | batch download m3u8 |
| 🟡 Medium | `vlc-m3u8-convert.html` | Convert M3U8 Videos Using VLC | vlc m3u8 |
| 🟢 Low | `hls-drm-explained.html` | HLS DRM Protection Explained | HLS DRM |

### Long-term Plans (Q3-Q4)

- Video tutorial series (with YouTube)
- Major video platform guides
- Developer API documentation
- User case study sharing

---

## 📊 Publishing Process

```mermaid
graph LR
    A[Topic Planning] --> B[Keyword Research]
    B --> C[Content Writing]
    C --> D[SEO Check]
    D --> E[Bilingual Translation]
    E --> F[Code Review]
    F --> G[Publish]
    G --> H[Submit to Search Engines]
    H --> I[Performance Tracking]
```

### Publishing Checklist

- [ ] Article content complete, no typos
- [ ] Both Chinese and English versions ready (mandatory, otherwise block publish)
- [ ] SEO meta tags complete
- [ ] Schema.org structured data added
- [ ] Images compressed with alt text
- [ ] Internal and external links working
- [ ] Mobile display normal
- [ ] **Added to vite.config.js rollup input** (CRITICAL - or 404 error!)
- [ ] Added to sitemap.xml
- [ ] Blog homepage list updated
- [ ] Submitted to Google Search Console

---

## ⚙️ Vite Config (IMPORTANT)

**每个新博客文章必须添加到 `vite.config.js` 的 rollup input 中，否则部署后返回 404！**

```javascript
// vite.config.js
rollupOptions: {
  input: {
    // ... existing articles
    articleX: 'blog/your-new-article.html',
  },
}
```

**发布新文章时必须同时修改：**
1. `vite.config.js` - 添加到 rollup input
2. `public/sitemap.xml` - 添加 URL 条目

---

## 🔗 Related Resources

| Resource | Source Path | Online Access Path |
|----------|------------|-------------------|
| Sitemap | `/public/sitemap.xml` | `https://www.m3u8converter.com/sitemap.xml` |
| Robots File | `/public/robots.txt` | `https://www.m3u8converter.com/robots.txt` |
| Blog Homepage | `/blog/index.html` | `https://www.m3u8converter.com/blog/` |
| Main Tool Page | `/index.html` | `https://www.m3u8converter.com/` |

---

*This document is maintained by the M3U8 Converter Team. For questions, please submit a [GitHub Issue](https://github.com/liqiujiong/m3u8converter/issues)*
