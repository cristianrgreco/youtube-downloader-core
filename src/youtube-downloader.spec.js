const {
  getTitle,
  getFilename
} = require('./youtube-downloader')

test('returns the title', async () => {
  expect(
    await getTitle('https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0')
  ).toBe(`RickRoll'D`)
  expect(
    await getTitle('https://www.youtube.com/watch?v=jcF5HtGvX5I')
  ).toBe('Beyoncé - Yoncé (Video)')
}, 10000)

test('returns the filename', async () => {
  expect(
    await getFilename('https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0')
  ).toBe(`RickRoll'D_oHg5SJYRHA0.mp4`)
}, 5000)
