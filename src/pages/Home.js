import React from 'react'
import { withStyles } from 'material-ui/styles'

import API from '../components/API'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import SearchForm from '../components/Search/Form'
import SearchResults from '../components/Search/Results'
import SubscribeForm from '../components/Search/SubscribeForm'
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
    },
    about: {
      ...theme.utils.container,
      maxWidth: theme.breakpoints.values.sm,
      padding: theme.spacing.unit,
      [theme.breakpoints.up('sm')]: {
      },
      '& h2': {
        textAlign: 'center',
        fontWeight: 300,
        paddingTop: theme.spacing.quad,
        paddingBottom: theme.spacing.double,
      }
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
      resultsComponent: 'basic',
      error: null
    }
  }

  onFormChange = form => {
    this.setState({
      ...this.state,
      form
    }, this.search)
  }

  search = () => {
    this.setState({
      ...this.state,
      isLoading: true,
      results: null
    }, async () => {
      try {
        const results = await API.get('/search', { params: this.state.form })
        this.setState({
          ...this.state,
          isLoading: false,
          results: results.data.results,
          resultsComponent: results.data.component || this.state.resultsComponent
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
            <SearchForm onChange={form => this.onFormChange(form)} />
          </div>
          <div className={classes.results}>
            {
              this.state.isLoading && <Spinner />
            }
            {
              this.state.results && <SearchResults
                results={this.state.results}
                component={this.state.resultsComponent} />
            }
          </div>
          <SubscribeForm form={this.state.form} />
        </div>
        <div className={classes.about}>
          <h2>What is TopSub?</h2>
          <p>
            TopSub is a simple service that sends you emails for a search query.
          </p>
          <p>
            TopSub scrapes popular sites and allows you to create your own newsletter, without all the marketing.
          </p>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)
