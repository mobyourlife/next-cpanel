/* global fetch */

import 'whatwg-fetch'

import { getToken } from '../Account'

const url = getEnvironmentUrl()

export function get (method) {
  return fetch(url + method, {
    method: 'GET',
    headers: makeHeaders()
  }).then(res => res.json())
}

export function post (method, data) {
  return fetch(url + method, {
    method: 'POST',
    headers: makeHeaders(),
    body: JSON.stringify(data || '')
  })
  .then(res => res.json())
}

export function patch (method, data) {
  return fetch(url + method, {
    method: 'PATCH',
    headers: makeHeaders(),
    body: JSON.stringify(data || '')
  })
  .then(res => res.json())
}

function getEnvironmentUrl () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.mobyourlife.com.br/v4'

    default:
      return 'http://localhost:4000'
  }
}

function makeHeaders () {
  let headers = {}
  headers['Content-Type'] = 'application/json'

  const token = getToken()
  if (token) {
    headers['Authorization'] = 'Bearer ' + token
  }

  return headers
}
