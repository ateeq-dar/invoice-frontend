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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="ui-card animate-pop w-full max-w-sm rounded-2xl p-6">
        <div className="mb-4 text-lg font-semibold text-slate-100">Add Payment</div>
        {error && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 focus:border-cyan-400 focus:outline-none"
            placeholder="Amount"
            value={amount}
            onChange={e => setAmount(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} disabled={submitting} className="btn-secondary disabled:opacity-50">Cancel</button>
            <button type="submit" disabled={disabled || submitting} className="btn-primary disabled:bg-slate-700 disabled:text-slate-400">
              {submitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
