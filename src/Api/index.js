import 'whatwg-fetch'

const url = process.env.MOB_API_URL || 'http://localhost:4000'

export function get(method) {
  return fetch(url + method).then(res => res.json())
}
