const {
  existsSync: fileExists,
  unlinkSync: deleteFile,
  readdirSync: getFiles
} = require('fs')

const path = require('path')
const {downloadDirectory} = require('./conf')

const {
  getTitle,
  getFilename,
  downloadVideo,
  downloadAudio
} = require('./youtube-downloader')

const getPath = file => path.join(downloadDirectory, file)

const urls = [
  'https://www.youtube.com/watch?gl=GB&hl=en-GB&v=oHg5SJYRHA0',
  'https://www.youtube.com/watch?v=jcF5HtGvX5I'
]

jest.setTimeout(60000)

afterEach(() => {
  getFiles(downloadDirectory)
    .filter(file => !file.startsWith('.'))
    .forEach(file => deleteFile(getPath(file)))
})

test('returns the title', async () => {
  expect(await getTitle(urls[0])).toBe(`RickRoll'D`)
  expect(await getTitle(urls[1])).toBe('Beyoncé - Yoncé (Video)')
})

test('returns the filename', async () => {
  expect(await getFilename(urls[0])).toBe(`RickRoll_D_oHg5SJYRHA0.mp4`)
})

test('downloads video', done => {
  downloadVideo(urls[0])
    .on('complete', () => {
      expect(fileExists(getPath(`RickRoll_D_oHg5SJYRHA0.mp4`))).toBe(true)
      done()
    })
})

test('downloads audio', done => {
  downloadAudio(urls[0])
    .on('complete', () => {
      expect(fileExists(getPath(`RickRoll_D_oHg5SJYRHA0.mp3`))).toBe(true)
      done()
    })
})
