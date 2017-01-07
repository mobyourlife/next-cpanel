import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, Redirect, browserHistory } from 'react-router'

import App from './src/App'
import { AccountLogin, AccountLogout, isLoggedIn } from './src/Account'
import { MeusSitesHome } from './src/MeusSites'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Redirect from='/' to='/Meus-Sites' />
      <Route path='/' component={App} onEnter={requireAuth}>
        <Route path='Meus-Sites' component={MeusSitesHome} />
      </Route>
      <Route path='/Login' component={AccountLogin} />
      <Route path='/Logout' component={AccountLogout} />
    </Router>
  </AppContainer>,
  document.getElementById('app')
)

function requireAuth (nextState, replace, callback) {
  if (isLoggedIn()) {
    callback()
  } else {
    browserHistory.replace('/Login')
  }
}
