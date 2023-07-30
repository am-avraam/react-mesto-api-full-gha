import {apiConfig} from '../constants'
class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }



  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
    return res.json()
  }


  async getUser() {
    const response = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })

    return this._getResponseData(response)
  }
  async getUser() {
    const response = await fetch(this._baseUrl + '/users/me', {
      headers: this._headers,
    })

    return this._getResponseData(response)
  }

  async getInitialCards() {
    const response = await fetch(this._baseUrl + '/cards', { headers: this._headers })

    return this._getResponseData(response)
  }

  async postCard(data) {
    const response = await fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    })

    return this._getResponseData(response)
  }

  patchUser = async (newInfo) => {
    const response = await fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(newInfo),
    })

    return this._getResponseData(response)
  }

  deleteCard = async (cardId) => {
    const response = await fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })

    return this._getResponseData(response)
  }



  changeLikeCardStatus = async(cardId, status) => {
    const response = await fetch(this._baseUrl + `/cards/${cardId}/likes`, {
      method: `${status? 'PUT': 'DELETE'}`,
      headers: this._headers,
    })
    return this._getResponseData(response)
  }

  async changeAvatar(src) {
    const response = await fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar: src }),
    })

    return this._getResponseData(response)
  }
}

const api = new Api(apiConfig)

 export default api
