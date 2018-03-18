import DB from '../../../DB/'

export default async ({ email, emailToken, isVerified=true }) => {
  if (typeof email === 'undefined' && typeof emailToken === 'undefined') {
    throw new Error('user-not-found')
  }
  const results = await DB.models.Users.findAll({
    where: {
      ...(typeof email === 'undefined' ? {} : { email }),
      ...(typeof emailToken === 'undefined' ? {} : { emailToken }),
      isVerified: isVerified === null ? false : isVerified,
      deletedAt: null
    },
    limit: 1
  })
  if (results.length !== 1) {
    throw new Error('user-not-found')
  }
  return results[0]
}
