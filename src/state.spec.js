const {getState, states: {RESOLVING, DOWNLOADING, CONVERTING}} = require('./state')

test('returns the state', () => {
  expect(getState(`[youtube] oHg5SJYRHA0: Extracting video information`)).toBe(RESOLVING)
  expect(getState(`[download] Destination: RickRoll'D_oHg5SJYRHA0.mp4`)).toBe(DOWNLOADING)
  expect(getState(`[download]   0.0% of 9.22MiB at Unknown speed ETA Unknown ETA`)).toBe(DOWNLOADING)
  expect(getState(`[download]   0.1% of 9.22MiB at  6.42MiB/s ETA 00:01`)).toBe(DOWNLOADING)
  expect(getState(`[download] 100% of 9.22MiB in 00:11`)).toBe(DOWNLOADING)
  expect(getState(`[ffmpeg] Destination: RickRoll'D_oHg5SJYRHA0.mp3`)).toBe(CONVERTING)
})

test('returns null if state unknown', () => {
  expect(getState(`Deleting original file RickRoll'D_oHg5SJYRHA0.mp4`)).toBeNull()
})
