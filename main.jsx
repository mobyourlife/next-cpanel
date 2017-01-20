import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import App from './src/App'
import EmptyContainer from './src/EmptyContainer'
import { AdminHome } from './src/Admin'
import { TodosSitesListagem, TodosSitesGerenciar } from './src/Admin/TodosSites'
import { AccountLogin, AccountLogout, isLoggedIn } from './src/Account'
import { MeusSitesListagem, MeusSitesNovo, MeusSitesGerenciar } from './src/MeusSites'

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Redirect from='/' to='/Meus-Sites' />
      <Route path='/' component={App} onEnter={requireAuth}>
        <Route path='Meus-Sites' component={EmptyContainer}>
          <IndexRoute component={MeusSitesListagem} />
          <Route path='Novo' component={MeusSitesNovo} />
          <Route path='Gerenciar/:id' component={MeusSitesGerenciar} />
        </Route>
        <Route path='Admin' component={EmptyContainer}>
          <IndexRoute component={AdminHome} />
          <Route path='Todos-Sites' component={EmptyContainer}>
            <IndexRoute component={TodosSitesListagem} />
            <Route path='Gerenciar/:id' component={TodosSitesGerenciar} />
          </Route>
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
