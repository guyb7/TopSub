import React from 'react'
import { withStyles } from 'material-ui/styles'

import { CircularProgress } from 'material-ui/Progress'

const styles = theme => {
  return {
    colorPrimary: {
      color: theme.palette.custom.brownLight
    },
    colorSecondary: {
      color: theme.palette.custom.bluePurple
    }
  }
}

const StyledCircularProgress = withStyles(styles)(CircularProgress)

class Spinner extends React.Component {
  render() {
    return (
      <StyledCircularProgress color={this.props.dark ? 'secondary' : 'primary'} />
    )
  }
}

export default Spinner
