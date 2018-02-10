const {spawn} = require('child_process')

const {
  processOutput,
  processDownload
} = require('./process-helper')

const {
  audioExtension,
  videoExtension,
  filenameFormat,
  youtubeBinaryPath,
  ffmpegBinaryPath,
  downloadDirectory
} = require('./conf')

const getTitle = url => {
  return processOutput(
    spawn(
      youtubeBinaryPath,
      [
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
  return processOutput(
    spawn(
      youtubeBinaryPath,
      [
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

const downloadVideo = url => {
  return processDownload(
    spawn(
      youtubeBinaryPath,
      [
        '-o', filenameFormat,
        '--format', videoExtension,
        '--no-part',
        '--no-playlist',
        url
      ],
      {cwd: downloadDirectory}
    )
  )
}

const downloadAudio = url => {
  return processDownload(
    spawn(
      youtubeBinaryPath,
      [
        '-o', filenameFormat,
        '--format', videoExtension,
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
