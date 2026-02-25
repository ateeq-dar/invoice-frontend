import React from 'react'
import { Link, useParams } from 'react-router-dom'
import InvoiceDetails from '../../../pages/InvoiceDetails.jsx'

export default function ViewInvoice() {
  const { id } = useParams()
  return (
    <div className="animate-fade-up space-y-4">
      <div className="flex items-center justify-between">
        <Link to="/dashboard/invoices" className="btn-secondary px-3 py-1.5 text-sm">Back</Link>
        <Link to={`/dashboard/invoices/${id}/edit`} className="btn-secondary px-3 py-1.5 text-sm">Edit</Link>
      </div>
      <InvoiceDetails />
    </div>
  )
}
