import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../state/authContext.jsx'

const features = [
  {
    title: 'Invoice Creation in Minutes',
    description: 'Build structured invoices with line items, tax, due dates, and customer details without manual spreadsheets.'
  },
  {
    title: 'Payment Tracking',
    description: 'Record partial and full payments, then keep balances and status synced automatically.'
  },
  {
    title: 'Owner-Secure Access',
    description: 'Each user only sees their own invoices, reducing risk and keeping business data private.'
  }
]

const highlights = [
  { label: 'Invoices Processed', value: '12,400+' },
  { label: 'Average Save Time', value: '8 hrs/week' },
  { label: 'Payment Visibility', value: 'Real-time' }
]

export default function Landing() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="bg-grid absolute inset-0 opacity-30" />
        <div className="animate-float-slow absolute -top-28 -left-20 h-96 w-96 rounded-full bg-cyan-500/25 blur-3xl" />
        <div className="animate-float-slow delay-2 absolute top-36 -right-24 h-[26rem] w-[26rem] rounded-full bg-blue-500/20 blur-3xl" />
        <div className="animate-float-slow delay-3 absolute bottom-10 left-1/3 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-8 md:px-8">
        <header className="animate-fade-up flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="animate-pulse-glow flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400 text-slate-900 font-black">IM</div>
            <div className="text-lg font-semibold tracking-wide">Invoice Manager</div>
          </div>
          <div className="flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/signin" className="btn-secondary text-sm">Sign In</Link>
                <Link to="/auth/signup" className="btn-primary text-sm">Start Free</Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn-primary text-sm">Open Dashboard</Link>
            )}
          </div>
        </header>

        <main className="mt-14 grid gap-10 lg:grid-cols-2 lg:items-center">
          <section className="space-y-7">
            <div className="animate-fade-up inline-flex items-center rounded-full border border-cyan-300/40 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              Built for freelancers, agencies, and small teams
            </div>
            <h1 className="animate-fade-up delay-1 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              Professional invoicing that actually keeps up with your business.
            </h1>
            <p className="animate-fade-up delay-2 max-w-xl text-slate-300 text-lg">
              Create invoices, track payments, and understand your cash flow from one clean dashboard. No clutter, no spreadsheets, no guessing.
            </p>
            <div className="animate-fade-up delay-3 flex flex-wrap gap-3">
              {!isAuthenticated ? (
                <>
                  <Link to="/auth/signup" className="btn-primary px-5 py-3">Create Account</Link>
                  <Link to="/auth/signin" className="btn-secondary px-5 py-3">I already have an account</Link>
                </>
              ) : (
                <Link to="/dashboard" className="btn-primary px-5 py-3">Go to Dashboard</Link>
              )}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {highlights.map(item => (
                <div key={item.label} className="ui-card ui-card-hover animate-pop rounded-xl p-4">
                  <div className="text-xl font-semibold text-cyan-200">{item.value}</div>
                  <div className="text-xs text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="ui-card ui-card-hover animate-pop delay-1 rounded-2xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Snapshot</div>
                <div className="text-lg font-semibold">Revenue Overview</div>
              </div>
              <div className="rounded-md bg-emerald-500/15 px-2 py-1 text-xs text-emerald-300">Paid +24%</div>
            </div>
            <div className="space-y-3">
              <div className="ui-card rounded-xl p-4">
                <div className="text-xs text-slate-400">Outstanding Balance</div>
                <div className="mt-1 text-2xl font-semibold">$18,420.00</div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="ui-card rounded-xl p-4">
                  <div className="text-xs text-slate-400">Total Invoices</div>
                  <div className="mt-1 text-xl font-semibold">126</div>
                </div>
                <div className="ui-card rounded-xl p-4">
                  <div className="text-xs text-slate-400">Collected</div>
                  <div className="mt-1 text-xl font-semibold">$72,980.00</div>
                </div>
              </div>
              <div className="ui-card rounded-xl p-4">
                <div className="mb-3 flex items-center justify-between text-xs text-slate-400">
                  <span>Recent Invoices</span>
                  <span>Updated now</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="ui-card-hover flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                    <span>INV-1048</span>
                    <span className="text-emerald-300">Paid</span>
                  </div>
                  <div className="ui-card-hover flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                    <span>INV-1049</span>
                    <span className="text-amber-300">Pending</span>
                  </div>
                  <div className="ui-card-hover flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2">
                    <span>INV-1050</span>
                    <span className="text-amber-300">Pending</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        <section className="mt-16 grid gap-4 md:grid-cols-3">
          {features.map(feature => (
            <article key={feature.title} className="ui-card ui-card-hover animate-fade-up rounded-2xl p-5">
              <h2 className="text-lg font-semibold">{feature.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{feature.description}</p>
            </article>
          ))}
        </section>

        <section className="animate-fade-up mt-14 rounded-2xl border border-cyan-300/30 bg-cyan-500/10 p-6 md:flex md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold">Run invoicing like a serious business</h3>
            <p className="mt-1 text-sm text-cyan-100/90">Start today and keep every invoice, payment, and balance in one place.</p>
          </div>
          <div className="mt-4 md:mt-0">
            {!isAuthenticated ? (
              <Link to="/auth/signup" className="btn-primary inline-flex px-5 py-3">Start Free</Link>
            ) : (
              <Link to="/dashboard" className="btn-primary inline-flex px-5 py-3">Open Dashboard</Link>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
