const {Duplex} = require('stream')

const mockProcess = () => {
  const stdout = new Duplex()
  stdout._read = () => {}

  const stderr = new Duplex()
  stderr._read = () => {}

  const process = new Duplex()
  process._read = () => {}

  process.stdout = stdout
  process.stderr = stderr

  return process
}

module.exports = {
  mockProcess
}
