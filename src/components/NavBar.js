import React from 'react'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import { setUser } from '../store/actions'

import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'

const styles = theme => {
  return {
    root: {
      paddingLeft: theme.spacing.triple,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      '&[with-border=true]': {
        borderBottom: '1px solid ' + theme.palette.divider
      },
      ...theme.utils.container
    },
    title: theme.typography.title,
    beta: {
      color: theme.palette.custom.blueSea,
      fontWeight: 300,
      fontSize: 12
    }
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
  setUserId = () => {
    this.props.setUser({
      id: Math.round(Math.random() * 1000)
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root} with-border={this.props.withBorder ? 'true' : 'false'}>
        <div className={classes.title}>
          TopSub <span className={classes.beta}>beta</span>
        </div>
        {
          this.props.user.id &&
          <div className={classes.user}>
            <StyledButton>
              ID: {this.props.user.id}
            </StyledButton>
          </div>
        }
        {
          !this.props.user.id &&
          <div>
            <StyledButton to='/sign-up' component={Link}>
              Sign Up
            </StyledButton>
            <StyledButton to='/login' onClick={this.setUserId}>
              Login
            </StyledButton>
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  }
}

const connectedNavBar = connect(
  mapStateToProps,
  mapDispatchToProps  
)(NavBar)

export default withStyles(styles)(connectedNavBar)
