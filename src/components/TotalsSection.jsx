import React from 'react'

function TotalCard({ label, value }) {
  return (
    <div className="ui-card ui-card-hover animate-pop rounded-2xl p-5">
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-100">{value}</div>
    </div>
  )
}

export default function TotalsSection({ currency = 'USD', subtotal = 0, taxRate = 0, taxAmount = 0, total, amountPaid, balanceDue, status, overdue }) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency })
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TotalCard label="Subtotal" value={fmt.format(subtotal)} />
        <TotalCard label={`Tax (${taxRate.toFixed ? taxRate.toFixed(2) : taxRate}%)`} value={fmt.format(taxAmount)} />
        <TotalCard label="Total" value={fmt.format(total)} />
        <TotalCard label="Amount Paid" value={fmt.format(amountPaid)} />
        <TotalCard label="Balance Due" value={fmt.format(balanceDue)} />
      </div>
      <div className="text-sm text-slate-300">
        Status: <span className="font-medium text-slate-100">{status}</span>{' '}
        {overdue ? <span className="ml-2 rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-300 ring-1 ring-red-400/30">Overdue</span> : null}
      </div>
    </div>
  )
}
