import React from 'react'

export default function LineItemsTable({ lines = [], currency = 'USD' }) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency })
  return (
    <div className="ui-card animate-fade-up delay-1 rounded-2xl p-6">
      <div className="mb-4 text-lg font-semibold text-slate-100">Line Items</div>
      <div className="overflow-x-auto rounded-xl border border-slate-800">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-950/70">
            <tr className="border-b border-slate-800 text-left text-slate-300">
              <th className="py-3 pr-4">Description</th>
              <th className="py-3 pr-4">Quantity</th>
              <th className="py-3 pr-4 text-right">Unit Price</th>
              <th className="py-3 pr-4 text-right">Line Total</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((l, i) => (
              <tr key={l.id} className={`ui-card-hover border-b border-slate-800/80 ${i % 2 ? 'bg-slate-900/50' : 'bg-slate-950/40'}`}>
                <td className="py-3 pr-4 text-slate-100">{l.description}</td>
                <td className="py-3 pr-4 text-slate-300">{l.quantity}</td>
                <td className="py-3 pr-4 text-right text-slate-200">{fmt.format(l.unitPrice)}</td>
                <td className="py-3 pr-4 text-right font-medium text-slate-100">{fmt.format(l.lineTotal)}</td>
              </tr>
            ))}
            {lines.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-slate-400">No line items</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
