import DB from '../../../DB/'
import Topics from '../Topics/'

export default async ({ email }) => {
  if (typeof email === 'undefined') {
    return []
  }
  const results = await DB.models.Schedules.findAll({
    include: [
      {
        model: DB.models.Subscriptions,
        as: 'subscription',
        required: true,
        where: {
          email
        }
      }
   ]
  })
  return results.map(s => ({
    ...s.subscription.dataValues,
    schedule: {
      minutes: s.dataValues.minutes,
      hours: s.dataValues.hours,
      weekDay: s.dataValues.weekDay
    },
    topic: Topics.topicsDict[s.subscription.dataValues.topic].info()
  }))
}
