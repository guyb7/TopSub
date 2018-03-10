import moment from 'moment'

import DB from '../../DB/'


export default async req => {
  console.log(req.query)
  const { limit, topic, period } = req.query
  const Op = DB.sequelize.Op
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
  console.log('since', since)
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
    limit
  })
  return {
    success: true,
    component: req.query.topic === 'tweets' ? 'tweet' : 'basic',
    results
  }
}
