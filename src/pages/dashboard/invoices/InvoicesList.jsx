import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function InvoicesList() {
  const [id, setId] = useState('')
  const navigate = useNavigate()
  const open = e => {
    e.preventDefault()
    const v = id.trim()
    if (!v) return
    navigate(`/dashboard/invoices/${v}`)
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Invoices</div>
        <Link to="/dashboard/invoices/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</Link>
      </div>
      <div className="p-6 rounded-2xl bg-white border shadow">
        <div className="text-sm text-gray-600 mb-3">Quick open by ID</div>
        <form onSubmit={open} className="flex gap-3">
          <input className="flex-1 border rounded-lg px-3 py-2" placeholder="Paste Invoice UUID" value={id} onChange={e => setId(e.target.value)} />
          <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Open</button>
        </form>
        <div className="mt-6 text-sm text-gray-500">List view coming soon</div>
      </div>
    </div>
  )
}
