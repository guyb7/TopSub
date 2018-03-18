import uuid from 'uuid/v4'

import findUser from './findUser'
import Email from '../Email/'

const sendPasswordRecoveryEmail = async (email, emailToken) => {
  Email.send({
    template: 'reset-password',
    to: email,
    contenxt: {
      emailToken
    }
  })
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
