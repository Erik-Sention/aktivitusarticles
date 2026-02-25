import { useState } from 'react'
import { resetArticleToDefault } from '../store'

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

function normalizeArticle(article) {
  if (article.sections) return article
  const sections = []
  if (article.sectionA) sections.push({ type: 'textLeft', ...article.sectionA })
  if (article.sectionB) sections.push({ type: 'imageLeft', ...article.sectionB })
  return { ...article, sections }
}

const SECTION_LABELS = {
  textLeft: 'Text vänster, bild höger',
  imageLeft: 'Bild vänster, text höger',
}

export default function ArticleEditor({ article, onSave }) {
  const [form, setForm] = useState(() => normalizeArticle(JSON.parse(JSON.stringify(article))))

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

  function setSectionField(idx, field, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.sections[idx][field] = value
      return next
    })
  }

  function addSection(type) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.sections.push({ type, label: '', title: '', titleLine2: '', content: '', quote: '', image: '' })
      return next
    })
  }

  function removeSection(idx) {
    if (!window.confirm('Ta bort den här sektionen? Åtgärden kan inte ångras förrän du sparar.')) return
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.sections.splice(idx, 1)
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

  function addWhyItem() {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const n = next.why.items.length + 1
      next.why.items.push({ number: String(n).padStart(2, '0'), title: '', content: '' })
      return next
    })
  }

  function removeWhyItem(idx) {
    if (form.why.items.length < 2) {
      window.alert('Det måste finnas minst en punkt i Varför-sektionen.')
      return
    }
    if (!window.confirm('Ta bort den här punkten?')) return
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.why.items.splice(idx, 1)
      return next
    })
  }

  function handleSave() {
    onSave(form)
  }

  async function handleReset() {
    if (!window.confirm('Återställ artikeln till standardinnehåll? Dina ändringar skrivs över.')) return
    try {
      const reset = await resetArticleToDefault(form)
      setForm(normalizeArticle(JSON.parse(JSON.stringify(reset))))
      onSave(reset)
    } catch (err) {
      alert(`Kunde inte återställa: ${err.message}`)
    }
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

      {(form.sections ?? []).map((section, i) => (
        <div key={i}>
          <div className="flex items-center justify-between pt-6 pb-2 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">
              Sektion {i + 1} — {SECTION_LABELS[section.type] ?? section.type}
            </h3>
            <button
              onClick={() => removeSection(i)}
              className="text-slate-300 hover:text-red-400 transition-colors text-xs font-semibold uppercase tracking-widest"
            >Ta bort sektion</button>
          </div>
          <div className="space-y-4">
            <div className="flex gap-3 items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Layout</label>
              <select
                value={section.type}
                onChange={e => setSectionField(i, 'type', e.target.value)}
                className="border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="textLeft">Text vänster, bild höger</option>
                <option value="imageLeft">Bild vänster, text höger</option>
              </select>
            </div>
            <TextField label="Etikett (liten text ovan rubrik)" value={section.label ?? ''} onChange={v => setSectionField(i, 'label', v)} />
            <div className="grid grid-cols-2 gap-4">
              <TextField label="Rubrik rad 1" value={section.title ?? ''} onChange={v => setSectionField(i, 'title', v)} />
              <TextField label="Rubrik rad 2" value={section.titleLine2 ?? ''} onChange={v => setSectionField(i, 'titleLine2', v)} />
            </div>
            <TextField label="Brödtext" value={section.content ?? ''} onChange={v => setSectionField(i, 'content', v)} multiline rows={4} />
            {section.type === 'textLeft' && (
              <TextField label="Citat (inuti ram)" value={section.quote ?? ''} onChange={v => setSectionField(i, 'quote', v)} multiline rows={2} />
            )}
            <ImageField label="Bild URL" value={section.image ?? ''} onChange={v => setSectionField(i, 'image', v)} />
          </div>
        </div>
      ))}

      <div className="flex gap-3 pt-2">
        <button
          onClick={() => addSection('textLeft')}
          className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600"
        >+ Sektion (text vänster)</button>
        <button
          onClick={() => addSection('imageLeft')}
          className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600"
        >+ Sektion (bild vänster)</button>
      </div>

      <SectionHeader title="Varför-sektion (mörk)" />
      <TextField label="Rubrik" value={form.why.title} onChange={v => set('why.title', v)} />

      {form.why.items.map((item, i) => (
        <div key={i} className="bg-slate-50 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-xs font-black uppercase tracking-widest text-teal-600">{item.number}</p>
            <button
              onClick={() => removeWhyItem(i)}
              className="text-slate-300 hover:text-red-400 transition-colors text-xs font-semibold uppercase tracking-widest"
            >Ta bort</button>
          </div>
          <TextField label="Titel" value={item.title} onChange={v => setWhyItem(i, 'title', v)} />
          <TextField label="Beskrivning" value={item.content} onChange={v => setWhyItem(i, 'content', v)} multiline rows={2} />
        </div>
      ))}

      <button
        onClick={addWhyItem}
        className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600"
      >
        + Lägg till punkt
      </button>

      <SectionHeader title="Referencer" />
      <TextField
        label="Referencer (en per rad – visas i artikelns footer)"
        value={form.references ?? ''}
        onChange={v => set('references', v)}
        multiline
        rows={6}
      />

      <div className="pt-6 pb-16 space-y-3">
        <button
          onClick={handleSave}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 rounded-xl uppercase tracking-widest text-sm transition-colors"
        >
          Spara artikel
        </button>
        <button
          onClick={handleReset}
          className="w-full bg-white hover:bg-slate-50 text-slate-400 hover:text-slate-600 border border-slate-200 font-semibold py-3 rounded-xl text-sm transition-colors"
        >
          Återställ till standardinnehåll
        </button>
      </div>
    </div>
  )
}
