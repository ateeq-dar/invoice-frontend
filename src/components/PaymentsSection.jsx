import React from 'react'

const fmtDateTime = s => new Date(s).toLocaleString('en-CA')

export default function PaymentsSection({ payments = [], currency = 'USD' }) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency })
  return (
    <div className="ui-card animate-fade-up delay-2 rounded-2xl p-6">
      <div className="mb-4 text-lg font-semibold text-slate-100">Payments</div>
      {payments.length === 0 && <div className="text-sm text-slate-400">No payments</div>}
      <ul className="space-y-3">
        {payments
          .slice()
          .sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate))
          .map(p => (
            <li key={p.id} className="ui-card ui-card-hover flex items-center justify-between rounded-lg p-3">
              <div className="text-sm text-slate-300">{fmtDateTime(p.paymentDate)}</div>
              <div className="text-sm font-semibold text-slate-100">{fmt.format(p.amount)}</div>
            </li>
          ))}
      </ul>
    </div>
  )
}
