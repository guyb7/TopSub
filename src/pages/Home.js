import React from 'react'
import { withStyles } from 'material-ui/styles'

import Button from 'material-ui/Button'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'

const styles = theme => {
  return {
    root: {
    },
    intro: {
      backgroundColor: theme.palette.custom.blueSea,
      paddingTop: theme.spacing.huge,
      paddingBottom: theme.spacing.huge,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    introText: {
      ...theme.typography.headline,
      color: theme.palette.getContrastText(theme.palette.custom.blueSea),
      paddingBottom: theme.spacing.quad
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
        <div className={classes.intro}>
          <div className={classes.introText}>
            Get daily emails for trending data
          </div>
          <Button variant="raised" onClick={this.search}>
            Search
          </Button>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
