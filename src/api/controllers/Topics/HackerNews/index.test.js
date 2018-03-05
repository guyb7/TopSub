import getType from 'jest-get-type'

import HackerNewsClass from './index.js'

const HackerNews = new HackerNewsClass()

describe('HackerNews', () => {
  test('parseList', () => {
    const input = [123, 456]
    const output = HackerNews.parseList(input)

    expect(getType(output)).toBe('array')
  })
})
