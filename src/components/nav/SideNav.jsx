import React from 'react'
import { NavLink } from 'react-router-dom'

function Item({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg border ${isActive ? 'bg-blue-600 text-white border-blue-600' : 'bg-white hover:bg-gray-50'}`
      }
      end
    >
      {children}
    </NavLink>
  )
}

export default function SideNav() {
  return (
    <div className="space-y-2">
      <div className="text-xs uppercase text-gray-500 px-1">Dashboard</div>
      <Item to="/dashboard">Home</Item>
      <div className="text-xs uppercase text-gray-500 px-1 mt-4">Invoices</div>
      <Item to="/dashboard/invoices">All Invoices</Item>
      <Item to="/dashboard/invoices/new">Create Invoice</Item>
    </div>
  )
}
