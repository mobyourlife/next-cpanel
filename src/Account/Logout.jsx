import React from 'react'

import { removeToken } from './facebook'

export class AccountLogout extends React.Component {
  componentDidMount () {
    removeToken()
  }

  render () {
    return null
  }
}
