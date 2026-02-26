import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'
import ArticlePreview from './ArticlePreview'
import AdvicePreview from './AdvicePreview'

const ARTICLE_WIDTH = 1280
const PREVIEW_WIDTH = 600
// A4 page height in canvas pixels at scale=2: (297/210) × 1280 × 2 ≈ 3620
const PAGE_H_CANVAS = Math.round((297 / 210) * ARTICLE_WIDTH * 2)

export default function PDFPreviewModal({ article, isAdvice, onClose }) {
  const [isCapturing, setIsCapturing] = useState(true)
  const [capturedCanvas, setCapturedCanvas] = useState(null)
  const [previewDataUrl, setPreviewDataUrl] = useState(null)
  const [canvasW, setCanvasW] = useState(0)
  const [canvasH, setCanvasH] = useState(0)
  const [previewScale, setPreviewScale] = useState(1)
  const [breakPositions, setBreakPositions] = useState([]) // canvas px
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const captureRef = useRef(null)

  // Capture the article once on mount
  useEffect(() => {
    const timer = setTimeout(async () => {
      const el = captureRef.current
      if (!el) return

      await Promise.all(
        Array.from(el.querySelectorAll('img')).map(img =>
          img.complete ? Promise.resolve()
            : new Promise(r => { img.onload = r; img.onerror = r })
        )
      )

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        scrollX: 0,
        scrollY: 0,
        windowWidth: ARTICLE_WIDTH,
        windowHeight: 900,
      })

      const cW = canvas.width   // 2560
      const cH = canvas.height
      const scale = PREVIEW_WIDTH / cW  // ≈ 0.234

      const breaks = []
      let y = PAGE_H_CANVAS
      while (y < cH - 100) {
        breaks.push(Math.round(y))
        y += PAGE_H_CANVAS
      }

      setCapturedCanvas(canvas)
      setCanvasW(cW)
      setCanvasH(cH)
      setPreviewScale(scale)
      setBreakPositions(breaks)
      setPreviewDataUrl(canvas.toDataURL('image/jpeg', 0.85))
      setIsCapturing(false)
    }, 200)

    return () => clearTimeout(timer)
  }, [])

  // Drag break lines – listeners added synchronously in onMouseDown to avoid missing events
  function startDrag(e, index, initialPos) {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)

    const startY = e.clientY
    const startPos = initialPos
    const scale = previewScale   // snapshot so closure is always correct
    const maxH = canvasH         // snapshot

    function onMove(me) {
      const delta = (me.clientY - startY) / scale
      const newPos = Math.max(50, Math.min(maxH - 50, startPos + delta))
      setBreakPositions(prev => {
        const next = [...prev]
        next[index] = Math.round(newPos)
        return next.sort((a, b) => a - b)
      })
    }

    function onUp() {
      setIsDragging(false)
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseup', onUp)
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  }

  async function handleGeneratePDF() {
    if (isGenerating || !capturedCanvas) return
    setIsGenerating(true)
    try {
      const sortedBreaks = [...breakPositions]
        .filter(b => b > 0 && b < canvasH)
        .sort((a, b) => a - b)

      const pages = []
      let currentY = 0
      for (const bp of [...sortedBreaks, canvasH]) {
        if (bp > currentY) {
          pages.push({ start: currentY, end: bp })
          currentY = bp
        }
      }

      // Pre-compute slice heights so we know page 1's size before creating the doc
      const slices = pages.map(({ start, end }) => {
        const sliceH = end - start
        return { start, sliceH, sliceMmH: (sliceH / canvasW) * 210 }
      })

      // First page height matches the user's selection exactly (not hardcoded A4)
      const doc = new jsPDF({ unit: 'mm', format: [210, slices[0].sliceMmH], orientation: 'portrait' })
      for (let i = 0; i < slices.length; i++) {
        const { start, sliceH, sliceMmH } = slices[i]
        const sliceCanvas = document.createElement('canvas')
        sliceCanvas.width = canvasW
        sliceCanvas.height = sliceH
        sliceCanvas.getContext('2d').drawImage(capturedCanvas, 0, -start)
        const imgData = sliceCanvas.toDataURL('image/jpeg', 0.92)
        if (i === 0) {
          doc.addImage(imgData, 'JPEG', 0, 0, 210, sliceMmH)
        } else {
          doc.addPage([210, sliceMmH])
          doc.addImage(imgData, 'JPEG', 0, 0, 210, sliceMmH)
        }
      }

      const slug = [article.title, article.titleAccent].filter(Boolean).join('-').toLowerCase()
        .replace(/[åä]/g, 'a').replace(/ö/g, 'o').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      doc.save(`${slug}.pdf`)
      onClose()
    } catch (err) {
      console.error('PDF generation failed:', err)
    } finally {
      setIsGenerating(false)
    }
  }

  const previewH = canvasH * previewScale

  return createPortal(
    <>
      {/* Hidden article for capture – same position/class as JPEG export */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: '-1400px',
        width: `${ARTICLE_WIDTH}px`, backgroundColor: '#ffffff',
        zIndex: -1, pointerEvents: 'none',
      }}>
        <div ref={captureRef} className="jpeg-render-mode" style={{ width: `${ARTICLE_WIDTH}px` }}>
          {isAdvice
            ? <AdvicePreview article={article} editable={false} />
            : <ArticlePreview article={article} editable={false} />
          }
        </div>
      </div>

      {/* Modal overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/70 flex"
        style={{ userSelect: 'none', cursor: isDragging ? 'row-resize' : 'default' }}
      >
        {/* Left: scrollable preview */}
        <div
          className="flex-1 overflow-x-hidden bg-slate-100 p-8"
          style={{ overflowY: isDragging ? 'hidden' : 'auto' }}
        >
          {isCapturing ? (
            <div className="flex items-center justify-center" style={{ minHeight: '60vh' }}>
              <div className="text-center">
                <svg className="w-8 h-8 animate-spin text-[#0071BA] mx-auto mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                </svg>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Förbereder förhandsgranskning…</p>
              </div>
            </div>
          ) : (
            <div style={{
              width: `${PREVIEW_WIDTH}px`,
              height: `${previewH}px`,
              position: 'relative',
              margin: '0 auto',
            }}>
              {previewDataUrl && (
                <img
                  src={previewDataUrl}
                  style={{ width: `${PREVIEW_WIDTH}px`, height: `${previewH}px`, display: 'block' }}
                  alt=""
                  draggable={false}
                />
              )}

              {/* Draggable break lines */}
              {breakPositions.map((pos, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: `${pos * previewScale - 10}px`,
                    left: 0,
                    right: 0,
                    height: '22px',
                    cursor: 'row-resize',
                    zIndex: 10,
                  }}
                  onMouseDown={e => startDrag(e, i, pos)}
                >
                  {/* Visible line at vertical center of hit area */}
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    left: 0,
                    right: 0,
                    borderTop: '2px dashed #0071BA',
                  }}>
                    <span style={{
                      position: 'absolute',
                      right: 0,
                      top: 0,
                      transform: 'translateY(-100%)',
                      backgroundColor: '#0071BA',
                      color: 'white',
                      fontSize: '9px',
                      fontWeight: 'bold',
                      padding: '2px 8px',
                      borderRadius: '4px 4px 0 0',
                      letterSpacing: '0.05em',
                      pointerEvents: 'none',
                      whiteSpace: 'nowrap',
                    }}>
                      ↕ SIDBRYTNING {i + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: sidebar */}
        <div style={{ width: '280px' }} className="bg-white border-l border-slate-200 flex flex-col shrink-0">
          <div className="flex-1 overflow-y-auto p-6">
            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800 mb-1">
              PDF-export
            </h2>
            <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
              Dra de blå linjerna (↕) för att justera sidbrytningarna. Klicka × för att ta bort en linje.
            </p>

            {!isCapturing && (
              <>
                <div className="mb-6">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Antal sidor</p>
                  <p className="text-3xl font-black text-[#0071BA]">{breakPositions.length + 1}</p>
                </div>

                {breakPositions.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Sidbrytningar</p>
                    {breakPositions.map((pos, i) => (
                      <div key={i} className="flex items-center justify-between text-xs text-slate-500 bg-slate-50 px-3 py-2 rounded-lg">
                        <span>Sida {i + 1} → {i + 2}</span>
                        <button
                          onClick={() => setBreakPositions(prev => prev.filter((_, j) => j !== i))}
                          className="text-slate-300 hover:text-red-400 transition-colors font-bold text-base leading-none"
                        >×</button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 space-y-3">
            <button
              onClick={handleGeneratePDF}
              disabled={isGenerating || isCapturing}
              className="w-full bg-[#0071BA] hover:bg-[#005a94] disabled:opacity-60 text-white text-xs font-bold uppercase tracking-widest px-4 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <svg className="w-3.5 h-3.5 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                  </svg>
                  Genererar…
                </>
              ) : 'Generera PDF'}
            </button>
            <button
              onClick={onClose}
              disabled={isGenerating}
              className="w-full text-slate-400 hover:text-slate-600 disabled:opacity-40 text-xs font-bold uppercase tracking-widest py-2 transition-colors"
            >
              Avbryt
            </button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}
