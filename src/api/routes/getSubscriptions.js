import Subscriptions from '../controllers/Subscriptions/'

export default async req => {
  try {
    const email = req.session.user.email
    const subscriptions = await Subscriptions.findAll({ email })
    return {
      success: true,
      subscriptions
    }
  } catch (e) {
    throw e
  }
}
