import React from 'react'
import { renderToString } from 'react-dom/server'
import Juice from 'juice'

import SearchComponents from '../Search/components/'

class Email extends React.Component {
  render() {
    const compoenntToRender = this.props.component.info().component
    const Component = SearchComponents.get(compoenntToRender)
    return (
      <div>
        <h2>Email</h2>
        {
          this.props.results.map(r => <Component key={r.id} data={r} />)
        }
      </div>
    )
  }
}

export default ({ component, results }) => {
  const markup = renderToString(<Email component={component} results={results} />)
  const styledMarkup = Juice(markup)
  return styledMarkup
}
