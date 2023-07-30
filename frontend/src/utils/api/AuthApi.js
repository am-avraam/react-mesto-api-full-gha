import {authApiConfig} from '../constants'

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  _getResponseData(res) {
    // if (!res.ok) {
    //   return Promise.reject(`Ошибка: ${res.status}`)
    // }
    return res.json()
  }

  async register(email, password) {
    const response = await fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email: email, password: password})
    })

    return this._getResponseData(response)
  }

  async authorize(email, password) {
    const response = await fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({email: email, password: password}),
    })

    const {token} = await this._getResponseData(response)
    return token
  }

  async checkToken(token) {
    const response = await fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    //
    // const {data: {email}} = await this._getResponseData(response)
    // return email
    const {data: {email}} = await this._getResponseData(response)
    return email
  }
}

const authApi = new Api(authApiConfig)

export default authApi
