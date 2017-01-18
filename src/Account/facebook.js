/* global localStorage */

import { browserHistory } from 'react-router'

const JWT_TOKEN_ID = 'JWT_TOKEN'
const JWT_USER_ID = 'JWT_USER'

export function storeToken (token, user) {
  localStorage.setItem(JWT_TOKEN_ID, token)
  localStorage.setItem(JWT_USER_ID, JSON.stringify(user))
  browserHistory.replace('/')
}

export function removeToken () {
  localStorage.removeItem(JWT_TOKEN_ID)
  localStorage.removeItem(JWT_USER_ID)
  browserHistory.replace('/')
}

export function getToken () {
  return localStorage.getItem(JWT_TOKEN_ID)
}

export function isLoggedIn () {
  return !!getToken()
}

export function getUser () {
  const data = localStorage.getItem(JWT_USER_ID)

  if (data) {
    return JSON.parse(data)
  }

  return null
}
