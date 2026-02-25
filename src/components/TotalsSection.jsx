import React from 'react'

const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export default function TotalsSection({ total, amountPaid, balanceDue, status }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
        <div className="mt-1 text-sm text-gray-600">Status: <span className="font-medium">{status}</span></div>
      </div>
    </div>
  )
}
