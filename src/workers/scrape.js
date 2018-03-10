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
  await DB.models.Results.create({
    topic,
    externalId: parsedOne.id,
    score: parsedOne.score,
    publishTime: parsedOne.time,
    url: parsedOne.url,
    data: { a: 'b' }
  })
  const results = await DB.models.Results.findAll()
  console.log('results', results)
  await DB.close()
}

main('hackernews')
