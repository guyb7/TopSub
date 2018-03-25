import Basic from './Basic'
import Tweet from './Tweet'
import HackerNews from './HackerNews'

export default {
  get: component => {
    let Component
    switch(component) {
      case 'Tweet':
        Component = Tweet
        break
      case 'HackerNews':
        Component = HackerNews
        break
      default:
        Component = Basic
    }
    return Component
  }
}
