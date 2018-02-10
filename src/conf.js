const path = require('path')

module.exports = {
  audioExtension: 'mp3',
  videoExtension: 'mp4',
  filenameFormat: '%(title)s_%(id)s.%(ext)s',
  downloadDirectory: path.join(__dirname, '..', 'out'),
  youtubeBinaryPath: path.join(__dirname, '..', 'bin', 'youtube-dl'),
  ffmpegBinaryPath: path.join(__dirname, '..', 'bin', 'ffmpeg')
}
