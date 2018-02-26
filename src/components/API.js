import axios from 'axios'
import Promise from 'bluebird'
import _has from 'lodash/has'

const baseUrl = '/api'
// const baseUrl = 'http://xxxxxx.ngrok.io/api'

const handleRequest = (method, route, params) => {
  return new Promise((resolve, reject) => {
    axios[method](baseUrl + route, params)
    .then(response => {
      resolve(response)
    })
    .catch(e => {
      if (_has(e, 'response.data.error')) {
        reject(new Error(e.response.data.error.text))
      } else {
        reject(e)
      }
    })
  })
}

export default {
  get: (route, params) => handleRequest('get', route, params),
  post: (route, params) => handleRequest('post', route, params),
  put: (route, params) => handleRequest('put', route, params),
  delete: (route, params) => handleRequest('delete', route, params)
}
