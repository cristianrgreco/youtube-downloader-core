const {spawn} = require('child_process')
const {youtubeBinaryPath} = require('./conf')

const getTitle = url => new Promise(async (resolve, reject) => {
  const process = spawn(youtubeBinaryPath, [
    '--get-title',
    '--encoding', 'UTF-8',
    '--no-part',
    '--no-playlist',
    url
  ])

  const {stdout, stderr, hasError} = await streamProcess(process)

  if (hasError) {
    return reject(stderr)
  } else {
    return resolve(stdout)
  }
})

const streamProcess = process => new Promise(resolve => {
  const outs = []
  process.stdout.on('data', data => outs.push(data))

  const errs = []
  process.stderr.on('data', data => errs.push(data))

  return process.on('close', () => resolve({
    stdout: outs.join('').trim(),
    stderr: errs.join('').trim(),
    hasError: errs.length > 0
  }))
})

module.exports = {
  getTitle
}
