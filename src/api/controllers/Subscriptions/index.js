import DB from '../../../DB/'

const findAll = async ({ email }) => {
  if (typeof email === 'undefined') {
    return []
  }
  const results = await DB.models.Subscriptions.findAll({
    where: {
      email
    }
  })
  return results
}

export default {
  findAll
}
