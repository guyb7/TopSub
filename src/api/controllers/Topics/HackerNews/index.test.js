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
      url: 'https://www.some-website.com/',
      descendants: 4
    }
    const output = HackerNews.parseOne(input)

    expect(getType(output.externalId)).toBe('string')
    expect(getType(output.score)).toBe('number')
    expect(getType(output.time)).toBe('string')
    expect(getType(output.data.title)).toBe('string')
    expect(getType(output.data.comments)).toBe('number')
    expect(getType(output.data.domain)).toBe('string')
    expect(getType(output.url)).toBe('string')
  })
})
