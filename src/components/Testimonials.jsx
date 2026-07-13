import { useState, useEffect, memo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { principles } from '../data/principles'
import SectionHeading from './SectionHeading'

function Testimonials() {
  const [theme, setTheme] = useState(
    () => typeof document !== 'undefined' ? (document.documentElement.dataset.theme || 'dark') : 'dark'
  )

  useEffect(() => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const observer = new MutationObserver(() => {
      setTheme(root.dataset.theme || 'dark')
    })
    observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] })
    return () => observer.disconnect()
  }, [])

  const isLight = theme === 'light'
  const shouldReduceMotion = useReducedMotion()

  return (
    <section id="testimonials" className="relative py-28 px-6 max-w-5xl mx-auto overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none">
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full filter blur-[100px]"
          style={{ opacity: isLight ? 0.2 : 0.4 }}
        />
      </div>

      <div className="relative z-10">
        <SectionHeading
          eyebrow="INSPIRATION"
          title="My Guiding Principles"
          subtitle="The words and ideas that inspire my journey as a software engineer."
          center
        />

        {/* 2-Column Grid layout, side-by-side on desktop, stacked on mobile/tablet */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch w-full">
          {principles.map((item, i) => {
            const isTamil = item.id === 'tamil-motivation'

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, delay: i * 0.15 }}
                whileHover={shouldReduceMotion ? {} : { 
                  y: -6,
                  scale: 1.015,
                  boxShadow: isLight
                    ? '0 20px 40px rgba(56, 189, 248, 0.12)'
                    : '0 0 30px -5px rgba(56, 189, 248, 0.3)'
                }}
                className={`group rounded-[24px] border p-8 flex flex-col justify-between transition-all duration-300 shadow-md ${
                  isLight
                    ? 'bg-white/45 border-slate-200/80 shadow-slate-200/10'
                    : 'bg-[#0f172a]/40 border-white/5 shadow-black/40'
                } hover:border-[#38bdf8]/35 dark:hover:border-[#38bdf8]/35`}
              >
                <div>
                  {/* Card Title */}
                  <h4 className={`font-display font-bold text-xs uppercase tracking-widest mb-6 ${
                    isLight 
                      ? 'text-[#2563EB]' 
                      : 'text-primary'
                  }`}>
                    {item.title}
                  </h4>

                  {/* Quote / Content Box */}
                  {isTamil ? (
                    /* Tamil Poem */
                    <div 
                      className={`font-sans font-semibold text-[15px] sm:text-base text-center leading-loose transition-colors duration-300 ${
                        isLight ? 'text-slate-800' : 'text-slate-100'
                      }`}
                      style={{ wordSpacing: '1px' }}
                    >
                      {item.poem.map((line, idx) => (
                        <p key={idx} className="my-1.5">{line}</p>
                      ))}
                    </div>
                  ) : (
                    /* English quote */
                    <p className={`font-display font-medium text-lg leading-relaxed transition-colors duration-300 ${
                      isLight ? 'text-slate-800' : 'text-slate-100'
                    }`}>
                      "We don't have to be smarter than the rest.
                      <br />
                      We have to be more <span className={isLight ? 'text-[#2563EB] font-bold' : 'text-primary font-bold'}>disciplined</span> than the rest."
                    </p>
                  )}
                </div>

                {/* Subtext, Author & Caption Footer */}
                <div className="mt-8">
                  {isTamil ? (
                    <>
                      {/* Author */}
                      <p className={`text-xs text-center font-bold transition-colors duration-300 tracking-wide ${
                        isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {item.author}
                      </p>
                      {/* English translation caption */}
                      <p className={`text-xs mt-6 leading-relaxed italic text-center transition-colors duration-300 border-t pt-4 ${
                        isLight ? 'text-slate-650 border-slate-200/50' : 'text-slate-400 border-white/5'
                      }`}>
                        "{item.caption}"
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Sub-text description */}
                      <p className={`text-sm leading-relaxed transition-colors duration-300 ${
                        isLight ? 'text-slate-650' : 'text-slate-400'
                      }`}>
                        {item.description}
                      </p>
                      {/* Author */}
                      <p className={`text-xs mt-6 font-bold transition-colors duration-300 tracking-wider uppercase ${
                        isLight ? 'text-slate-500' : 'text-slate-500'
                      }`}>
                        {item.author}
                      </p>
                    </>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </section>
  )
}

export default memo(Testimonials)
