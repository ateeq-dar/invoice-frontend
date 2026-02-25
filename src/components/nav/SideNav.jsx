import React from 'react'
import { NavLink } from 'react-router-dom'

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block rounded-lg border px-4 py-2 text-sm transition ui-card-hover ${isActive ? 'border-cyan-400/50 bg-cyan-500/20 text-cyan-100' : 'border-slate-800 bg-slate-900/70 text-slate-200 hover:bg-slate-800'}`
      }
      end
    >
      {children}
    </NavLink>
  )
}

export default function SideNav() {
  return (
    <div className="ui-card animate-pop space-y-2 rounded-2xl p-4">
      <div className="px-1 text-xs uppercase tracking-wider text-slate-400">Dashboard</div>
      <Item to="/dashboard">Home</Item>
      <div className="mt-4 px-1 text-xs uppercase tracking-wider text-slate-400">Invoices</div>
      <Item to="/dashboard/invoices">All Invoices</Item>
      <Item to="/dashboard/invoices/new">Create Invoice</Item>
    </div>
  )
}
