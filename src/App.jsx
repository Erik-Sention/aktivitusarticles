import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './lib/firebase'
import ArticleList from './components/ArticleList'
import ArticlePage from './components/ArticlePage'
import Login from './components/Login'

export default function App() {
  const [user, setUser]       = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    return onAuthStateChanged(auth, u => {
      setUser(u)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Laddar…</span>
      </div>
    )
  }

  if (!user) return <Login />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:id" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  )
}
