import React from 'react'

import components from './components/'

class SearchResults extends React.Component {
  render() {
    const { component, results } = this.props
    const Component = components.get(component)
    return (
      <Component results={results} />
    )
  }
}

export default SearchResults
