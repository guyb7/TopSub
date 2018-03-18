import uuid from 'uuid/v4'

import findUser from './findUser'

const sendPasswordRecoveryEmail = async (email, emailToken) => {
  console.log('email', email)
  console.log('emailToken', emailToken)
}

export default async params => {
  const { email } = params

  let user
  try {
    user = await findUser({ email })
  } catch (e) {
    throw e
  }

  const emailToken = uuid()
  await user.update({
    emailToken
  })
  sendPasswordRecoveryEmail(email, emailToken)
}
