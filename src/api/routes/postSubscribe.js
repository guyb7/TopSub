import isInteger from 'lodash/isInteger'
import {
  isEmail,
  isEmpty
} from 'validator'

import Topics from '../controllers/Topics/'
import DB from '../../DB/'

function checkParams({ email, frequency, limit, period, time, topic, tzHoursOffset }) {
  if (!isEmail(email)) {
    return false
  }
  if (!['once', 'daily', 'sunday', 'monday', 'friday'].includes(frequency)) {
    return false
  }
  if (!['now', 'morning', 'noon', 'evening'].includes(time)) {
    return false
  }
  if (!['hour', 'day', '3days', 'week', 'month'].includes(period)) {
    return false
  }
  if (isEmpty(topic) || !Topics.topicsDict[topic]) {
    return false
  }
  if (!isInteger(limit) || isInteger < 1 || isInteger > 10) {
    return false
  }
  if (!isInteger(tzHoursOffset) || isInteger <= -24 || tzHoursOffset >= 24) {
    return false
  }
  return { email, frequency, limit, period, time, topic, tzHoursOffset }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }
  const {
    email,
    frequency,
    limit,
    period,
    time,
    topic,
    tzHoursOffset
  } = params

  const hour = time === 'morning' ? 8 : (time === 'noon' ? 14 : 20)
  let utcHour = hour + tzHoursOffset
  if (utcHour < 0) {
    utcHour = utcHour + 24
  } else if (utcHour > 23) {
    utcHour = utcHour - 24
  }
  let weekDay
  switch (frequency) {
    case 'daily':
      weekDay = '*'
      break
    case 'sunday':
      weekDay = 0
      break
    case 'monday':
      weekDay = 1
      break
    case 'friday':
      weekDay = 6
      break
    default:
  }
  const schedule = `* * ${utcHour} * * ${weekDay}`
  await DB.models.Subscriptions.create({
    topic,
    limit,
    period,
    tzHoursOffset,
    schedule,
    email
  })
  return {
    success: true
  }
}
