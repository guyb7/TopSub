import DB from '../../../DB/'
import Topics from '../Topics/'

export default async ({ topic, period }) => {
  if (typeof topic === 'undefined' || typeof period === 'undefined') {
    return []
  }
  const results = await DB.models.Subscriptions.findAll({
    where: {
      topic,
      period
    }
  })
  return results.map(r => ({
    ...r.toJSON(),
    topic: Topics.topicsDict[r.topic].info()
  }))
}
