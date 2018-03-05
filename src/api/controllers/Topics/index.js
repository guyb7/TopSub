import _ from 'lodash'

import HackerNews from './HackerNews/'

const topics = [
  new HackerNews()
]

const topicsDict = _.reduce(topics, (acc, t) => {
  acc[t.info().id] = t
  return acc
}, {})

const list = async () => {
  return _.keys(topicsDict)
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
  topicsDict,
  list,
  fetch
}
