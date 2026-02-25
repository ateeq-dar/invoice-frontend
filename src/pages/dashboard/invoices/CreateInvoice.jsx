import React, { useState } from 'react'

export default function CreateInvoice() {
  const [header, setHeader] = useState({ invoiceNumber: '', customerName: '', issueDate: '', dueDate: '' })
  const [lines, setLines] = useState([{ description: '', quantity: 1, unitPrice: 0 }])

  const addLine = () => setLines([...lines, { description: '', quantity: 1, unitPrice: 0 }])
  const removeLine = i => setLines(lines.filter((_, idx) => idx !== i))
  const updateLine = (i, key, val) => {
    const copy = [...lines]; copy[i] = { ...copy[i], [key]: val }; setLines(copy)
  }
  const onSubmit = e => {
    e.preventDefault()
    alert('UI-only: Hook to backend create endpoint later')
  }

  return (
    <div className="space-y-6">
      <div className="text-2xl font-semibold">Create Invoice</div>
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white border rounded-2xl p-6 shadow">
          <input className="border rounded-lg px-3 py-2" placeholder="Invoice Number" value={header.invoiceNumber} onChange={e => setHeader({ ...header, invoiceNumber: e.target.value })} />
          <input className="border rounded-lg px-3 py-2" placeholder="Customer Name" value={header.customerName} onChange={e => setHeader({ ...header, customerName: e.target.value })} />
          <input type="date" className="border rounded-lg px-3 py-2" placeholder="Issue Date" value={header.issueDate} onChange={e => setHeader({ ...header, issueDate: e.target.value })} />
          <input type="date" className="border rounded-lg px-3 py-2" placeholder="Due Date" value={header.dueDate} onChange={e => setHeader({ ...header, dueDate: e.target.value })} />
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
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Save</button>
        </div>
      </form>
    </div>
  )
}
