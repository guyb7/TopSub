import Subscriptions from '../controllers/Subscriptions/'

export default async req => {
  try {
    const { unsubscribeToken } = req.params
    const email = req.query.email || req.session.user.email
    await Subscriptions.deleteOne({ email, unsubscribeToken })
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
