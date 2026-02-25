import React, { useState, useEffect } from 'react'

export default function AddPaymentModal({ open, onClose, onSubmit, disabled }) {
  const [amount, setAmount] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      setAmount('')
      setError('')
      setSubmitting(false)
    }
  }, [open])

  if (!open) return null

  const handleSubmit = async e => {
    e.preventDefault()
    const n = Number(amount)
    if (!amount || Number.isNaN(n) || n <= 0) {
      setError('Enter a valid amount greater than 0')
      return
    }
    if (submitting || disabled) return
    try {
      setSubmitting(true)
      await onSubmit(n)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl border">
        <div className="text-lg font-semibold mb-4">Add Payment</div>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} disabled={submitting} className="px-4 py-2 rounded-lg border hover:bg-gray-50 disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={disabled || submitting} className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300">
              {submitting ? 'Submitting…' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
