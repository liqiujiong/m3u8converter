# M3U8 Converter | M3U8下载器

[English](#english) | [中文](#中文)

---

<a name="english"></a>

## 🎬 M3U8 Downloader & Converter

A free, browser-based tool to download and convert M3U8/HLS video streams to MP4 and other formats. No server upload required - all processing happens locally in your browser using WebAssembly.

### ✨ Features

- **🆓 100% Free** - No registration, no hidden fees
- **🔒 Privacy First** - All processing done locally, nothing uploaded
- **⚡ Fast Conversion** - Powered by FFmpeg WebAssembly
- **📱 Cross-Platform** - Works on any modern browser
- **🌍 Bilingual** - Supports Chinese & English

### 📦 Supported Formats

| Output Format | Codec | Description |
|---------------|-------|-------------|
| **MP4** | H.264 + AAC | Best compatibility (recommended) |
| **WebM** | VP9 + Opus | Optimized for web |
| **AVI** | MPEG-4 | Legacy format |
| **MKV** | Copy | Fast, no re-encoding |
| **MOV** | H.264 + AAC | Apple device compatible |

### 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 🔧 Tech Stack

- **Vite** - Fast build tool
- **FFmpeg.wasm** - WebAssembly FFmpeg port
- **Vanilla JS** - No framework dependencies
- **CSS Variables** - Modern theming with dark mode support

### 📋 How It Works

1. **Load Engine** - First-time users load the FFmpeg WASM core (~31MB)
2. **Paste URL** - Enter your M3U8/HLS stream URL
3. **Select Format** - Choose output format and quality
4. **Convert** - Tool downloads segments and converts locally
5. **Download** - Save the converted video file

### ⚠️ Limitations

- **CORS Restrictions** - Some M3U8 URLs may not be accessible due to browser security policies
- **Memory Limits** - Large videos (>500MB) may cause browser memory issues
- **No DRM** - Cannot bypass DRM-protected streams

### 📜 License

MIT License - Use freely for personal and educational purposes.

---

<a name="中文"></a>

## 🎬 M3U8视频下载转换器

免费的纯浏览器端 M3U8/HLS 视频下载转换工具，支持转换为 MP4 等多种格式。无需上传服务器，所有处理在浏览器本地完成。

### ✨ 主要特性

- **🆓 完全免费** - 无需注册，无隐藏收费
- **🔒 隐私安全** - 本地处理，视频不上传
- **⚡ 快速转换** - FFmpeg WebAssembly 驱动
- **📱 跨平台** - 支持所有现代浏览器
- **🌍 双语支持** - 中文/英文界面

### 📦 支持格式

| 输出格式 | 编码 | 说明 |
|----------|------|------|
| **MP4** | H.264 + AAC | 兼容性最佳（推荐）|
| **WebM** | VP9 + Opus | 网页优化格式 |
| **AVI** | MPEG-4 | 传统格式 |
| **MKV** | 直接复制 | 快速，无需重编码 |
| **MOV** | H.264 + AAC | Apple 设备兼容 |

### 🚀 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

### 🔧 技术栈

- **Vite** - 快速构建工具
- **FFmpeg.wasm** - FFmpeg 的 WebAssembly 移植版
- **原生 JS** - 无框架依赖
- **CSS 变量** - 现代主题系统，支持深色模式

### 📋 工作原理

1. **加载引擎** - 首次使用加载 FFmpeg WASM 核心 (~31MB)
2. **粘贴链接** - 输入 M3U8/HLS 视频流链接
3. **选择格式** - 选择输出格式和质量设置
4. **开始转换** - 工具自动下载分片并本地转换
5. **下载视频** - 保存转换后的视频文件

### ⚠️ 使用限制

- **CORS 限制** - 部分 M3U8 链接可能因浏览器安全策略无法访问
- **内存限制** - 大视频（>500MB）可能导致浏览器内存不足
- **无法破解 DRM** - 不支持受 DRM 保护的流媒体

### 🔑 SEO 关键词

**中文**: m3u8下载器, m3u8转mp4, m3u8视频下载, m3u8转换器, 在线m3u8下载, TS合并MP4, 直播回放下载, 网页视频下载

**English**: M3U8 downloader, M3U8 to MP4, M3U8 converter, HLS downloader, download M3U8 video, convert M3U8 to MP4 online, merge TS files to MP4

### 📜 许可证

MIT 许可证 - 可自由用于个人和教育目的。

---

## 📁 Project Structure

```
├── index.html          # Main HTML with SEO meta tags & structured data
├── vite.config.js      # Vite config with CORS headers
├── package.json        # Dependencies
├── public/
│   └── favicon.svg     # Site favicon
└── src/
    ├── main.js         # App entry & UI logic
    ├── style.css       # Modern business theme CSS
    ├── i18n.js         # Internationalization (zh/en)
    ├── ffmpeg-handler.js   # FFmpeg WASM wrapper
    ├── m3u8-parser.js  # M3U8 playlist parser
    └── downloader.js   # Segment downloader
```

## 🚀 Vercel Deployment | Vercel 部署

### One-Click Deploy 一键部署

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/m3u8-converter)

### Manual Deployment 手动部署

#### Step 1: Create `vercel.json` 创建配置文件

Create a `vercel.json` file in your project root with the following content. This is **required** for FFmpeg.wasm to work because it needs `SharedArrayBuffer`, which requires specific HTTP headers:

在项目根目录创建 `vercel.json` 文件。这是 **必须的**，因为 FFmpeg.wasm 需要 `SharedArrayBuffer`，需要特定的 HTTP 响应头：

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cross-Origin-Opener-Policy",
          "value": "same-origin"
        },
        {
          "key": "Cross-Origin-Embedder-Policy",
          "value": "require-corp"
        }
      ]
    }
  ]
}
```

#### Step 2: Build & Deploy 构建部署

```bash
# Build the project 构建项目
npm run build

# Install Vercel CLI (if not installed) 安装 Vercel CLI
npm i -g vercel

# Deploy to Vercel 部署到 Vercel
vercel

# Or deploy to production 或直接部署到生产环境
vercel --prod
```

#### Step 3: Via Vercel Dashboard 通过 Vercel 控制台

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Framework Preset: **Vite**
5. Click "Deploy"

> ⚠️ **Important**: The `vercel.json` headers configuration is critical. Without it, `SharedArrayBuffer` will not be available and FFmpeg.wasm will fail to load.
>
> ⚠️ **重要**：`vercel.json` 中的 headers 配置是必须的。如果没有这些配置，`SharedArrayBuffer` 将不可用，FFmpeg.wasm 将无法加载。

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ using [FFmpeg.wasm](https://github.com/ffmpegwasm/ffmpeg.wasm)
