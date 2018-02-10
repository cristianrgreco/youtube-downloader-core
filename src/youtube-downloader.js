const {spawn} = require('child_process')
const {getProcessOutput} = require('./process-helper')

const {
  videoExtension,
  filenameFormat,
  youtubeBinaryPath
} = require('./conf')

const getTitle = url => {
  return getProcessOutput(
    spawn(
      youtubeBinaryPath, [
        '--get-title',
        '--encoding', 'UTF-8',
        '--no-part',
        '--no-playlist',
        url
      ]
    )
  )
}

const getFilename = url => {
  return getProcessOutput(
    spawn(
      youtubeBinaryPath, [
        '-o', filenameFormat,
        '--format', videoExtension,
        '--get-filename',
        '--encoding', 'UTF-8',
        '--no-part',
        '--no-playlist',
        url
      ]
    )
  )
}

module.exports = {
  getTitle,
  getFilename
}
