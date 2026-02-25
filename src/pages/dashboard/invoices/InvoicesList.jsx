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
      <div className="animate-fade-up flex items-center justify-between">
        <div>
          <div className="text-3xl font-semibold tracking-tight text-slate-100">Invoices</div>
          <div className="text-sm text-slate-400">View and manage all invoices tied to your account</div>
        </div>
        <Link to="/dashboard/invoices/new" className="btn-primary">Create</Link>
      </div>

      <div className="ui-card animate-fade-up delay-1 space-y-4 rounded-2xl p-6">
        {loading && <div className="text-sm text-slate-400">Loading...</div>}
        {error && <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
        {!loading && items.length === 0 && <div className="text-sm text-slate-400">No invoices yet. Create your first one.</div>}

        {!loading && items.length > 0 && (
          <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-950/70 text-slate-300">
                <tr className="border-b border-slate-800 text-left">
                  <th className="px-3 py-3">Number</th>
                  <th className="px-3 py-3">Customer</th>
                  <th className="px-3 py-3">Due</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3 text-right">Total</th>
                  <th className="px-3 py-3" />
                </tr>
              </thead>
              <tbody>
                {items.map(inv => (
                  <tr key={inv.id} className="ui-card-hover border-b border-slate-800/80 bg-slate-900/60">
                    <td className="px-3 py-3 text-slate-100">{inv.invoiceNumber}</td>
                    <td className="px-3 py-3 text-slate-200">{inv.customerName}</td>
                    <td className="px-3 py-3 text-slate-300">{new Date(inv.dueDate).toLocaleDateString('en-CA')}</td>
                    <td className="px-3 py-3">
                      <span className={`rounded px-2 py-0.5 text-xs ${inv.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-slate-100">${inv.total.toFixed(2)}</td>
                    <td className="px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <Link to={`/dashboard/invoices/${inv.id}`} className="btn-secondary px-3 py-1.5">View</Link>
                        <Link to={`/dashboard/invoices/${inv.id}/edit`} className="btn-secondary px-3 py-1.5">Edit</Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
          <div className="mb-3 text-sm text-slate-400">Quick open by Invoice Number</div>
          <form onSubmit={open} className="flex gap-3">
            <input className="flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" placeholder="Enter Invoice Number" value={queryNum} onChange={e => setQueryNum(e.target.value)} />
            <button className="btn-secondary">Open</button>
          </form>
        </div>
      </div>
    </div>
  )
}
