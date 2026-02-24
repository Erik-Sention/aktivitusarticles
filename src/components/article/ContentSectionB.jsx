import EditableImage from '../EditableImage'

export default function ContentSectionB({ label, title, titleLine2, content, image, editable = true }) {
  return (
    <section className="print-section-b mb-32 flex flex-col md:flex-row gap-16 items-center">
      <div className="md:w-1/2 order-2 md:order-1 rounded-[2rem] overflow-hidden shadow-2xl -rotate-2">
        <EditableImage
          src={image}
          fieldPath="sectionB.image"
          imgClassName="w-full object-cover"
          alt={title}
          editable={editable}
        />
      </div>
      <div className="md:w-1/2 order-1 md:order-2">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4" style={{ color: '#0071BA' }}>{label}</h2>
        <h3 className="text-4xl font-bold mb-6 tracking-tight">
          {title} <br />{titleLine2}
        </h3>
        <p className="text-slate-600 text-lg leading-relaxed mb-6">{content}</p>
      </div>
    </section>
  )
}
