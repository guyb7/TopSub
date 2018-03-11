import React, { Component } from 'react'
import ReactSVG from 'react-svg'

import { withStyles } from 'material-ui/styles'

const styles = theme => {
  return {
    root: {
      display: 'inline-block',
      color: 'currentColor',
      fill: 'currentColor',
      height: 24,
      width: 24,
      userSelect: 'none'
    }
  }
}

class MdIcon extends Component {
  render() {
    const { classes } = this.props
    return (
      <ReactSVG
        path={this.props.svg}
        className={classes.root}
        {...this.props}
        />
    )
  }
}

export default withStyles(styles)(MdIcon)
