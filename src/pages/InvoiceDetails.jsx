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

  if (loading) return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="h-32 rounded-2xl bg-white border shadow animate-pulse" />
      <div className="h-48 rounded-2xl bg-white border shadow animate-pulse" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 rounded-2xl bg-white border shadow animate-pulse" />
        <div className="h-28 rounded-2xl bg-white border shadow animate-pulse" />
        <div className="h-28 rounded-2xl bg-white border shadow animate-pulse" />
      </div>
      <div className="h-40 rounded-2xl bg-white border shadow animate-pulse" />
    </div>
  )
  if (error) return <div className="p-6 text-red-600">{error}</div>
  if (!invoice) return <div className="p-6">No invoice</div>

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
      <LineItemsTable lines={invoice.lines} currency={invoice.currency} />
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
      <PaymentsSection payments={invoice.payments} currency={invoice.currency} />
      <AddPaymentModal open={modalOpen} onClose={() => setModalOpen(false)} onSubmit={onAddPayment} disabled={invoice.isArchived || invoice.status === 'PAID' || paying} />
    </div>
  )
}
