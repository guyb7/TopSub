import _ from 'lodash'

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

const fetch = async () => {
  //WIP
  try {
    const t = topics[0]
    const items = await t.fetchList()
    const parsed = t.parseList(items)
    const one = await t.fetchOne(_.sample(parsed, 1).id)
    const parsedOne = t.parseOne(one)
    return parsedOne
  } catch (e) {
    throw e
  }
}

export default {
  topics,
  list,
  fetch
}
