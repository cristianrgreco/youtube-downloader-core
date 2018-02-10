const {EventEmitter} = require('events')
const byline = require('byline')

const processOutput = process => new Promise((resolve, reject) => {
  process.stdout.setEncoding('UTF-8')
  process.stderr.setEncoding('UTF-8')

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

const processDownload = process => {
  process.stdout.setEncoding('UTF-8')
  process.stderr.setEncoding('UTF-8')

  const emitter = new EventEmitter()

  byline(process.stdout).on('data', data => {
    console.log(data)
  })

  byline(process.stderr).on('data', data => {
    console.error(data)
  })

  process.on('close', () => {
    emitter.emit('complete')
  })

  return emitter
}

module.exports = {
  processOutput,
  processDownload
}
