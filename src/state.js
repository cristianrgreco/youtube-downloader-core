const states = {
  NONE: {id: 0, text: 'NONE'},
  RESOLVING: {id: 1, text: 'RESOLVING'},
  DOWNLOADING: {id: 2, text: 'DOWNLOADING'},
  CONVERTING: {id: 3, text: 'CONVERTING'},
  COMPLETE: {id: 4, text: 'COMPLETE'}
}

const stateMatchers = [
  { state: states.RESOLVING, pattern: /^\[youtube]/ },
  { state: states.DOWNLOADING, pattern: /^\[download]/ },
  { state: states.CONVERTING, pattern: /^\[ffmpeg]/ }
]

const getState = string => stateMatchers.find(matcher => matcher.pattern.test(string)).state

module.exports = {
  states,
  getState
}
