import React from 'react'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function LineItemsTable({ lines = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <div className="text-lg font-semibold mb-4">Line Items</div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr className="text-left text-gray-700 border-b">
              <th className="py-3 pr-4">Description</th>
              <th className="py-3 pr-4">Quantity</th>
              <th className="py-3 pr-4 text-right">Unit Price</th>
              <th className="py-3 pr-4 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={l.id} className={`border-b last:border-b-0 ${i % 2 ? 'bg-white' : 'bg-slate-50/40'}`}>
                <td className="py-3 pr-4">{l.description}</td>
                <td className="py-3 pr-4">{l.quantity}</td>
                <td className="py-3 pr-4 text-right">{fmt.format(l.unitPrice)}</td>
                <td className="py-3 pr-4 text-right font-medium">{fmt.format(l.lineTotal)}</td>
              </tr>
            ))}
            {lines.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">No line items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
