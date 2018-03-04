import HackerNews from './HackerNews/'

const topics = [
  new HackerNews()
]

const list = async () => {
  return topics.reduce((acc, t) => {
    acc.push(t.info().id)
    return acc
  }, [])
}

export default {
  topics,
  list
}
