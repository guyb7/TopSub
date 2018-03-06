import HackerNews from './HackerNews/'

const topics = [
  new HackerNews()
]

const topicsDict = topics.reduce((acc, t) => {
  acc[t.info().id] = t
  return acc
}, {})

const list = async () => {
  return Object.keys(topicsDict)
}

export default {
  topics,
  topicsDict,
  list
}
