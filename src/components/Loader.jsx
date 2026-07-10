import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const LINES = [
  'Compiling Portfolio...',
  'Initializing Creativity...',
  'Loading Experiences...',
]

export default function Loader({ onDone }) {
  const [lineIndex, setLineIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const lineTimer = setInterval(() => {
      setLineIndex((i) => (i < LINES.length - 1 ? i + 1 : i))
    }, 700)

    const progressTimer = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 9 + 3, 100)
        if (next >= 100) {
          clearInterval(progressTimer)
          clearInterval(lineTimer)
          setTimeout(() => setExiting(true), 350)
          setTimeout(() => onDone?.(), 1150)
        }
        return next
      })
    }, 140)

    return () => {
      clearInterval(lineTimer)
      clearInterval(progressTimer)
    }
  }, [onDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void px-6"
          exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="w-full max-w-md">
            <div className="font-display text-sm tracking-[0.3em] text-primary mb-8 text-center">
              THE DIGITAL ARTISAN
            </div>

            <div className="h-16 mb-6 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={lineIndex}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="font-body text-slate-300 text-center tracking-wide"
                >
                  {LINES[lineIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <div className="w-full h-[2px] bg-slate-800 rounded-full overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-primary via-accent to-highlight"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-right font-display text-2xl text-gradient tabular-nums">
              {Math.floor(progress)}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
