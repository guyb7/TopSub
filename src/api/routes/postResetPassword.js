import {
  isLength
} from 'validator'

import User from '../controllers/User/'

function checkParams({ emailToken, password }) {
  if (!password || !isLength(password, { min: 8, max: 128 })) {
    return false
  }
  const tokenPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  if (!emailToken || !tokenPattern.test(emailToken)) {
    return false
  }
  return { emailToken, password }
}

export default async req => {
  const params = checkParams(req.body)
  if (!params) {
    throw new Error('invalid-input')
  }

  try {
    const user = await User.resetPassword(params)
    req.session.user = user
    req.session.isLoggedIn = true
    req.session.save()
    return {
      success: true,
      user
    }
  } catch (e) {
    throw e
  }
}
