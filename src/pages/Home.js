import React from 'react'
import { connect } from 'react-redux'
import { setUser } from '../store/actions'

import Button from 'material-ui/Button'

class Home extends React.Component {
  setUserId = () => {
    this.props.setUser({
      id: Math.round(Math.random() * 1000)
    })
  }

  render() {
    return (
      <div>
        <h2>Welcome to TopSub</h2>
        <h3>User</h3>
        {
          JSON.stringify(this.props.user)
        }
        <Button variant="raised" color="primary" onClick={this.setUserId}>
          Random User ID
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

export default connectedHome
