import '../../env'
import _ from 'lodash'
import DB from '../DB/'

import Topics from '../api/controllers/Topics/'

const main = async (topic) => {
  await DB.init()
  const t = Topics.topicsDict[topic]
  const items = await t.fetchList()
  const parsed = t.parseList(items)
  //TODO filter existing
  const one = await t.fetchOne(_.sample(parsed, 1).id)
  const parsedOne = t.parseOne(one)
  console.log('parsedOne', parsedOne)
  //TODO store
  // await DB.models.Result.create({ externalId: 'a123', })
  const results = await DB.models.Result.findAll()
  console.log('results', results)
  await DB.close()
}

main('hackernews')
