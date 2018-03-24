import moment from 'moment'

import DB from '../../../DB/'

const periods = [
  // 'hour',
  // 'day',
  '3days',
  'week',
  'month'
]

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

const find = async ({ limit, topic, period }) => {
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
  return results
}

export default {
  find,
  periods
}
