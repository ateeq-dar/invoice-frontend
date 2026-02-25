import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/authContext.jsx'

export default function NavBar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const onLogout = () => {
    signOut()
    navigate('/auth/signin', { replace: true })
  }
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 text-white grid place-items-center text-sm font-semibold">IN</div>
          <div className="font-semibold">Invoice Manager</div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-xs text-gray-500">{user?.email}</div>
          <button onClick={onLogout} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm">Logout</button>
        </div>
      </div>
    </div>
  )
}
