import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../store/actions'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

const styles = theme => {
  return {
    root: {
      backgroundColor: '#efe'
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
        <h2>Welcome to TopSub</h2>
        <h3>User</h3>
        {
          JSON.stringify(this.props.user)
        }
        <Button variant="raised" color="primary" onClick={this.setUserId}>
          Random User ID
        </Button>
        <Button onClick={this.search}>
          Search
        </Button>
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
