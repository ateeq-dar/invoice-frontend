import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvoice, updateInvoice } from '../../../services/api.js'

export default function EditInvoice() {
  const { id } = useParams()
  const [header, setHeader] = useState({ invoiceNumber: '', customerName: '', issueDate: '', dueDate: '', taxRate: 0, currency: 'USD' })
  const [lines, setLines] = useState([{ description: '', quantity: 1, unitPrice: 0 }])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()
  const addLine = () => setLines([...lines, { description: '', quantity: 1, unitPrice: 0 }])
  const removeLine = i => setLines(lines.filter((_, idx) => idx !== i))
  const updateLine = (i, key, val) => {
    const c = [...lines]
    c[i] = { ...c[i], [key]: val }
    setLines(c)
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const inv = await getInvoice(id)
        setHeader({
          invoiceNumber: inv.invoiceNumber,
          customerName: inv.customerName,
          issueDate: inv.issueDate.slice(0, 10),
          dueDate: inv.dueDate.slice(0, 10),
          taxRate: inv.taxRate ?? 0,
          currency: inv.currency ?? 'USD'
        })
        setLines(inv.lines.map(l => ({ description: l.description, quantity: l.quantity, unitPrice: Number(l.unitPrice) })))
      } catch (e) {
        setError(e.message || 'Failed to load invoice')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      setSaving(true)
      const payload = {
        ...header,
        lines: lines.map(l => ({ description: l.description, quantity: Number(l.quantity), unitPrice: Number(l.unitPrice) }))
      }
      await updateInvoice(id, payload)
      navigate(`/dashboard/invoices/${id}`)
    } catch (e2) {
      setError(e2.message || 'Failed to update invoice')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="animate-fade-up space-y-6">
      <div>
        <div className="text-3xl font-semibold tracking-tight text-slate-100">Edit Invoice</div>
        <div className="text-sm text-slate-400">Update details, taxes, and line items</div>
      </div>
      {loading ? (
        <div className="space-y-4">
          <div className="h-24 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
          <div className="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
        </div>
      ) : (
        <form onSubmit={onSubmit} className="animate-fade-up space-y-6">
          {error && <div className="rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
          <div className="ui-card animate-fade-up delay-1 grid grid-cols-1 gap-4 rounded-2xl p-6 sm:grid-cols-2">
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" placeholder="Invoice Number" value={header.invoiceNumber} onChange={e => setHeader({ ...header, invoiceNumber: e.target.value })} />
            <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" placeholder="Customer Name" value={header.customerName} onChange={e => setHeader({ ...header, customerName: e.target.value })} />
            <input type="date" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" value={header.issueDate} onChange={e => setHeader({ ...header, issueDate: e.target.value })} />
            <input type="date" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" value={header.dueDate} onChange={e => setHeader({ ...header, dueDate: e.target.value })} />
            <input type="number" step="0.01" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Tax Rate (%)" value={header.taxRate} onChange={e => setHeader({ ...header, taxRate: Number(e.target.value) })} />
            <select className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" value={header.currency} onChange={e => setHeader({ ...header, currency: e.target.value })}>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>INR</option>
            </select>
          </div>
          <div className="ui-card animate-fade-up delay-2 space-y-4 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-semibold text-slate-100">Line Items</div>
              <button type="button" onClick={addLine} className="btn-secondary px-3 py-1.5">Add Line</button>
            </div>
            {lines.map((l, i) => (
              <div key={i} className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <input className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none sm:col-span-2" placeholder="Description" value={l.description} onChange={e => updateLine(i, 'description', e.target.value)} />
                <input type="number" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Qty" value={l.quantity} onChange={e => updateLine(i, 'quantity', Number(e.target.value))} />
                <input type="number" step="0.01" className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none" placeholder="Unit Price" value={l.unitPrice} onChange={e => updateLine(i, 'unitPrice', Number(e.target.value))} />
                <div className="flex justify-end sm:col-span-4">
                  <button type="button" onClick={() => removeLine(i)} className="btn-secondary px-2 py-1 text-sm">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button disabled={saving} className="btn-primary disabled:bg-slate-600 disabled:text-slate-300">
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
