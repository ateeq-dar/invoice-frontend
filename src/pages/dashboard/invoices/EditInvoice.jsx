import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getInvoice } from '../../../services/api.js'
import { updateInvoice } from '../../../services/api.js'

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
  const updateLine = (i, key, val) => { const c = [...lines]; c[i] = { ...c[i], [key]: val }; setLines(c) }
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
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Edit Invoice</div>
      {loading ? (
        <div className="space-y-4">
          <div className="h-24 rounded-2xl bg-white border shadow animate-pulse" />
          <div className="h-40 rounded-2xl bg-white border shadow animate-pulse" />
        </div>
      ) : (
      <form onSubmit={onSubmit} className="space-y-6">
        {error && <div className="text-sm text-red-600">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border rounded-2xl p-6 shadow">
          <input className="border rounded-lg px-3 py-2" placeholder="Invoice Number" value={header.invoiceNumber} onChange={e => setHeader({ ...header, invoiceNumber: e.target.value })} />
          <input className="border rounded-lg px-3 py-2" placeholder="Customer Name" value={header.customerName} onChange={e => setHeader({ ...header, customerName: e.target.value })} />
          <input type="date" className="border rounded-lg px-3 py-2" value={header.issueDate} onChange={e => setHeader({ ...header, issueDate: e.target.value })} />
          <input type="date" className="border rounded-lg px-3 py-2" value={header.dueDate} onChange={e => setHeader({ ...header, dueDate: e.target.value })} />
          <input type="number" step="0.01" className="border rounded-lg px-3 py-2" placeholder="Tax Rate (%)" value={header.taxRate} onChange={e => setHeader({ ...header, taxRate: Number(e.target.value) })} />
          <select className="border rounded-lg px-3 py-2" value={header.currency} onChange={e => setHeader({ ...header, currency: e.target.value })}>
            <option>USD</option>
            <option>EUR</option>
            <option>GBP</option>
            <option>INR</option>
          </select>
        </div>
        <div className="bg-white border rounded-2xl p-6 shadow space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">Line Items</div>
            <button type="button" onClick={addLine} className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50">Add Line</button>
          </div>
          {lines.map((l, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input className="border rounded-lg px-3 py-2 sm:col-span-2" placeholder="Description" value={l.description} onChange={e => updateLine(i, 'description', e.target.value)} />
              <input type="number" className="border rounded-lg px-3 py-2" placeholder="Qty" value={l.quantity} onChange={e => updateLine(i, 'quantity', Number(e.target.value))} />
              <input type="number" step="0.01" className="border rounded-lg px-3 py-2" placeholder="Unit Price" value={l.unitPrice} onChange={e => updateLine(i, 'unitPrice', Number(e.target.value))} />
              <div className="sm:col-span-4 flex justify-end">
                <button type="button" onClick={() => removeLine(i)} className="px-2 py-1 rounded border text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button disabled={saving} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300">{saving ? 'Saving…' : 'Save'}</button>
        </div>
      </form>
      )}
    </div>
  )
}
