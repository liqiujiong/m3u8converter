/**
 * M3U8 Parser - Parse M3U8 playlists and extract segment URLs
 */

/**
 * Parse M3U8 content and extract segment URLs
 * @param {string} content - M3U8 file content
 * @param {string} baseUrl - Base URL for resolving relative paths
 * @returns {Object} - Parsed result with segments and metadata
 */
export function parseM3U8(content, baseUrl) {
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    const segments = [];
    let totalDuration = 0;
    let currentDuration = 0;
    let isLive = false;
    let targetDuration = 0;

    // Check if it's a valid M3U8 file
    if (!lines[0] || !lines[0].includes('#EXTM3U')) {
        throw new Error('无效的 M3U8 文件格式');
    }

    // Extract base path from URL
    const basePath = getBasePath(baseUrl);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Parse target duration
        if (line.startsWith('#EXT-X-TARGETDURATION:')) {
            targetDuration = parseFloat(line.split(':')[1]);
        }

        // Check for live stream marker
        if (line.includes('#EXT-X-PLAYLIST-TYPE:EVENT') || !line.includes('#EXT-X-ENDLIST')) {
            isLive = true;
        }

        // Parse segment duration
        if (line.startsWith('#EXTINF:')) {
            const durationMatch = line.match(/#EXTINF:([\d.]+)/);
            if (durationMatch) {
                currentDuration = parseFloat(durationMatch[1]);
                totalDuration += currentDuration;
            }
        }

        // Parse segment URL (non-comment, non-empty lines after #EXTINF)
        if (!line.startsWith('#') && line.length > 0) {
            // Check if it's a nested M3U8 (adaptive streaming)
            if (line.endsWith('.m3u8')) {
                // This is a variant playlist, return info to handle it
                const resolvedUrl = resolveUrl(line, basePath);
                return {
                    isVariantPlaylist: true,
                    variants: [{ url: resolvedUrl, line }],
                    baseUrl: basePath
                };
            }

            // Regular segment
            const segmentUrl = resolveUrl(line, basePath);
            segments.push({
                url: segmentUrl,
                duration: currentDuration,
                index: segments.length
            });
            currentDuration = 0;
        }

        // Handle variant playlist entries
        if (line.startsWith('#EXT-X-STREAM-INF:')) {
            const nextLine = lines[i + 1];
            if (nextLine && !nextLine.startsWith('#')) {
                const bandwidth = extractAttribute(line, 'BANDWIDTH');
                const resolution = extractAttribute(line, 'RESOLUTION');

                if (!segments.variants) {
                    return {
                        isVariantPlaylist: true,
                        variants: [],
                        baseUrl: basePath
                    };
                }
            }
        }
    }

    // Mark as not live if ENDLIST is present
    if (content.includes('#EXT-X-ENDLIST')) {
        isLive = false;
    }

    return {
        isVariantPlaylist: false,
        segments,
        totalDuration,
        targetDuration,
        isLive,
        segmentCount: segments.length
    };
}

/**
 * Parse a variant/master playlist
 * @param {string} content - M3U8 content
 * @param {string} baseUrl - Base URL
 * @returns {Array} - Array of variant streams
 */
export function parseVariantPlaylist(content, baseUrl) {
    const lines = content.split('\n').map(line => line.trim()).filter(Boolean);
    const variants = [];
    const basePath = getBasePath(baseUrl);

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.startsWith('#EXT-X-STREAM-INF:')) {
            const nextLine = lines[i + 1];
            if (nextLine && !nextLine.startsWith('#')) {
                const bandwidth = extractAttribute(line, 'BANDWIDTH');
                const resolution = extractAttribute(line, 'RESOLUTION');
                const codecs = extractAttribute(line, 'CODECS');

                variants.push({
                    url: resolveUrl(nextLine, basePath),
                    bandwidth: bandwidth ? parseInt(bandwidth) : 0,
                    resolution: resolution || 'unknown',
                    codecs: codecs || 'unknown',
                    label: resolution || `${Math.round((bandwidth || 0) / 1000)}kbps`
                });
                i++; // Skip the URL line
            }
        }
    }

    // Sort by bandwidth (highest first)
    variants.sort((a, b) => b.bandwidth - a.bandwidth);

    return variants;
}

/**
 * Get base path from URL
 */
function getBasePath(url) {
    try {
        const urlObj = new URL(url);
        const pathParts = urlObj.pathname.split('/');
        pathParts.pop(); // Remove filename
        urlObj.pathname = pathParts.join('/') + '/';
        return urlObj.toString();
    } catch {
        // Handle relative URLs
        const lastSlash = url.lastIndexOf('/');
        return lastSlash >= 0 ? url.substring(0, lastSlash + 1) : '';
    }
}

/**
 * Resolve relative URL to absolute
 */
function resolveUrl(url, basePath) {
    // Already absolute URL
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // Protocol-relative URL
    if (url.startsWith('//')) {
        return 'https:' + url;
    }

    // Absolute path
    if (url.startsWith('/')) {
        try {
            const baseUrlObj = new URL(basePath);
            return `${baseUrlObj.origin}${url}`;
        } catch {
            return url;
        }
    }

    // Relative path
    return basePath + url;
}

/**
 * Extract attribute value from M3U8 tag
 */
function extractAttribute(line, name) {
    const regex = new RegExp(`${name}=(?:"([^"]+)"|([^,\\s]+))`);
    const match = line.match(regex);
    return match ? (match[1] || match[2]) : null;
}

/**
 * Format duration to human readable string
 */
export function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format bytes to human readable string
 */
export function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export default {
    parseM3U8,
    parseVariantPlaylist,
    formatDuration,
    formatBytes
};
