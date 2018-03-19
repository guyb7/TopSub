import Subscriptions from '../controllers/Subscriptions/'

export default async req => {
  try {
    const id = req.params.id
    const email = req.session.user.email
    await Subscriptions.deleteOne({ email, id })
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
