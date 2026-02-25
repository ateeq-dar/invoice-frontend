import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-blue-600 text-white grid place-items-center text-sm font-semibold">IN</div>
          <div className="font-semibold">Invoice Manager</div>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/" className="px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 text-sm">Open Another</Link>
        </div>
      </div>
    </div>
  )
}
