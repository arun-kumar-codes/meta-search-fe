"use client"

import { useEffect, useCallback, useState } from "react"
import { createPortal } from "react-dom"
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react"

interface ImageGalleryModalProps {
  images: string[]
  initialIndex?: number
  onClose: () => void
  title?: string
}

export default function ImageGalleryModal({
  images,
  initialIndex = 0,
  onClose,
  title,
}: ImageGalleryModalProps) {
  const safeImages = Array.isArray(images) ? images.filter(Boolean) : []
  const [currentIndex, setCurrentIndex] = useState(() =>
    Math.min(Math.max(0, initialIndex), Math.max(0, safeImages.length - 1))
  )

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? safeImages.length - 1 : i - 1))
  }, [safeImages.length])

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i >= safeImages.length - 1 ? 0 : i + 1))
  }, [safeImages.length])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "ArrowRight") goNext()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose, goPrev, goNext])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = ""
    }
  }, [])

  if (safeImages.length === 0) {
    return null
  }

  const currentSrc = safeImages[currentIndex]

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose()
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={handleBackdropClick}
    >
      <div className="flex items-center justify-between p-3 md:p-4 shrink-0" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-white font-semibold truncate">
          {title || "Images"} ({currentIndex + 1} / {safeImages.length})
        </h3>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose() }}
          className="p-2 rounded-full text-white hover:bg-white/20 transition-colors"
          aria-label="Close gallery"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 p-4 relative" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={goPrev}
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>

        <div className="flex-1 flex items-center justify-center max-w-4xl max-h-full">
          {currentSrc ? (
            <img
              src={currentSrc}
              alt={`${title || "Image"} ${currentIndex + 1}`}
              className="max-w-full max-h-[70vh] object-contain rounded-lg"
            />
          ) : (
            <div className="w-64 h-48 flex items-center justify-center bg-white/10 rounded-lg">
              <ImageIcon size={48} className="text-white/50" />
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={goNext}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/20 text-white hover:bg-white/30 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      {safeImages.length > 1 && (
        <div className="p-3 md:p-4 overflow-x-auto shrink-0" onClick={(e) => e.stopPropagation()}>
          <div className="flex gap-2 justify-center">
            {safeImages.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`shrink-0 w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  i === currentIndex
                    ? "border-[#03C5F8] ring-2 ring-[#03C5F8]/50"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                {src ? (
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-white/20 flex items-center justify-center">
                    <ImageIcon size={20} className="text-white/50" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  if (typeof document === "undefined") return null
  return createPortal(modalContent, document.body)
}
