import DB from '../../../DB/'
import Topics from '../Topics/'

const findAll = async ({ email }) => {
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

const deleteOne = async ({ id, email }) => {
  if (typeof id === 'undefined' || typeof email === 'undefined') {
    throw new Error('no-such-subscription')
  }
  const deleted = await DB.models.Subscriptions.destroy({
    where: {
      id,
      email
    },
    limit: 1
  })
  if (deleted === 1) {
    return
  } else {
    throw new Error('no-such-subscription')
  }
}

export default {
  findAll,
  deleteOne
}
