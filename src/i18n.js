/**
 * Internationalization (i18n) Module
 * Supports Chinese (zh) and English (en)
 */

const translations = {
    zh: {
        // Header
        title: 'M3U8 Converter',
        tagline: '免费在线M3U8下载器 · M3U8转MP4 · 浏览器直接转换',

        // Feature badges
        badge_free: '✓ 完全免费',
        badge_privacy: '✓ 本地处理',
        badge_fast: '✓ 快速转换',

        // Loader
        load_title: '初始化转换引擎',
        load_desc: '首次使用需加载 FFmpeg WebAssembly 核心 (~31MB)',
        load_btn: '开始加载',
        loading: '正在加载...',
        load_success: '加载成功！',
        load_fail: '加载失败',

        // Converter
        converter_title: '视频转换',
        input_label: 'M3U8 链接',
        input_placeholder: '粘贴 M3U8 视频链接...',
        input_hint: '支持标准 M3U8/HLS 视频流链接',
        format_label: '输出格式',
        format_desc: 'MP4 兼容性最佳',
        quality_label: '质量',
        quality_high: '高质量',
        quality_medium: '标准',
        quality_low: '快速',
        quality_desc: '标准质量平衡速度与画质',
        convert_btn: '开始转换',

        // Progress
        progress_parsing: '解析中...',
        progress_downloading: '下载中...',
        progress_converting: '转换中...',
        progress_complete: '完成！',
        progress_failed: '失败',

        // Log
        log_title: '处理日志',

        // Result
        result_title: '转换完成',
        result_subtitle: '视频已准备好下载',
        result_filename: '文件名',
        result_size: '大小',
        download_btn: '下载视频',
        new_btn: '转换新视频',

        // FAQ
        faq_title: '常见问题 FAQ',
        faq_q1: '如何将 M3U8 转换为 MP4？',
        faq_a1: '只需三步：1) 粘贴M3U8链接 2) 选择MP4格式 3) 点击转换。工具会自动下载所有TS分片并合并为MP4视频文件。整个过程在浏览器本地完成，无需上传。',
        faq_q2: 'M3U8 文件是什么？怎么打开？',
        faq_a2: 'M3U8 是 HLS (HTTP Live Streaming) 流媒体协议的播放列表文件，包含视频分片(.ts文件)的URL列表。网页视频、直播回放常用此格式。使用本工具可将其转换为普通MP4视频。',
        faq_q3: '支持哪些视频格式？',
        faq_a3: '支持导出 MP4、WebM、AVI、MKV、MOV 等常见视频格式。推荐使用 MP4 格式，兼容性最佳，适用于几乎所有设备和平台。',
        faq_q4: '视频数据会上传到服务器吗？',
        faq_a4: '不会。所有处理均在您的浏览器本地完成，使用 WebAssembly 技术在前端运行 FFmpeg。视频数据不会上传到任何服务器，完全保护您的隐私。',

        // Footer
        footer_tech: '基于',
        footer_built: '构建',
        footer_local: '所有处理在浏览器本地完成',
        footer_legal: '⚠️ 请确保您有权下载和转换目标视频内容。本工具仅供学习和个人使用。',

        // Messages
        msg_fetching: '正在获取播放列表...',
        msg_parsing: '正在解析播放列表...',
        msg_variant: '检测到多质量流，正在选择最高质量...',
        msg_segments_found: '发现 {count} 个分片，总时长: {duration}',
        msg_downloading: '正在下载分片...',
        msg_downloaded: '已下载: {current}/{total} ({size})',
        msg_converting: '开始转换为 {format} 格式',
        msg_success: '转换成功！视频已准备好下载',
        msg_error: '错误: {message}',
        msg_clipboard_fail: '无法访问剪贴板，请手动粘贴',
        msg_enter_url: '请输入 M3U8 链接',
    },

    en: {
        // Header
        title: 'M3U8 Converter',
        tagline: 'Free Online M3U8 Downloader · M3U8 to MP4 · Browser-based',

        // Feature badges
        badge_free: '✓ 100% Free',
        badge_privacy: '✓ Local Processing',
        badge_fast: '✓ Fast Conversion',

        // Loader
        load_title: 'Initialize Conversion Engine',
        load_desc: 'First-time use requires loading FFmpeg WebAssembly core (~31MB)',
        load_btn: 'Start Loading',
        loading: 'Loading...',
        load_success: 'Loaded successfully!',
        load_fail: 'Loading failed',

        // Converter
        converter_title: 'Video Conversion',
        input_label: 'M3U8 URL',
        input_placeholder: 'Paste M3U8 video URL...',
        input_hint: 'Supports standard M3U8/HLS video stream URLs',
        format_label: 'Output Format',
        format_desc: 'MP4 offers best compatibility',
        quality_label: 'Quality',
        quality_high: 'High Quality',
        quality_medium: 'Standard',
        quality_low: 'Fast',
        quality_desc: 'Standard quality balances speed and quality',
        convert_btn: 'Start Conversion',

        // Progress
        progress_parsing: 'Parsing...',
        progress_downloading: 'Downloading...',
        progress_converting: 'Converting...',
        progress_complete: 'Complete!',
        progress_failed: 'Failed',

        // Log
        log_title: 'Processing Log',

        // Result
        result_title: 'Conversion Complete',
        result_subtitle: 'Video is ready for download',
        result_filename: 'Filename',
        result_size: 'Size',
        download_btn: 'Download Video',
        new_btn: 'Convert Another',

        // FAQ
        faq_title: 'Frequently Asked Questions',
        faq_q1: 'How to convert M3U8 to MP4?',
        faq_a1: 'Just 3 steps: 1) Paste M3U8 URL 2) Select MP4 format 3) Click convert. The tool will automatically download all TS segments and merge them into an MP4 video file. The entire process is done locally in your browser, no upload needed.',
        faq_q2: 'What is an M3U8 file? How to open it?',
        faq_a2: 'M3U8 is a playlist file for HLS (HTTP Live Streaming) protocol, containing a list of video segment URLs (.ts files). It\'s commonly used for web videos and live stream recordings. Use this tool to convert it to a standard MP4 video.',
        faq_q3: 'What video formats are supported?',
        faq_a3: 'We support exporting to MP4, WebM, AVI, MKV, MOV and other common video formats. MP4 is recommended for best compatibility across all devices and platforms.',
        faq_q4: 'Will my video data be uploaded to a server?',
        faq_a4: 'No. All processing is done locally in your browser using WebAssembly technology to run FFmpeg on the frontend. Video data is never uploaded to any server, fully protecting your privacy.',

        // Footer
        footer_tech: 'Built with',
        footer_built: '',
        footer_local: 'All processing done locally in browser',
        footer_legal: '⚠️ Please ensure you have the right to download and convert the target video content. This tool is for educational and personal use only.',

        // Messages
        msg_fetching: 'Fetching playlist...',
        msg_parsing: 'Parsing playlist...',
        msg_variant: 'Multi-quality stream detected, selecting highest quality...',
        msg_segments_found: 'Found {count} segments, total duration: {duration}',
        msg_downloading: 'Downloading segments...',
        msg_downloaded: 'Downloaded: {current}/{total} ({size})',
        msg_converting: 'Converting to {format} format',
        msg_success: 'Conversion successful! Video is ready for download',
        msg_error: 'Error: {message}',
        msg_clipboard_fail: 'Cannot access clipboard, please paste manually',
        msg_enter_url: 'Please enter an M3U8 URL',
    }
};

class I18n {
    constructor() {
        this.currentLang = this.detectLanguage();
    }

    /**
     * Detect user's preferred language
     */
    detectLanguage() {
        // Check URL parameter
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && translations[langParam]) {
            return langParam;
        }

        // Check localStorage
        const storedLang = localStorage.getItem('preferred-lang');
        if (storedLang && translations[storedLang]) {
            return storedLang;
        }

        // Check browser language
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'zh') {
            return 'zh';
        }

        // Default to Chinese for Chinese browsers, English otherwise
        return browserLang === 'zh' ? 'zh' : 'en';
    }

    /**
     * Get translation for a key
     */
    t(key, params = {}) {
        let text = translations[this.currentLang]?.[key] || translations['en'][key] || key;

        // Replace parameters
        Object.entries(params).forEach(([k, v]) => {
            text = text.replace(`{${k}}`, v);
        });

        return text;
    }

    /**
     * Switch language
     */
    setLanguage(lang) {
        if (!translations[lang]) return;

        this.currentLang = lang;
        localStorage.setItem('preferred-lang', lang);

        // Update URL without reload
        const url = new URL(window.location);
        url.searchParams.set('lang', lang);
        window.history.replaceState({}, '', url);

        // Update page
        this.updatePage();
        this.updateLangButtons();
    }

    /**
     * Update all translatable elements on the page
     */
    updatePage() {
        // Update text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            el.textContent = this.t(key);
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.placeholder = this.t(key);
        });

        // Update HTML lang attribute
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
    }

    /**
     * Update language button states
     */
    updateLangButtons() {
        document.querySelectorAll('.lang-btn').forEach(btn => {
            const lang = btn.getAttribute('data-lang');
            btn.classList.toggle('active', lang === this.currentLang);
        });
    }

    /**
     * Initialize i18n
     */
    init() {
        this.updatePage();
        this.updateLangButtons();

        // Setup language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.setLanguage(btn.getAttribute('data-lang'));
            });
        });
    }
}

export const i18n = new I18n();
export default i18n;
