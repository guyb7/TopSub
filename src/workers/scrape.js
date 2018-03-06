import _ from 'lodash'

import Topics from '../api/controllers/Topics/'

const main = async (topic) => {
  const t = Topics.topicsDict[topic]
  const items = await t.fetchList()
  const parsed = t.parseList(items)
  //TODO filter existing
  const one = await t.fetchOne(_.sample(parsed, 1).id)
  const parsedOne = t.parseOne(one)
  console.log('parsedOne', parsedOne)
  //TODO store
}

main('hackernews')
