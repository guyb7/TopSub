import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import Reboot from 'material-ui/Reboot'
import { withStyles } from 'material-ui/styles'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Theme from './Theme'

import store from './store'
import './styles.css'

const styles = theme => {
  return {
    root: {
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
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/forgot" component={ForgotPassword} />
              <Route exact path="/reset" component={ResetPassword} />
            </Switch>
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default withStyles(styles)(App)
