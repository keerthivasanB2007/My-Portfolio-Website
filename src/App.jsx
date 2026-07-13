import { useEffect, useLayoutEffect, useState, lazy, Suspense, useRef } from 'react'
// TEMPORARILY DISABLED FOR PERFORMANCE TEST
// import Lenis from '@studio-freight/lenis'

import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import CursorGlow from './components/CursorGlow'
import EasterEggs from './components/EasterEggs'

const About = lazy(() => import('./components/About'))
const JourneyTimeline = lazy(() => import('./components/JourneyTimeline'))
const SkillsGalaxy = lazy(() => import('./components/SkillsGalaxy'))
const Projects = lazy(() => import('./components/Projects'))
const GithubStats = lazy(() => import('./components/GithubStats'))
const Certifications = lazy(() => import('./components/Certifications'))
const CreativeCorner = lazy(() => import('./components/CreativeCorner'))
const Interests = lazy(() => import('./components/Interests'))
const Experience = lazy(() => import('./components/Experience'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const FunFacts = lazy(() => import('./components/FunFacts'))
const Contact = lazy(() => import('./components/Contact'))
const Footer = lazy(() => import('./components/Footer'))

function SectionLoader() {
  return (
    <div className="w-full py-16 flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
    </div>
  )
}

function DeferredSection({ children, id, height = '400px' }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '250px' }
    )

    const el = ref.current
    if (el) observer.observe(el)

    return () => observer.disconnect()
  }, [])

  return (
    <div id={isVisible ? undefined : id} ref={ref} style={{ minHeight: isVisible ? 'auto' : height }}>
      {isVisible ? children : null}
    </div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.localStorage.getItem('theme') || 'dark'
  })

  // Smooth scroll, initialized once loading completes so it doesn't fight
  // with the loader's own transitions.
  // TEMPORARILY DISABLED FOR PERFORMANCE TEST
  // useEffect(() => {
  //   if (loading) return
  //   const lenis = new Lenis({
  //     duration: 1.1,
  //     easing: (t) => 1 - Math.pow(1 - t, 3),
  //     smoothWheel: true,
  //   })
  //   let frame
  //   function raf(time) {
  //     lenis.raf(time)
  //     frame = requestAnimationFrame(raf)
  //   }
  //   frame = requestAnimationFrame(raf)
  //   return () => {
  //     cancelAnimationFrame(frame)
  //     lenis.destroy()
  //   }
  // }, [loading])

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
            
            <Suspense fallback={<SectionLoader />}>
              <DeferredSection id="about" height="550px">
                <About />
              </DeferredSection>

              <DeferredSection id="journey" height="900px">
                <JourneyTimeline />
              </DeferredSection>

              <DeferredSection id="skills" height="750px">
                <SkillsGalaxy />
              </DeferredSection>

              <DeferredSection id="projects" height="1000px">
                <Projects />
              </DeferredSection>

              <DeferredSection id="github" height="600px">
                <GithubStats />
              </DeferredSection>

              <DeferredSection id="certifications" height="550px">
                <Certifications />
              </DeferredSection>

              <DeferredSection id="creative" height="800px">
                <CreativeCorner />
              </DeferredSection>

              <DeferredSection id="interests" height="500px">
                <Interests />
              </DeferredSection>

              <DeferredSection id="experience" height="350px">
                <Experience />
              </DeferredSection>

              <DeferredSection id="testimonials" height="450px">
                <Testimonials />
              </DeferredSection>

              <DeferredSection id="funfacts" height="350px">
                <FunFacts />
              </DeferredSection>

              <DeferredSection id="contact" height="700px">
                <Contact />
              </DeferredSection>
            </Suspense>
          </main>
          
          <Suspense fallback={<SectionLoader />}>
            <DeferredSection id="footer" height="200px">
              <Footer />
            </DeferredSection>
          </Suspense>
        </>
      )}
    </div>
  )
}
