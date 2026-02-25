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
        <div className="relative rounded-lg overflow-hidden bg-slate-100" style={{ height: 140 }}>
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

export default function AdviceEditor({ article, onSave }) {
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

  function setPhaseField(phaseIdx, field, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.phases[phaseIdx][field] = value
      return next
    })
  }

  function setPhaseItem(phaseIdx, itemIdx, field, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.phases[phaseIdx].items[itemIdx][field] = value
      return next
    })
  }

  function addPhaseItem(phaseIdx) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.phases[phaseIdx].items.push({ bold: '', text: '' })
      return next
    })
  }

  function removePhaseItem(phaseIdx, itemIdx) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.phases[phaseIdx].items.splice(itemIdx, 1)
      return next
    })
  }

  function addPhase() {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      const n = next.phases.length + 1
      next.phases.push({
        number: String(n).padStart(2, '0'),
        title: '',
        image: '',
        focusLabel: '',
        items: [],
      })
      return next
    })
  }

  function removePhase(phaseIdx) {
    if (!window.confirm('Ta bort den här fasen? Åtgärden kan inte ångras förrän du sparar.')) return
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.phases.splice(phaseIdx, 1)
      return next
    })
  }

  async function handleReset() {
    if (!window.confirm('Återställ artikeln till standardinnehåll? Dina ändringar skrivs över.')) return
    try {
      const reset = await resetArticleToDefault(form)
      setForm(JSON.parse(JSON.stringify(reset)))
      onSave(reset)
    } catch (err) {
      alert(`Kunde inte återställa: ${err.message}`)
    }
  }

  function setCardField(cardIdx, field, value) {
    setForm(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      next.cta.cards[cardIdx][field] = value
      return next
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 space-y-5">

      <SectionHeader title="Hero" />
      <TextField label="Brödsmulor / Kategori" value={form.breadcrumb} onChange={v => set('breadcrumb', v)} />
      <div className="grid grid-cols-2 gap-4">
        <TextField label="Titel rad 1" value={form.title} onChange={v => set('title', v)} />
        <TextField label="Titel rad 2 (teal, understruken)" value={form.titleAccent} onChange={v => set('titleAccent', v)} />
      </div>
      <ImageField label="Hero-bild URL" value={form.heroImage} onChange={v => set('heroImage', v)} />

      <SectionHeader title="Intro" />
      <TextField label="Inledande citat (kursiv)" value={form.intro.quote} onChange={v => set('intro.quote', v)} multiline rows={3} />
      <TextField label="Brödtext" value={form.intro.body} onChange={v => set('intro.body', v)} multiline rows={4} />

      {form.phases.map((phase, pi) => (
        <div key={pi}>
          <div className="flex items-center justify-between pt-6 pb-2 border-t border-slate-100">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-teal-600">Fas {pi + 1}</h3>
            <button
              onClick={() => removePhase(pi)}
              className="text-slate-300 hover:text-red-400 transition-colors text-xs font-semibold uppercase tracking-widest"
            >Ta bort fas</button>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-3">
              <TextField label="Nr" value={phase.number} onChange={v => setPhaseField(pi, 'number', v)} />
              <div className="col-span-3">
                <TextField label="Titel (t.ex. Månad 1–3: Fundamentet)" value={phase.title} onChange={v => setPhaseField(pi, 'title', v)} />
              </div>
            </div>
            <ImageField label="Fas-bild URL" value={phase.image} onChange={v => setPhaseField(pi, 'image', v)} />
            <TextField label="Fokus-etikett (valfri)" value={phase.focusLabel || ''} onChange={v => setPhaseField(pi, 'focusLabel', v)} />

            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-widest text-slate-500">
                Punkter
              </label>
              {phase.items.map((item, ii) => (
                <div key={ii} className="flex gap-2 items-start bg-slate-50 rounded-lg p-3">
                  <div className="flex-1 space-y-2">
                    <input
                      type="text"
                      placeholder="Fetstil-del (t.ex. 'Daglig promenad:')"
                      value={item.bold || ''}
                      onChange={e => setPhaseItem(pi, ii, 'bold', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Text-del (valfri)"
                      value={item.text || ''}
                      onChange={e => setPhaseItem(pi, ii, 'text', e.target.value)}
                      className="w-full border border-slate-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <button
                    onClick={() => removePhaseItem(pi, ii)}
                    className="text-slate-300 hover:text-red-400 transition-colors mt-1 text-sm"
                  >✕</button>
                </div>
              ))}
              <button
                onClick={() => addPhaseItem(pi)}
                className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600"
              >
                + Lägg till punkt
              </button>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addPhase}
        className="text-teal-500 text-xs font-bold uppercase tracking-widest hover:text-teal-600 pt-2"
      >
        + Lägg till fas
      </button>

      <SectionHeader title="CTA-sektion (mörk)" />
      <TextField label="Liten tag (t.ex. 'Redan aktiv?')" value={form.cta.tag || ''} onChange={v => set('cta.tag', v)} />
      <TextField label="Rubrik" value={form.cta.title} onChange={v => set('cta.title', v)} />
      <TextField label="Brödtext" value={form.cta.body} onChange={v => set('cta.body', v)} multiline rows={3} />

      {form.cta.cards && form.cta.cards.map((card, ci) => (
        <div key={ci} className="bg-slate-50 rounded-xl p-4 space-y-2">
          <p className="text-xs font-black uppercase tracking-widest text-teal-600">Kort {ci + 1}</p>
          <TextField label="Titel" value={card.title} onChange={v => setCardField(ci, 'title', v)} />
          <TextField label="Beskrivning" value={card.description} onChange={v => setCardField(ci, 'description', v)} multiline rows={2} />
        </div>
      ))}

      <div className="grid grid-cols-2 gap-4">
        <TextField label="Knapp-text" value={form.cta.buttonText || ''} onChange={v => set('cta.buttonText', v)} />
        <TextField label="Knapp-URL" value={form.cta.buttonUrl || ''} onChange={v => set('cta.buttonUrl', v)} />
      </div>

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
          onClick={() => onSave(form)}
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
