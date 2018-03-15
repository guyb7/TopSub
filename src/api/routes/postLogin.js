import {
  isEmail
} from 'validator'

import User from '../controllers/User/'

function checkParams({ email, password }) {
  if (!isEmail(email)) {
    return false
  }
  if (!password || password.length === 0) {
    return false
  }
  return { email, password }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }

  try {
    await User.login(params)
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
