import React from 'react'
import { withStyles } from 'material-ui/styles'

const styles = theme => {
  return {
    root: {
      width: '100%',
      whiteSpace: 'normal',
      fontWeight: 500
    }
  }
}

class Basic extends React.Component {
  render() {
    const { classes, data } = this.props
    return (
      <div className={classes.root}>
        {JSON.stringify(data)}
      </div>
    )
  }
}

export default withStyles(styles)(Basic)
