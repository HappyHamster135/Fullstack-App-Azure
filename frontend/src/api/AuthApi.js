import api from './client.js'

class AuthApi {
  constructor(http) {
    this.http = http
  }

  async register(credentials) {
    const { data } = await this.http.post('/api/auth/register', credentials)
    return data
  }

  async login(credentials) {
    const { data } = await this.http.post('/api/auth/login', credentials)
    return data
  }

  async logout() {
    await this.http.post('/api/auth/logout')
  }

  async getCurrentUser() {
    const { data } = await this.http.get('/api/auth/me')
    return data
  }
}

export const authApi = new AuthApi(api)
