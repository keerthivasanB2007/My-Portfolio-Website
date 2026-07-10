import { useEffect, useLayoutEffect, useState } from 'react'
import Lenis from '@studio-freight/lenis'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import JourneyTimeline from './components/JourneyTimeline'
import SkillsGalaxy from './components/SkillsGalaxy'
import Projects from './components/Projects'
import GithubStats from './components/GithubStats'
import LearningDashboard from './components/LearningDashboard'
import Certifications from './components/Certifications'
import Achievements from './components/Achievements'
import CreativeCorner from './components/CreativeCorner'
import Interests from './components/Interests'
import Blog from './components/Blog'
import Experience from './components/Experience'
import Testimonials from './components/Testimonials'
import FunFacts from './components/FunFacts'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import EasterEggs from './components/EasterEggs'

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('theme') || 'dark'
  })

  // Smooth scroll, initialized once loading completes so it doesn't fight
  // with the loader's own transitions.
  useEffect(() => {
    if (loading) return
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })
    let frame
    function raf(time) {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [loading])

  useLayoutEffect(() => {
    if (typeof document === 'undefined') return
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <div
      className="relative bg-void text-slate-200 selection:bg-primary/30 selection:text-slate-50 transition-colors duration-500 ease-out"
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <div className="grain-overlay" />
      <CursorGlow />
      <EasterEggs />

      <Loader onDone={() => setLoading(false)} />

      {!loading && (
        <>
          <Navbar theme={theme} setTheme={setTheme} />
          <main>
            <Hero />
            <About />
            <JourneyTimeline />
            <SkillsGalaxy />
            <Projects />
            <GithubStats />
            <LearningDashboard />
            <Certifications />
            <Achievements />
            <CreativeCorner />
            <Interests />
            <Blog />
            <Experience />
            <Testimonials />
            <FunFacts />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}
