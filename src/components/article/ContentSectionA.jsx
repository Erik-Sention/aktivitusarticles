import EditableImage from '../EditableImage'

export default function ContentSectionA({ label, title, titleLine2, content, quote, image, editable = true }) {
  return (
    <section className="print-section-a mb-32 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#0071BA' }}>{label}</h2>
        <h3 className="text-4xl font-bold mb-6 tracking-tight">
          {title} <br />{titleLine2}
        </h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">{content}</p>
        {quote && (
          <div className="print-quote bg-slate-50 border-l-4 border-teal-500 p-6 italic text-slate-500">
            "{quote}"
          </div>
        )}
      </div>
      <div className="rounded-[2rem] overflow-hidden shadow-2xl">
        <EditableImage
          src={image}
          fieldPath="sectionA.image"
          imgClassName="w-full object-cover"
          alt={title}
          editable={editable}
        />
      </div>
    </section>
  )
}
