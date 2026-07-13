import { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Instagram, ArrowRight, ChevronLeft, ChevronRight, X } from 'lucide-react'
import SectionHeading from './SectionHeading'

// Import all artworks individually
import kingKohli from '../assets/creative/King kholi.webp'
import msDhoni from '../assets/creative/Ms_dhoni.jpg'
import oilPainting from '../assets/creative/oil_painting.jpg'
import pencilSketch from '../assets/creative/pencile_drawing1.webp'
import superStar from '../assets/creative/Super star.webp'
import terracotta1 from '../assets/creative/Terracotta Jewellery 1.jpg'
import terracotta2 from '../assets/creative/Terracotta jewellery 2.jpg'
import vijaySethupathi from '../assets/creative/Vijay Sethupathi.jpg'

const ARTWORKS = [
  {
    id: 'king-kohli',
    src: kingKohli,
    title: 'King Kohli',
    category: 'Handmade Artwork',
    alt: 'Handmade portrait sketch of Virat Kohli showing detailed shading and realistic textures',
  },
  {
    id: 'ms-dhoni',
    src: msDhoni,
    title: 'MS Dhoni',
    category: 'Handmade Artwork',
    alt: 'Detailed pencil sketch drawing of cricketer MS Dhoni capturing his signature look',
  },
  {
    id: 'oil-painting',
    src: oilPainting,
    title: 'Oil Painting',
    category: 'Handmade Artwork',
    alt: 'Handmade canvas oil painting displaying thick textured brushstrokes and vibrant colors',
  },
  {
    id: 'pencil-sketch',
    src: pencilSketch,
    title: 'Pencil Sketch',
    category: 'Handmade Artwork',
    alt: 'Precision black and white pencil sketch depicting structural contours and shadows',
  },
  {
    id: 'super-star',
    src: superStar,
    title: 'Super Star',
    category: 'Handmade Artwork',
    alt: 'Realistic charcoal and pencil sketch of actor Rajinikanth with dramatic shading',
  },
  {
    id: 'terracotta-jewellery-1',
    src: terracotta1,
    title: 'Terracotta Jewellery',
    category: 'Handmade Artwork',
    alt: 'Handcrafted red terracotta clay necklace set with intricate artistic detailing',
  },
  {
    id: 'terracotta-jewellery-2',
    src: terracotta2,
    title: 'Terracotta Jewellery Collection',
    category: 'Handmade Artwork',
    alt: 'A beautiful collection of multicolored hand-painted terracotta jewelry sets',
  },
  {
    id: 'vijay-sethupathi',
    src: vijaySethupathi,
    title: 'Vijay Sethupathi',
    category: 'Handmade Artwork',
    alt: 'Detailed charcoal sketch portrait of actor Vijay Sethupathi',
  },
]

// Reusable Artwork Card
function ArtworkCard({ artwork, index, onClick, theme }) {
  const isLight = theme === 'light'
  const [loaded, setLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1 }}
      whileHover={{ 
        scale: 1.03,
        y: -6,
        boxShadow: isLight
          ? '0 20px 40px rgba(56, 189, 248, 0.15)'
          : '0 0 30px -5px rgba(56, 189, 248, 0.4)'
      }}
      onClick={onClick}
      className="group cursor-pointer rounded-[24px] overflow-hidden glass transition-all duration-300 relative flex flex-col w-full"
      data-cursor-hover
    >
      {/* Image Wrapper */}
      <div className="relative w-full overflow-hidden bg-slate-900/5 aspect-auto">
        <img
          src={artwork.src}
          alt={artwork.alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-auto object-cover select-none pointer-events-none transition-all duration-500 group-hover:scale-105 rounded-t-[24px] ${
            loaded ? 'opacity-100' : 'opacity-0 scale-95 blur-sm'
          }`}
        />
        {/* Placeholder Glow loader */}
        {!loaded && (
          <div className="absolute inset-0 bg-slate-800/10 animate-pulse flex items-center justify-center min-h-[220px]" />
        )}
      </div>

      {/* Caption Content */}
      <div className={`p-5 transition-colors duration-300 border-t ${
        isLight ? 'bg-white/80 border-slate-100' : 'bg-[#0f172a]/80 border-white/5'
      }`}>
        <h4 className={`font-display font-bold text-base transition-colors duration-300 ${
          isLight ? 'text-slate-800' : 'text-slate-100'
        }`}>{artwork.title}</h4>
        <p className={`text-xs mt-1 transition-colors duration-300 ${
          isLight ? 'text-slate-500' : 'text-slate-400'
        }`}>{artwork.category}</p>
      </div>
    </motion.div>
  )
}

export default function CreativeCorner() {
  const [theme, setTheme] = useState(
    () => typeof document !== 'undefined' ? (document.documentElement.dataset.theme || 'dark') : 'dark'
  )
  const [activeIdx, setActiveIdx] = useState(null)
  const [columnsCount, setColumnsCount] = useState(4)

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || 'dark')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Columns Count resize observer
  useEffect(() => {
    let timeoutId
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        const w = window.innerWidth
        let newCount = 4
        if (w < 640) newCount = 1
        else if (w < 768) newCount = 2
        else if (w < 1024) newCount = 3

        setColumnsCount((prev) => {
          if (prev !== newCount) return newCount
          return prev
        })
      }, 150)
    }
    
    // Initial layout
    const w = window.innerWidth
    if (w < 640) setColumnsCount(1)
    else if (w < 768) setColumnsCount(2)
    else if (w < 1024) setColumnsCount(3)
    else setColumnsCount(4)

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeoutId)
    }
  }, [])

  const isLight = theme === 'light'

  // Divide artworks into columns for the masonry grid
  const columns = useMemo(() => {
    const cols = Array.from({ length: columnsCount }, () => [])
    ARTWORKS.forEach((artwork, index) => {
      cols[index % columnsCount].push({ artwork, index })
    });
    return cols
  }, [columnsCount])

  const handleNext = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev + 1) % ARTWORKS.length)
  }, [activeIdx])

  const handlePrev = useCallback(() => {
    if (activeIdx === null) return
    setActiveIdx((prev) => (prev - 1 + ARTWORKS.length) % ARTWORKS.length)
  }, [activeIdx])

  // Key handlers for Lightbox
  useEffect(() => {
    if (activeIdx === null) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIdx(null)
      else if (e.key === 'ArrowLeft') handlePrev()
      else if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeIdx, handleNext, handlePrev])

  return (
    <section id="creative" className="relative py-28 px-6 max-w-6xl mx-auto overflow-hidden">
      
      {/* Subtle Sketch Outline Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        <svg 
          className={`absolute top-12 -right-8 w-72 h-72 transition-opacity duration-500 ${
            isLight ? 'opacity-20 text-slate-500' : 'opacity-[0.03] text-slate-400'
          }`} 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.6"
        >
          <path d="M10,10 C30,40 25,65 90,90 M20,12 C40,42 35,68 95,92 M5,30 C22,50 18,75 85,95" />
        </svg>
        <svg 
          className={`absolute bottom-36 -left-12 w-80 h-80 transition-opacity duration-500 ${
            isLight ? 'opacity-20 text-slate-500' : 'opacity-[0.03] text-slate-400'
          }`} 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.6"
        >
          <path d="M90,10 C70,40 75,65 10,90 M80,12 C60,42 65,68 5,92 M95,25 C78,48 82,72 15,95" />
        </svg>
      </div>

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Beyond the Code"
          title="Creative Corner"
          subtitle="Beyond programming, I enjoy expressing ideas through pencil sketches, paintings, handcrafted art, and creative design. Every artwork reflects patience, precision, and imagination—the same qualities I bring to software engineering."
        />

        {/* Masonry Art Gallery */}
        <div 
          className="mt-14 grid gap-5 w-full items-start"
          style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}
        >
          {columns.map((col, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-5">
              {col.map(({ artwork, index }) => (
                <ArtworkCard
                  key={artwork.id}
                  artwork={artwork}
                  index={index}
                  theme={theme}
                  onClick={() => setActiveIdx(index)}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {activeIdx !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label="Image preview modal"
            >
              {/* Overlay click to close */}
              <div 
                className="absolute inset-0 cursor-zoom-out"
                onClick={() => setActiveIdx(null)}
              />

              {/* Close Button */}
              <button
                onClick={() => setActiveIdx(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/10 z-50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close Preview"
              >
                <X size={26} />
              </button>

              {/* Desktop Chevrons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handlePrev()
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/5 z-50 hidden sm:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Previous image"
              >
                <ChevronLeft size={38} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  handleNext()
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors p-3 rounded-full hover:bg-white/5 z-50 hidden sm:flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Next image"
              >
                <ChevronRight size={38} />
              </button>

              {/* Artwork Box Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10"
              >
                {/* Visual Image Preview */}
                <img
                  src={ARTWORKS[activeIdx].src}
                  alt={ARTWORKS[activeIdx].alt}
                  decoding="async"
                  className="max-w-full max-h-[70vh] sm:max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                {/* Details caption below image */}
                <div className="mt-5 text-center text-slate-100">
                  <h3 className="font-display font-semibold text-lg sm:text-xl tracking-wide">{ARTWORKS[activeIdx].title}</h3>
                  <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-semibold">{ARTWORKS[activeIdx].category}</p>
                </div>
              </motion.div>

              {/* Mobile controls */}
              <div className="flex gap-10 mt-6 sm:hidden z-10">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handlePrev()
                  }}
                  className="text-slate-400 hover:text-white transition-colors p-3 rounded-full bg-white/5 active:bg-white/10 flex items-center justify-center focus:outline-none"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                  className="text-slate-400 hover:text-white transition-colors p-3 rounded-full bg-white/5 active:bg-white/10 flex items-center justify-center focus:outline-none"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Instagram card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 w-full max-w-2xl mx-auto text-center"
        >
          <div className={`p-8 rounded-[24px] glass flex flex-col items-center justify-center border shadow-xl ${
            isLight 
              ? 'border-slate-200/60 bg-white/50 shadow-slate-250/20' 
              : 'border-white/5 bg-[#0f172a]/30 shadow-black/40'
          }`}>
            <Instagram size={36} className="text-pink-500 mb-4" />
            <h3 className={`font-display font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              isLight ? 'text-slate-800' : 'text-slate-100'
            }`}>
              More Artwork on Instagram
            </h3>
            <p className={`text-sm mt-2 max-w-md transition-colors duration-300 ${
              isLight ? 'text-slate-650' : 'text-slate-400'
            }`}>
              I regularly share my latest sketches, paintings, and creative experiments on Instagram.
            </p>

            <motion.a
              href="https://www.instagram.com/keerthi_a_r_ts/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 25px rgba(253, 29, 29, 0.55)'
              }}
              whileTap={{ scale: 0.98 }}
              className="mt-6 h-[46px] px-6 inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold text-white bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] transition-all duration-300"
            >
              <Instagram size={16} />
              Visit My Art Gallery
              <ArrowRight size={14} className="ml-1" />
            </motion.a>
          </div>
        </motion.div>
      </div>

    </section>
  )
}
