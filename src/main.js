import './style.css';
import { ffmpegHandler } from './ffmpeg-handler.js';
import { parseM3U8, parseVariantPlaylist, formatDuration, formatBytes } from './m3u8-parser.js';
import { fetchM3U8, downloadSegments } from './downloader.js';
import { i18n } from './i18n.js';
import { themeManager } from './theme.js';

// DOM Elements
const elements = {
  // Loader section
  ffmpegLoader: document.getElementById('ffmpeg-loader'),
  loadFFmpegBtn: document.getElementById('load-ffmpeg-btn'),
  loadProgress: document.getElementById('load-progress'),
  loadProgressFill: document.getElementById('load-progress-fill'),
  loadProgressText: document.getElementById('load-progress-text'),

  // Converter panel
  converterPanel: document.getElementById('converter-panel'),
  m3u8Url: document.getElementById('m3u8-url'),
  pasteBtn: document.getElementById('paste-btn'),
  outputFormat: document.getElementById('output-format'),
  quality: document.getElementById('quality'),
  convertBtn: document.getElementById('convert-btn'),

  // Progress section
  progressSection: document.getElementById('progress-section'),
  progressStage: document.getElementById('progress-stage'),
  progressPercent: document.getElementById('progress-percent'),
  convertProgressFill: document.getElementById('convert-progress-fill'),
  progressDetail: document.getElementById('progress-detail'),

  // Log section
  logSection: document.getElementById('log-section'),
  logContent: document.getElementById('log-content'),
  logText: document.getElementById('log-text'),

  // Result panel
  resultPanel: document.getElementById('result-panel'),
  previewVideo: document.getElementById('preview-video'),
  resultFilename: document.getElementById('result-filename'),
  resultSize: document.getElementById('result-size'),
  downloadBtn: document.getElementById('download-btn'),
  newConvertBtn: document.getElementById('new-convert-btn'),
};

// State
let convertedVideoBlob = null;
let outputFilename = '';

// Initialize app
async function init() {
  // Initialize theme first (before any rendering)
  themeManager.init();

  // Initialize i18n
  i18n.init();

  setupEventListeners();

  // Auto-load FFmpeg on page open
  if (!ffmpegHandler.isLoaded()) {
    await loadFFmpeg();
  } else {
    showConverterPanel();
  }
}

// Setup event listeners
function setupEventListeners() {
  // Paste button
  elements.pasteBtn.addEventListener('click', handlePaste);

  // Convert button
  elements.convertBtn.addEventListener('click', startConversion);

  // Download button
  elements.downloadBtn.addEventListener('click', downloadVideo);

  // New convert button
  elements.newConvertBtn.addEventListener('click', resetForNewConversion);

  // URL input validation
  elements.m3u8Url.addEventListener('paste', () => {
    setTimeout(validateUrl, 100);
  });
  elements.m3u8Url.addEventListener('input', validateUrl);
}

// Load FFmpeg (auto-called on page load)
async function loadFFmpeg() {
  elements.loadProgress.classList.remove('hidden');
  if (elements.loadFFmpegBtn) {
    elements.loadFFmpegBtn.classList.add('hidden');
  }

  try {
    await ffmpegHandler.load(
      (progress) => {
        elements.loadProgressFill.style.width = `${Math.min(progress, 100)}%`;
      },
      (message) => {
        elements.loadProgressText.textContent = message;
      }
    );

    elements.loadProgressFill.style.width = '100%';
    elements.loadProgressText.textContent = i18n.t('load_success');

    setTimeout(showConverterPanel, 500);
  } catch (error) {
    btn.classList.remove('loading');
    btn.disabled = false;
    elements.loadProgressText.textContent = `${i18n.t('load_fail')}: ${error.message}`;
    elements.loadProgressFill.style.width = '0%';
  }
}

// Show converter panel
function showConverterPanel() {
  elements.ffmpegLoader.classList.add('hidden');
  elements.converterPanel.classList.remove('hidden');
}

// Handle paste button click
async function handlePaste() {
  try {
    const text = await navigator.clipboard.readText();
    elements.m3u8Url.value = text;
    validateUrl();
  } catch (error) {
    log(i18n.t('msg_clipboard_fail'));
  }
}

// Validate URL input
function validateUrl() {
  const url = elements.m3u8Url.value.trim();
  const isValid = url.length > 0 && (url.includes('.m3u8') || url.startsWith('http'));
  elements.convertBtn.disabled = !isValid;
}

// Start conversion process
async function startConversion() {
  const url = elements.m3u8Url.value.trim();
  if (!url) {
    log(i18n.t('msg_enter_url'));
    return;
  }

  // Reset UI
  elements.progressSection.classList.remove('hidden');
  elements.logSection.classList.remove('hidden');
  elements.resultPanel.classList.add('hidden');
  elements.convertBtn.disabled = true;
  clearLog();

  try {
    // Step 1: Fetch M3U8
    updateProgress(i18n.t('msg_fetching'), 0);
    log(`${i18n.t('msg_fetching')} ${url}`);
    const m3u8Content = await fetchM3U8(url);
    log('M3U8 OK');

    // Step 2: Parse M3U8
    updateProgress(i18n.t('msg_parsing'), 5);
    let playlist = parseM3U8(m3u8Content, url);

    // Handle variant playlist
    if (playlist.isVariantPlaylist) {
      log(i18n.t('msg_variant'));
      const variants = parseVariantPlaylist(m3u8Content, url);

      if (variants.length > 0) {
        const selectedVariant = variants[0];
        log(`Selected: ${selectedVariant.resolution} (${Math.round(selectedVariant.bandwidth / 1000)}kbps)`);

        const variantContent = await fetchM3U8(selectedVariant.url);
        playlist = parseM3U8(variantContent, selectedVariant.url);
      }
    }

    if (playlist.segments.length === 0) {
      throw new Error('No video segments found');
    }

    log(i18n.t('msg_segments_found', {
      count: playlist.segments.length,
      duration: formatDuration(playlist.totalDuration)
    }));
    updateProgress(i18n.t('msg_downloading'), 10);

    // Step 3: Download segments
    const segments = await downloadSegments(
      playlist.segments,
      (current, total, bytes) => {
        const downloadPercent = Math.round((current / total) * 40) + 10;
        updateProgress(i18n.t('progress_downloading'), downloadPercent);
        elements.progressDetail.textContent = i18n.t('msg_downloaded', {
          current,
          total,
          size: formatBytes(bytes)
        });
      },
      log
    );

    log('Download complete');

    // Step 4: Convert with FFmpeg
    const format = elements.outputFormat.value;
    const quality = elements.quality.value;

    updateProgress(i18n.t('progress_converting'), 50);
    log(i18n.t('msg_converting', { format: format.toUpperCase() }));

    const outputData = await ffmpegHandler.convertSegments(
      segments,
      format,
      quality,
      (percent) => {
        const convertPercent = Math.round(percent * 0.45) + 50;
        updateProgress(i18n.t('progress_converting'), convertPercent);
      },
      log
    );

    // Step 5: Create blob and show result
    updateProgress(i18n.t('progress_complete'), 100);

    const mimeType = ffmpegHandler.getMimeType(format);
    convertedVideoBlob = new Blob([outputData.buffer], { type: mimeType });
    outputFilename = `video_${Date.now()}.${format}`;

    showResult(convertedVideoBlob, outputFilename);
    log(i18n.t('msg_success'));

  } catch (error) {
    log(i18n.t('msg_error', { message: error.message }));
    updateProgress(i18n.t('progress_failed'), 0);
    elements.progressStage.style.color = 'var(--color-error)';
    elements.convertBtn.disabled = false;
  }
}

// Update progress display
function updateProgress(stage, percent) {
  elements.progressStage.textContent = stage;
  elements.progressStage.style.color = '';
  elements.progressPercent.textContent = `${percent}%`;
  elements.convertProgressFill.style.width = `${percent}%`;
}

// Log message
function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  elements.logText.textContent += `[${timestamp}] ${message}\n`;
  elements.logContent.scrollTop = elements.logContent.scrollHeight;
}

// Clear log
function clearLog() {
  elements.logText.textContent = '';
}

// Show result panel
function showResult(blob, filename) {
  const videoUrl = URL.createObjectURL(blob);
  elements.previewVideo.src = videoUrl;
  elements.resultFilename.textContent = filename;
  elements.resultSize.textContent = formatBytes(blob.size);
  elements.resultPanel.classList.remove('hidden');
  elements.convertBtn.disabled = false;
}

// Download the converted video
function downloadVideo() {
  if (!convertedVideoBlob) return;

  const url = URL.createObjectURL(convertedVideoBlob);
  const a = document.createElement('a');
  a.href = url;
  a.download = outputFilename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Reset for new conversion
function resetForNewConversion() {
  elements.m3u8Url.value = '';
  elements.progressSection.classList.add('hidden');
  elements.logSection.classList.add('hidden');
  elements.resultPanel.classList.add('hidden');
  elements.convertBtn.disabled = true;
  clearLog();

  if (elements.previewVideo.src) {
    URL.revokeObjectURL(elements.previewVideo.src);
    elements.previewVideo.src = '';
  }
  convertedVideoBlob = null;
  outputFilename = '';
}

// Start the app
init();
