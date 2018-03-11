import '../../env'
import _ from 'lodash'
import DB from '../DB/'

import Topics from '../api/controllers/Topics/'

const main = async topic => {
  await DB.init()
  // Scrape and parse
  const t = Topics.topicsDict[topic]
  const data = await t.fetchList()
  const items = t.parseList(data)

  
  // Filter existing
  const ids = await DB.models.Results.findAll({ attributes: ['externalId'] }).map(r => r.externalId)
  const existingIds = new Set(ids)
  const filtered = _.filter(items, i => !existingIds.has(i.externalId))

  console.log('[Found]', items.length)
  console.log('[Already existing]', [...existingIds].length)

  // Fetch each item
  const fetchJobs = filtered.map(i => {
    return new Promise(resolve => {
      t.fetchOne(i.externalId)
        .then(itemData => {
          const item = t.parseOne(itemData)
          resolve(item)
        })
    }, reject => {
      reject()
    })
  })
  const itemsToStore = await Promise.all(fetchJobs)

  // Store data
  console.log('[Storing]', itemsToStore.length)
  const storeJobs = itemsToStore.map(item => {
    return new Promise(resolve => {
      DB.models.Results.create({
        topic,
        externalId: item.externalId,
        score: item.score,
        publishTime: item.time,
        url: item.url,
        data: item.data
      })
      .then(resolve)
    }, reject => {
      reject()
    })
  })
  await Promise.all(storeJobs)

  await DB.close()
}

console.log(process.argv)
process.exit()
main('hackernews')
