import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-slate-950 p-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="bg-grid absolute inset-0 opacity-20" />
        <div className="animate-float-slow absolute top-[-8rem] left-[-8rem] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="animate-float-slow absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl delay-2" />
      </div>
      <div className="ui-card animate-pop relative z-10 w-full max-w-md rounded-2xl p-6">
        <Outlet />
      </div>
    </div>
  )
}
