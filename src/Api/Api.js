import { API_URL } from '../constants/api'

const getHeader = (accessToken) => {
    let header = { 'content-type': 'application/json' }
    if (accessToken) {
      header = Object.assign(header, { Authorization: `Bearer ${accessToken}` })
    }
    return header
  }

const sendRequest = (method, url, headers, body) => new Promise((resolve, reject) => {
    fetch(url, {
      headers: headers || getHeader(),
      credentials: 'include',
      method,
      ...(method !== 'GET' && { body: JSON.stringify(body) }),
    })
      .then(async (response) => {
        const contentType = response.headers.get('Content-Type') || ''
        let json = {}
        let errorMessage = 'Error'
        if (contentType.includes('application/json') && response.status !== 204) {
          json = await response.json()
          errorMessage = json.message
        }
        if (response.ok) {
          resolve(json)
        }
        if (errorMessage && errorMessage.toString().indexOf('The used access token is invalid, please try to revalidate it') !== -1) {
          window.location.reload()
        } else {
          reject(Error(errorMessage))
        }
      })
      .catch(error => reject(Error(error.message)))
  })

const GET = (url, headers) => sendRequest('GET', url, headers)

// EVENTS
export const getPokemonList = (accessToken, page, pageSize) =>
  GET(`${API_URL}/polls/published?page=${page}&pageSize=${pageSize}`, getHeader(accessToken))

