import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { authMe, authSignIn, authSignUp, setAuthToken } from '../services/api.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const u = localStorage.getItem('authUser')
    if (token && u) {
      setAuthToken(token)
      setUser(JSON.parse(u))
    }
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    const { token, user } = await authSignIn(email, password)
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))
    setAuthToken(token)
    setUser(user)
  }

  const signUp = async (email, password) => {
    const { token, user } = await authSignUp(email, password)
    localStorage.setItem('authToken', token)
    localStorage.setItem('authUser', JSON.stringify(user))
    setAuthToken(token)
    setUser(user)
  }

  const signOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
    setAuthToken(null)
    setUser(null)
  }

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    signIn,
    signUp,
    signOut,
    loading
  }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
