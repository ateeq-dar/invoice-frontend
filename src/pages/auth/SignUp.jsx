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
    <div className="animate-fade-up">
      <div className="mb-2 text-2xl font-semibold text-slate-100">Sign up</div>
      <div className="mb-6 text-sm text-slate-400">Create your workspace and start invoicing</div>
      {error && <div className="mb-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</div>}
      <form onSubmit={onSubmit} className="animate-fade-up delay-1 space-y-4">
        <input type="email" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-500 focus:border-cyan-400 focus:outline-none" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="btn-primary w-full disabled:bg-slate-600 disabled:text-slate-300">
          {loading ? 'Creating account...' : 'Sign up'}
        </button>
      </form>
      <div className="mt-4 text-sm text-slate-300">
        Already have an account? <Link to="/auth/signin" className="text-cyan-300 hover:text-cyan-200">Sign in</Link>
      </div>
    </div>
  )
}
