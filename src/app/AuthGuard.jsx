import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../state/authContext.jsx'

export default function AuthGuard({ children }) {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  if (loading) return null
  if (!isAuthenticated) return <Navigate to="/auth/signin" state={{ from: location.pathname }} replace />
  return children
}
