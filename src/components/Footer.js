import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = theme => {
  return {
    root: {
      padding: theme.spacing.triple,
      borderTop: '1px solid ' + theme.palette.divider,
      ...theme.typography.caption,
      display: 'flex',
      justifyContent: 'space-between'
    }
  }
}

const buttonStyles = theme => {
  return {
    root: {
      ...theme.typography.caption,
      color: theme.palette.text.secondary,
      textTransform: 'none',
      '&:hover': {
        color: theme.palette.text.primary,
        backgroundColor: 'transparent'
      }
    }
  }
}
const StyledButton = withStyles(buttonStyles)(Button)

class Footer extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div>
          © TopSub
        </div>
        <div>
          <StyledButton to='/terms' component={Link} disableRipple>
            Terms
          </StyledButton>
          <StyledButton to='/privacy' component={Link} disableRipple>
            Privacy
          </StyledButton>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Footer)
