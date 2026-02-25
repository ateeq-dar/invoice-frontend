import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../state/authContext.jsx'

export default function SignUp() {
  const { signUp } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onSubmit = async e => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Enter email and password')
      return
    }
    try {
      setLoading(true)
      await signUp(email, password)
      navigate('/dashboard', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="text-2xl font-semibold mb-2">Sign up</div>
      <div className="text-sm text-gray-600 mb-6">Create your account</div>
      {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
      <form onSubmit={onSubmit} className="space-y-4">
        <input type="email" className="w-full border rounded-lg px-3 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border rounded-lg px-3 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300">{loading ? 'Signing up…' : 'Sign up'}</button>
      </form>
      <div className="mt-4 text-sm">
        Already have an account? <Link to="/auth/signin" className="text-blue-600 hover:underline">Sign in</Link>
      </div>
    </div>
  )
}
