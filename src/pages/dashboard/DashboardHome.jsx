import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { listInvoices } from '../../services/api.js'

function StatCard({ label, value, className = '' }) {
  return (
    <div className={`ui-card ui-card-hover animate-pop rounded-2xl p-5 ${className}`}>
      <div className="text-sm text-slate-400">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-slate-100">{value}</div>
    </div>
  )
}

export default function DashboardHome() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')
      try {
        const data = await listInvoices()
        setItems(data.items || [])
      } catch (e) {
        setError(e.message || 'Failed to load dashboard data')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const stats = useMemo(() => {
    return items.reduce(
      (acc, inv) => {
        acc.totalInvoices += 1
        acc.outstanding += Number(inv.balanceDue || 0)
        acc.paid += Number(inv.amountPaid || 0)
        return acc
      },
      { totalInvoices: 0, outstanding: 0, paid: 0 }
    )
  }, [items])

  const money = useMemo(
    () => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }),
    []
  )

  const totalInvoicesValue = loading ? '...' : String(stats.totalInvoices)
  const outstandingValue = loading ? '...' : money.format(stats.outstanding)
  const paidValue = loading ? '...' : money.format(stats.paid)

  return (
    <div className="space-y-6">
      <div className="animate-fade-up">
        <div className="text-3xl font-semibold tracking-tight text-slate-100">Dashboard</div>
        <div className="text-sm text-slate-400">Track your invoice pipeline and payment flow</div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Invoices" value={totalInvoicesValue} className="delay-1" />
        <StatCard label="Outstanding Balance" value={outstandingValue} className="delay-2" />
        <StatCard label="Paid" value={paidValue} className="delay-3" />
      </div>

      {error && <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</div>}

      <div className="ui-card animate-fade-up delay-2 flex items-center justify-between rounded-2xl p-6">
        <div>
          <div className="text-lg font-semibold text-slate-100">Invoices</div>
          <div className="text-sm text-slate-400">Manage your invoices and payments</div>
        </div>
        <div className="flex gap-3">
          <Link to="/dashboard/invoices" className="btn-secondary">View All</Link>
          <Link to="/dashboard/invoices/new" className="btn-primary">Create</Link>
        </div>
      </div>
    </div>
  )
}
