const path = require('path')

module.exports = {
  audioExtension: 'mp3',
  videoExtension: 'mp4',
  filenameFormat: '%(title)s_%(id)s.%(ext)s',
  youtubeBinaryPath: path.join(__dirname, '..', 'bin', 'youtube-dl')
}
