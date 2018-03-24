import isInteger from 'lodash/isInteger'
import {
  isEmail,
  isEmpty
} from 'validator'

import Topics from '../controllers/Topics/'
import Subscriptions from '../controllers/Subscriptions/'

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

  try {
    await Subscriptions.create({
      email,
      frequency,
      limit,
      period,
      time,
      topic,
      tzHoursOffset
    })
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
