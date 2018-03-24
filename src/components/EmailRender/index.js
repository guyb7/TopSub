import React from 'react'
import { renderToString } from 'react-dom/server'

class Email extends React.Component {
  render() {
    return (
      <div>
        <h2>Email</h2>
        {
          this.props.results.map(r => <div key={r.id}>
              <h3>{r.data.title}</h3>
            </div>)
        }
      </div>
    )
  }
}

export default ({ component, results }) => {
  const markup = renderToString(<Email results={results} />)
  return markup
}
