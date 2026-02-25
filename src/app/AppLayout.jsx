import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SideNav from '../components/nav/SideNav.jsx'

export default function AppLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <NavBar />
      <div className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-3">
          <SideNav />
        </div>
        <div className="lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
