import React from 'react'
import { renderToString } from 'react-dom/server'
import Juice from 'juice'

import SearchComponents from '../Search/components/'

import JssProvider from 'react-jss/lib/JssProvider'
import { create, SheetsRegistry } from 'jss'
import jssCamelCase from 'jss-camel-case'
import jssNested from 'jss-nested'
import jssDefaultUnit from 'jss-default-unit'
import jssPropsSort from 'jss-props-sort'

const jss = create()
jss.use(jssCamelCase(), jssNested(), jssDefaultUnit(), jssPropsSort())
const sheets = new SheetsRegistry()

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
  const markup = renderToString(
    <JssProvider registry={sheets} jss={jss}>
      <Email component={component} results={results} />
    </JssProvider>
  )
  const css = sheets.toString()
  const styledMarkup = Juice.inlineContent(markup, css)
  return styledMarkup
}
