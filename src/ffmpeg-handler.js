import { FFmpeg } from '@ffmpeg/ffmpeg';
import { toBlobURL, fetchFile } from '@ffmpeg/util';

class FFmpegHandler {
    constructor() {
        this.ffmpeg = new FFmpeg();
        this.loaded = false;
        this.baseURL = 'https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.10/dist/esm';
    }

    /**
     * Load FFmpeg core with progress callback
     * @param {Function} onProgress - Progress callback (0-100)
     * @param {Function} onLog - Log message callback
     */
    async load(onProgress = () => { }, onLog = () => { }) {
        if (this.loaded) return;

        // Set up logging
        this.ffmpeg.on('log', ({ message }) => {
            onLog(message);
        });

        // Set up progress tracking
        this.ffmpeg.on('progress', ({ progress }) => {
            onProgress(Math.round(progress * 100));
        });

        try {
            onLog('正在下载 FFmpeg 核心文件...');

            // Load FFmpeg core with blob URLs to bypass CORS
            await this.ffmpeg.load({
                coreURL: await toBlobURL(
                    `${this.baseURL}/ffmpeg-core.js`,
                    'text/javascript'
                ),
                wasmURL: await toBlobURL(
                    `${this.baseURL}/ffmpeg-core.wasm`,
                    'application/wasm'
                ),
            });

            this.loaded = true;
            onLog('FFmpeg 加载完成!');
        } catch (error) {
            onLog(`加载失败: ${error.message}`);
            throw error;
        }
    }

    /**
     * Check if FFmpeg is loaded
     */
    isLoaded() {
        return this.loaded;
    }

    /**
     * Write file to FFmpeg virtual filesystem
     * @param {string} name - File name in virtual FS
     * @param {Uint8Array|Blob|string} data - File data (Uint8Array, Blob, or URL)
     */
    async writeFile(name, data) {
        if (typeof data === 'string') {
            // If data is a URL, fetch it
            data = await fetchFile(data);
        } else if (data instanceof Blob) {
            data = new Uint8Array(await data.arrayBuffer());
        }
        await this.ffmpeg.writeFile(name, data);
    }

    /**
     * Read file from FFmpeg virtual filesystem
     * @param {string} name - File name in virtual FS
     * @returns {Uint8Array} - File data
     */
    async readFile(name) {
        return await this.ffmpeg.readFile(name);
    }

    /**
     * Delete file from FFmpeg virtual filesystem
     * @param {string} name - File name to delete
     */
    async deleteFile(name) {
        try {
            await this.ffmpeg.deleteFile(name);
        } catch (e) {
            // Ignore if file doesn't exist
        }
    }

    /**
     * Execute FFmpeg command
     * @param {string[]} args - FFmpeg command arguments
     */
    async exec(args) {
        await this.ffmpeg.exec(args);
    }

    /**
     * Convert TS segments to target format
     * @param {Uint8Array[]} segments - Array of TS segment data
     * @param {string} outputFormat - Output format (mp4, webm, avi, mkv, mov)
     * @param {string} quality - Quality setting (high, medium, low)
     * @param {Function} onProgress - Progress callback
     * @param {Function} onLog - Log callback
     * @returns {Uint8Array} - Converted video data
     */
    async convertSegments(segments, outputFormat, quality, onProgress = () => { }, onLog = () => { }) {
        onLog(`开始转换, 共 ${segments.length} 个分片`);
        onProgress(0);

        // Write all segments to virtual FS
        const segmentFiles = [];
        for (let i = 0; i < segments.length; i++) {
            const filename = `segment_${i.toString().padStart(5, '0')}.ts`;
            await this.writeFile(filename, segments[i]);
            segmentFiles.push(filename);

            const writeProgress = Math.round((i + 1) / segments.length * 30);
            onProgress(writeProgress);
            onLog(`写入分片 ${i + 1}/${segments.length}`);
        }

        // Create concat file list
        const concatContent = segmentFiles.map(f => `file '${f}'`).join('\n');
        await this.writeFile('concat.txt', new TextEncoder().encode(concatContent));
        onLog('分片列表已创建');
        onProgress(35);

        // Build FFmpeg command based on output format and quality
        const outputFilename = `output.${outputFormat}`;
        const args = this.buildConvertArgs(outputFormat, quality, outputFilename);

        onLog(`执行转换命令: ffmpeg ${args.join(' ')}`);
        onProgress(40);

        // Execute conversion
        await this.exec(args);
        onProgress(90);
        onLog('转换完成, 正在读取输出文件...');

        // Read output file
        const outputData = await this.readFile(outputFilename);
        onProgress(95);

        // Cleanup
        onLog('清理临时文件...');
        for (const file of segmentFiles) {
            await this.deleteFile(file);
        }
        await this.deleteFile('concat.txt');
        await this.deleteFile(outputFilename);

        onProgress(100);
        onLog('处理完成!');

        return outputData;
    }

    /**
     * Build FFmpeg conversion arguments
     */
    buildConvertArgs(format, quality, outputFilename) {
        // Base args for concatenation
        const baseArgs = ['-f', 'concat', '-safe', '0', '-i', 'concat.txt'];

        // Quality presets
        const qualityPresets = {
            high: { crf: '18', preset: 'slow' },
            medium: { crf: '23', preset: 'medium' },
            low: { crf: '28', preset: 'ultrafast' }
        };

        const q = qualityPresets[quality] || qualityPresets.medium;

        // Format-specific encoding options
        switch (format) {
            case 'mp4':
                return [
                    ...baseArgs,
                    '-c:v', 'libx264',
                    '-crf', q.crf,
                    '-preset', q.preset,
                    '-c:a', 'aac',
                    '-b:a', '128k',
                    '-movflags', '+faststart',
                    outputFilename
                ];

            case 'webm':
                return [
                    ...baseArgs,
                    '-c:v', 'libvpx-vp9',
                    '-crf', q.crf,
                    '-b:v', '0',
                    '-c:a', 'libopus',
                    '-b:a', '128k',
                    outputFilename
                ];

            case 'avi':
                return [
                    ...baseArgs,
                    '-c:v', 'mpeg4',
                    '-q:v', quality === 'high' ? '2' : quality === 'low' ? '8' : '5',
                    '-c:a', 'mp3',
                    '-b:a', '128k',
                    outputFilename
                ];

            case 'mkv':
                // MKV: just remux without re-encoding for speed
                return [
                    ...baseArgs,
                    '-c', 'copy',
                    outputFilename
                ];

            case 'mov':
                return [
                    ...baseArgs,
                    '-c:v', 'libx264',
                    '-crf', q.crf,
                    '-preset', q.preset,
                    '-c:a', 'aac',
                    '-b:a', '128k',
                    outputFilename
                ];

            default:
                return [
                    ...baseArgs,
                    '-c', 'copy',
                    outputFilename
                ];
        }
    }

    /**
     * Get MIME type for output format
     */
    getMimeType(format) {
        const mimeTypes = {
            mp4: 'video/mp4',
            webm: 'video/webm',
            avi: 'video/x-msvideo',
            mkv: 'video/x-matroska',
            mov: 'video/quicktime'
        };
        return mimeTypes[format] || 'video/mp4';
    }
}

// Export singleton instance
export const ffmpegHandler = new FFmpegHandler();
export default ffmpegHandler;
