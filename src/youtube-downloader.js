const {spawn} = require('child_process')
const {logger} = require('./logger')
const {processOutput} = require('./process-output')
const {processDownload} = require('./process-download')

const {
  audioExtension,
  videoExtension,
  filenameFormat,
  youtubeBinaryPath,
  ffmpegBinaryPath,
  downloadDirectory
} = require('./conf')

const getTitle = url => {
  logger.log('info', 'getting title', {url})
  return processOutput(
    spawn(
      youtubeBinaryPath,
      [
        '--get-title',
        '--encoding', 'UTF-8',
        '--restrict-filenames',
        '--no-part',
        '--no-playlist',
        url
      ]
    )
  )
}

const getFilename = url => {
  logger.log('info', 'getting filename', {url})
  return processOutput(
    spawn(
      youtubeBinaryPath,
      [
        '-o', filenameFormat,
        '--format', videoExtension,
        '--get-filename',
        '--encoding', 'UTF-8',
        '--restrict-filenames',
        '--no-part',
        '--no-playlist',
        url
      ]
    )
  )
}

const downloadVideo = url => {
  logger.log('info', 'downloading video', {url})
  return processDownload(
    spawn(
      youtubeBinaryPath,
      [
        '-o', filenameFormat,
        '--format', videoExtension,
        '--restrict-filenames',
        '--no-part',
        '--no-playlist',
        url
      ],
      {cwd: downloadDirectory}
    )
  )
}

const downloadAudio = url => {
  logger.log('info', 'downloading audio', {url})
  return processDownload(
    spawn(
      youtubeBinaryPath,
      [
        '-o', filenameFormat,
        '--format', videoExtension,
        '--restrict-filenames',
        '--no-part',
        '--no-playlist',
        '--extract-audio',
        '--audio-format', audioExtension,
        '--ffmpeg-location', ffmpegBinaryPath,
        url
      ],
      {cwd: downloadDirectory}
    )
  )
}

module.exports = {
  getTitle,
  getFilename,
  downloadVideo,
  downloadAudio
}
