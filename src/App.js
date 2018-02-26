import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Reboot from 'material-ui/Reboot'
import { withStyles } from 'material-ui/styles'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Theme from './Theme'

import store from './store'
import './styles.css'

const styles = theme => {
  return {
    root: {
      color: Theme.palette.brownLight,
      backgroundColor: Theme.palette.custom.blueSea,
      height: '100%'
    }
  }
}

class App extends React.Component {
  render() {
    const { classes } = this.props
    return (
      <Provider store={store}>
        <MuiThemeProvider theme={Theme}>
          <Reboot />
          <div className={classes.root}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/search" component={SearchResults} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default withStyles(styles)(App)
