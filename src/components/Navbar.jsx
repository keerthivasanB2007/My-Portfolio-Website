import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, MoonStar, SunMedium, X } from 'lucide-react'
import { useScrollSpy } from '../hooks/useScrollSpy'

const LINKS = [
  { id: 'about', label: 'About' },
  { id: 'journey', label: 'Journey' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'github', label: 'GitHub' },
  { id: 'creative', label: 'Creative' },
  { id: 'contact', label: 'Contact' },
]

export default function Navbar({ theme = 'dark', setTheme }) {
  const [open, setOpen] = useState(false)
  const active = useScrollSpy(LINKS.map((l) => l.id))

  const scrollTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeTheme = theme === 'light' ? 'light' : 'dark'

  const toggleTheme = () => {
    if (!setTheme) return
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto flex w-[92vw] max-w-[1280px] justify-center px-4 pt-5 sm:px-6 lg:px-0">
        <nav className="navbar-shell glass relative flex h-[76px] w-full max-w-[1280px] items-center justify-between rounded-full px-5 shadow-glow/20 transition-all duration-300 ease-in-out lg:px-6">
          <button
            onClick={() => scrollTo('hero')}
            className={`font-display font-semibold tracking-wide transition-all duration-300 ease-in-out ${activeTheme === 'light' ? 'text-[#0F172A]' : 'text-[rgba(255,255,255,0.75)]'}`}
            data-cursor-hover
          >
            KV<span className="text-primary">.</span>
          </button>

          <div className="relative hidden flex-1 items-center justify-center lg:flex">
            <ul className="relative flex items-center gap-8 xl:gap-9">
              {LINKS.map((link) => (
                <li key={link.id} className="relative">
                <button
                  onClick={() => scrollTo(link.id)}
                  data-cursor-hover
                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:drop-shadow-[0_0_10px_rgba(56,189,248,0.18)] ${
                      activeTheme === 'light'
                        ? active === link.id
                          ? 'text-[#2563EB] font-semibold hover:text-[#2563EB]'
                          : 'text-[#334155] hover:text-[#2563EB]'
                        : active === link.id
                          ? 'text-[#38BDF8] font-semibold hover:text-[#38BDF8]'
                          : 'text-[rgba(255,255,255,0.75)] hover:text-[#38BDF8]'
                    }`}
                >
                  {link.label}
                </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden items-center gap-4 lg:flex">
            <button
              type="button"
              onClick={toggleTheme}
              data-cursor-hover
              aria-label="Toggle theme"
              className="theme-toggle-button inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-100 backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-[1.04] hover:bg-white/10"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex"
                  >
                    <SunMedium size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: 90, scale: 0.7 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.7 }}
                    transition={{ duration: 0.25 }}
                    className="inline-flex"
                  >
                    <MoonStar size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={() => scrollTo('contact')}
              data-cursor-hover
              className="nav-cta-button inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-primary to-accent text-slate-950 transition-opacity duration-300 ease-in-out hover:opacity-90"
            >
              Let's talk
            </button>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="theme-toggle-button inline-flex lg:hidden items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-slate-100 backdrop-blur-md transition-all duration-300 ease-in-out"
          >
            {theme === 'dark' ? <SunMedium size={18} /> : <MoonStar size={18} />}
          </button>

          <button
            className="lg:hidden text-slate-200"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="navbar-shell glass rounded-2xl mt-2 p-4 lg:hidden"
            >
              <ul className="flex flex-col gap-1">
                {LINKS.map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollTo(link.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-300 ease-in-out ${
                        activeTheme === 'light'
                          ? active === link.id
                            ? 'text-[#2563EB] font-semibold'
                            : 'text-[#334155] hover:text-[#2563EB]'
                          : active === link.id
                            ? 'text-[#38BDF8] font-semibold'
                            : 'text-[rgba(255,255,255,0.75)] hover:text-[#38BDF8]'
                      }`}
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
