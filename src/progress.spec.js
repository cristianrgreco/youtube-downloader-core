const {getProgress} = require('./progress')

test('returns the progress', () => {
  expect(getProgress(`[download]   0.0% of 9.22MiB at Unknown speed ETA Unknown ETA`)).toEqual({
    eta: null,
    fileSize: '9.22MiB',
    downloadSpeed: null,
    percentageComplete: '0.0%'
  })
  expect(getProgress(`[download]   0.1% of 9.22MiB at  6.42MiB/s ETA 00:01`)).toEqual({
    eta: '00:01',
    fileSize: '9.22MiB',
    downloadSpeed: '6.42MiB/s',
    percentageComplete: '0.1%'
  })
  expect(getProgress(`[download] 100% of 9.22MiB in 00:11`)).toEqual({
    eta: null,
    fileSize: '9.22MiB',
    downloadSpeed: null,
    percentageComplete: '100%'
  })
})
