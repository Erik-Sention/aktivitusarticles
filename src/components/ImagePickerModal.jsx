import { useEffect, useState } from 'react'

const TAB_LABELS = {
  hero: 'Hero',
  sektion: 'Sektion',
  faser: 'Faser',
  ovrigt: 'Övrigt',
}

function fieldToDefaultTab(fieldPath) {
  if (!fieldPath) return null
  if (fieldPath === 'heroImage') return 'hero'
  if (fieldPath === 'sectionA.image' || fieldPath === 'sectionB.image') return 'sektion'
  if (fieldPath.startsWith('phases.')) return 'faser'
  return null
}

export default function ImagePickerModal({ onSelect, onClose, fieldPath }) {
  const [categories, setCategories] = useState({})
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState(null)

  useEffect(() => {
    fetch('/bilder-manifest.json')
      .then(r => r.json())
      .then(data => {
        const cats = data.categories ?? {}
        setCategories(cats)
        const preferred = fieldToDefaultTab(fieldPath)
        const tabs = Object.keys(cats)
        if (preferred && cats[preferred]?.length) {
          setActiveTab(preferred)
        } else {
          setActiveTab(tabs[0] ?? null)
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [fieldPath])

  const tabs = Object.keys(categories)
  const images = activeTab ? (categories[activeTab] ?? []) : []

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-2xl max-h-[80vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-700">Välj bild</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-100"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {!loading && tabs.length > 1 && (
          <div className="flex gap-1 px-4 pt-3 pb-0 border-b border-slate-100">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-t-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 border border-b-white border-slate-200 -mb-px'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                {TAB_LABELS[tab] ?? tab}
              </button>
            ))}
          </div>
        )}

        <div className="overflow-y-auto p-4">
          {loading && (
            <p className="text-center text-slate-400 text-sm py-8 animate-pulse">Laddar bilder…</p>
          )}
          {!loading && images.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-8">Inga bilder i den här mappen ännu.</p>
          )}
          {!loading && images.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {images.map(src => (
                <button
                  key={src}
                  onClick={() => { onSelect(src); onClose() }}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-slate-100 hover:ring-2 hover:ring-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  <p className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[10px] text-white font-bold truncate bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    {src.split('/').pop()}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
