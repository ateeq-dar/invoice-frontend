import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getInvoice, addPayment, archiveInvoice, restoreInvoice } from '../services/api'
import InvoiceHeader from '../components/InvoiceHeader.jsx'
import LineItemsTable from '../components/LineItemsTable.jsx'
import TotalsSection from '../components/TotalsSection.jsx'
import PaymentsSection from '../components/PaymentsSection.jsx'
import AddPaymentModal from '../components/AddPaymentModal.jsx'

export default function InvoiceDetails() {
  const { id } = useParams()
  const [invoice, setInvoice] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [paying, setPaying] = useState(false)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getInvoice(id)
      setInvoice(data)
    } catch (e) {
      setError(e.message || 'Failed to load')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [id])

  const onAddPayment = async amount => {
    if (paying) return
    setPaying(true)
    try {
      await addPayment(id, amount)
      await load()
      setModalOpen(false)
    } catch (e) {
      setError(e.message)
    } finally {
      setPaying(false)
    }
  }

  const onArchive = async () => {
    try {
      await archiveInvoice(id)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  const onRestore = async () => {
    try {
      await restoreInvoice(id)
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-4xl space-y-6 p-2">
        <div className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
        <div className="h-48 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
          <div className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
          <div className="h-28 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
        </div>
        <div className="h-40 animate-pulse rounded-2xl border border-slate-800 bg-slate-900/80" />
      </div>
    )
  }
  if (error) return <div className="rounded-lg border border-red-400/30 bg-red-500/10 p-4 text-red-300">{error}</div>
  if (!invoice) return <div className="p-4 text-slate-300">No invoice</div>

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-2">
      <InvoiceHeader
        invoice={invoice}
        onArchive={onArchive}
        onRestore={onRestore}
        onOpenPayment={() => setModalOpen(true)}
        onDownloadPdf={() => {
          const token = localStorage.getItem('authToken')
          const url = `${import.meta.env.VITE_API_BASE || 'http://localhost:4000'}/api/invoices/${id}/pdf`
          fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.blob())
            .then(blob => {
              const link = document.createElement('a')
              link.href = URL.createObjectURL(blob)
              link.download = `invoice-${invoice.invoiceNumber}.pdf`
              document.body.appendChild(link)
              link.click()
              link.remove()
            })
        }}
      />
      <div className="animate-fade-up delay-1">
        <LineItemsTable lines={invoice.lines} currency={invoice.currency} />
      </div>
      <div className="animate-fade-up delay-2">
        <TotalsSection
          currency={invoice.currency}
          subtotal={invoice.subtotal}
          taxRate={invoice.taxRate}
          taxAmount={invoice.taxAmount}
          total={invoice.total}
          amountPaid={invoice.amountPaid}
          balanceDue={invoice.balanceDue}
          status={invoice.status}
          overdue={invoice.overdue}
        />
      </div>
      <div className="animate-fade-up delay-3">
        <PaymentsSection payments={invoice.payments} currency={invoice.currency} />
      </div>
      <AddPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={onAddPayment} disabled={invoice.isArchived || invoice.status === 'PAID' || paying} />
    </div>
  )
}
