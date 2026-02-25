const REVIEWER = { name: 'Per Pliggen Andersson', title: 'Överläkare' }

export default function ArticleFooter({ references, editable = true }) {
  const refList = references
    ? references.split('\n').map(r => r.trim()).filter(Boolean)
    : []

  return (
    <footer className="print-footer max-w-4xl mx-auto px-6 py-10 border-t border-slate-100">
      <p className="text-xs text-slate-400 mb-4">
        Granskad och godkänd av{' '}
        <span className="font-semibold text-slate-500">{REVIEWER.name}</span>
        {', '}{REVIEWER.title}
      </p>

      {editable && refList.length > 0 && (
        <div className="mb-8">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
            Referenser
          </p>
          <ol className="text-xs text-slate-400 space-y-1 list-decimal list-inside">
            {refList.map((ref, i) => (
              <li key={i}>{ref}</li>
            ))}
          </ol>
        </div>
      )}

      <div className="flex justify-between items-center mt-6">
        <img src="/Aktivitus-Blue.png" alt="Aktivitus" className="h-6 w-auto" />
      </div>
    </footer>
  )
}
