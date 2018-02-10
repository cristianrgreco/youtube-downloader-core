const {spawn} = require('child_process')
const {
  videoExtension,
  filenameFormat,
  youtubeBinaryPath
} = require('./conf')

const getTitle = url => {
  return getStreamOutput(spawn(youtubeBinaryPath, [
    '--get-title',
    '--encoding', 'UTF-8',
    '--no-part',
    '--no-playlist',
    url
  ]))
}

const getFilename = url => {
  return getStreamOutput(spawn(youtubeBinaryPath, [
    '-o', filenameFormat,
    '--format', videoExtension,
    '--get-filename',
    '--encoding', 'UTF-8',
    '--no-part',
    '--no-playlist',
    url
  ]))
}

const getStreamOutput = process => new Promise((resolve, reject) => {
  const outs = []
  process.stdout.on('data', data => outs.push(data))

  const errs = []
  process.stderr.on('data', data => errs.push(data))

  return process.on('close', () => {
    if (errs.length > 0) {
      return reject(errs.join('').trim())
    } else {
      return resolve(outs.join('').trim())
    }
  })
})

module.exports = {
  getTitle,
  getFilename
}
