import getApp from './getApp'
import getStatus from './getStatus'
import getSearch from './getSearch'
import getTopics from './getTopics'
import postSubscribe from './postSubscribe'
import postRegister from './postRegister'
import postValidate from './postValidate'
import postLogin from './postLogin'
import postRecoverPassword from './postRecoverPassword'
import postResetPassword from './postResetPassword'
import getLogout from './getLogout'
import getProfile from './getProfile'
import getSubscriptions from './getSubscriptions'
import deleteSubscription from './deleteSubscription'
import getEmail from './getEmail'
import { notFound, parseError, serverError } from './Errors'

const isAdmin = async req => {
  throw new Error('not-authorized')
}

const isLoggedIn = async req => {
  if (req.session && req.session.isLoggedIn === true) {
    return true
  }
  req.session.isLoggedIn = false
  req.session.save()
  throw new Error('not-authorized')
}

const asyncMiddleware = promise => {
  return (req, res) => {
    promise(req)
    .then(data => {
      res.json({
        success: true,
        ...data
      })
    })
    .catch(e => {
      parseError(res, e)
    })
  }
}

const ensureAdmin = (req, res, next) => {
  isAdmin(req)
  .then(() => {
    next()
  })
  .catch(e => {
    next(e)
  })
}

const ensureLoggedIn = (req, res, next) => {
  isLoggedIn(req)
  .then(() => {
    next()
  })
  .catch(e => {
    next(e)
  })
}

export default app => {
  app.get ('/api/status', asyncMiddleware(getStatus))
  app.get ('/api/search', asyncMiddleware(getSearch))
  app.get ('/api/topics', asyncMiddleware(getTopics))
  app.post('/api/subscribe', asyncMiddleware(postSubscribe))

  app.post('/api/register', asyncMiddleware(postRegister))
  app.post('/api/validate', asyncMiddleware(postValidate))
  app.post('/api/recover-password', asyncMiddleware(postRecoverPassword))
  app.post('/api/reset-password', asyncMiddleware(postResetPassword))
  app.post('/api/login', asyncMiddleware(postLogin))
  app.get ('/api/logout', asyncMiddleware(getLogout))

  app.get ('/api/emailPreview', getEmail)

  app.get ('/api/profile', ensureLoggedIn, asyncMiddleware(getProfile))
  app.get ('/api/subscriptions', ensureLoggedIn, asyncMiddleware(getSubscriptions))
  app.delete('/api/subscriptions/:unsubscribeToken', ensureLoggedIn, asyncMiddleware(deleteSubscription))

  app.use('/api/admin/*', ensureAdmin)

  app.get('/api/*', notFound)
  app.use(serverError)

  app.get('/*', getApp)
}
