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

  console.log('[Found]', items.length)

  // Fetch each item
  const fetchJobs = items.map(i => {
    return new Promise(resolve => {
      t.fetchOne(i.data ? i : i.externalId)
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
  const storeJobs = itemsToStore.map(async item => {
    await DB.models.Results.upsert({
      topic,
      externalId: item.externalId,
      score: item.score,
      publishTime: item.time,
      url: item.url.toLocaleLowerCase(),
      data: item.data
    })
  })
  try {
    await Promise.all(storeJobs)
  } catch (e) {
    console.error(e)
  }

  await DB.close()
}

function getTopic() {
  for (let i in process.argv) {
    const next = Number(i) + 1
    if (process.argv[i] === '--topic' && process.argv[next]) {
      return process.argv[next]
    }
  }
  console.log('No topic provided. Use --topic yourtopicid')
  process.exit()
}

const topic = getTopic()
main(topic)
