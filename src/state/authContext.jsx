import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const u = localStorage.getItem('authUser')
    if (token && u) setUser(JSON.parse(u))
    setLoading(false)
  }, [])

  const signIn = async (email, password) => {
    const fakeUser = { id: 'u_1', email }
    localStorage.setItem('authToken', 'demo-token')
    localStorage.setItem('authUser', JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const signUp = async (email, password) => {
    const fakeUser = { id: 'u_1', email }
    localStorage.setItem('authToken', 'demo-token')
    localStorage.setItem('authUser', JSON.stringify(fakeUser))
    setUser(fakeUser)
  }

  const signOut = () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('authUser')
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
