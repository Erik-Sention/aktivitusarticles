export default function AdviceIntroSection({ quote, body }) {
  return (
    <section className="print-advice-intro max-w-3xl mb-24">
      <h2 className="text-3xl font-light leading-tight text-slate-500 mb-8 italic">
        "{quote}"
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed">{body}</p>
    </section>
  )
}
