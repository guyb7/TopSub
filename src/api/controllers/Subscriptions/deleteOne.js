import DB from '../../../DB/'

export default async ({ unsubscribeToken, email }) => {
  if (typeof unsubscribeToken === 'undefined' || typeof email === 'undefined') {
    throw new Error('no-such-subscription')
  }
  const subscription = await DB.models.Subscriptions.findAll({
    where: {
      unsubscribeToken,
      email
    }
  })
  if (subscription.length !== 1) {
    throw new Error('no-such-subscription')
  }
  await DB.models.Schedules.destroy({
    where: {
      subscriptionId: subscription[0].id
    }
  })
  const deletedSubscriptions = await DB.models.Subscriptions.destroy({
    where: {
      id: subscription[0].id
    }
  })
  if (deletedSubscriptions !== 1) {
    throw new Error('no-such-subscription')
  }
}
