import DB from '../../../DB/'
import Topics from '../Topics/'

export default async ({ email }) => {
  if (typeof email === 'undefined') {
    return []
  }
  const results = await DB.models.Subscriptions.findAll({
    where: {
      email
    }
  })
  return results.map(r => ({
    ...r.toJSON(),
    topic: Topics.topicsDict[r.topic].info()
  }))
}
