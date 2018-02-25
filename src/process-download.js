const byline = require('byline')
const {EventEmitter} = require('events')
const {logger} = require('./logger')
const {getProgress} = require('./progress')
const {states, getState} = require('./state')

const processDownload = process => {
  process.stdout.setEncoding('UTF-8')
  process.stderr.setEncoding('UTF-8')

  const emitter = new EventEmitter()

  ;(currentState => {
    byline(process.stdout).on('data', data => {
      const newState = getState(data)

      if (newState !== null && newState !== currentState) {
        currentState = newState
        logger.log('debug', 'emitting state event', {currentState})
        emitter.emit('state', currentState)
      }

      if (newState === states.DOWNLOADING) {
        const progress = getProgress(data)
        logger.log('debug', 'emitting progress event', {progress})
        emitter.emit('progress', progress)
      }
    })
  })(states.NONE)

  const errs = []
  byline(process.stderr).on('data', data => errs.push(data))

  process.on('close', () => {
    if (errs.length > 0) {
      const error = errs.join('').trim()
      logger.log('warn', 'download complete with errors', {error})
      emitter.emit('error', error)
    } else {
      logger.log('info', 'download complete')
    }
    emitter.emit('state', states.COMPLETE)
    emitter.emit('complete')
  })

  return emitter
}

module.exports = {
  processDownload
}
