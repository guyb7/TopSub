import React from 'react'
import Route from 'react-router-dom/Route'
import Switch from 'react-router-dom/Switch'
import { Provider } from 'react-redux'

import Home from './pages/Home'
import SearchResults from './pages/SearchResults'

import store from './store'
import './App.css'

const App = () => (
  <Provider store={store}>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResults} />
      </Switch>
    </div>
  </Provider>
)

export default App
