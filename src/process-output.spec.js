const {processOutput} = require('./process-output')
const {mockProcess} = require('./mock-process')

test('returns standard output', done => {
  const process = mockProcess()

  const promise = processOutput(process)

  process.stdout.emit('data', 'hello')
  process.stdout.emit('data', ' ')
  process.stdout.emit('data', 'world')
  process.emit('close')

  promise.then(output => {
    expect(output).toBe('hello world')
    done()
  })
})

test('returns standard error if an error occurred', done => {
  const process = mockProcess()

  const promise = processOutput(process)

  process.stdout.emit('data', 'hello')
  process.stderr.emit('data', 'good')
  process.stderr.emit('data', 'bye')
  process.emit('close')

  promise.catch(output => {
    expect(output).toBe('goodbye')
    done()
  })
})
