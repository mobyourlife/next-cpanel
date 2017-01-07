import 'whatwg-fetch'

const url = getEnvironmentUrl()

export function get(method) {
  return fetch(url + method).then(res => res.json())
}

function getEnvironmentUrl() {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'https://api.mobyourlife.com.br/v4'
    
    default:
      return 'http://localhost:4000'
  }
}
