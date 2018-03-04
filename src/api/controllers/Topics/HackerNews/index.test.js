import getType from 'jest-get-type'

import HackerNewsClass from './index.js'

const HackerNews = new HackerNewsClass()

describe('HackerNews', () => {
  test('Parse', () => {
    const input = ``
    const output = HackerNews.parse(input)

    expect(getType(output.id)).toBe('string')
  })
})
