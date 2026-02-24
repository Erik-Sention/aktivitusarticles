import { useState } from 'react'

function ImageField({ label, value, onChange }) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
      <input
        type="url"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="https://images.unsplash.com/..."
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
      {value && (
        <div className="relative rounded-lg overflow-hidden bg-slate-100" style={{ height: 160 }}>
          <img
            src={value}
            alt="förhandsvisning"
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none' }}
          />
        </div>
      )}
    </div>
  )
}

function TextField({ label, value, onChange, multiline = false, rows = 3 }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={rows}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 resize-y"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}
    </div>
  )
}

function SectionHeader({ title }) {
  return (
    <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600 pt-6 pb-2 border-t border-slate-100">
      {title}
    </h3>
  )
}

export default function ArticleEditor({ article, onSave }) {
  const [form, setForm] = useState(JSON.parse(JSON.stringify(article)))

  function set(path, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const keys = path.split('.')
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = value
      return next
    })
  }

  function setWhyItem(index, field, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.why.items[index][field] = value
      return next
    })
  }

  function handleSave() {
    onSave(form)
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-5">

      <SectionHeader title="Hero" />
      <TextField label="Brödsmulor / Kategori" value={form.breadcrumb} onChange={v => set('breadcrumb', v)} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Titel rad 1" value={form.title} onChange={v => set('title', v)} />
        <TextField label="Titel rad 2 (teal)" value={form.titleAccent} onChange={v => set('titleAccent', v)} />
      </div>
      <ImageField label="Hero-bild URL" value={form.heroImage} onChange={v => set('heroImage', v)} />

      <SectionHeader title="Intro" />
      <TextField label="Inledande citat (stor text)" value={form.intro.lead} onChange={v => set('intro.lead', v)} multiline rows={3} />
      <TextField label="Brödtext kolumn 1" value={form.intro.col1} onChange={v => set('intro.col1', v)} multiline rows={4} />
      <TextField label="Brödtext kolumn 2" value={form.intro.col2} onChange={v => set('intro.col2', v)} multiline rows={4} />

      <SectionHeader title="Sektion A — Text vänster, bild höger" />
      <TextField label="Etikett (liten text ovan rubrik)" value={form.sectionA.label} onChange={v => set('sectionA.label', v)} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Rubrik rad 1" value={form.sectionA.title} onChange={v => set('sectionA.title', v)} />
        <TextField label="Rubrik rad 2" value={form.sectionA.titleLine2} onChange={v => set('sectionA.titleLine2', v)} />
      </div>
      <TextField label="Brödtext" value={form.sectionA.content} onChange={v => set('sectionA.content', v)} multiline rows={4} />
      <TextField label="Citat (inuti ram)" value={form.sectionA.quote} onChange={v => set('sectionA.quote', v)} multiline rows={2} />
      <ImageField label="Bild URL" value={form.sectionA.image} onChange={v => set('sectionA.image', v)} />

      <SectionHeader title="Sektion B — Bild vänster, text höger" />
      <TextField label="Etikett" value={form.sectionB.label} onChange={v => set('sectionB.label', v)} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Rubrik rad 1" value={form.sectionB.title} onChange={v => set('sectionB.title', v)} />
        <TextField label="Rubrik rad 2" value={form.sectionB.titleLine2} onChange={v => set('sectionB.titleLine2', v)} />
      </div>
      <TextField label="Brödtext" value={form.sectionB.content} onChange={v => set('sectionB.content', v)} multiline rows={4} />
      <ImageField label="Bild URL" value={form.sectionB.image} onChange={v => set('sectionB.image', v)} />

      <SectionHeader title="Varför-sektion (mörk)" />
      <TextField label="Rubrik" value={form.why.title} onChange={v => set('why.title', v)} />

      {form.why.items.map((item, i) => (
        <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-3">
          <p className="text-xs font-black uppercase tracking-widest text-teal-600">{item.number}</p>
          <TextField label="Titel" value={item.title} onChange={v => setWhyItem(i, 'title', v)} />
          <TextField label="Beskrivning" value={item.content} onChange={v => setWhyItem(i, 'content', v)} multiline rows={2} />
        </div>
      ))}

      <div className="pt-6 pb-16">
        <button
          onClick={handleSave}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-colors"
        >
          Spara artikel
        </button>
      </div>
    </div>
  )
}
