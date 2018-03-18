import findUser from './findUser'

export default async params => {
  const {
    email,
    emailToken
  } = params

  let user
  try {
    user = await findUser({ email, emailToken, isVerified: false })
  } catch (e) {
    throw e
  }

  if (user.dataValues.isVerified) {
    throw new Error('user-already-verified')
  }

  await user.update({
    isVerified: true,
    emailToken: null
  })
}
