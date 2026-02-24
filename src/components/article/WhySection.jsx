export default function WhySection({ title, items }) {
  return (
    <section className="print-why rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden mb-0" style={{ backgroundColor: '#0071BA' }}>
      <div className="relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center tracking-tight text-white">
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.number} className="text-center">
              <div className="print-why-number text-white font-black text-4xl mb-4">{item.number}</div>
              <h4 className="font-bold mb-2">{item.title}</h4>
              <p className="text-white text-sm">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
