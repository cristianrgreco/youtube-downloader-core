const {processDownload} = require('./process-download')
const {mockProcess} = require('./__mocks__/mock-process')
const {states} = require('./state')

test('emits state events when state changes', done => {
  const process = mockProcess()
  const stateEvents = []
  processDownload(process).on('state', state => stateEvents.push(state))

  processDownload(process).on('complete', () => {
    expect(stateEvents).toEqual([states.RESOLVING, states.DOWNLOADING, states.CONVERTING, states.COMPLETE])
    done()
  })

  process.stdout.emit('data', '[youtube]\n')
  process.stdout.emit('data', 'Deleting extra file\n')
  process.stdout.emit('data', '[download]\n')
  process.stdout.emit('data', '[ffmpeg]\n')
  process.emit('close')
})

test('emits progress events while downloading', done => {
  const process = mockProcess()
  const progressEvents = []
  processDownload(process).on('progress', progress => progressEvents.push(progress))

  processDownload(process).on('complete', () => {
    expect(progressEvents).toEqual([
      {
        eta: null,
        fileSize: '9.22MiB',
        downloadSpeed: null,
        percentageComplete: '0.0%'
      },
      {
        eta: '00:01',
        fileSize: '9.22MiB',
        downloadSpeed: '6.42MiB/s',
        percentageComplete: '0.1%'
      }
    ])
    done()
  })

  process.stdout.emit('data', '[download]   0.0% of 9.22MiB at Unknown speed ETA Unknown ETA\n')
  process.stdout.emit('data', '[download]   0.1% of 9.22MiB at  6.42MiB/s ETA 00:01\n')
  process.stdout.emit('data', 'Deleting extra file\n')
  process.emit('close')
})

test('emits an error on completion if an error occurred', done => {
  const process = mockProcess()

  processDownload(process).on('error', error => {
    expect(error).toBe('goodbye')
    done()
  })

  process.stderr.emit('data', 'good')
  process.stderr.emit('data', 'bye\n')
  process.emit('close')
})

test('emits a complete event on close', done => {
  const process = mockProcess()
  processDownload(process).on('complete', done)
  process.emit('close')
})
