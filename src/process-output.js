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

module.exports = {
  processOutput
}
