import React from 'react'
import { Link } from 'react-router-dom'

export default function DashboardHome() {
  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Dashboard</div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border shadow">
          <div className="text-gray-600 text-sm">Total Invoices</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border shadow">
          <div className="text-gray-600 text-sm">Outstanding Balance</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
        <div className="p-5 rounded-2xl bg-white border shadow">
          <div className="text-gray-600 text-sm">Paid</div>
          <div className="mt-1 text-2xl font-semibold">—</div>
        </div>
      </div>
      <div className="p-6 rounded-2xl bg-white border shadow flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">Invoices</div>
          <div className="text-sm text-gray-600">Manage your invoices and payments</div>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/invoices" className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">View All</Link>
          <Link to="/dashboard/invoices/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</Link>
        </div>
      </div>
    </div>
  )
}
