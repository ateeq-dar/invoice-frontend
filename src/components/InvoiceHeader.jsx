import React from 'react'

const fmtDate = s => new Date(s).toLocaleDateString('en-CA')

export default function InvoiceHeader({ invoice, onArchive, onRestore, onOpenPayment }) {
  const badgeClass = invoice.status === 'PAID' ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200' : 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
  return (
    <div className="bg-white p-6 rounded-2xl shadow border flex flex-col gap-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight">Invoice {invoice.invoiceNumber}</div>
          <div className="text-sm text-gray-500">Customer • <span className="font-medium text-gray-700">{invoice.customerName}</span></div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}>{invoice.status}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
        <div className="p-3 rounded-lg bg-slate-50 border">
          <div className="text-gray-600">Issue Date</div>
          <div className="font-medium">{fmtDate(invoice.issueDate)}</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border">
          <div className="text-gray-600">Due Date</div>
          <div className="font-medium">{fmtDate(invoice.dueDate)}</div>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 border">
          <div className="text-gray-600">Archived</div>
          <div className="font-medium">{invoice.isArchived ? 'Yes' : 'No'}</div>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={onOpenPayment}
          disabled={invoice.isArchived || invoice.status === 'PAID'}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition disabled:bg-gray-300"
        >
          Add Payment
        </button>
        {!invoice.isArchived ? (
          <button onClick={onArchive} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            Archive
          </button>
        ) : (
          <button onClick={onRestore} className="px-4 py-2 rounded-lg border hover:bg-gray-50">
            Restore
          </button>
        )}
      </div>
    </div>
  )
}
