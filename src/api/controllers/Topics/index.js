import _ from 'lodash'

import HackerNews from './HackerNews/'

const topics = [
  new HackerNews()
]

const list = async () => {
  return topics.reduce((acc, t) => {
    acc.push(t.info().id)
    const tst = async () => {
      const items = await t.fetchList()
      const parsed = t.parseList(items)
      const one = await t.fetchOne(_.sample(parsed, 1).id)
      const parsedOne = t.parseOne(one)
      console.log('parsedOne', parsedOne)
    }
    tst()
    return acc
  }, [])
}

export default {
  topics,
  list
}
