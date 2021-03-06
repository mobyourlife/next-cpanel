/* global FB */

import React from 'react'
import { FormatMessage } from 'react-easy-intl'

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
    let loginText = <p><FormatMessage>Click the button below to login with your Facebook account.</FormatMessage></p>
    let loginButton = (
      <div className='login-container'>
        <button onClick={() => this.login()}
          className='btn btn-social btn-lg btn-facebook'>
          <FaFacebook />
          <FormatMessage>Login with Facebook</FormatMessage>
        </button>
      </div>
    )

    if (this.state.connected) {
      loginText = <p><FormatMessage>Please wait while we redirect you...</FormatMessage></p>
      loginButton = null
    } else if (this.state.notAuthorized) {
      loginText = (
        <div>
          <div className='alert alert-danger'>
            <p><FormatMessage>You need to authorise login with Facebook to continue.</FormatMessage></p>
          </div>
          <p><FormatMessage>Click the button below again to login with your Facebook account.</FormatMessage></p>
        </div>
      )
    } else if (this.state.failed) {
      loginText = (
        <div>
          <div className='alert alert-danger'>
            <p><FormatMessage>Oops! Something went wrong while trying to login with your Facebook account. Please try again.</FormatMessage></p>
          </div>
          <p><FormatMessage>Click the button below again to login with your Facebook account.</FormatMessage></p>
        </div>
      )
    }

    return (
      <div className='container text-center'>
        <header>
          <img src='/img/logo-square.png' alt='Mob Your Life' />
          <h1><FormatMessage>Welcome!</FormatMessage></h1>
        </header>

        <div style={{marginTop: 30, marginBottom: 30}}>
          {loginText}
        </div>

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
          storeToken(res.id_token, res.user)
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
