const matchers = [
  { key: 'eta', pattern: /ETA\s+([0-9:]+)/ },
  { key: 'fileSize', pattern: /of\s(.+?)\s/ },
  { key: 'downloadSpeed', pattern: /at\s+(.+?)\s/ },
  { key: 'percentageComplete', pattern: /([0-9.]+%)/ }
]

const getProgress = string => matchers
  .map(({key, pattern}) => ({[key]: processMatch(string.match(pattern))}))
  .reduce((prev, next) => ({...prev, ...next}))

const processMatch = match => {
  if (!match) {
    return null
  } else {
    return match[match.length - 1] === 'Unknown' ? null : match[match.length - 1]
  }
}

module.exports = {
  getProgress
}
