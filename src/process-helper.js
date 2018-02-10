const getProcessOutput = process => new Promise((resolve, reject) => {
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
  getProcessOutput
}
