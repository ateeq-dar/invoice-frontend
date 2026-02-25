import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../state/authContext.jsx'

export default function Landing() {
  const { isAuthenticated } = useAuth()
  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-2xl mx-auto p-8">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-blue-600 text-white text-2xl font-bold">IN</div>
          <h1 className="text-4xl font-bold tracking-tight">Invoice Manager</h1>
          <p className="text-gray-600">Track invoices, payments, and balances with a clean workflow.</p>
          <div className="flex items-center justify-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/auth/signup" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Get Started</Link>
                <Link to="/auth/signin" className="px-5 py-2.5 rounded-lg border bg-white hover:bg-gray-50">Sign In</Link>
              </>
            ) : (
              <Link to="/dashboard" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700">Go to Dashboard</Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
