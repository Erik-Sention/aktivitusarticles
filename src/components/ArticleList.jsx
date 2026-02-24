import { useNavigate } from 'react-router-dom'
import { fetchArticles, createArticle, deleteArticle } from '../store'
import { useState, useEffect } from 'react'

export default function ArticleList() {
  const navigate = useNavigate()
  const [articles, setArticles]         = useState([])
  const [loading, setLoading]           = useState(true)
  const [showTypeSelector, setShowTypeSelector] = useState(false)

  useEffect(() => {
    fetchArticles().then(all => {
      setArticles(all)
      setLoading(false)
    })
  }, [])

  async function handleCreate(type) {
    const article = await createArticle(type)
    setShowTypeSelector(false)
    navigate(`/articles/${article.id}?mode=edit`)
  }

  async function handleDelete(e, article) {
    e.stopPropagation()
    if (!confirm('Ta bort artikeln?')) return
    await deleteArticle(article)
    setArticles(prev => prev.filter(a => a.id !== article.id))
  }

  const insightArticles = articles.filter(a => !a.type || a.type === 'insight')
  const adviceArticles = articles.filter(a => a.type === 'advice')

  function ArticleCard({ article }) {
    const snippet = article.intro?.lead || article.intro?.quote || ''
    const typeLabel = article.type === 'advice' ? 'Hälsoplan' : null

    return (
      <div
        onClick={() => navigate(`/articles/${article.id}`)}
        className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-shadow group"
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={article.heroImage}
            alt={article.breadcrumb}
            className="w-full h-full object-cover brightness-75 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
          {typeLabel && (
            <div className="absolute top-3 right-3">
              <span className="text-white text-[9px] font-black uppercase tracking-[0.3em] px-2 py-1 rounded-full" style={{ backgroundColor: '#0071BA' }}>
                {typeLabel}
              </span>
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1" style={{ color: '#0071BA' }}>
              {article.breadcrumb}
            </p>
            <h2 className="text-white font-black text-lg leading-tight">
              {article.title} <span style={{ color: '#0071BA' }}>{article.titleAccent}</span>
            </h2>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between">
          <p className="text-slate-400 text-xs line-clamp-2 flex-1 mr-4">
            {snippet}
          </p>
          <button
            onClick={e => handleDelete(e, article)}
            className="text-slate-300 hover:text-red-400 transition-colors text-sm flex-shrink-0"
            title="Ta bort"
          >
            ✕
          </button>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center font-sans">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-400 animate-pulse">Laddar artiklar…</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-100 px-6 py-5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-[0.4em] text-slate-900">Aktivitus</span>
          <span className="text-slate-200">•</span>
          <span className="text-xs uppercase tracking-widest text-slate-400 font-bold">Artiklar</span>
        </div>

        <div className="relative">
          {showTypeSelector ? (
            <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1.5">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest px-2">Välj typ:</span>
              <button
                onClick={() => handleCreate('insight')}
                className="bg-white text-slate-800 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg shadow-sm hover:bg-slate-50 transition-colors"
              >
                Insikt
              </button>
              <button
                onClick={() => handleCreate('advice')}
                className="text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors" style={{ backgroundColor: '#0071BA' }}
              >
                Hälsoplan
              </button>
              <button
                onClick={() => setShowTypeSelector(false)}
                className="text-slate-400 hover:text-slate-600 px-2 text-sm"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowTypeSelector(true)}
              className="text-white text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-lg transition-colors" style={{ backgroundColor: '#0071BA' }}
            >
              + Ny artikel
            </button>
          )}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {articles.length === 0 ? (
          <div className="text-center py-32 text-slate-400">
            <p className="text-lg mb-4">Inga artiklar ännu.</p>
            <button onClick={() => setShowTypeSelector(true)} className="font-bold underline" style={{ color: '#0071BA' }}>
              Skapa din första artikel
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {insightArticles.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
                  Hälsoinsikter
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {insightArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}

            {adviceArticles.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-6">
                  Hälsoplaner / Råd & Rekommendationer
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {adviceArticles.map(article => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
