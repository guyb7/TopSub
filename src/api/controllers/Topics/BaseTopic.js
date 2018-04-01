import axios from 'axios'

export default class BaseTopic {
  constructor() {
    if (new.target === BaseTopic) {
      throw new TypeError('Do not use BaseTopic directly, create a new Topic class that extends it')
    }
    if (this.info === undefined) {
      throw new TypeError('Missing implementation of "info" method')
    }
    if (this.getSchedule === undefined) {
      throw new TypeError('Missing implementation of "getSchedule" method')
    }
    if (this.fetchList === undefined) {
      throw new TypeError('Missing implementation of "fetchList" method')
    }
    if (this.parseList === undefined) {
      throw new TypeError('Missing implementation of "parseList" method')
    }
    if (this.fetchOne === undefined) {
      throw new TypeError('Missing implementation of "fetchOne" method')
    }
    if (this.parseOne === undefined) {
      throw new TypeError('Missing implementation of "parseOne" method')
    }
  }

  async fetch({ url, method, params, headers }) {
    try {
      const response = await axios({ url, method, params, headers })
      return response.data
    } catch (e) {
      e.noCatch = true
      throw e
    }
  }
}
