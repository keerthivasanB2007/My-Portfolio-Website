import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Coffee } from 'lucide-react'

export default function EasterEggs() {
  const [javaBurst, setJavaBurst] = useState(false)
  const [helloFlash, setHelloFlash] = useState(false)

  useEffect(() => {
    let buffer = ''
    const handler = (e) => {
      if (e.key.length > 1) return // ignore Shift, Enter, etc.
      buffer = (buffer + e.key.toLowerCase()).slice(-10)

      if (buffer.endsWith('java')) {
        setJavaBurst(true)
        setTimeout(() => setJavaBurst(false), 2200)
      }
      if (buffer.endsWith('hello')) {
        setHelloFlash(true)
        setTimeout(() => setHelloFlash(false), 1600)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <AnimatePresence>
        {helloFlash && (
          <motion.div
            className="fixed inset-0 z-[95] pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            style={{ background: 'radial-gradient(circle at 50% 50%, #A855F7, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {javaBurst && (
          <motion.div
            className="fixed bottom-10 right-10 z-[95] flex items-center gap-2 glass-strong rounded-2xl px-5 py-3 pointer-events-none"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
          >
            <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.6, repeat: 2 }}>
              <Coffee className="text-highlight" size={22} />
            </motion.div>
            <span className="text-sm font-display text-slate-100">Ah, a fellow Java enthusiast ☕</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
