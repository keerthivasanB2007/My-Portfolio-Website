import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Award, Eye, X, Download } from 'lucide-react'
import { certificates } from '../data/certificates'
import SectionHeading from './SectionHeading'

export default function Certifications() {
  const [theme, setTheme] = useState(
    () => typeof document !== 'undefined' ? (document.documentElement.dataset.theme || 'dark') : 'dark'
  )
  const [lightboxImg, setLightboxImg] = useState(null)
  const [imageLoaded, setImageLoaded] = useState({})

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || 'dark')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  // Keyboard support: ESC closes lightbox
  useEffect(() => {
    if (!lightboxImg) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLightboxImg(null)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxImg])

  const isLight = theme === 'light'

  return (
    <section id="certifications" className="relative py-28 px-6 max-w-5xl mx-auto overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div 
          className="absolute -top-10 left-1/4 w-96 h-96 bg-primary/5 rounded-full filter blur-[80px]"
          style={{ opacity: isLight ? 0.3 : 0.6 }}
        />
        <div 
          className="absolute -bottom-10 right-1/4 w-96 h-96 bg-accent/5 rounded-full filter blur-[80px]"
          style={{ opacity: isLight ? 0.3 : 0.6 }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          eyebrow="Proof of Work"
          title="Certifications & Achievements"
          subtitle="Recognitions, certifications, and technical accomplishments that reflect my continuous learning and passion for software engineering."
        />

        {/* 2-Column Grid Layout */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch w-full">
          {certificates.map((cert) => {
            const hasImage = cert.hasCertificate && cert.src

            return (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6 }}
                whileHover={{ 
                  y: -6,
                  scale: 1.015,
                  boxShadow: isLight
                    ? '0 20px 40px rgba(56, 189, 248, 0.15)'
                    : '0 0 35px -5px rgba(6, 182, 212, 0.35)'
                }}
                className={`group rounded-[24px] border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 shadow-lg ${
                  isLight
                    ? 'bg-white/45 border-slate-200/80 shadow-slate-200/20'
                    : 'bg-[#0f172a]/40 border-[#38bdf8]/15 shadow-black/50'
                }`}
              >
                <div>
                  {/* Category & Status badges */}
                  <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                    <span className={`px-3 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border transition-all duration-300 ${
                      cert.category === 'CERTIFICATION'
                        ? (isLight 
                            ? 'bg-blue-50 border-blue-100 text-blue-600' 
                            : 'bg-blue-500/10 border-blue-500/20 text-[#38bdf8]')
                        : (isLight 
                            ? 'bg-purple-50 border-purple-100 text-purple-650' 
                            : 'bg-purple-500/10 border-purple-500/20 text-purple-400')
                    }`}>
                      {cert.category}
                    </span>
                    <span className={`px-3 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border transition-all duration-300 ${
                      cert.status.includes('WINNER')
                        ? (isLight 
                            ? 'bg-amber-50 border-amber-200 text-amber-700' 
                            : 'bg-amber-500/10 border-amber-500/20 text-highlight')
                        : (cert.hasCertificate 
                            ? (isLight 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400')
                            : (isLight 
                                ? 'bg-orange-50 border-orange-200 text-orange-700' 
                                : 'bg-orange-500/10 border-orange-500/20 text-orange-400'))
                    }`}>
                      {cert.status}
                    </span>
                  </div>

                  {/* Title & Organization info */}
                  <h3 className={`font-display font-bold text-xl tracking-tight transition-colors duration-300 ${
                    isLight ? 'text-slate-800' : 'text-slate-100'
                  }`}>
                    {cert.title}
                  </h3>
                  <div className={`text-sm mt-1.5 font-medium transition-colors duration-300 ${
                    isLight ? 'text-slate-650' : 'text-slate-400'
                  }`}>
                    {cert.issuer}
                    {cert.event && (
                      <span className="block mt-0.5 text-xs font-semibold text-primary/95 dark:text-cyan-400">
                        Event: {cert.event}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className={`text-sm mt-4 leading-relaxed transition-colors duration-300 ${
                    isLight ? 'text-slate-500/90' : 'text-slate-400'
                  }`}>
                    "{cert.description}"
                  </p>

                  {/* Preview Container */}
                  <div className="mt-6 w-full relative overflow-hidden rounded-xl border border-slate-200/10 select-none">
                    {hasImage ? (
                      <div className="aspect-[1.58] overflow-hidden bg-slate-950/40 rounded-xl relative shadow-md">
                        <img
                          src={cert.src}
                          alt={cert.alt}
                          loading="lazy"
                          decoding="async"
                          onLoad={() => setImageLoaded(prev => ({ ...prev, [cert.id]: true }))}
                          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-[1.04] rounded-xl ${
                            imageLoaded[cert.id] ? 'opacity-100 blur-0' : 'opacity-0 blur-sm'
                          }`}
                        />
                        {!imageLoaded[cert.id] && (
                          <div className="absolute inset-0 bg-slate-800/10 animate-pulse" />
                        )}
                      </div>
                    ) : (
                      /* Coming Soon Placeholder */
                      <div className={`aspect-[1.58] rounded-xl p-6 text-center flex flex-col items-center justify-center transition-all duration-300 backdrop-blur-sm ${
                        isLight
                          ? 'bg-slate-100/40 border-slate-200/60 text-slate-800 shadow-sm'
                          : 'bg-white/[0.02] border-white/5 text-slate-300'
                      }`}>
                        <span className="text-3xl mb-2.5" role="img" aria-label="document">📄</span>
                        <p className={`font-display font-bold text-sm tracking-wide transition-colors duration-300 ${
                          isLight ? 'text-slate-800' : 'text-slate-200'
                        }`}>
                          Certificate Preview
                        </p>
                        <p className={`text-xs mt-1 transition-colors duration-300 ${
                          isLight ? 'text-slate-500' : 'text-slate-400'
                        }`}>
                          Digital certificate will be uploaded soon.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons / Footer */}
                <div className="mt-8">
                  {hasImage ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setLightboxImg(cert)}
                      className={`h-[42px] px-6 w-full rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isLight
                          ? 'bg-gradient-to-r from-blue-600 to-sky-600 text-white hover:brightness-110 shadow-md shadow-blue-500/15'
                          : 'bg-[#0f172a] border border-[#38bdf8]/35 text-[#38bdf8] hover:bg-[#38bdf8]/5'
                      }`}
                    >
                      <Eye size={14} />
                      View Certificate
                    </motion.button>
                  ) : (
                    <div className="text-center py-2.5">
                      <span className={`text-xs italic font-semibold transition-colors duration-300 ${
                        isLight ? 'text-slate-450' : 'text-slate-500'
                      }`}>
                        Digital copy will be added soon.
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Fullscreen Lightbox Modal */}
        <AnimatePresence>
          {lightboxImg && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label="Certificate Image Viewer"
            >
              {/* Overlay click closes */}
              <div 
                className="absolute inset-0 cursor-zoom-out"
                onClick={() => setLightboxImg(null)}
              />

              {/* Close Button */}
              <button
                onClick={() => setLightboxImg(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-2.5 rounded-full hover:bg-white/10 z-50 focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Close Viewer"
              >
                <X size={26} />
              </button>

              {/* Lightbox Content Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-4xl w-full flex flex-col items-center justify-center z-10"
              >
                <img
                  src={lightboxImg.src}
                  alt={lightboxImg.alt}
                  decoding="async"
                  className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/10"
                />

                <div className="mt-5 text-center text-slate-100 flex flex-col items-center gap-3">
                  <h3 className="font-display font-semibold text-lg sm:text-xl tracking-wide">
                    {lightboxImg.title}
                  </h3>

                  {/* Optional Download button */}
                  <motion.a
                    href={lightboxImg.src}
                    download={`${lightboxImg.title.replace(/\s+/g, '_')}_Certificate.jpg`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 h-9 px-4 rounded-lg bg-white/10 border border-white/10 text-xs font-semibold text-white hover:bg-white/15 transition-all"
                  >
                    <Download size={13} />
                    Download Certificate
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </section>
  )
}
