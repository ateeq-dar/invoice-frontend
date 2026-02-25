import React from 'react'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const fmtDateTime = s => new Date(s).toLocaleString('en-CA')

export default function PaymentsSection({ payments = [] }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow border">
      <div className="text-lg font-semibold mb-4">Payments</div>
      {payments.length === 0 && <div className="text-sm text-gray-500">No payments</div>}
      <ul className="space-y-3">
        {payments
          .slice()
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .map(p => (
            <li key={p.id} className="flex items-center justify-between p-3 rounded-lg border bg-slate-50">
              <div className="text-sm">{fmtDateTime(p.paymentDate)}</div>
              <div className="text-sm font-semibold">{fmt.format(p.amount)}</div>
            </li>
          ))}
      </ul>
    </div>
  )
}
