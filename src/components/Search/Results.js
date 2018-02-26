import React from 'react'
import { withStyles } from 'material-ui/styles'

import Basic from './components/Basic'
import Tweet from './components/Tweet'

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.palette.common.white,
      minWidth: 400,
      boxShadow: theme.shadows[2],
      borderRadius: 2
    }
  }
}

class SearchResults extends React.Component {
  render() {
    const { classes, component, results } = this.props
    let Component
    switch(component) {
      case 'tweet':
        Component = Tweet
        break
      default:
        Component = Basic
    }
    return (
      <div className={classes.root}>
        {
          results.map(r => <Component key={r.id} data={r} />)
        }
      </div>
    )
  }
}

export default withStyles(styles)(SearchResults)
