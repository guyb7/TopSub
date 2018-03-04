import BaseTopic from '../BaseTopic'

class HackerNews extends BaseTopic {
  info() {
    return {
      id: 'hackernews',
      name: 'HackerNews',
      tags: []
    }
  }

  getScrapeInfo() {
    return {
      url: 'https://news.ycombinator.com/',
      method: 'get',
      params: {},
      schema: /.*/g,
      parse: result => {
        return {

        }
      }
    }
  }

  parse(result) {
    return {
      id: 'abc123'
    }
  }
}

export default HackerNews
