function renderCallout(text) {
  if (!text) return null
  const lines = text.split('\n')
  const elements = []
  let bullets = []

  lines.forEach((line, i) => {
    const trimmed = line.trim()
    if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
      bullets.push(trimmed.replace(/^[-•]\s*/, ''))
    } else {
      if (bullets.length > 0) {
        elements.push(
          <ul key={`ul-${i}`} className="list-disc list-inside space-y-1 mb-2">
            {bullets.map((b, j) => <li key={j}>{b}</li>)}
          </ul>
        )
        bullets = []
      }
      if (trimmed) elements.push(<p key={i} className="mb-2 last:mb-0">{trimmed}</p>)
    }
  })
  if (bullets.length > 0) {
    elements.push(
      <ul key="ul-last" className="list-disc list-inside space-y-1">
        {bullets.map((b, j) => <li key={j}>{b}</li>)}
      </ul>
    )
  }
  return elements
}

export default function AdviceCtaSection({ tag, title, body, cards, callouts, calloutTitle, buttonText }) {
  return (
    <section className="print-advice-cta rounded-[3rem] p-12 md:p-16 text-white relative overflow-hidden" style={{ backgroundColor: '#0071BA' }}>
      <div className="relative z-10 max-w-3xl">
        {tag && (
          <span className="text-white font-bold uppercase tracking-[0.3em] text-xs mb-4 block">{tag}</span>
        )}
        <h2 className="text-4xl font-bold mb-6 tracking-tight">{title}</h2>
        <p className="text-white text-lg mb-10 leading-relaxed">{body}</p>

        {cards && cards.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {cards.map((card, i) => (
              <div key={i} className="bg-white/10 p-6 rounded-2xl border border-white/20">
                <h4 className="font-bold text-white mb-2 italic uppercase tracking-wider text-sm">{card.title}</h4>
                <p className="text-sm text-white">{card.description}</p>
              </div>
            ))}
          </div>
        )}

        {callouts && callouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {callouts.map((callout, i) => (
              <div key={i}>
                {callout.title && (
                  <h3 className="text-white text-xl font-bold mb-3">{callout.title}</h3>
                )}
                {callout.type === 'button' ? (
                  <a
                    href={callout.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block bg-white font-bold py-4 px-8 rounded-2xl text-center hover:bg-white/90 transition-colors"
                    style={{ color: '#0071BA' }}
                  >
                    {callout.label}
                  </a>
                ) : (
                  <div className="bg-white rounded-2xl px-6 py-5 text-sm font-medium leading-relaxed" style={{ color: '#0071BA' }}>
                    {renderCallout(callout.text)}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (calloutTitle || buttonText) && (
          <div className="mt-4">
            {calloutTitle && (
              <h3 className="text-white text-xl font-bold mb-3">{calloutTitle}</h3>
            )}
            {buttonText && (
              <div className="bg-white rounded-2xl px-6 py-5 text-sm font-medium leading-relaxed" style={{ color: '#0071BA' }}>
                {renderCallout(buttonText)}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
