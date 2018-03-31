import React from 'react'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'

import API from '../components/API'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { getParams } from '../components/Utils'

const styles = theme => {
  return {
    root: {
    },
    container: {
      ...theme.utils.container,
      maxWidth: theme.breakpoints.values.sm,
      padding: theme.spacing.double
    },
    title: {
      textAlign: 'center',
      fontWeight: 300,
      paddingTop: theme.spacing.quad,
      paddingBottom: theme.spacing.double
    },
    page: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing.quad,
      minHeight: 200
    },
    error: {
      color: theme.palette.custom.red,
      marginTop: theme.spacing.double,
      marginBottom: theme.spacing.double
    }
  }
}

class Unsubscribe extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      unsubscribeToken: '',
      isLoading: true,
      error: false
    }
  }

  componentDidMount() {
    const { email, unsubscribeToken } = getParams(this.props.history.location.search)
    if (!unsubscribeToken || !email) {
      return this.setState({
        ...this.state,
        isLoading: false,
        error: 'Invalid unsubscription token'
      })
    }
    this.setState({
      ...this.state,
      email,
      unsubscribeToken
    }, this.submit)
  }

  submit = () => {
    this.setState({
      ...this.state,
      isLoading: true,
      error: false
    }, async () => {
      try {
        await API.delete('/subscriptions/' + this.state.unsubscribeToken + '?email=' + this.state.email)
        this.setState({
          ...this.state,
          isLoading: false
        })
      } catch (e) {
        const errorMessage = e.message || 'Something went wrong'
        this.setState({
          ...this.state,
          isLoading: false,
          error: errorMessage
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar withBorder />
        <div className={classes.container}>
          <h3 className={classes.title}>Unsubscribe</h3>
          <div className={classes.page}>
            {
              this.state.error &&
              <div className={classes.error}>
                {this.state.error}
              </div>
            }
            {
              !this.state.isLoading && !this.state.error &&
              <div>
                You have successfully removed this subscription.
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(Unsubscribe))
