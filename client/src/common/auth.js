import decodeToken from 'jwt-decode'
import history from './history'

class Auth {
  get accessToken () {
    return localStorage.getItem('access_token')
  }

  get userId () {
    const { accessToken } = this
    const { sub } = decodeToken(accessToken)
    return sub
  }

  handleResponse (data) {
    const { access_token: accessToken } = data
    localStorage.setItem('access_token', accessToken)
    history.replace('/')
  }

  isAuthorized () {
    const accessToken = localStorage.getItem('access_token')
    return !!accessToken
  }
}

export default new Auth()
