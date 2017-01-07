import React from 'react'

import NavLink from './NavLink'

export default class App extends React.Component {
  render () {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top'>
          <div className='container'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Alterar navegação</span>
                <span className='icon-bar' />
                <span className='icon-bar' />
                <span className='icon-bar' />
              </button>
              <a className='navbar-brand' href='#'>
                <img src='/img/logo.png' alt='Mob Your Life' />
              </a>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav'>
                <NavLink to={'/Dashboard'}>Dashboard</NavLink>
              </ul>
              <ul className='nav navbar-nav navbar-right'>
                <NavLink to={'/Logout'}>Sair</NavLink>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
