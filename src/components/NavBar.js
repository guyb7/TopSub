import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = theme => {
  return {
    root: {
      paddingLeft: theme.spacing.triple,
      borderBottom: '1px solid ' + theme.palette.divider,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    title: theme.typography.title
  }
}

const buttonStyles = theme => {
  return {
    root: {
      color: theme.palette.text.secondary,
      padding: theme.spacing.unit,
      paddingTop: theme.spacing.triple,
      paddingBottom: theme.spacing.triple,
      textTransform: 'none',
      borderBottom: '2px solid transparent',
      borderRadius: 0,
      '&:hover': {
        color: theme.palette.text.primary,
        borderBottom: '2px solid ' + theme.palette.text.primary,
        backgroundColor: 'transparent'
      }
    }
  }
}
const StyledButton = withStyles(buttonStyles)(Button)

class NavBar extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.title}>
          TopSub
        </div>
        <div>
          <StyledButton to='/sign-up' component={Link} >
            Sign Up
          </StyledButton>
          <StyledButton to='/login' component={Link} >
            Login
          </StyledButton>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const connectedNavBar = connect(
  mapStateToProps
)(NavBar)

export default withStyles(styles)(connectedNavBar)
