import '../../env'
import moment from 'moment'

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
  const now = moment().utc()
  let minute = now.minute()
  let hour = now.hour()
  let weekDay = now.day()
  for (let i in process.argv) {
    const next = Number(i) + 1
    if (process.argv[i] === '--minute' && process.argv[next]) {
      minute = Number(process.argv[next])
    }
    if (process.argv[i] === '--hour' && process.argv[next]) {
      hour = Number(process.argv[next])
    }
    if (process.argv[i] === '--weekDay' && process.argv[next]) {
      weekDay = Number(process.argv[next])
    }
  }
  return {
    minute,
    hour,
    weekDay
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
  
  console.log('Sending emails to subscribers at', currentTime)
  await sendEmails(mailJobs)

  await releaseSingletonLock()
  await DB.close()
}

main()
