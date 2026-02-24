export default function AdviceCtaSection({ tag, title, body, cards, buttonText, buttonUrl }) {
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

        {buttonText && (
          <a
            href={buttonUrl || '#'}
            className="inline-block bg-white text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all hover:bg-white/90"
            style={{ color: '#0071BA' }}
          >
            {buttonText}
          </a>
        )}
      </div>
    </section>
  )
}
