import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Provider } from 'react-redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults'
import Theme from './Theme'

import store from './store'
import './styles.css'

const App = () => (
  <Provider store={store}>
    <MuiThemeProvider theme={Theme}>
      <div>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/search" component={SearchResults} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </Provider>
)

export default App
