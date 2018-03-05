import getType from 'jest-get-type'

import HackerNewsClass from './index.js'

const HackerNews = new HackerNewsClass()

describe('HackerNews', () => {
  test('parseList', () => {
    const input = [123, 456]
    const output = HackerNews.parseList(input)

    expect(getType(output)).toBe('array')
  })

  test('parseItem', () => {
    const input = {
      id: 123,
      score: 33,
      time: 1519999999,
      title: 'Story title',
      url: 'https://www.some-website.com/'
    }
    const output = HackerNews.parseOne(input)

    expect(getType(output.id)).toBe('string')
    expect(getType(output.score)).toBe('number')
    expect(getType(output.time)).toBe('number')
    expect(getType(output.title)).toBe('string')
    expect(getType(output.url)).toBe('string')
  })
})
