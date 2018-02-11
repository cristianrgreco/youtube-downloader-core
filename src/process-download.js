const {EventEmitter} = require('events')
const byline = require('byline')
const {logger} = require('./logger')
const {getProgress} = require('./progress')

const {
  states,
  getState
} = require('./state')

const processDownload = process => {
  process.stdout.setEncoding('UTF-8')
  process.stderr.setEncoding('UTF-8')

  const emitter = new EventEmitter();

  (currentState => {
    byline(process.stdout).on('data', data => {
      const newState = getState(data)

      if (newState !== null && newState !== currentState) {
        currentState = newState
        logger.debug('emitting state event: %o', currentState)
        emitter.emit('state', currentState)
      }

      if (newState === states.DOWNLOADING) {
        const progress = getProgress(data)
        logger.debug('emitting progress event: %o', progress)
        emitter.emit('progress', progress)
      }
    })
  })(states.NONE)

  const errs = []
  byline(process.stderr).on('data', data => errs.push(data))

  process.on('close', () => {
    if (errs.length > 0) {
      const error = errs.join('').trim()
      logger.warn('download process complete with errors: %s', error)
      emitter.emit('error', error)
    } else {
      logger.info('download process complete')
    }
    emitter.emit('state', states.COMPLETE)
    emitter.emit('complete')
  })

  return emitter
}

module.exports = {
  processDownload
}
