import Topics from '../controllers/Topics/'

export default async req => {
  const list = await Topics.list()
  return {
    topics: list
  }
}
