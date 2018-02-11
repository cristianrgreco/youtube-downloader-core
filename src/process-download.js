const {EventEmitter} = require('events')
const byline = require('byline')
const {getProgress} = require('./progress')

const {
  states,
  getState
} = require('./state')

const processDownload = process => {
  process.stdout.setEncoding('UTF-8')
  process.stderr.setEncoding('UTF-8')

  const emitter = new EventEmitter()

  let currentState = states.NONE
  byline(process.stdout).on('data', data => {
    const newState = getState(data)

    if (newState !== null && newState !== currentState) {
      currentState = newState
      emitter.emit('state', newState)
    }

    if (newState === states.DOWNLOADING) {
      emitter.emit('progress', getProgress(data))
    }
  })

  const errs = []
  byline(process.stderr).on('data', data => errs.push(data))

  process.on('close', () => {
    if (errs.length > 0) {
      emitter.emit('error', errs.join('').trim())
    }
    emitter.emit('state', states.COMPLETE)
    emitter.emit('complete')
  })

  return emitter
}

module.exports = {
  processDownload
}
