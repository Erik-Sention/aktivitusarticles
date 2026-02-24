import EditableImage from '../EditableImage'

export default function AdvicePhasesSection({ phases, editable = true }) {
  return (
    <div className="print-advice-phases grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
      {phases.map((phase, index) => (
        <div key={phase.number} className="space-y-6">
          <div className="flex items-center gap-4">
            <span className="text-4xl font-black italic" style={{ color: 'rgba(0, 113, 186, 0.25)' }}>{phase.number}</span>
            <h3 className="text-2xl font-bold uppercase tracking-tight text-slate-800">{phase.title}</h3>
          </div>
          <div className="print-phase-img rounded-2xl overflow-hidden aspect-[940/512] mb-6 shadow-lg">
            <EditableImage
              src={phase.image}
              fieldPath={`phases.${index}.image`}
              imgClassName="w-full h-full object-cover"
              alt={phase.title}
              editable={editable}
            />
          </div>
          {phase.focusLabel && (
            <p className="text-slate-600 leading-relaxed font-bold uppercase text-xs tracking-widest" style={{ color: '#0071BA' }}>
              {phase.focusLabel}
            </p>
          )}
          <ul className="space-y-3 text-sm text-slate-600">
            {phase.items.map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <div className="h-1.5 w-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: '#0071BA' }} />
                {item.bold ? (
                  <span><strong>{item.bold}</strong>{item.text ? ` ${item.text}` : ''}</span>
                ) : (
                  <span>{item.text}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
