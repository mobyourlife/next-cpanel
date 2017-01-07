import React from 'react'
import FaFacebook from 'react-icons/lib/fa/facebook'

export class AccountLogin extends React.Component {
  render () {
    return (
      <div className='container text-center'>
        <header>
          <img src='/img/logo-square.png' alt='Mob Your Life' />
          <h1>Login</h1>
        </header>
        <p>Clique no botão abaixo para entrar com a sua conta do Facebook.</p>
        <div className='login-container'>
          <a className='btn btn-social btn-lg btn-facebook'>
            <FaFacebook />
            Entrar com Facebook
          </a>
        </div>
      </div>
    )
  }
}
