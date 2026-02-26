import { parseReferences } from '../lib/parseReferences'

export default function ReferenceEditor({ value, onChange }) {
  const refs = parseReferences(value)

  function updateRow(i, field, val) {
    const next = refs.map((r, idx) =>
      idx === i ? { ...r, [field]: val } : r
    )
    onChange(next)
  }

  function addRow() {
    onChange([...refs, { text: '', url: '' }])
  }

  function removeRow(i) {
    onChange(refs.filter((_, idx) => idx !== i))
  }

  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
        Referencer
      </label>

      {refs.map((ref, i) => (
        <div key={i} className="flex gap-2 items-start bg-slate-50 rounded-lg p-3">
          <span className="text-xs text-slate-400 font-mono mt-2.5 min-w-[1.5rem]">
            {i + 1}.
          </span>
          <div className="flex-1 space-y-2">
            <input
              type="text"
              placeholder="Referenstext (t.ex. Smith J et al. JAMA 2020;…)"
              value={ref.text}
              onChange={e => updateRow(i, 'text', e.target.value)}
              className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm
                         focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <input
              type="url"
              placeholder="URL (valfri, t.ex. https://pubmed.ncbi.nlm.nih.gov/…)"
              value={ref.url}
              onChange={e => updateRow(i, 'url', e.target.value)}
              className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm font-mono
                         text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="button"
            onClick={() => removeRow(i)}
            title="Ta bort referens"
            className="text-slate-300 hover:text-red-400 transition-colors mt-1 text-sm leading-none px-1"
          >
            ✕
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addRow}
        className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600 transition-colors"
      >
        + Lägg till referens
      </button>
    </div>
  )
}
