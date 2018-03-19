import moment from 'moment'

import BaseTopic from '../BaseTopic'

class HackerNews extends BaseTopic {
  info() {
    return {
      id: 'hackernews',
      name: 'HackerNews',
      description: 'Most upvoted posts on HN',
      tags: [],
      component: 'HackerNews'
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
      externalId: '' + i
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
    const utcTime = moment.utc(item.time, 'X').format('YYYY-MM-DD HH:mm:ss+0000')
    const url = item.url || `https://news.ycombinator.com/item?id=${item.id}`
    const domain = this.extractDomain(url)
    return {
      externalId: '' + item.id,
      score: Number(item.score),
      time: utcTime,
      data: {
        title: item.title,
        comments: Number(item.descendants),
        domain
      },
      url
    }
  }

  extractDomain(url) {
    const matches = url.match(/^https?:\/\/(?:www\.)?([^/:?#]+)(?:[/:?#]|$)/i)
    const domain = matches && matches[1]
    return domain
  }
}

export default HackerNews
