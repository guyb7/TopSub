import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../store/actions'
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

class Home extends React.Component {
  setUserId = () => {
    this.props.setUser({
      id: Math.round(Math.random() * 1000)
    })
  }

  search = () => {
    this.props.history.push('/search')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar />
        <div className={classes.container}>
          <h3>User</h3>
          {
            JSON.stringify(this.props.user)
          }
          <Button variant="raised" color="primary" onClick={this.setUserId}>
            Random User ID
          </Button>
          <Button variant="raised" color="secondary" onClick={this.search}>
            Search
          </Button>
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

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setUser(user) {
      dispatch(setUser(user))
    }
  }
}

const connectedHome = connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)

export default withStyles(styles)(connectedHome)
