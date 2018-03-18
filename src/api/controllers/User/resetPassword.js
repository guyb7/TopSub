import bcrypt from 'bcrypt'
import _ from 'lodash'

import findUser from './findUser'

const SALT_ROUNDS = 10

export default async params => {
  const {
    emailToken,
    password
  } = params

  let user
  try {
    user = await findUser({ emailToken })
  } catch (e) {
    throw e
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
  await user.update({
    passwordHash,
    emailToken: null
  })
  return _.pick(user.dataValues, ['id', 'name', 'email'])
}
