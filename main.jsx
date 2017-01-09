import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import App from './src/App'
import { AccountLogin, AccountLogout, isLoggedIn } from './src/Account'
import { MeusSites, MeusSitesHome, MeusSitesNovo } from './src/MeusSites'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Redirect from='/' to='/Meus-Sites' />
      <Route path='/' component={App} onEnter={requireAuth}>
        <Route path='Meus-Sites' component={MeusSites}>
          <IndexRoute component={MeusSitesHome} />
          <Route path='Novo' component={MeusSitesNovo} />
        </Route>
      </Route>
      <Route path='/Entrar' component={AccountLogin} />
      <Route path='/Sair' component={AccountLogout} />
    </Router>
  </AppContainer>,
  document.getElementById('app')
)

function requireAuth (nextState, replace, callback) {
  if (isLoggedIn()) {
    callback()
  } else {
    browserHistory.replace('/Entrar')
  }
}
