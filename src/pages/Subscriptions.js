import React from 'react'
import { withStyles } from 'material-ui/styles'

import API from '../components/API'
import SubscriptionsItem from '../components/Subscriptions/SubscriptionsItem'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const styles = theme => {
  return {
    root: {
    },
    container: {
      ...theme.utils.container,
      padding: theme.spacing.double
    },
    title: {
      textAlign: 'center',
      fontWeight: 300,
      paddingTop: theme.spacing.quad,
      paddingBottom: theme.spacing.double
    },
    error: {
      color: theme.palette.custom.red,
      textAlign: 'center',
      marginTop: theme.spacing.double,
      marginBottom: theme.spacing.double
    }
  }
}

class Subscriptions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      error: false,
      subscriptions: []
    }
  }

  componentDidMount() {
    this.fetchSubscriptions()
  }

  removeItem = id => {
    this.setState({
      ...this.state,
      subscriptions: this.state.subscriptions.filter(i => i.id !== id)
    })
  }

  fetchSubscriptions() {
    this.setState({
      ...this.state,
      isLoading: true
    }, async () => {
      try {
        const results = await API.get('/subscriptions')
        this.setState({
          ...this.state,
          isLoading: false,
          subscriptions: results.data.subscriptions
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
          <h3 className={classes.title}>Subscriptions</h3>
          {
            this.state.error &&
            <div className={classes.error}>
              {this.state.error}
            </div>
          }
          {
            this.state.subscriptions.map(i =>
              <SubscriptionsItem
                key={i.id}
                data={i}
                onDelete={this.removeItem}
                />
            )
          }
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Subscriptions)
