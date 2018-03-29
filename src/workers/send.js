import '../../env'
import moment from 'moment'
import _ from 'lodash'

import DB from '../DB/'
import Results from '../api/controllers/Results/'
import Subscriptions from '../api/controllers/Subscriptions/'
import Topics from '../api/controllers/Topics/'
import EmailRender from '../components/EmailRender/'
import Email from '../api/controllers/Email/'

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
  _.each(mailJobs, j => {
    const component = Topics.topicsDict[j.topic]
    const markup = EmailRender({ component, results: j.results })
    Email.send({
      template: 'subscription',
      to: j.email,
      context: {
        content: markup,
        email: j.email,
        unsubscribeToken: j.unsubscribeToken
      }
    })
  })
}

const main = async topic => {
  await DB.init()

  await checkSingletonLock()

  const topicsList = await Topics.list()
  const periods = Results.periods
  const limit = 10
  const currentTime = getCurrentTime()
  const mailJobs = []
  const emailsCache = {}
  for (let topic of topicsList) {
    for (let period of periods) {
      // For each topic/period get the top 10 items
      const results = await Results.find({ limit, topic, period })
      if (results.length === 0) {
        // console.log(`No results for topic: ${topic}, period: ${period}, limit: ${limit}`)
        continue
      }
      const data = results.map(r => r.dataValues)
      const subs = await getSubscribers({ topic, period, currentTime })
      for (let sub of subs) {
        const emailCacheKey = `${topic}/${period}/${limit}`
        if (!emailsCache[emailCacheKey]) {
          emailsCache[emailCacheKey] = data.slice(0, sub.limit)
        }
        mailJobs.push({
          topic,
          period,
          email: sub.email,
          unsubscribeToken: sub.unsubscribeToken,
          results: emailsCache[emailCacheKey]
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
