import React from 'react'
import { withStyles } from 'material-ui/styles'

import API from '../components/API'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SearchForm from '../components/SearchForm'
import SearchResults from '../components/SearchResults'
import Spinner from '../components/Spinner'

const styles = theme => {
  return {
    root: {
    },
    main: {
      backgroundColor: theme.palette.custom.blueSea,
      paddingTop: theme.spacing.huge,
      paddingBottom: theme.spacing.big
    },
    form: {
      ...theme.utils.container,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: theme.spacing.big
    },
    results: {
      ...theme.utils.container,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: theme.spacing.quad
    }
  }
}

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: null,
      isLoading: false,
      results: null,
      error: null
    }
  }

  onFormChange = form => {
    this.setState({
      ...this.state,
      form
    }, this.search)
  }

  search = form => {
    this.setState({
      ...this.state,
      isLoading: true,
      results: null
    }, async () => {
      console.log('Search', form)
      try {
        const results = await API.get('/search', { params: form })
        this.setState({
          ...this.state,
          isLoading: false,
          results: results.data.results
        })
      } catch (e) {
        console.error(e)
        this.setState({
          ...this.state,
          isLoading: false,
          error: e
        })
      }
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <NavBar />
        <div className={classes.main}>
          <div className={classes.form}>
            <SearchForm onChange={form => this.search(form)} />
          </div>
          <div className={classes.results}>
            {
              this.state.isLoading && <Spinner />
            }
            {
              this.state.results && <SearchResults results={this.state.results} />
            }
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
