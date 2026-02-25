import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../state/authContext.jsx'

export default function NavBar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const onLogout = () => {
    navigate('/', { replace: true })
    setTimeout(() => signOut(), 0)
  }
  return (
    <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="animate-fade-up flex items-center gap-2">
          <div className="animate-pulse-glow grid h-8 w-8 place-items-center rounded-lg bg-cyan-400 text-sm font-black text-slate-900">IM</div>
          <div className="font-semibold tracking-wide text-slate-100">Invoice Manager</div>
        </div>
        <div className="animate-fade-up delay-1 flex items-center gap-3">
          <div className="hidden rounded-md border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs text-slate-300 sm:block">
            {user?.email}
          </div>
          <button onClick={onLogout} className="btn-secondary px-3 py-1.5 text-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
