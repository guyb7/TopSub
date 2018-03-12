import DB from '../../DB/'

export default async req => {
  const { email, frequency, limit, period, time, topic, tzHoursOffset } = req.body
  const delay = ms => {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
  }
  console.log({
    email, frequency, limit, period, time, topic, tzHoursOffset
  })
  await delay(500)
  return {
    success: false
  }
}
