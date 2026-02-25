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
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
        <div className="text-lg font-semibold mb-4">Open Invoice</div>
        {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter Invoice ID (UUID)"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white w-full">View</button>
        </form>
      </div>
    </div>
  )
}
