import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

import NavBar from '../components/NavBar'

const styles = theme => {
  return {
    root: {
    },
    container: {
      padding: theme.spacing.double
    }
  }
}

class Login extends React.Component {
  navHome = () => {
    this.props.history.push('/')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar withBorder />
        <div className={classes.container}>
          <h3>Register</h3>
          <Button onClick={this.navHome}>
            Back home
          </Button>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Login)
