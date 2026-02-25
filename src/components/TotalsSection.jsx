import React from 'react'

export default function TotalsSection({ currency = 'USD', subtotal = 0, taxRate = 0, taxAmount = 0, total, amountPaid, balanceDue, status, overdue }) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency })
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-5 border rounded-2xl bg-white shadow">
        <div className="text-gray-600 text-sm">Subtotal</div>
        <div className="mt-1 text-2xl font-semibold">{fmt.format(subtotal)}</div>
      </div>
      <div className="p-5 border rounded-2xl bg-white shadow">
        <div className="text-gray-600 text-sm">Tax ({taxRate.toFixed ? taxRate.toFixed(2) : taxRate}%)</div>
        <div className="mt-1 text-2xl font-semibold">{fmt.format(taxAmount)}</div>
      </div>
      <div className="p-5 border rounded-2xl bg-white shadow">
        <div className="text-gray-600 text-sm">Total</div>
        <div className="mt-1 text-2xl font-semibold">{fmt.format(total)}</div>
      </div>
      <div className="p-5 border rounded-2xl bg-white shadow">
        <div className="text-gray-600 text-sm">Amount Paid</div>
        <div className="mt-1 text-2xl font-semibold">{fmt.format(amountPaid)}</div>
      </div>
      <div className="p-5 border rounded-2xl bg-white shadow">
        <div className="text-gray-600 text-sm">Balance Due</div>
        <div className="mt-1 text-2xl font-semibold">{fmt.format(balanceDue)}</div>
      </div>
      <div className="sm:col-span-3">
        <div className="mt-1 text-sm text-gray-600">
          Status: <span className="font-medium">{status}</span>{' '}
          {overdue ? <span className="ml-2 px-2 py-0.5 text-xs rounded bg-red-100 text-red-700">Overdue</span> : null}
        </div>
      </div>
    </div>
  )
}
