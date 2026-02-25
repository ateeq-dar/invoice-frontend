import React from 'react'

const fmtDate = s => new Date(s).toLocaleDateString('en-CA')

export default function InvoiceHeader({ invoice, onArchive, onRestore, onOpenPayment, onDownloadPdf }) {
  const badgeClass = invoice.status === 'PAID' ? 'bg-emerald-500/20 text-emerald-300 ring-1 ring-emerald-400/30' : 'bg-amber-500/20 text-amber-300 ring-1 ring-amber-400/30'
  return (
    <div className="ui-card animate-fade-up flex flex-col gap-5 rounded-2xl p-6">
      <div className="flex items-start justify-between">
        <div>
          <div className="text-2xl font-semibold tracking-tight text-slate-100">Invoice {invoice.invoiceNumber}</div>
          <div className="text-sm text-slate-400">Customer <span className="font-medium text-slate-200">{invoice.customerName}</span></div>
        </div>
        <span className={`rounded-full px-3 py-1 text-sm font-medium ${badgeClass}`}>{invoice.status}</span>
      </div>
      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
        <div className="ui-card ui-card-hover rounded-lg p-3">
          <div className="text-slate-400">Issue Date</div>
          <div className="font-medium text-slate-100">{fmtDate(invoice.issueDate)}</div>
        </div>
        <div className="ui-card ui-card-hover rounded-lg p-3">
          <div className="text-slate-400">Due Date</div>
          <div className="font-medium text-slate-100">{fmtDate(invoice.dueDate)}</div>
        </div>
        <div className="ui-card ui-card-hover rounded-lg p-3">
          <div className="text-slate-400">Archived</div>
          <div className="font-medium text-slate-100">{invoice.isArchived ? 'Yes' : 'No'}</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onOpenPayment}
          disabled={invoice.isArchived || invoice.status === 'PAID'}
          className="btn-primary disabled:bg-slate-700 disabled:text-slate-400"
        >
          Add Payment
        </button>
        <button
          onClick={onDownloadPdf}
          className="btn-secondary"
        >
          Download PDF
        </button>
        {!invoice.isArchived ? (
          <button onClick={onArchive} className="btn-secondary">
            Archive
          </button>
        ) : (
          <button onClick={onRestore} className="btn-secondary">
            Restore
          </button>
        )}
      </div>
    </div>
  )
}
