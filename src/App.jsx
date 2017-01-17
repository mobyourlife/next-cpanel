import React from 'react'

import NavLink from './NavLink'

export default class App extends React.Component {
  render () {
    const year = new Date().getFullYear()

    return (
      <div>
        <nav className='navbar navbar-inverse navbar-fixed-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <a className='navbar-brand' href='#'>
                <img src='/img/logo.png' alt='Mob Your Life' />
              </a>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <li><a href='#'>Perfil</a></li>
                <li><a href='#'>Ajuda</a></li>
              </ul>
            </div>
          </div>
        </nav>

        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm-3 col-md-2 sidebar'>
              <ul className='nav nav-sidebar'>
                <NavLink to={'/Meus-Sites'}>Meus Sites</NavLink>
              </ul>
            </div>
            <div className='col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main'>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
