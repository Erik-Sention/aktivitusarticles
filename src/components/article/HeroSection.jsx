import EditableImage from '../EditableImage'

export default function HeroSection({ breadcrumb, title, titleAccent, heroImage, editable = true }) {
  return (
    <header className="print-hero relative h-[70vh] flex items-end pb-20 overflow-hidden">
      <EditableImage
        src={heroImage}
        fieldPath="heroImage"
        imgClassName="w-full h-full object-cover grayscale-[30%] brightness-[0.5]"
        containerClassName="absolute inset-0 w-full h-full"
        alt={breadcrumb}
        editable={editable}
      />
      <div className="print-hero-content relative z-10 max-w-5xl mx-auto px-6 w-full">
        <nav className="flex gap-4 mb-8 font-bold uppercase tracking-widest text-2xl text-white">
          <span>{breadcrumb}</span>
        </nav>
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
          {title} <br />
          <span style={{ color: '#0071BA' }}>{titleAccent}</span>
        </h1>
      </div>
    </header>
  )
}
