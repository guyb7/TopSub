import uuid from 'uuid/v4'

import DB from '../../../DB/'

const generateSchedule = ({ tzHoursOffset, frequency, time }) => {
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
      weekDay = [0, 1, 2, 3, 4, 5, 6]
      break
    case 'sunday':
      weekDay = [0]
      break
    case 'monday':
      weekDay = [1]
      break
    case 'friday':
      weekDay = [6]
      break
    default:
  }
  return {
    minutes: [0],
    hours: [hour],
    weekDay
  }
}

export default async ({
  email,
  frequency,
  limit,
  period,
  time,
  topic,
  tzHoursOffset
}) => {
  const unsibscribeToken = uuid()
  const result = await DB.models.Subscriptions.create({
    topic,
    limit,
    period,
    tzHoursOffset,
    email,
    unsibscribeToken
  })
  const subscriptionId = result.dataValues.id
  const schedule = generateSchedule({ tzHoursOffset, frequency, time })
  await DB.models.Schedules.create({
    subscriptionId,
    ...schedule
  })
}
