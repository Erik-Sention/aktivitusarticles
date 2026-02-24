export default function IntroSection({ lead, col1, col2 }) {
  return (
    <section className="print-intro mb-24">
      <p className="print-intro-lead text-3xl md:text-4xl font-light leading-tight text-slate-500 mb-12">
        {lead}
      </p>
      <div className="print-intro-cols grid grid-cols-1 md:grid-cols-2 gap-12 text-slate-600 leading-relaxed text-lg">
        <p>{col1}</p>
        <p>{col2}</p>
      </div>
    </section>
  )
}
