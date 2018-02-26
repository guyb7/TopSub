import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

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
  search = () => {
    this.props.history.push('/search')
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar />
        <div className={classes.container}>
          <Button variant="raised" color="secondary" onClick={this.search}>
            Search
          </Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
