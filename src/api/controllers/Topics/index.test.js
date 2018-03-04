import getType from 'jest-get-type'

import Topics from './index.js'

describe('Topics', () => {
  test('Topics list is not empty', () => {
    expect(Topics.topics.length).toBeGreaterThan(0)
  })

  test('All topics methods have the correct info() signature', () => {
    for (let i = 0; i < Topics.topics.length; i++) {
      const topic = Topics.topics[i]
      const info = topic.info()
      expect(getType(info.id)).toBe('string')
      expect(getType(info.name)).toBe('string')
      expect(getType(info.tags)).toBe('array')
    }
  })

  test('All topics methods have the correct getScrapeInfo() signature', () => {
    for (let i = 0; i < Topics.topics.length; i++) {
      const topic = Topics.topics[i]
      const scrapeInfo = topic.getScrapeInfo()
      expect(getType(scrapeInfo.url)).toBe('string')
      expect(getType(scrapeInfo.method)).toBe('string')
      expect(getType(scrapeInfo.params)).toBe('object')
      expect(getType(scrapeInfo.schema)).toBe('regexp')
      expect(getType(scrapeInfo.parse)).toBe('function')
    }
  })

  test('All topics methods have the correct parse() signature', () => {
    for (let i = 0; i < Topics.topics.length; i++) {
      expect(getType(Topics.topics[i].parse)).toBe('function')
    }
  })
})
