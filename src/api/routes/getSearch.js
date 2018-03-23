import Results from '../controllers/Results/'
import Topics from '../controllers/Topics/'

export default async req => {
  const { limit, topic, period } = req.query
  const component = (Topics.topicsDict[topic] && Topics.topicsDict[topic].info().component) || 'basic'
  const results = await Results.find({ limit, topic, period })
  return {
    success: true,
    component,
    results
  }
}
