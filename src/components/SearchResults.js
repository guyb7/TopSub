import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => {
  return {
    root: {

    }
  }
}

class SearchResults extends React.Component {
  render() {
    const { classes, results } = this.props
    return (
      <div className={classes.root}>
        {JSON.stringify(results)}
      </div>
    )
  }
}

export default withStyles(styles)(SearchResults)
