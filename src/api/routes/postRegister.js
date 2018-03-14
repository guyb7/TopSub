import {
  isLength,
  isEmail
} from 'validator'

import User from '../controllers/User/'

function checkParams({ email, password, name='Guest' }) {
  if (!isEmail(email)) {
    return false
  }
  if (!isLength(password, { min: 8, max: 128 })) {
    return false
  }
  return { email, password, name }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }
  try {
    await User.register(params)
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
