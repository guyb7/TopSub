import BaseTopic from '../BaseTopic'

class HackerNews extends BaseTopic {
  info() {
    return {
      id: 'hackernews',
      name: 'HackerNews',
      description: 'Most upvoted posts on HN',
      tags: []
    }
  }

  getSchedule() {
    return '* * * * * *'
  }

  async fetchList() {
    const url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
    const method = 'get'
    try {
      return this.fetch(url, method)
    } catch (e) {
      throw e
    }
  }

  parseList(items) {
    return items.map(i => ({
      id: i
    }))
  }

  async fetchOne(id) {
    const url = `https://hacker-news.firebaseio.com/v0/item/${id}.json`
    const method = 'get'
    try {
      return this.fetch(url, method)
    } catch (e) {
      throw e
    }
  }

  parseOne(item) {
    return {
      id: '' + item.id,
      score: item.score,
      time: item.time,
      title: item.title,
      url: item.url
    }
  }
}

export default HackerNews
