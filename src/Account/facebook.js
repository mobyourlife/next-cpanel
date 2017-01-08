/* global localStorage */

import { browserHistory } from 'react-router'

const JWT_TOKEN_ID = 'JWT_TOKEN'

export function storeToken (token) {
  localStorage.setItem(JWT_TOKEN_ID, token)
  browserHistory.replace('/')
}

export function removeToken () {
  localStorage.removeItem(JWT_TOKEN_ID)
  browserHistory.replace('/')
}

export function getToken () {
  return localStorage.getItem(JWT_TOKEN_ID)
}

export function isLoggedIn () {
  return !!getToken()
}
