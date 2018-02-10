const fs = require('fs')
const path = require('path')
const {downloadDirectory} = require('./conf')

const {
  getTitle,
  getFilename,
  downloadVideo,
  downloadAudio
} = require('./youtube-downloader')

const urls = [
  'https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0',
  'https://www.youtube.com/watch?v=jcF5HtGvX5I'
]

jest.setTimeout(60000)

afterEach(() => {
  fs.readdirSync(downloadDirectory)
    .filter(file => !file.startsWith('.'))
    .forEach(file => fs.unlinkSync(path.join(downloadDirectory, file)))
})

test('returns the title', async () => {
  expect(await getTitle(urls[0])).toBe(`RickRoll'D`)
  expect(await getTitle(urls[1])).toBe('Beyoncé - Yoncé (Video)')
})

test('returns the filename', async () => {
  expect(await getFilename(urls[0])).toBe(`RickRoll'D_oHg5SJYRHA0.mp4`)
})

test('downloads video', done => {
  downloadVideo(urls[0])
    .on('complete', () => {
      expect(fs.existsSync(path.join(downloadDirectory, `RickRoll'D_oHg5SJYRHA0.mp4`))).toBe(true)
      done()
    })
})

test('downloads audio', done => {
  downloadAudio(urls[0])
    .on('complete', () => {
      expect(fs.existsSync(path.join(downloadDirectory, `RickRoll'D_oHg5SJYRHA0.mp3`))).toBe(true)
      done()
    })
})
