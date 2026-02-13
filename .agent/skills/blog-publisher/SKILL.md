---
name: blog-publisher
description: |
  为 m3u8converter 项目撰写、发布博客文章。适用于：(1) 根据项目更新发布新博客 (2) 
  撰写技术教程 (3) 创建产品公告 (4) 生成 SEO 文章。当用户要求写博客、发布文章、
  撰写教程、创建内容策略时使用此技能。必须遵循 BLOG_GUIDELINES.md 中的所有规范。
---

# Blog Publisher - m3u8converter 博客发布代理

## 项目信息

- **项目**: M3U8 Converter (https://www.m3u8converter.com)
- **博客目录**: `/blog/`
- **指南文件**: `BLOG_GUIDELINES.md` (必须在写任何文章前完整阅读)
- **语言**: 英文优先 (English-First)，博客文章必须中英双语

---

## 📋 Core Topics (内容主题)

| Priority | Topic | Description |
|----------|-------|-------------|
| ⭐⭐⭐ | M3U8/HLS Technology | Protocol principles, format parsing, technical depth |
| ⭐⭐⭐ | Video Download Tutorials | User guides, tool usage, problem solving |
| ⭐⭐⭐ | Format Conversion | MP4/WebM/MKV conversion methods |
| ⭐⭐ | Tool Reviews | Downloader and converter comparisons |
| ⭐⭐ | FFmpeg Tutorials | Command-line usage, parameter details |
| ⭐ | Streaming Industry | Technology trends, platform updates |

---

## 📝 Content Requirements (内容要求)

| Item | Requirement |
|------|-------------|
| **Title** | Include primary keyword, 20-35 characters, English-First |
| **Body Text** | 1500-3000 words |
| **Paragraphs** | Max 4 lines per paragraph for readability |
| **Subheadings** | Use H2/H3 hierarchy with long-tail keywords |
| **Images** | At least 2 images, WebP format, stored in `/blog/images/[slug]/` |
| **Internal Links** | At least 2 links to other blog articles |
| **External Links** | 1-2 authoritative source links |
| **CTA** | Must include tool usage guidance |

---

## 🖼️ Image Requirements (图片规范)

| Item | Requirement |
|------|-------------|
| **Storage Directory** | `/blog/images/[article-slug]/` |
| **Naming Convention** | Lowercase, hyphenated, e.g., `step-1-open-browser.webp` |
| **Format** | WebP preferred, PNG/JPG for compatibility |
| **Dimensions** | Max width 1200px, file size < 200KB |
| **Alt Text** | Required, include relevant keywords |

---

## 🌍 Bilingual Support (双语支持 - 强制)

**所有博客详情页必须同时提供中文和英文版本**

### 实现规范

1. 使用 `data-lang="zh"` / `data-lang="en"` 标签区分语言
2. 语言切换器必须使用 pill style (紧凑型)，不能是全宽度 top bar
3. 放置位置：`.article-container` 内，breadcrumb 上方
   - Desktop: 右对齐
   - Mobile: 左对齐

### 关键双语区块 (必须同时包含)

- Breadcrumb 导航
- H1 标题
- 元信息 (日期、阅读时间)
- 正文段落
- CTA 链接
- 返回博客链接

### 语言切换器代码

```html
<div class="lang-switcher-wrap">
  <div class="lang-switcher" data-lang-switcher>
    <button class="lang-btn" type="button" data-lang-target="zh" aria-pressed="false">中文</button>
    <button class="lang-btn" type="button" data-lang-target="en" aria-pressed="false">EN</button>
  </div>
</div>
```

### 必需共享文件

- `/blog/lang-switcher.css`
- `/blog/lang-switcher.js`

---

## ✅ Language Switcher QA Gate (发布前检查 - 必须执行)

**发布前必须通过以下检查:**

### 1. 结构检查脚本

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

**检查结果必须无 FAIL 行才能发布**

### 2. 手动验证

- 点击 `中文` 和 `EN` 按钮
- Breadcrumb、标题、元信息、首屏正文必须明显变化
- 验证移动端布局：切换器保持紧凑，非全宽度

---

## 🔍 SEO Requirements (SEO 要求)

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
- How to download M38 8 video from webpage
- What software opens M3U8 files
- Methods to extract M3U8 link from browser
- Free online M3U8 to MP4 converter tools

### Internal Linking Strategy (内链策略)

每篇文章必须链接到:
1. **Tool Homepage** - 引导用户使用工具
2. **Related Tutorials** - 增加停留时间
3. **Technical Deep-dives** - 互联深度内容

---

## 📚 Article Plan (文章计划)

### Q1-Q2 2026 待发布

| Priority | Filename | Title | Keywords |
|----------|----------|-------|----------|
| 🔴 High | `encrypted-m3u8-guide.html` | How to Download Encrypted M3U8 Videos | encrypted m3u8 download |
| 🔴 High | `mobile-m3u8-download.html` | Mobile M3U8 Video Download Tutorial | mobile m3u8 download |
| 🟡 Medium | `download-live-stream.html` | How to Download Live Stream Recordings | live stream download |
| 🟡 Medium | `m3u8-batch-download.html` | Batch Download M3U8 Videos Method | batch download m3u8 |
| 🟡 Medium | `vlc-m3u8-convert.html` | Convert M3U8 Videos Using VLC | vlc m3u8 |
| 🟢 Low | `fix-m3u8-download-errors.html` | Common M3U8 Download Errors and Fixes | m3u8 download failed |
| 🟢 Low | `hls-drm-explained.html` | HLS DRM Protection Explained | HLS DRM |

---

## 📄 Publishing Checklist (发布检查清单)

- [ ] Article content complete, no typos
- [ ] **Both Chinese and English versions ready** (mandatory, otherwise block publish)
- [ ] SEO meta tags complete
- [ ] Schema.org structured data added
- [ ] Images compressed with alt text
- [ ] Internal and external links working
- [ ] Mobile display normal
- [ ] Added to sitemap.xml
- [ ] Blog homepage list updated
- [ ] Submitted to Google Search Console
- [ ] **Passed Language Switcher QA Gate** (结构检查 + 手动验证)

---

## 📝 Output Template (输出模板)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>[Article Title, English-First] | M3U8 Converter</title>
  <meta name="description" content="[Description within 150 characters, English-First]">
  <meta name="keywords" content="[5-8 keywords, English-First]">
  <link rel="canonical" href="https://www.m3u8converter.com/blog/[slug].html">
  <!-- Open Graph -->
  <meta property="og:title" content="[Title]">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="[Image URL]">
  <meta property="og:url" content="[Canonical URL]">
  <!-- Schema.org Article -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "[Title]",
    "description": "[Description]",
    "author": { "@type": "Organization", "name": "M3U8 Converter" },
    "datePublished": "[ISO Date]",
    "dateModified": "[ISO Date]",
    "image": "[Image URL]"
  }
  </script>
</head>
<body>
  <div class="article-container">
    <!-- Language Switcher -->
    <div class="lang-switcher-wrap">
      <div class="lang-switcher" data-lang-switcher>
        <button class="lang-btn" type="button" data-lang-target="zh" aria-pressed="false">中文</button>
        <button class="lang-btn" type="button" data-lang-target="en" aria-pressed="false">EN</button>
      </div>
    </div>

    <!-- Breadcrumb -->
    <nav class="breadcrumb" data-lang="en">Home › Blog › [Category] › [Title]</nav>
    <nav class="breadcrumb" data-lang="zh">首页 › 博客 › [分类] › [标题]</nav>

    <!-- Title + Meta -->
    <h1 data-lang="en">[Article Title in English]</h1>
    <h1 data-lang="zh">[文章中文标题]</h1>
    <div class="meta" data-lang="en">Published: [Date] • [X] min read</div>
    <div class="meta" data-lang="zh">发布于: [日期] • 阅读约 [X] 分钟</div>

    <!-- Main Content (Bilingual) -->
    <div class="content" data-lang="en">[English content...]</div>
    <div class="content" data-lang="zh">[中文内容...]</div>

    <!-- CTA -->
    <div class="cta" data-lang="en">
      <p>Ready to convert? Try our <a href="https://www.m3u8converter.com/">free M3U8 to MP4 converter</a> now!</p>
    </div>
    <div class="cta" data-lang="zh">
      <p>准备好转换了吗？立即使用我们的<a href="https://www.m3u8converter.com/">免费 M3U8 转 MP4 工具</a>！</p>
    </div>

    <!-- Back to Blog -->
    <div class="back-link" data-lang="en">
      <a href="/blog/">← Back to Blog</a>
    </div>
    <div class="back-link" data-lang="zh">
      <a href="/blog/">← 返回博客</a>
    </div>
  </div>
</body>
</html>
```

---

## ❌ Prohibited Content (禁止内容)

- ❌ Guides for downloading copyrighted content
- ❌ Methods to bypass paid video paywalls
- ❌ Operations violating platform Terms of Service
- ❌ Malware promotion
- ❌ **单语中文博客 (必须中英双语)**
- ❌ Chinese-only blog pages are strictly prohibited

---

## 🔧 工作流程

1. **阅读指南** - 先完整阅读 BLOG_GUIDELINES.md
2. **确认主题** - 与用户确认文章主题
3. **关键词研究** - 确定目标关键词
4. **撰写文章** - 按模板和双语要求撰写
5. **添加图片** - 创建 `/blog/images/[slug]/` 目录
6. **SEO 检查** - 确保所有 meta 标签完整
7. **QA 检查** - 运行语言切换器结构检查
8. **发布** - 提交到博客目录

---

## 📂 常用路径

```bash
# 博客目录
~/m3u8converter/blog/

# 图片目录
~/m3u8converter/blog/images/

# 共享文件
~/m3u8converter/blog/lang-switcher.css
~/m3u8converter/blog/lang-switcher.js

# Sitemap
~/m3u8converter/public/sitemap.xml
```
