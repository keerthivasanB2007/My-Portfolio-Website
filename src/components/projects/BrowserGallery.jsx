import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function BrowserGallery({ screenshots, theme }) {
  const isLight = theme === 'light'
  const images = useMemo(() => screenshots || [], [screenshots])

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Autoplay functionality
  useEffect(() => {
    if (isHovered || images.length <= 1) return
    const interval = setInterval(handleNext, 3000)
    return () => clearInterval(interval)
  }, [isHovered, handleNext, images.length])

  // Keyboard navigation when focused
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  if (images.length === 0) return null

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="flex flex-col items-center justify-between h-full w-full py-4 select-none outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-2xl"
      aria-label="Desktop browser screenshots gallery. Use left and right arrow keys to navigate."
    >
      {/* Browser Mockup Wrapper */}
      <div className="relative flex items-center justify-center flex-1 w-full min-h-[220px] px-2 sm:px-4">
        
        {/* Desktop Browser Window Mockup */}
        <div 
          className={`relative w-full max-w-[460px] lg:max-w-full aspect-[16/10] rounded-xl overflow-hidden border shadow-2xl transition-all duration-300 flex flex-col ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-slate-300/40'
              : 'bg-[#0f172a] border-white/10 shadow-black/80'
          }`}
        >
          {/* Browser Header Bar */}
          <div className={`h-8 flex items-center px-4 gap-2 border-b shrink-0 ${
            isLight ? 'bg-slate-100 border-slate-200' : 'bg-slate-900 border-white/5'
          }`}>
            {/* Window control circles */}
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* Address bar input */}
            <div className={`flex-1 max-w-[280px] mx-auto h-5 rounded-md flex items-center justify-center text-[10px] font-medium tracking-wide ${
              isLight ? 'bg-slate-200/60 text-slate-500' : 'bg-slate-950/40 text-slate-400'
            }`}>
              localhost:3000
            </div>
          </div>

          {/* Browser Viewport Area */}
          <div className="relative flex-1 w-full bg-slate-900 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].alt}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-full h-full object-cover rounded-b-xl"
                loading={currentIndex === 0 ? "eager" : "lazy"}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Thumbnails below the browser */}
      <div className="flex gap-3 sm:gap-4 mt-5 justify-center w-full">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => setCurrentIndex(index)}
            className={`flex flex-col items-center gap-1.5 focus:outline-none transition-all duration-300 ${
              currentIndex === index 
                ? 'scale-105 opacity-100' 
                : 'opacity-50 hover:opacity-85 hover:scale-102'
            }`}
            aria-label={`Switch to ${img.label} view`}
          >
            {/* Mini thumbnail card */}
            <div 
              className={`w-[60px] sm:w-[80px] aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                currentIndex === index 
                  ? 'border-primary shadow-[0_0_12px_rgba(56,189,248,0.4)]' 
                  : 'border-slate-350 dark:border-white/10'
              }`}
            >
              <img 
                src={img.src} 
                alt={`${img.label} thumbnail`}
                className="w-full h-full object-cover" 
                loading="lazy"
              />
            </div>
            <span className={`text-[10px] sm:text-xs font-semibold tracking-wide transition-colors duration-300 ${
              currentIndex === index 
                ? 'text-primary' 
                : (isLight ? 'text-slate-650' : 'text-slate-400')
            }`}>
              {img.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
