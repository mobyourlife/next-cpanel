/* global FB */

import React from 'react'
import FaFacebook from 'react-icons/lib/fa/facebook'

import { post } from '../Api'
import { storeToken } from './facebook'

const JS_SDK_ID = 'facebook-js-sdk'

export class AccountLogin extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      connected: false,
      notAuthorized: false,
      failed: false
    }
  }

  componentDidMount () {
    window['fbAsyncInit'] = this.setupSdk.bind(this)
    this.loadSdk()
  }

  componentWillUnmount () {
    this.unloadSdk()
  }

  render () {
    let loginText = <p>Clique no botão abaixo para entrar com a sua conta do Facebook.</p>
    let loginButton = (
      <div className='login-container'>
        <button onClick={() => this.login()}
          className='btn btn-social btn-lg btn-facebook'>
          <FaFacebook />
          Entrar com Facebook
        </button>
      </div>
    )

    if (this.state.connected) {
      loginText = <p>Aguarde enquanto redirecionamos você...</p>
      loginButton = null
    } else if (this.state.notAuthorized) {
      loginText = (
        <div>
          <div className='alert alert-danger'>
            <p>Você precisa autorizar o login com Facebook para continuar!</p>
          </div>
          <p>Clique novamente no botão abaixo para entrar utilizando a sua conta do Facebook.</p>
        </div>
      )
    } else if (this.state.failed) {
      loginText = (
        <div>
          <div className='alert alert-danger'>
            <p>Oops! Algo deu errado ao tentar entrar com a sua conta do Facebook. Por favor tente novamente.</p>
          </div>
          <p>Clique no botão abaixo para tentar entrar novamente utilizando a sua conta do Facebook.</p>
        </div>
      )
    }

    return (
      <div className='container text-center'>
        <header>
          <img src='/img/logo-square.png' alt='Mob Your Life' />
          <h1>Login</h1>
        </header>

        {loginText}
        {loginButton}
      </div>
    )
  }

  login () {
    this.setState({
      connected: false,
      notAuthorized: false,
      failed: false
    })

    FB.login(this.handleStatus.bind(this), {
      scope: 'public_profile, email, manage_pages'
    })
  }

  handleStatus (response) {
    switch (response.status) {
      case 'connected':
        post('/users', {
          fb_uid: response.authResponse.userID,
          access_token: response.authResponse.accessToken
        })
        .then(res => {
          this.setState({connected: true})
          storeToken(res.id_token)
        }, err => {
          this.setState({failed: true})
        })
        break

      case 'not_authorized':
        this.setState({notAuthorized: true})
        break

      default:
        break
    }
  }

  loadSdk () {
    if (document.getElementById(JS_SDK_ID)) {
      return
    }

    let js = document.createElement('script')
    js.id = JS_SDK_ID
    js.src = 'https://connect.facebook.net/pt_BR/sdk.js'
    document.body.appendChild(js)
  }

  unloadSdk () {
    this.tryRemoveElement(JS_SDK_ID)
    this.tryRemoveElement('fb-root')
  }

  tryRemoveElement(id) {
    const el = document.getElementById(id)
    if (el) {
      document.body.removeChild(el)
    }
  }

  setupSdk () {
    FB.init({
      appId: '675062689245409',
      xfbml: false,
      version: 'v2.8'
    })
  }
}
