import uuid from 'uuid/v4'

import findUser from './findUser'
import createUser from './createUser'
import Email from '../Email/'

const sendVerificationEmail = async (email, emailToken, name) => {
  Email.send({
    template: 'register',
    to: email,
    context: {
      name,
      emailToken
    }
  })
}

export default async params => {
  const {
    name,
    email,
    password
  } = params
  let emailToken

  // Check if the user already exists
  try {
    const user = await findUser({ email, isVerified: null })
    if (user.dataValues.isVerified) {
      throw new Error('user-already-exists')
    }
    // Will resend the verification email
    emailToken = user.emailToken
  } catch (e) {
    // Create user
    try {
      emailToken = uuid()
      await createUser(name, email, password, emailToken)
    } catch (e) {
      throw e
    }
  }

  await sendVerificationEmail(email, emailToken, name)
}
