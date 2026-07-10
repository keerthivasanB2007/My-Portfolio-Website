import { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, AlertCircle, BookOpen } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'

// Local SVG assets imported
import cssLogo from '../assets/logos/css-3.svg'
import htmlLogo from '../assets/logos/html-1.svg'
import javaLogo from '../assets/logos/java.svg'
import jsLogo from '../assets/logos/javascript-1.svg'
import githubLogo from '../assets/logos/github-icon-1.svg'

const LANGUAGE_COLORS = {
  Java: '#b07219',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  Shell: '#89e051',
}

function getLanguageColor(language) {
  if (!language) return '#64748B'
  return LANGUAGE_COLORS[language] || '#38BDF8'
}

function TechLogo({ tech }) {
  const normalized = tech.toLowerCase().trim()

  if (normalized === 'css') {
    return <img src={cssLogo} className="w-4 h-4 mr-1.5 object-contain shrink-0" alt="CSS logo" />
  }
  if (normalized === 'html') {
    return <img src={htmlLogo} className="w-4 h-4 mr-1.5 object-contain shrink-0" alt="HTML logo" />
  }
  if (normalized === 'java') {
    return <img src={javaLogo} className="w-4 h-4 mr-1.5 object-contain shrink-0" alt="Java logo" />
  }
  if (normalized === 'javascript') {
    return <img src={jsLogo} className="w-4 h-4 mr-1.5 object-contain shrink-0" alt="JS logo" />
  }
  if (normalized === 'github') {
    return <img src={githubLogo} className="w-4 h-4 mr-1.5 object-contain shrink-0" alt="GitHub logo" />
  }

  // Inline SVGs for other key tech stack items
  if (normalized === 'react') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="-11.5 -10.2 23 20.4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    )
  }
  if (normalized === 'kotlin') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 24H0V0h24L12 12L24 24z" fill="url(#kotlin-grad)" />
        <defs>
          <linearGradient id="kotlin-grad" x1="24" y1="0" x2="0" y2="24" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#E44857" />
            <stop offset="0.468" stopColor="#C10E86" />
            <stop offset="1" stopColor="#0095D5" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
  if (normalized === 'vite') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.8 3.8l9.9 17.1c.8 1.4-.2 3.1-1.8 3.1H5.1c-1.6 0-2.6-1.7-1.8-3.1L13.2 3.8c.8-1.4 2.8-1.4 3.6 0z" fill="url(#vite-grad1)" />
        <path d="M16 5.8L7.3 20.8h17.4L16 5.8z" fill="url(#vite-grad2)" />
        <path d="M16 11l-3 6.5h2.5v3.5l4.5-5.5h-3L16 11z" fill="#FFC517" />
        <defs>
          <linearGradient id="vite-grad1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#41D1FF" />
            <stop offset="1" stopColor="#BD34FE" />
          </linearGradient>
          <linearGradient id="vite-grad2" x1="16" y1="5" x2="16" y2="21" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFC517" />
            <stop offset="1" stopColor="#FE2857" />
          </linearGradient>
        </defs>
      </svg>
    )
  }
  if (normalized === 'three.js') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" fill="none" stroke="#fff" />
        <line x1="12" y1="22" x2="12" y2="12" stroke="#fff" />
        <line x1="12" y1="12" x2="22" y2="8.5" stroke="#fff" />
        <line x1="12" y1="12" x2="2" y2="8.5" stroke="#fff" />
      </svg>
    )
  }
  if (normalized === 'framer motion') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0H24L12 12L0 0ZM0 12H24L12 24L0 12Z" />
      </svg>
    )
  }
  if (normalized === 'gsap') {
    return (
      <span className="text-[9px] font-black bg-gradient-to-r from-green-400 to-green-500 text-slate-950 px-1 py-0.5 rounded mr-1.5 leading-none shrink-0">
        G
      </span>
    )
  }
  if (normalized === 'sqlite / room' || normalized === 'sqlite' || normalized === 'room') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00A2E8" />
        <path d="M3 5v6c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#00A2E8" />
        <path d="M3 11v6c0 1.66 4 3 9 3s9-1.34 9-3v-6" stroke="#00A2E8" />
      </svg>
    )
  }
  if (normalized === 'android studio') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4 6h-4v2h4v2h-4v2h4v2H9V7h6v2z" fill="#3DDC84" />
      </svg>
    )
  }
  if (normalized === 'xml') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="16 18 22 12 16 6" stroke="#38bdf8" />
        <polyline points="8 6 2 12 8 18" stroke="#38bdf8" />
        <line x1="14" y1="4" x2="10" y2="20" stroke="#38bdf8" />
      </svg>
    )
  }
  if (normalized === 'material design') {
    return (
      <svg className="w-4 h-4 mr-1.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 22h20L12 2zm0 3.99L18.47 18H5.53L12 5.99z" fill="#757575" />
      </svg>
    )
  }

  return (
    <svg className="w-4 h-4 mr-1.5 text-slate-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  )
}

const ProjectBanner = memo(function ProjectBanner({ repoName, title, stack, category }) {
  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/keerthivasanB2007/${repoName}/main/screenshot.png`
  )
  const [hasError, setHasError] = useState(false)

  const handleImageError = () => {
    setHasError(true)
  }

  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-void-950 via-void-900 to-primary/20 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden group-hover:scale-105 transition-transform duration-500 min-h-[220px]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.15),transparent_60%)] pointer-events-none" />
        <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />

        <div className="flex gap-3 mb-4 z-10">
          {stack.slice(0, 3).map((tech) => (
            <div
              key={tech}
              className="w-10 h-10 rounded-xl glass flex items-center justify-center border border-white/10 shadow-lg text-slate-300"
              style={{
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                backdropFilter: 'blur(4px)'
              }}
            >
              <TechLogo tech={tech} />
            </div>
          ))}
        </div>

        <span className="text-[10px] uppercase tracking-widest text-primary/80 mb-1.5 font-bold z-10">
          {category}
        </span>
        <h4 className="font-display font-bold text-xl text-slate-100 max-w-xs z-10 leading-snug">
          {title}
        </h4>
      </div>
    )
  }

  return (
    <img
      src={imgSrc}
      alt={`${title} screenshot`}
      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 min-h-[220px]"
      loading="lazy"
      onError={handleImageError}
    />
  )
})

export default function Projects() {
  const [githubData, setGithubData] = useState({})
  const [loading, setLoading] = useState(true)
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

  useEffect(() => {
    let active = true
    const fetchRepoData = async () => {
      try {
        const dataMap = {}
        const promises = projects.map(async (project) => {
          try {
            const res = await fetch(`https://api.github.com/repos/keerthivasanB2007/${project.repoName}`)
            if (res.ok) {
              const repo = await res.json()
              return {
                repoName: project.repoName,
                data: {
                  name: repo.name,
                  description: repo.description,
                  language: repo.language,
                  stars: repo.stargazers_count,
                  forks: repo.forks_count,
                  openIssues: repo.open_issues_count,
                  lastUpdated: repo.updated_at,
                  visibility: repo.visibility,
                  license: repo.license ? repo.license.spdx_id || repo.license.name : null,
                  homepage: repo.homepage,
                  html_url: repo.html_url
                }
              }
            }
          } catch (e) {
            console.error(`Failed to fetch stats for ${project.repoName}:`, e)
          }
          return { repoName: project.repoName, data: null }
        })

        const results = await Promise.all(promises)
        if (!active) return

        results.forEach(({ repoName, data }) => {
          if (data) {
            dataMap[repoName] = data
          }
        })
        setGithubData(dataMap)
      } catch (err) {
        console.error('Error fetching repositories stats:', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchRepoData()
    return () => {
      active = false
    }
  }, [])

  return (
    <section id="projects" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Featured Work"
        title="Featured Projects"
        subtitle="A collection of projects that reflect my journey in software engineering, backend development, Android application development, and modern web technologies."
      />

      <div className="mt-14 flex flex-col gap-10 w-full">
        {projects.map((project, i) => {
          const repoUrl = githubData[project.repoName]?.html_url || project.github || `https://github.com/keerthivasanB2007/${project.repoName}`
          const homepageUrl = githubData[project.repoName]?.homepage || project.demo

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              whileHover={{
                y: -8,
                scale: 1.005,
                boxShadow: theme === 'light'
                  ? '0 20px 40px -10px rgba(15, 23, 42, 0.1), inset 0 0 20px rgba(0,0,0,0.01)'
                  : '0 0 50px -10px rgba(56, 189, 248, 0.45), inset 0 0 20px rgba(255,255,255,0.02)'
              }}
              className="glass rounded-3xl p-6 sm:p-8 overflow-hidden transition-all duration-300 border border-slate-200 dark:border-white/10 relative group w-full"
            >
              <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-stretch">

                {/* Left Column: Banner */}
                <div className="relative aspect-video lg:aspect-auto lg:h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-void-950/80 border border-slate-200/50 dark:border-white/5 group">
                  <ProjectBanner
                    repoName={project.repoName}
                    title={project.title}
                    stack={project.stack}
                    category={project.category}
                  />
                  <div className="absolute top-3 left-3 flex gap-2 z-10">
                    <span className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-900/85 text-slate-700 dark:text-slate-300 backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-semibold border ${project.status === 'Active'
                        ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : 'border-secondary/30 bg-secondary/15 text-[#0d9488] dark:text-secondary'
                      } backdrop-blur-md`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Right Column: Details */}
                <div className="flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mt-3">
                      {project.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
                        Key Features
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-500 dark:text-slate-400">
                        {project.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <span className="text-primary mt-1 text-xs">✓</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tech Stack Chips */}
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400 font-semibold mb-2">
                        Technologies Used
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
                          <motion.span
                            key={tech}
                            whileHover={{ scale: 1.08, boxShadow: '0 0 15px rgba(56, 189, 248, 0.45)' }}
                            className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-900/60 text-slate-700 dark:text-slate-200"
                          >
                            <TechLogo tech={tech} />
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {/* GitHub Stats */}
                    <div className="mt-6 border-t border-slate-200 dark:border-white/10 pt-5">
                      <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-400 font-semibold mb-3 flex items-center gap-1.5">
                        <Github size={14} className="text-slate-400 dark:text-slate-400" /> GitHub Repository Statistics
                      </p>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3 text-xs text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {githubData[project.repoName]?.name || project.repoName}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
                        <span className="text-[9px] uppercase tracking-wider bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded text-slate-550 dark:text-slate-400">
                          {githubData[project.repoName]?.visibility || 'public'}
                        </span>
                        {githubData[project.repoName]?.language && (
                          <>
                            <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600" />
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: getLanguageColor(githubData[project.repoName].language) }}
                              />
                              {githubData[project.repoName].language}
                            </span>
                          </>
                        )}
                      </div>

                      {loading ? (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          {Array.from({ length: 4 }).map((_, idx) => (
                            <div key={idx} className="animate-pulse h-12 bg-slate-800/30 rounded-xl" />
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          <div className="glass-strong rounded-xl p-2.5 text-center border border-slate-200 dark:border-white/5">
                            <p className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">Stars</p>
                            <p className="font-display font-semibold text-slate-800 dark:text-slate-200 text-sm">
                              {githubData[project.repoName]?.stars !== undefined ? githubData[project.repoName].stars : 0}
                            </p>
                          </div>
                          <div className="glass-strong rounded-xl p-2.5 text-center border border-slate-200 dark:border-white/5">
                            <p className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">Forks</p>
                            <p className="font-display font-semibold text-slate-800 dark:text-slate-200 text-sm">
                              {githubData[project.repoName]?.forks !== undefined ? githubData[project.repoName].forks : 0}
                            </p>
                          </div>
                          <div className="glass-strong rounded-xl p-2.5 text-center border border-slate-200 dark:border-white/5">
                            <p className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">Open Issues</p>
                            <p className="font-display font-semibold text-slate-800 dark:text-slate-200 text-sm">
                              {githubData[project.repoName]?.openIssues !== undefined ? githubData[project.repoName].openIssues : 0}
                            </p>
                          </div>
                          <div className="glass-strong rounded-xl p-2.5 text-center border border-slate-200 dark:border-white/5">
                            <p className="text-slate-500 uppercase tracking-widest text-[9px] mb-0.5">License</p>
                            <p className="font-display font-semibold text-slate-800 dark:text-slate-200 text-sm truncate" title={githubData[project.repoName]?.license || 'None'}>
                              {githubData[project.repoName]?.license || 'None'}
                            </p>
                          </div>
                        </div>
                      )}

                      {!loading && githubData[project.repoName]?.lastUpdated && (
                        <p className="text-[10px] text-slate-550 dark:text-slate-500 mt-2.5 text-right italic">
                          Last synchronized: {new Date(githubData[project.repoName].lastUpdated).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons container */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    {project.id === 'laura-finance-tracker' && (
                      <>
                        {homepageUrl && (
                          <motion.a
                            href={homepageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 text-sm font-semibold hover:shadow-glow transition-shadow duration-300"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </motion.a>
                        )}
                        <motion.a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-primary/45 hover:bg-primary/5 dark:hover:bg-primary/10 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-300"
                        >
                          <Github size={16} />
                          View Repository
                        </motion.a>
                        <motion.a
                          href={`${repoUrl}#readme`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/40 hover:border-accent/45 hover:bg-accent/5 dark:hover:bg-accent/10 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-300"
                        >
                          <BookOpen size={16} />
                          Read Documentation
                        </motion.a>
                      </>
                    )}

                    {project.id === 'my-portfolio-website' && (
                      <>
                        {homepageUrl && (
                          <motion.a
                            href={homepageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 text-sm font-semibold hover:shadow-glow transition-shadow duration-300"
                          >
                            <ExternalLink size={16} />
                            Live Website
                          </motion.a>
                        )}
                        <motion.a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-primary/45 hover:bg-primary/5 dark:hover:bg-primary/10 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-300"
                        >
                          <Github size={16} />
                          View Repository
                        </motion.a>
                        <motion.a
                          href={`${repoUrl}#readme`}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-slate-900/40 hover:border-accent/45 hover:bg-accent/5 dark:hover:bg-accent/10 text-slate-700 dark:text-slate-300 text-sm font-semibold transition-all duration-300"
                        >
                          <BookOpen size={16} />
                          Source Code
                        </motion.a>
                      </>
                    )}

                    {project.id === 'my-first-website' && (
                      <>
                        {homepageUrl && (
                          <motion.a
                            href={homepageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 text-sm font-semibold hover:shadow-glow transition-shadow duration-300"
                          >
                            <ExternalLink size={16} />
                            Live Website
                          </motion.a>
                        )}
                        <motion.a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] hover:border-primary/45 hover:bg-primary/5 dark:hover:bg-primary/10 text-slate-700 dark:text-slate-200 text-sm font-semibold transition-all duration-300"
                        >
                          <Github size={16} />
                          View Repository
                        </motion.a>
                      </>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

