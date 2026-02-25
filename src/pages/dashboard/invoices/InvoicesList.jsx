import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { listInvoices, getInvoiceByNumber } from '../../../services/api.js'

export default function InvoicesList() {
  const [queryNum, setQueryNum] = useState('')
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await listInvoices()
        setItems(data.items || [])
      } catch (e) {
        setError(e.message || 'Failed to load invoices')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const open = async e => {
    e.preventDefault()
    const v = queryNum.trim()
    if (!v) return
    try {
      const inv = await getInvoiceByNumber(v)
      navigate(`/dashboard/invoices/${inv.id}`)
    } catch (e2) {
      setError(e2.message || 'Invoice not found')
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-semibold">Invoices</div>
        <Link to="/dashboard/invoices/new" className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Create</Link>
      </div>
      <div className="p-6 rounded-2xl bg-white border shadow space-y-4">
        <div>
          <div className="text-lg font-semibold">Your Invoices</div>
          <div className="text-sm text-gray-600">Only invoices you own are shown</div>
        </div>
        {loading && <div className="text-sm text-gray-600">Loading…</div>}
        {error && <div className="text-sm text-red-600">{error}</div>}
        {!loading && items.length === 0 && <div className="text-sm text-gray-500">No invoices yet. Create your first one.</div>}
        {!loading && items.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr className="text-left text-gray-700 border-b">
                  <th className="py-3 px-3">Number</th>
                  <th className="py-3 px-3">Customer</th>
                  <th className="py-3 px-3">Due</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Total</th>
                  <th className="py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {items.map(inv => (
                  <tr key={inv.id} className="border-b last:border-b-0">
                    <td className="py-3 px-3">{inv.invoiceNumber}</td>
                    <td className="py-3 px-3">{inv.customerName}</td>
                    <td className="py-3 px-3">{new Date(inv.dueDate).toLocaleDateString('en-CA')}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-xs ${inv.status === 'PAID' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{inv.status}</span>
                    </td>
                    <td className="py-3 px-3 text-right">${inv.total.toFixed(2)}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-2 justify-end">
                        <Link to={`/dashboard/invoices/${inv.id}`} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">View</Link>
                        <Link to={`/dashboard/invoices/${inv.id}/edit`} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">Edit</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="pt-4 border-t">
          <div className="text-sm text-gray-600 mb-3">Quick open by Invoice Number</div>
          <form onSubmit={open} className="flex gap-3">
            <input className="flex-1 border rounded-lg px-3 py-2" placeholder="Enter Invoice Number" value={queryNum} onChange={e => setQueryNum(e.target.value)} />
            <button className="px-4 py-2 rounded-lg border bg-white hover:bg-gray-50">Open</button>
          </form>
        </div>
      </div>
    </div>
  )
}
