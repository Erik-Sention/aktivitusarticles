import { useState, useContext } from 'react'
import { ImageEditContext } from '../context/ImageEditContext'
import ImagePickerModal from './ImagePickerModal'

export default function EditableImage({
  src,
  fieldPath,
  imgClassName = '',
  containerClassName = 'relative',
  alt = '',
  editable = true,
}) {
  const [showPicker, setShowPicker] = useState(false)
  const ctx = useContext(ImageEditContext)

  function handleSelect(imagePath) {
    if (!ctx) return
    ctx.updateArticleImage(fieldPath, imagePath)
  }

  if (!editable) {
    return (
      <div className={containerClassName}>
        <img src={src} className={imgClassName} alt={alt} />
      </div>
    )
  }

  return (
    <div className={`${containerClassName} group`}>
      <img src={src} className={imgClassName} alt={alt} />

      <button
        onClick={e => { e.stopPropagation(); setShowPicker(true) }}
        className="absolute top-3 right-3 z-50 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
        title="Byt bild"
        type="button"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
        </svg>
      </button>

      {showPicker && (
        <ImagePickerModal
          onSelect={handleSelect}
          onClose={() => setShowPicker(false)}
        />
      )}
    </div>
  )
}
