import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import { fetchArticle, saveArticle } from '../store'
import { ImageEditContext } from '../context/ImageEditContext'
import { parseReferences } from '../lib/parseReferences'
import ArticlePreview from './ArticlePreview'
import ArticleEditor from './ArticleEditor'
import AdvicePreview from './AdvicePreview'
import AdviceEditor from './AdviceEditor'
import PDFPreviewModal from './PDFPreviewModal'

export default function ArticlePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const initialMode = searchParams.get('mode') === 'edit' ? 'edit' : 'preview'

  const [article, setArticle]         = useState(null)
  const [loading, setLoading]         = useState(true)
  const [mode, setMode]               = useState(initialMode)
  const [saved, setSaved]             = useState(false)
  const [isExporting, setIsExporting]       = useState(false)
  const [isExportingPDF, setIsExportingPDF] = useState(false)
  const [showPDFPreview, setShowPDFPreview] = useState(false)
  const pdfRef = useRef(null)

  useEffect(() => {
    fetchArticle(id).then(a => {
      setArticle(a)
      setLoading(false)
    })
  }, [id])

  const handleSave = useCallback(async (updated) => {
    await saveArticle(updated)
    setArticle(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }, [])

  // Uppdatera ett bildfält via dot-path, t.ex. "sectionA.image" eller "phases.1.image"
  const updateArticleImage = useCallback((fieldPath, imagePath) => {
    setArticle(prev => {
      if (!prev) return prev
      const updated = JSON.parse(JSON.stringify(prev))
      const keys = fieldPath.split('.')
      let obj = updated
      for (let i = 0; i < keys.length - 1; i++) {
        const k = isNaN(keys[i]) ? keys[i] : Number(keys[i])
        obj = obj[k]
      }
      const lastKey = isNaN(keys[keys.length - 1])
        ? keys[keys.length - 1]
        : Number(keys[keys.length - 1])
      obj[lastKey] = imagePath
      saveArticle(updated)
      return updated
    })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans">
        <span className="text-xs font-bold uppercase tracking-widest animate-pulse">Laddar…</span>
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-400 font-sans">
        <div className="text-center">
          <p className="mb-4">Artikel hittades inte.</p>
          <button onClick={() => navigate('/')} className="text-teal-500 underline font-bold">
            Tillbaka
          </button>
        </div>
      </div>
    )
  }

  const isAdvice = article.type === 'advice'

  function switchMode(newMode) {
    setMode(newMode)
    setSearchParams(newMode === 'edit' ? { mode: 'edit' } : {})
  }

  async function handleExportJPEG() {
    if (isExporting) return
    setIsExporting(true)

    try {
      // Give React time to mount the hidden portal container
      await new Promise(r => setTimeout(r, 300))
      const el = pdfRef.current
      if (!el) return

      // Wait for every <img> in the container to finish loading
      await Promise.all(
        Array.from(el.querySelectorAll('img')).map(img =>
          img.complete
            ? Promise.resolve()
            : new Promise(r => { img.onload = r; img.onerror = r })
        )
      )

      // Capture at 4× for maximum sharpness when zooming on mobile
      // windowWidth/windowHeight ensure vh/vw units resolve consistently
      // regardless of the browser window size during export
      const canvas = await html2canvas(el, {
        scale: 4,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: 1280,
        windowHeight: 900,
      })

      const slug = [article.title, article.titleAccent]
        .filter(Boolean).join('-').toLowerCase()
        .replace(/[åä]/g, 'a').replace(/ö/g, 'o')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      const a = document.createElement('a')
      a.href = canvas.toDataURL('image/jpeg', 0.95)
      a.download = `${slug}.jpg`
      a.click()

    } catch (err) {
      console.error('JPEG export failed:', err)
    } finally {
      setIsExporting(false)
    }
  }

  async function handleExportRefPDF() {
    if (isExportingPDF) return
    setIsExportingPDF(true)

    try {
      const refs = parseReferences(article.references).filter(r => r.text.trim())
      if (refs.length === 0) {
        alert('Den här artikeln har inga referenser att exportera.')
        return
      }

      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })

      const pageW   = doc.internal.pageSize.getWidth()
      const pageH   = doc.internal.pageSize.getHeight()
      const marginX = 20
      const marginY = 24
      const maxW    = pageW - marginX * 2

      const BLUE  = [0, 113, 186]
      const SLATE = [100, 116, 139]
      const DARK  = [15, 23, 42]

      let y = marginY

      // Header: blue top rule
      doc.setFillColor(...BLUE)
      doc.rect(marginX, y - 4, maxW, 0.8, 'F')
      y += 4

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...BLUE)
      doc.text('AKTIVITUS', marginX, y)
      y += 7

      doc.setFont('helvetica', 'bold')
      doc.setFontSize(16)
      doc.setTextColor(...DARK)
      const titleStr = [article.title, article.titleAccent].filter(Boolean).join(' ')
      doc.text(titleStr, marginX, y)
      y += 8

      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...SLATE)
      doc.text('Källförteckning', marginX, y)
      y += 6

      doc.setDrawColor(...BLUE)
      doc.setLineWidth(0.3)
      doc.line(marginX, y, pageW - marginX, y)
      y += 8

      // Reference list
      const lineH   = 5.5
      const paraGap = 3

      refs.forEach((ref, i) => {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        const textLines = doc.splitTextToSize(ref.text, maxW - 5)
        const entryH    = lineH * textLines.length + paraGap

        if (y + entryH > pageH - 20) {
          doc.addPage()
          y = marginY
        }

        // Number
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(...BLUE)
        doc.text(`${i + 1}.`, marginX, y)

        // Citation text – blue and clickable if URL exists, dark otherwise
        doc.setFont('helvetica', 'normal')
        doc.setTextColor(...(ref.url ? BLUE : DARK))
        doc.text(textLines, marginX + 5, y)
        const textBlockH = lineH * textLines.length
        if (ref.url && ref.url.trim()) {
          doc.link(marginX + 5, y - lineH + 0.5, maxW - 5, textBlockH, { url: ref.url })
        }
        y += textBlockH

        y += paraGap
      })

      // Footer
      doc.setDrawColor(...BLUE)
      doc.setLineWidth(0.3)
      doc.line(marginX, pageH - 16, pageW - marginX, pageH - 16)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(7)
      doc.setTextColor(...SLATE)
      doc.text('Aktivitus AB · aktivitus.se', marginX, pageH - 11)
      const dateStr = new Date().toLocaleDateString('sv-SE')
      doc.text(dateStr, pageW - marginX - doc.getTextWidth(dateStr), pageH - 11)

      const slug = [article.title, article.titleAccent]
        .filter(Boolean).join('-').toLowerCase()
        .replace(/[åä]/g, 'a').replace(/ö/g, 'o')
        .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')

      doc.save(`${slug}-kallforteckning.pdf`)

    } catch (err) {
      console.error('PDF export failed:', err)
    } finally {
      setIsExportingPDF(false)
    }
  }

  return (
    <ImageEditContext.Provider value={{ updateArticleImage }}>
    <div className="min-h-screen bg-white font-sans">
      {/* Toolbar */}
      <div className="no-print sticky top-0 z-50 bg-white border-b border-slate-100 px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/')}
          className="text-slate-400 hover:text-slate-700 transition-colors p-1.5 rounded-lg hover:bg-slate-100"
          title="Tillbaka"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 truncate">
            {article.breadcrumb}
          </p>
          {isAdvice && (
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-teal-500">Hälsoplan</span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {saved && (
            <span className="text-teal-500 text-xs font-bold uppercase tracking-widest animate-pulse">
              Sparad ✓
            </span>
          )}

          <div className="flex bg-slate-100 rounded-lg p-1 gap-1">
            <button
              onClick={() => switchMode('preview')}
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md transition-colors ${
                mode === 'preview'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Förhandsgranska
            </button>
            <button
              onClick={() => switchMode('edit')}
              className={`text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-md transition-colors ${
                mode === 'edit'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Redigera
            </button>
          </div>

          <button
            onClick={() => setShowPDFPreview(true)}
            className="bg-[#0071BA] hover:bg-[#005a94] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Exportera PDF
          </button>

          <button
            onClick={handleExportRefPDF}
            disabled={isExportingPDF}
            className="bg-[#0071BA] hover:bg-[#005a94] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {isExportingPDF ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Genererar…
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Källförteckning PDF
              </>
            )}
          </button>

          <button
            onClick={handleExportJPEG}
            disabled={isExporting}
            className="bg-slate-900 hover:bg-slate-700 disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            {isExporting ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                Genererar…
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Exportera bild
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main content */}
      {mode === 'preview' ? (
        isAdvice
          ? <AdvicePreview article={article} />
          : <ArticlePreview article={article} />
      ) : (
        isAdvice
          ? <AdviceEditor article={article} onSave={handleSave} />
          : <ArticleEditor article={article} onSave={handleSave} />
      )}

      {showPDFPreview && (
        <PDFPreviewModal article={article} isAdvice={isAdvice} onClose={() => setShowPDFPreview(false)} />
      )}

      {/* Hidden export render container – pennikoner avaktiverade via editable={false} */}
      {isExporting && createPortal(
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0,
            left: '-1400px',
            width: '1280px',
            backgroundColor: '#ffffff',
            zIndex: -1,
            pointerEvents: 'none',
          }}
        >
          <div ref={pdfRef} className="jpeg-render-mode" style={{ width: '1280px' }}>
            {isAdvice
              ? <AdvicePreview article={article} editable={false} />
              : <ArticlePreview article={article} editable={false} />
            }
          </div>
        </div>,
        document.body
      )}
    </div>
    </ImageEditContext.Provider>
  )
}
