import {
  isEmail
} from 'validator'

import User from '../controllers/User/'

function checkParams({ email, emailToken }) {
  if (!isEmail(email)) {
    return false
  }
  return { email }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }

  try {
    await User.recoverPassword(params)
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
