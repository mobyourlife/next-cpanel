import 'whatwg-fetch'

const url = getEnvironmentUrl()

export function get(method) {
  return fetch(url + method).then(res => res.json())
}

export function post(method, data) {
  return fetch(url + method, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data || '')
  })
  .then(res => res.json())
}

function getEnvironmentUrl() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.mobyourlife.com.br/v4'
    
    default:
      return 'http://localhost:4000'
  }
}
