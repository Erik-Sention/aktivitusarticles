import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../lib/firebase'

export default function Login() {
  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch {
      setError('Fel e-post eller lösenord.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
      <div className="bg-white rounded-2xl shadow-sm p-10 w-full max-w-sm">
        <div className="mb-8">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Aktivitus</span>
          <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mt-1">Artikelverktyg</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1.5">
              E-post
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-1.5">
              Lösenord
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              className="w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-xs font-bold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white text-xs font-bold uppercase tracking-widest py-3 rounded-lg transition-colors disabled:opacity-60"
            style={{ backgroundColor: '#0071BA' }}
          >
            {loading ? 'Loggar in…' : 'Logga in'}
          </button>
        </form>
      </div>
    </div>
  )
}
