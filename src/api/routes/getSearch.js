import moment from 'moment'

import DB from '../../DB/'
import Topics from '../controllers/Topics/'

const getStartTime = period => {
  let since
  switch (period) {
    case '3days':
      since = moment().utc().startOf('day').subtract(3, 'days')
      break
    case 'hour':
    case 'day':
    case 'week':
    case 'month':
      since = moment().utc().startOf(period)
      break
    default:
      since = moment().utc().startOf('day')
  }
  since = since.format('YYYY-MM-DD HH:mm:ss+0000')
  return since
}

export default async req => {
  const { limit, topic, period } = req.query
  const component = (Topics.topicsDict[topic] && Topics.topicsDict[topic].info().component) || 'basic'
  const since = getStartTime(period)
  const Op = DB.sequelize.Op
  const results = await DB.models.Results.findAll({
    where: {
      topic,
      publishTime: {
        [Op.gte]: since
      }
    },
    order: [
      ['score', 'DESC']
    ],
    limit,
    attributes: { exclude: ['createdAt'] }
  })
  return {
    success: true,
    component,
    results
  }
}
