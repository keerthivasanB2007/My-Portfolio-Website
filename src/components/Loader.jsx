import { useEffect, useState, useMemo, useRef } from 'react'
import { motion } from 'framer-motion'
import kvLogo from '../assets/images/kv-logo.png'

export default function Loader({ onDone }) {
  const [elapsedTime, setElapsedTime] = useState(0)
  const terminalBodyRef = useRef(null)
  const [processedLogo, setProcessedLogo] = useState(null)

  // Pre-process logo to remove black background and create true transparent alpha mask
  useEffect(() => {
    const img = new Image()
    img.src = kvLogo
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0)
      
      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imgData.data
        
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i]
          const g = data[i+1]
          const b = data[i+2]
          
          // Key out dark background pixels (r, g, b all below 60)
          if (r < 60 && g < 60 && b < 60) {
            data[i+3] = 0 // transparent alpha
          }
        }
        
        ctx.putImageData(imgData, 0, 0)
        setProcessedLogo(canvas.toDataURL())
      } catch (err) {
        console.error('Error processing logo transparency:', err)
      }
    }
  }, [])

  // Ticking timer running at 60 FPS (approx. every 16.7ms) using requestAnimationFrame
  useEffect(() => {
    const startTime = performance.now()
    let animFrame

    const tick = () => {
      const now = performance.now()
      const elapsed = (now - startTime) / 1000 // in seconds
      setElapsedTime(elapsed)
      if (elapsed < 5.3) {
        animFrame = requestAnimationFrame(tick)
      }
    }

    animFrame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(animFrame)
  }, [])

  // Call onDone when the sequence finishes at 5.2s
  useEffect(() => {
    if (elapsedTime >= 5.2) {
      onDone?.()
    }
  }, [elapsedTime, onDone])

  // Auto-scroll terminal body to bottom as new text prints
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight
    }
  }, [elapsedTime])

  // Support for Skip animation (accessibility & convenience)
  const skipAnimation = () => {
    onDone?.()
  }

  // Escape key to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        skipAnimation()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Respect system prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      skipAnimation()
    }
    const handleReducedMotion = (e) => {
      if (e.matches) {
        skipAnimation()
      }
    }
    mediaQuery.addEventListener('change', handleReducedMotion)
    return () => mediaQuery.removeEventListener('change', handleReducedMotion)
  }, [])

  // Mathematical animations calculation for performance
  const bgOpacity = useMemo(() => {
    if (elapsedTime < 4.8) return 1
    return Math.max(0, 1 - (elapsedTime - 4.8) / 0.4)
  }, [elapsedTime])

  const headerOpacity = useMemo(() => {
    if (elapsedTime < 0.5) return elapsedTime / 0.5
    if (elapsedTime < 3.4) return 1
    return Math.max(0, 1 - (elapsedTime - 3.4) / 0.2)
  }, [elapsedTime])

  const headerY = useMemo(() => {
    if (elapsedTime < 0.5) return 10 * (1 - elapsedTime / 0.5)
    return 0
  }, [elapsedTime])

  const terminalOpacity = useMemo(() => {
    if (elapsedTime < 3.4) return 1
    return Math.max(0, 1 - (elapsedTime - 3.4) / 0.2)
  }, [elapsedTime])

  const progress = useMemo(() => {
    if (elapsedTime < 0.5) return 0
    if (elapsedTime >= 3.0) return 100
    return Math.min(100, Math.floor(((elapsedTime - 0.5) / 2.5) * 100))
  }, [elapsedTime])

  // Logo animation properties
  const logoOpacity = useMemo(() => {
    if (elapsedTime < 3.6) return 0
    if (elapsedTime < 4.2) return (elapsedTime - 3.6) / 0.6
    if (elapsedTime < 4.8) return 1
    return Math.max(0, 1 - (elapsedTime - 4.8) / 0.4)
  }, [elapsedTime])

  const logoScale = useMemo(() => {
    if (elapsedTime < 3.6) return 0.5
    if (elapsedTime < 4.2) return 0.5 + ((elapsedTime - 3.6) / 0.6) * 0.5
    if (elapsedTime < 4.8) return 1
    return 1 + ((elapsedTime - 4.8) / 0.4) * 1.5
  }, [elapsedTime])

  const logoBlur = useMemo(() => {
    if (elapsedTime < 3.6) return 12
    if (elapsedTime < 4.2) return 12 * (1 - (elapsedTime - 3.6) / 0.6)
    return 0
  }, [elapsedTime])

  const logoGlow = useMemo(() => {
    if (elapsedTime < 4.2) return 'drop-shadow(0 0 0px rgba(59,130,246,0))'
    if (elapsedTime < 4.8) {
      const intensity = (elapsedTime - 4.2) / 0.6
      return `drop-shadow(0 0 ${intensity * 18}px rgba(59,130,246,${intensity * 0.45}))`
    }
    const fade = Math.max(0, 1 - (elapsedTime - 4.8) / 0.4)
    return `drop-shadow(0 0 ${fade * 18}px rgba(59,130,246,${fade * 0.45}))`
  }, [elapsedTime])

  // Helper functions for terminal typing
  const getCommandText = (text, start, end) => {
    if (elapsedTime < start) return ''
    const chars = Math.floor(text.length * Math.min(1, (elapsedTime - start) / (end - start)))
    return text.substring(0, chars)
  }

  const isCommandTyping = (text, start, end) => {
    return elapsedTime >= start && elapsedTime < end
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center px-6 select-none overflow-hidden"
      style={{
        backgroundColor: `rgba(2, 6, 23, ${bgOpacity})`,
        pointerEvents: elapsedTime >= 4.8 ? 'none' : 'auto'
      }}
    >
      {/* Custom self-contained blinking animation */}
      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-cursor-blink {
          animation: cursorBlink 0.9s step-end infinite;
        }
      `}</style>

      {/* BACKGROUND DECORATIONS */}
      {elapsedTime < 3.6 && (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b08_1px,transparent_1px),linear-gradient(to_bottom,#1e293b08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] pointer-events-none" />
          <div className="absolute top-1/4 left-1/4 w-[35rem] h-[35rem] rounded-full bg-[#38BDF8]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-[35rem] h-[35rem] rounded-full bg-[#A855F7]/5 blur-[120px] pointer-events-none" />
        </>
      )}

      {/* MAIN TERMINAL & HEADER CONTAINER */}
      {elapsedTime < 3.6 && (
        <div className="w-[95%] sm:w-[90%] md:w-[750px] max-w-full flex flex-col gap-6 z-10">
          
          {/* Header */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="text-center"
          >
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-[0.3em] text-[#38BDF8] drop-shadow-[0_0_15px_rgba(56,189,248,0.2)] mb-2 uppercase">
              Loading Keerthivasan's Portfolio
            </h1>
            <p className="font-mono text-xs sm:text-sm text-slate-500 tracking-wider">
              Software Engineer Portfolio
            </p>
          </motion.div>

          {/* Terminal Window */}
          <motion.div
            style={{ opacity: terminalOpacity }}
            className="glass rounded-xl shadow-2xl overflow-hidden border border-slate-800/80 bg-[#070b15]/75 backdrop-blur-md"
          >
            {/* macOS title bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/40 border-b border-slate-800/50">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]/30" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]/30" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB2F]/30" />
              </div>
              <div className="font-mono text-xs text-slate-500 select-none">
                bash — guest@workstation:~
              </div>
              <div className="w-12" />
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalBodyRef}
              className="p-4 sm:p-6 font-mono text-xs sm:text-sm h-[240px] sm:h-[280px] overflow-y-auto flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent scroll-smooth text-left"
            >
              {/* Boot logs rendering */}
              {elapsedTime >= 0.5 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Booting Portfolio Engine...', 0.5, 0.7)}
                    {isCommandTyping('Booting Portfolio Engine...', 0.5, 0.7) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 0.7 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 0.8 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Loading Developer Profile...', 0.8, 1.0)}
                    {isCommandTyping('Loading Developer Profile...', 0.8, 1.0) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 1.0 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 1.1 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Initializing Projects...', 1.1, 1.3)}
                    {isCommandTyping('Initializing Projects...', 1.1, 1.3) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 1.3 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 1.4 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Importing Technical Skills...', 1.4, 1.6)}
                    {isCommandTyping('Importing Technical Skills...', 1.4, 1.6) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 1.6 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 1.7 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Connecting GitHub...', 1.7, 1.9)}
                    {isCommandTyping('Connecting GitHub...', 1.7, 1.9) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 1.9 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Connected</div>
              )}

              {elapsedTime >= 2.0 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Loading Experience Timeline...', 2.0, 2.2)}
                    {isCommandTyping('Loading Experience Timeline...', 2.0, 2.2) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 2.2 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 2.3 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Rendering Interactive Experience...', 2.3, 2.5)}
                    {isCommandTyping('Rendering Interactive Experience...', 2.3, 2.5) && <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />}
                  </span>
                </div>
              )}
              {elapsedTime >= 2.5 && (
                <div className="text-emerald-500 font-bold ml-4">✓ Complete</div>
              )}

              {elapsedTime >= 2.6 && (
                <div>
                  <span className="text-[#38BDF8] mr-2 select-none">&gt;</span>
                  <span>
                    {getCommandText('Portfolio Ready.', 2.6, 2.8)}
                    {(isCommandTyping('Portfolio Ready.', 2.6, 2.8) || (elapsedTime >= 2.8 && elapsedTime < 3.4)) && (
                      <span className="inline-block w-1.5 h-4 bg-[#38BDF8] ml-0.5 align-middle animate-cursor-blink" />
                    )}
                  </span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            style={{ opacity: terminalOpacity }}
            className="flex items-center gap-4"
          >
            <div className="flex-1 h-[6px] rounded-full bg-slate-900/80 overflow-hidden relative border border-slate-800/40">
              <div
                className="h-full bg-gradient-to-r from-primary via-accent to-secondary rounded-full shadow-[0_0_12px_rgba(56,189,248,0.3)] transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="font-mono text-xs sm:text-sm text-primary font-bold w-10 text-right tabular-nums">
              {progress}%
            </div>
          </motion.div>
        </div>
      )}

      {/* CENTERED LOGO REVEAL & TRANSITION */}
      {elapsedTime >= 3.6 && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 mix-blend-screen"
          style={{
            opacity: logoOpacity,
            scale: logoScale,
            filter: `blur(${logoBlur}px) ${logoGlow}`,
            mixBlendMode: 'screen'
          }}
        >
          <img
            src={processedLogo || kvLogo}
            alt="KV Logo"
            className="w-32 h-32 md:w-40 md:h-40 object-contain mix-blend-screen"
            style={{ mixBlendMode: 'screen', filter: 'brightness(0.7) contrast(3)' }}
          />
        </motion.div>
      )}

      {/* Interactive Skip Button */}
      {elapsedTime < 4.8 && (
        <button
          onClick={skipAnimation}
          className="absolute bottom-6 right-6 px-3.5 py-1.5 text-[10px] sm:text-xs font-mono rounded-lg border border-slate-800/60 bg-slate-950/40 text-slate-500 hover:text-primary hover:border-primary/45 transition-all duration-300 backdrop-blur-sm shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 z-30"
        >
          Skip Intro [ESC]
        </button>
      )}
    </div>
  )
}

