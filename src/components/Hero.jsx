import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown, Download, GraduationCap, Mail, FolderOpen } from 'lucide-react'
import ParticleField from './ParticleField'

const profilePicture = new URL('../../profile_picture.jpg', import.meta.url).href

const ROLES = ['Backend Developer', 'Java Developer', 'Problem Solver', 'Software Engineer', 'Creative Thinker']

function useTypingEffect(words, typeSpeed = 70, deleteSpeed = 40, pause = 1400) {
  const [text, setText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[wordIndex % words.length]
    let timeout

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed)
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause)
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), deleteSpeed)
    } else if (deleting && text.length === 0) {
      setDeleting(false)
      setWordIndex((i) => i + 1)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, wordIndex, words, typeSpeed, deleteSpeed, pause])

  return text
}

export default function Hero() {
  const typed = useTypingEffect(ROLES)
  const heroRef = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2
      const y = (e.clientY / window.innerHeight - 0.5) * 2
      setTilt({ x, y })
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 py-24"
    >
      <ParticleField />

      {/* Ambient gradient blobs, parallaxing gently with the cursor */}
      <motion.div
        className="hero-profile-glow absolute w-[36rem] h-[36rem] rounded-full bg-primary/20 blur-[120px] -z-10"
        style={{ top: '10%', left: '10%' }}
        animate={{ x: tilt.x * -30, y: tilt.y * -20 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />
      <motion.div
        className="absolute w-[30rem] h-[30rem] rounded-full bg-accent/20 blur-[120px] -z-10"
        style={{ bottom: '5%', right: '10%' }}
        animate={{ x: tilt.x * 30, y: tilt.y * 20 }}
        transition={{ type: 'spring', stiffness: 40, damping: 20 }}
      />

      <div className="relative z-10 grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-2 text-center lg:order-1 lg:text-left"
        >
          <p className="font-artistic text-3xl text-highlight mb-2">Hello</p>

          <h1 className="font-display font-bold text-4xl sm:text-6xl md:text-7xl leading-tight text-slate-50">
            I'm <span className="text-gradient">Keerthivasan</span>
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="mt-4 space-y-1"
          >
            <p className="hero-subtitle-line text-base sm:text-lg">
              Computer Science Engineering Student
            </p>

            <p className="hero-subtitle-line-2 flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-sm sm:text-[15px] lg:justify-start">
              <GraduationCap size={15} className="hero-subtitle-icon mt-0.5 shrink-0" />
              <span>Anna University • Madras Institute of Technology (MIT Campus), Chennai</span>
            </p>
          </motion.div>

          <div className="mt-6 h-9 flex items-center justify-center lg:justify-start font-display text-xl sm:text-2xl text-primary">
            <span>{typed}</span>
            <span className="ml-1 w-[2px] h-6 bg-primary animate-pulse" />
          </div>

          <p className="mt-6 text-slate-400 max-w-xl mx-auto lg:mx-0">
            I don't just write code — I build systems with intention and craft interfaces with care.
            Where engineering discipline meets creative instinct.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-4">
            <MagneticButton onClick={() => scrollTo('projects')} primary>
              <FolderOpen size={18} /> View Projects
            </MagneticButton>
            <MagneticButton 
              href="/Keerthivasan_B_Resume.pdf" 
              download="Keerthivasan_B_Resume.pdf"
              aria-label="Download Resume"
            >
              <Download size={18} /> Download Resume
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo('contact')}>
              <Mail size={18} /> Contact Me
            </MagneticButton>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 36, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="order-1 mt-8 flex justify-center lg:order-2 lg:mt-14 lg:justify-end"
        >
          <motion.div
            className="hero-profile-frame group relative w-full max-w-[520px]"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ y: -10, scale: 1.01 }}
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/25 via-accent/15 to-secondary/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-3 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.35)] transition-colors duration-500">
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/10 via-transparent to-white/5 pointer-events-none" />
              <div className="absolute inset-[14px] rounded-[1.6rem] border border-white/10 pointer-events-none" />
              <div className="hero-profile-panel relative aspect-[0.92] rounded-[1.6rem] overflow-hidden border border-white/10 bg-slate-900/60">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_30%),radial-gradient(circle_at_70%_20%,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.14),transparent_30%)]" />
                <img
                  src={profilePicture}
                  alt="Keerthivasan portrait"
                  className="absolute inset-0 z-10 h-full w-full object-cover"
                  style={{ objectPosition: 'center top' }}
                />
                <div className="hero-profile-ring absolute inset-0 rounded-[1.6rem] ring-1 ring-inset ring-white/15 pointer-events-none" />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.button
        onClick={() => scrollTo('about')}
        className="hero-scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to About section"
        data-cursor-hover
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ArrowDown size={18} className="hero-scroll-arrow" />
      </motion.button>
    </section>
  )
}

function MagneticButton({ children, onClick, href, download, primary, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3
    setPos({ x, y })
  }
  const reset = () => setPos({ x: 0, y: 0 })

  const classes = primary
    ? 'hero-primary-btn bg-gradient-to-r from-primary to-accent text-slate-950 shadow-glow'
    : 'hero-secondary-btn glass text-slate-200'

  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      className="inline-block"
    >
      <Component
        onClick={onClick}
        href={href}
        download={download}
        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${classes}`}
        data-cursor-hover
        {...props}
      >
        {children}
      </Component>
    </motion.div>
  )
}
