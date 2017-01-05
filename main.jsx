import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, Redirect, browserHistory } from 'react-router'

import App from './src/App'
import { DashboardHome } from './src/Dashboard'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Redirect from='/' to='/Dashboard' />
      <Route path='/' component={App}>
        <Route path='Dashboard' component={DashboardHome} />
      </Route>
    </Router>
  </AppContainer>,
  document.getElementById('app')
)
