import DB from '../../../DB/'

export default async ({ topic, period, time }) => {
  if (typeof topic === 'undefined' || typeof period === 'undefined') {
    return []
  }
  const Op = DB.sequelize.Op
  const results = await DB.models.Schedules.findAll({
    include: [
      {
        model: DB.models.Subscriptions,
        as: 'subscription',
        required: true,
        where: {
          topic,
          period
        }
      }
   ],
    where: {
      minutes: {
        [Op.contains]: [time.minute]
      },
      hours: {
        [Op.contains]: [time.hour]
      },
      weekDay: {
        [Op.contains]: [time.weekDay]
      }
    }
  })
  return results.map(r => ({
    ...r.dataValues.subscription.dataValues,
    schedule: {
      minutes: r.dataValues.minutes,
      hours: r.dataValues.hours,
      weekDay: r.dataValues.weekDay
    }
  }))
}
