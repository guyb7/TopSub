import React from 'react'
import { withStyles } from 'material-ui/styles'

import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'

const styles = theme => {
  return {
    root: {
    },
    introContainer: {
      backgroundColor: theme.palette.custom.blueSea,
      paddingTop: theme.spacing.huge,
      paddingBottom: theme.spacing.huge
    },
    intro: {
      ...theme.utils.container,
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
  search = form => {
    console.log(form)
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar />
        <div className={classes.introContainer}>
          <div className={classes.intro}>
            <SearchForm onChange={form => this.search(form)} />
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
