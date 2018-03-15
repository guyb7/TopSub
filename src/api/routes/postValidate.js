import {
  isEmail
} from 'validator'

import User from '../controllers/User/'

function checkParams({ email, emailToken }) {
  if (!isEmail(email)) {
    return false
  }
  const tokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!tokenPattern.test(emailToken)) {
    return false
  }
  return { email, emailToken }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }

  try {
    await User.validate(params)
    return {
      success: true
    }
  } catch (e) {
    throw e
  }
}
