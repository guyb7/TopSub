import moment from 'moment'
import cheerio from 'cheerio'
import json5 from 'json5'

import BaseTopic from '../BaseTopic'

// Scrapes the Dribbble website, as the API requires a business account token

const headers = {
  'x-requested-with': 'XMLHttpRequest',
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.167 Safari/537.36',
  'Accept': '*/*'
}

class Dribbble extends BaseTopic {
  info() {
    return {
      id: 'dribbble',
      name: 'Dribbble',
      description: 'Most liked Dribbble shots',
      tags: [],
      component: 'Dribbble'
    }
  }

  getSchedule() {
    return '* * * * * *'
  }

  async fetchList() {
    const method = 'get'
    const url = 'https://dribbble.com/shots'
    const params = {
      page: 1,
      per_page: 20
    }
    try {
      const html = await this.fetch({ url, method, params, headers })
      const $ = cheerio.load(html)
      const scriptTags = $('script')
      if (scriptTags.length !== 1) {
        throw new Error('Expected 1 script tag, found ' + scriptTags.length)
      }
      const script = scriptTags.html()
      const re = /var newestShots =(.*?);/g
      const resultsText = re.exec(script.replace(/[\r\n]/g, ''))[1]
      return resultsText
    } catch (e) {
      throw e
    }
  }

  parseList(resultsText) {
    try {
      const list = json5.parse(resultsText)
      return list.map(i => ({
        externalId: '' + i.id,
        data: i
      }))
    } catch (e) {
      console.error(resultsText)
      throw new Error('Invalid results')
    }
  }

  async fetchOne(item) {
    const method = 'get'
    const url = `https://dribbble.com${item.data.path}`
    try {
      const html = await this.fetch({ url, method, headers })
      const $ = cheerio.load(html)
      const title = $('.user h1').text()
      const authorName = $('.shot-byline .shot-byline-user a').text()
      const authorUser = $('.shot-byline .shot-byline-user a').attr('href')
      const imageUrl = $('.main-shot img').attr('src')
      const description = $('.shot-desc').text()
      return {
        ...item.data,
        externalId: item.externalId,
        title,
        authorName,
        authorUser,
        imageUrl,
        description
      }
    } catch (e) {
      throw e
    }
  }

  parseOne(item) {
    const utcTime = moment.utc(item.published_at, 'MMMM DD, YYYY').format('YYYY-MM-DD HH:mm:ss+0000')
    const url = item.url || `https://dribbble.com${item.path}`
    return {
      externalId: '' + item.externalId,
      score: Number(item.likes_count),
      time: utcTime,
      data: {
        title: item.title,
        authorName: item.authorName,
        authorUser: item.authorUser,
        imageUrl: item.imageUrl,
        description: item.description,
        views: Number(item.view_count),
        comments: Number(item.comments_count),
        rebounds: Number(item.rebounds_count)
      },
      url
    }
  }
}

export default Dribbble
