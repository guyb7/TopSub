import bcrypt from 'bcrypt'
import uuid from 'uuid/v4'

import DB from '../../../DB/'

const SALT_ROUNDS = 10

const createUser = async (name, email, password, emailToken) => {
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  try {
    await DB.models.Users.create({
      name,
      email,
      passwordHash,
      emailToken,
      isVerified: false
    })
  } catch (e) {
    console.error(e)
    throw new Error('failed-create-user')
  }
}

const findUser = async ({ email }) => {
  const results = await DB.models.Users.findAll({
    where: {
      email,
      deletedAt: null
    },
    limit: 1
  })
  if (results.length !== 1) {
    throw new Error('user-not-found')
  }
  return results[0].dataValues
}

const sendVerificationEmail = async (email, emailToken) => {
  console.log('email', email)
  console.log('emailToken', emailToken)
}

const register = async form => {
  const {
    name,
    email,
    password
  } = form
  let emailToken

  // Check if the user already exists
  try {
    const user = await findUser({ email })
    if (user.isVerified) {
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

  // Send verification email
  await sendVerificationEmail(email, emailToken)
}

export default {
  register
}
