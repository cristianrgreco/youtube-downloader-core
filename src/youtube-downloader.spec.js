const {
  getTitle,
  getFilename
} = require('./youtube-downloader')

test('returns the title', async () => {
  const url = 'https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0'
  expect(await getTitle(url)).toBe(`RickRoll'D`)
}, 10000)

test('returns the filename', async () => {
  const url = 'https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0'
  expect(await getFilename(url)).toBe(`RickRoll'D_oHg5SJYRHA0.mp4`)
}, 10000)
