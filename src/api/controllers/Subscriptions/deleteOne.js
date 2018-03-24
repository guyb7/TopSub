import DB from '../../../DB/'

export default async ({ id, email }) => {
  if (typeof id === 'undefined' || typeof email === 'undefined') {
    throw new Error('no-such-subscription')
  }
  await DB.models.Schedules.destroy({
    where: {
      subscriptionId: id
    }
  })
  const deletedSubscriptions = await DB.models.Subscriptions.destroy({
    where: {
      id,
      email
    },
    limit: 1
  })
  if (deletedSubscriptions !== 1) {
    throw new Error('no-such-subscription')
  }
}
