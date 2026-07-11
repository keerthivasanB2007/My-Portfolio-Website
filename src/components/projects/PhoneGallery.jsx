import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function PhoneGallery({ screenshots, theme }) {
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

  // Swipe support via Framer Motion drag
  const handleDragEnd = (event, info) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      handleNext()
    } else if (info.offset.x > swipeThreshold) {
      handlePrev()
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
      aria-label="Mobile app screenshots gallery. Use left and right arrow keys to navigate."
    >
      {/* Phone Mockup Container */}
      <div className="relative flex items-center justify-center flex-1 w-full min-h-[300px]">
        
        {/* Floating Arrows on Desktop */}
        <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 hidden md:flex justify-between items-center z-30 pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation()
              handlePrev()
            }}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 ${
              isLight
                ? 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                : 'bg-slate-900/90 border-white/10 text-white hover:bg-slate-850 hover:border-white/20'
            } ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`}
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleNext()
            }}
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center border shadow-lg transition-all duration-300 ${
              isLight
                ? 'bg-white/90 border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                : 'bg-slate-900/90 border-white/10 text-white hover:bg-slate-850 hover:border-white/20'
            } ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}
            aria-label="Next screenshot"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Smartphone Frame Mockup */}
        <div 
          className={`relative w-[180px] xs:w-[200px] sm:w-[220px] lg:w-[200px] xl:w-[220px] aspect-[9/19] rounded-[38px] p-2.5 border-[6px] shadow-2xl transition-all duration-300 ${
            isLight
              ? 'bg-slate-900 border-slate-800 shadow-slate-300/50'
              : 'bg-slate-950 border-slate-800 shadow-black/80'
          }`}
        >
          {/* Notch / Dynamic Island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-3.5 bg-slate-950 rounded-full z-20" />

          {/* Speaker grill */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-slate-800 rounded-full z-20" />

          {/* Screen Content Wrapper */}
          <div className="relative w-full h-full bg-slate-900 rounded-[28px] overflow-hidden">
            {/* Draggable container for swipe */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={handleDragEnd}
              className="w-full h-full cursor-grab active:cursor-grabbing"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex].src}
                  alt={images[currentIndex].alt}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full object-cover select-none pointer-events-none rounded-[26px]"
                  loading={currentIndex === 0 ? "eager" : "lazy"}
                />
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Buttons and Details below Image */}
      <div className="flex flex-col items-center gap-2.5 mt-3 w-full">
        {/* Mobile controls (visible on smaller viewports, or below mockup) */}
        <div className="flex items-center gap-5 md:hidden">
          <button
            onClick={handlePrev}
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-md transition-all ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 active:bg-slate-100'
                : 'bg-slate-900 border-white/10 text-white active:bg-slate-800'
            }`}
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Dots Indicator inside Mobile Button Row */}
          <div className="flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? 'w-3 bg-primary'
                    : 'bg-slate-450 dark:bg-slate-600 hover:bg-primary/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`w-9 h-9 rounded-full flex items-center justify-center border shadow-md transition-all ${
              isLight
                ? 'bg-white border-slate-200 text-slate-800 active:bg-slate-100'
                : 'bg-slate-900 border-white/10 text-white active:bg-slate-800'
            }`}
            aria-label="Next screenshot"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Desktop Dots Indicator */}
        <div className="hidden md:flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-3.5 bg-primary'
                  : 'bg-slate-350 dark:bg-slate-600 hover:bg-primary/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Info Text */}
        <span className={`text-xs font-semibold tracking-wider transition-colors duration-300 ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>
          {images.length} Application Screens
        </span>
      </div>
    </div>
  )
}
