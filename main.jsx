import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router'

import { Globalize } from 'react-easy-intl'
import messages from './messages'

import App from './src/App'
import EmptyContainer from './src/EmptyContainer'
import { AdminHome } from './src/Admin'
import { AllSitesList, AllSitesManage } from './src/Admin/AllSites'
import { AccountLogin, AccountLogout, isLoggedIn } from './src/Account'
import { MySitesList, MySitesNew, MySitesManage } from './src/MySites'

Globalize.setMessages(messages)
Globalize.setLocale('en')

if (module.hot) {
  module.hot.accept()
}

ReactDOM.render(
  <AppContainer>
    <Router history={browserHistory}>
      <Redirect from='/' to='/My-Sites' />
      <Route path='/' component={App} onEnter={requireAuth}>
        <Route path='My-Sites' component={EmptyContainer}>
          <IndexRoute component={MySitesList} />
          <Route path='New' component={MySitesNew} />
          <Route path='Manage/:id' component={MySitesManage} />
        </Route>
        <Route path='Admin' component={EmptyContainer}>
          <IndexRoute component={AdminHome} />
          <Route path='All-Sites' component={EmptyContainer}>
            <IndexRoute component={AllSitesList} />
            <Route path='Manage/:id' component={AllSitesManage} />
          </Route>
        </Route>
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
