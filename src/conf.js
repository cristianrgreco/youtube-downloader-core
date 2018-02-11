const path = require('path')

const binaryPath = path.join(__dirname, '..', 'bin')
const downloadDirectory = path.join(__dirname, '..', 'out')

module.exports = {
  logLevel: process.env.LOG_LEVEL || 'info',
  audioExtension: 'mp3',
  videoExtension: 'mp4',
  filenameFormat: '%(title)s_%(id)s.%(ext)s',
  downloadDirectory: process.env.DOWNLOAD_DIR || downloadDirectory,
  youtubeBinaryPath: process.env.YOUTUBE_BINARY_PATH || path.join(binaryPath, 'youtube-dl'),
  ffmpegBinaryPath: process.env.FFMPEG_BINARY_PATH || path.join(binaryPath, 'ffmpeg')
}
