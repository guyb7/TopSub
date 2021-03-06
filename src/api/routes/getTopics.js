import Topics from '../controllers/Topics/'

export default async req => {
  try {
    const list = await Topics.list()
    return {
      topics: list
    }
  } catch (e) {
    throw e
  }
}
