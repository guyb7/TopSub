export default class BaseTopic {
  constructor() {
    if (new.target === BaseTopic) {
      throw new TypeError('Do not use BaseTopic directly, create a new Topic class that extends it')
    }
    if (this.info === undefined) {
      throw new TypeError('Missing implementation of "info" method')
      /*
        {
          id,
          name,
          tags
        }
      */
    }
    if (this.getScrapeInfo === undefined) {
      throw new TypeError('Missing implementation of "getScrapeInfo" method')
      /*
        {
          url,
          method,
          params,
          schema,
          parse
        }
      */
    }
    if (this.parse === undefined) {
      throw new TypeError('Missing implementation of "parse" method')
    }
  }
}
