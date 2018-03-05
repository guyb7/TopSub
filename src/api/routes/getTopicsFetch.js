import Topics from '../controllers/Topics/'

export default async req => {
  try {
    const fetched = await Topics.fetch()
    return {
      fetched
    }
  } catch (e) {
    throw e
  }
}
