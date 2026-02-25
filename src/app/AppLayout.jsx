import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar.jsx'
import SideNav from '../components/nav/SideNav.jsx'

export default function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="bg-grid absolute inset-0 opacity-25" />
        <div className="animate-float-slow absolute -top-24 left-[-8rem] h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="animate-float-slow absolute top-48 right-[-8rem] h-[30rem] w-[30rem] rounded-full bg-blue-500/15 blur-3xl delay-2" />
      </div>
      <NavBar />
      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-6 lg:grid-cols-12">
        <div className="animate-fade-up lg:col-span-3">
          <SideNav />
        </div>
        <div className="animate-fade-up delay-1 lg:col-span-9">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
