import React from 'react'
import { Link } from 'react-router'

import { get } from './Api'
import NavLink from './NavLink'

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
  }

  componentDidMount () {
    get('/users/me').then(user => {
      this.setState({user})
    })
  }

  render () {
    const year = new Date().getFullYear()
    const isAdmin = this.state.user && this.state.user.admin

    return (
      <div>
        <nav className='navbar navbar-inverse navbar-mob navbar-fixed-top'>
          <div className='container-fluid'>
            <div className='navbar-header'>
              <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#navbar' aria-expanded='false' aria-controls='navbar'>
                <span className='sr-only'>Toggle navigation</span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
                <span className='icon-bar'></span>
              </button>
              <Link to={'/'} className='navbar-brand'>
                <img src='/img/logo-white.png' alt='Mob Your Life' />
              </Link>
            </div>
            <div id='navbar' className='navbar-collapse collapse'>
              <ul className='nav navbar-nav navbar-right'>
                <NavLink to={'/Perfil'}>Perfil</NavLink>
                <NavLink to={'/Ajuda'}>Ajuda</NavLink>
                <NavLink to={'/Sair'}>Sair</NavLink>
              </ul>
            </div>
          </div>
        </nav>

        <div className='container-fluid'>
          <div className='row'>
            {this.renderMenu()}
            <div className={isAdmin ? 'col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main' : 'col-sm-12'}>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }

  renderMenu () {
    if (this.state.user && this.state.user.admin) {
      return (
        <div className='col-sm-3 col-md-2 sidebar'>
          <ul className='nav nav-sidebar'>
            <NavLink to={'/Meus-Sites'}>Meus Sites</NavLink>
          </ul>
          {this.renderAdminMenu()}
        </div>
      )
    } else {
      return null
    }
  }

  renderAdminMenu () {
    if (this.state.user && this.state.user.admin) {
      return (
        <div>
          <header>Administração</header>
          <ul className='nav nav-sidebar'>
            <NavLink to={'/Admin/Todos-Sites'}>Todos Sites</NavLink>
          </ul>
        </div>
      )
    } else {
      return null
    }
  }
}
