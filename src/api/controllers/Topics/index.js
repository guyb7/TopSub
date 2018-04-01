import HackerNews from './HackerNews/'
import Dribbble from './Dribbble/'

const topics = [
  new HackerNews(),
  new Dribbble()
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
