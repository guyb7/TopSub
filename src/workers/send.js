import '../../env'
import DB from '../DB/'

import Results from '../api/controllers/Results/'
import Subscriptions from '../api/controllers/Subscriptions/'
import Topics from '../api/controllers/Topics/'

const checkSingletonLock = async () => {
  //TODO Check if another instance is running

  // Check lock in DB
  // If exists, check if more than 5 minutes
  // Write lock to DB
}

const releaseSingletonLock = async () => {
  //TODO
}

const getCurrentTime = () => {
  return {
    minute: 0,
    hour: 8,
    weekDay: 0,
    // monthDay: 24,
    // month: 3,
    // year: 2018
  }
}

const getSubscribers = async ({ topic, period, currentTime }) => {
  return await Subscriptions.findSubscribers({ topic, period, time: currentTime })
}

const sendEmails = async mailJobs => {
  console.log(JSON.stringify(mailJobs.map(j => ({ ...j, results: j.results.length })), null, 2))
}

const main = async topic => {
  await DB.init()

  await checkSingletonLock()

  const topicsList = await Topics.list()
  const periods = Results.periods
  const limit = 10
  const currentTime = getCurrentTime()
  const mailJobs = []
  for (let topic of topicsList) {
    for (let period of periods) {
      // For each topic/period get the top 10 items
      const results = await Results.find({ limit, topic, period })
      if (results.length === 0) {
        continue
      }
      const data = results.map(r => r.dataValues)
      const subs = await getSubscribers({ topic, period, currentTime })
      for (let sub of subs) {
        mailJobs.push({
          topic,
          period,
          email: sub.email,
          results: data.slice(0, sub.limit)
        })
      }
    }
  }

  await sendEmails(mailJobs)

  await releaseSingletonLock()
  await DB.close()
}

main()
