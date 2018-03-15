import bcrypt from 'bcrypt'
import uuid from 'uuid/v4'
import _ from 'lodash'

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

const findUser = async ({ email, emailToken, isVerified=true }) => {
  const results = await DB.models.Users.findAll({
    where: {
      email,
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

const sendVerificationEmail = async (email, emailToken) => {
  console.log('email', email)
  console.log('emailToken', emailToken)
}

const register = async params => {
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

  await sendVerificationEmail(email, emailToken)
}

const validate = async params => {
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
    isVerified: true
  })
}

const login = async({ email, password }) => {
  try {
    const user = await findUser({ email })
    const isPassCorrect = await bcrypt.compare(password, user.dataValues.passwordHash)
    if (!isPassCorrect) {
      throw new Error('invalid-credentials')
    }
    return _.pick(user.dataValues, ['id', 'name', 'email'])
  } catch (e) {
    throw e
  }
}

export default {
  register,
  validate,
  login
}
