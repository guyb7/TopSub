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
      expect(getType(info.description)).toBe('string')
      expect(getType(info.tags)).toBe('array')
    }
  })
})
