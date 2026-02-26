import EditableImage from '../EditableImage'

export default function AdviceHeroSection({ breadcrumb, title, titleAccent, heroImage, editable = true }) {
  return (
    <header className="print-hero relative h-[50vh] flex items-end pb-16 overflow-hidden">
      <EditableImage
        src={heroImage}
        fieldPath="heroImage"
        imgClassName="w-full h-full object-cover brightness-[0.5]"
        containerClassName="absolute inset-0 w-full h-full"
        alt={breadcrumb}
        editable={editable}
      />
      <div className="print-hero-content relative z-10 max-w-5xl mx-auto px-10 w-full">
        <nav className="flex gap-4 mb-6 font-bold uppercase tracking-widest text-xl text-white">
          <span>{breadcrumb}</span>
        </nav>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none uppercase">
          {title} <br />
          <span style={{ color: '#0071BA' }} className="underline decoration-white/20 underline-offset-8">{titleAccent}</span>
        </h1>
      </div>
    </header>
  )
}
