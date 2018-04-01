import Basic from './Basic'
import Dribbble from './Dribbble'
import HackerNews from './HackerNews'

export default {
  get: component => {
    let Component
    switch(component) {
      case 'Dribbble':
        Component = Dribbble
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
