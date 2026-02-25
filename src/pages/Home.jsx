import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const [id, setId] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const onSubmit = e => {
    e.preventDefault()
    const value = id.trim()
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
    if (!uuidRegex.test(value)) {
      setError('Enter a valid Invoice UUID')
      return
    }
    navigate(`/invoices/${value}`)
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 p-6">
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="animate-float-slow absolute top-[-8rem] left-[-8rem] h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="animate-float-slow delay-2 absolute bottom-[-8rem] right-[-8rem] h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="ui-card animate-pop relative w-full max-w-md rounded-2xl p-6">
        <div className="mb-4 text-xl font-semibold text-slate-100">Open Invoice</div>
        {error && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none"
            placeholder="Enter Invoice ID (UUID)"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="btn-primary w-full">View</button>
        </form>
      </div>
    </div>
  )
}
