import getApp from './getApp'
import getStatus from './getStatus'
import getSearch from './getSearch'
import getTopics from './getTopics'
import getTopicsFetch from './getTopicsFetch'
import { notFound, parseError, serverError } from './Errors'

const isAdmin = async req => {
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

export default app => {
  app.get('/api/status', asyncMiddleware(getStatus))
  app.get('/api/search', asyncMiddleware(getSearch))
  app.get('/api/topics', asyncMiddleware(getTopics))
  app.get('/api/topics/fetch', asyncMiddleware(getTopicsFetch))

  app.use('/api/admin/*', ensureAdmin)

  app.get('/api/*', notFound)
  app.use(serverError)

  app.get('/*', getApp)
}
