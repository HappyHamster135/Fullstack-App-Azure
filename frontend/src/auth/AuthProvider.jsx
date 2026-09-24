import { useEffect, useState } from 'react'
import { authApi } from '../api/AuthApi.js'
import { onUnauthorized } from '../api/client.js'
import { AuthContext } from './AuthContext.js'
import { tokenStorage } from './tokenStorage.js'

function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(() => tokenStorage.get() !== null)


  //---------------
  //-----Session
  //---------------

  useEffect(() => {
    onUnauthorized(() => {
      tokenStorage.clear()
      setUser(null)
    })

    if (!tokenStorage.get()) {
      return
    }

    authApi.getCurrentUser()
      .then(setUser)
      .catch(() => null)
      .finally(() => setIsLoading(false))
  }, [])


  //---------------
  //-----Actions
  //---------------

  const startSession = (response) => {
    tokenStorage.set(response.token)
    setUser(response.user)
  }

  const login = async (credentials) => startSession(await authApi.login(credentials))

  const register = async (credentials) => startSession(await authApi.register(credentials))

  const logout = async () => {
    await authApi.logout().catch(() => null)
    tokenStorage.clear()
    setUser(null)
  }


  //---------------
  //-----Provider
  //---------------

  const value = { user, isAuthenticated: user !== null, isLoading, login, register, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
