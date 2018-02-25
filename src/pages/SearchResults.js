import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

const styles = theme => {
  return {
    root: {
      backgroundColor: '#eef'
    }
  }
}

class SearchResults extends React.Component {
  navHome = () => {
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <h3>Search results</h3>
        <Button onClick={this.navHome}>
          Back home
        </Button>
      </div>
    )
  }
}

export default withStyles(styles)(SearchResults)
