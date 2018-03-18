import bcrypt from 'bcrypt'

import DB from '../../../DB/'

const SALT_ROUNDS = 10

export default async (name, email, password, emailToken) => {
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
