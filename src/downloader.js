/**
 * Segment Downloader - Download M3U8 segments with progress tracking
 */

const MAX_CONCURRENT_DOWNLOADS = 4;
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 1000;

/**
 * Download all segments from an M3U8 playlist
 * @param {Array} segments - Array of segment objects with url property
 * @param {Function} onProgress - Progress callback (current, total, downloaded bytes)
 * @param {Function} onLog - Log callback
 * @returns {Array<Uint8Array>} - Array of downloaded segment data
 */
export async function downloadSegments(segments, onProgress = () => { }, onLog = () => { }) {
    const totalSegments = segments.length;
    const results = new Array(totalSegments);
    let completedCount = 0;
    let totalBytes = 0;

    onLog(`开始下载 ${totalSegments} 个分片...`);

    // Create download queue
    const queue = segments.map((segment, index) => ({ segment, index }));
    const activeDownloads = new Set();

    return new Promise((resolve, reject) => {
        const processQueue = async () => {
            while (queue.length > 0 && activeDownloads.size < MAX_CONCURRENT_DOWNLOADS) {
                const item = queue.shift();
                if (!item) break;

                activeDownloads.add(item.index);

                downloadSegment(item.segment.url, item.index)
                    .then(data => {
                        results[item.index] = data;
                        completedCount++;
                        totalBytes += data.byteLength;

                        onProgress(completedCount, totalSegments, totalBytes);
                        onLog(`已下载: ${completedCount}/${totalSegments} (${formatBytes(totalBytes)})`);

                        activeDownloads.delete(item.index);

                        if (completedCount === totalSegments) {
                            resolve(results);
                        } else {
                            processQueue();
                        }
                    })
                    .catch(error => {
                        activeDownloads.delete(item.index);
                        reject(new Error(`分片 ${item.index + 1} 下载失败: ${error.message}`));
                    });
            }
        };

        processQueue();
    });
}

/**
 * Download a single segment with retry logic
 * @param {string} url - Segment URL
 * @param {number} index - Segment index (for logging)
 * @returns {Uint8Array} - Segment data
 */
async function downloadSegment(url, index) {
    let lastError;

    for (let attempt = 1; attempt <= RETRY_ATTEMPTS; attempt++) {
        try {
            const response = await fetch(url, {
                mode: 'cors',
                credentials: 'omit',
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const arrayBuffer = await response.arrayBuffer();
            return new Uint8Array(arrayBuffer);
        } catch (error) {
            lastError = error;

            if (attempt < RETRY_ATTEMPTS) {
                await sleep(RETRY_DELAY * attempt);
            }
        }
    }

    throw lastError;
}

/**
 * Fetch M3U8 playlist content
 * @param {string} url - M3U8 URL
 * @returns {string} - Playlist content
 */
export async function fetchM3U8(url) {
    try {
        const response = await fetch(url, {
            mode: 'cors',
            credentials: 'omit',
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return await response.text();
    } catch (error) {
        // If CORS fails, suggest proxy or alternative
        if (error.message.includes('Failed to fetch') || error.message.includes('CORS')) {
            throw new Error('无法获取 M3U8 文件 (CORS 限制)。请确保链接支持跨域访问，或尝试使用代理。');
        }
        throw error;
    }
}

/**
 * Format bytes to human readable string
 */
function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Sleep for specified milliseconds
 */
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export default {
    downloadSegments,
    fetchM3U8
};
