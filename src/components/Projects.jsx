import { useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, Star, GitFork, AlertCircle, BookOpen } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'
import ProjectGallery from './projects/ProjectGallery'

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

const ProjectBanner = memo(function ProjectBanner({ repoName, title, stack, category, theme }) {
  const isLight = theme === 'light'

  return (
    <div 
      className={`w-full h-full flex flex-col items-center justify-center p-8 text-center select-none relative overflow-hidden min-h-[260px] lg:min-h-full transition-all duration-500 ${
        isLight 
          ? 'bg-white' 
          : 'bg-[#070b15]/40'
      }`}
    >
      {/* Radial Blue Glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isLight 
            ? 'radial-gradient(circle at center, rgba(59,130,246,0.12), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(56,189,248,0.15), transparent 60%)'
        }}
      />

      {/* Floating Logo / Tech Icons */}
      <div className="flex gap-3.5 mb-6 z-10">
        {stack.slice(0, 3).map((tech) => (
          <motion.div
            key={tech}
            whileHover={{ y: -4, scale: 1.05 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-sm transition-all duration-300 ${
              isLight 
                ? 'bg-white border-slate-100 text-[#334155] shadow-slate-200/40' 
                : 'bg-white/[0.03] border-white/10 text-slate-300 shadow-black/20'
            }`}
            style={{
              backdropFilter: 'blur(8px)'
            }}
          >
            <div className="flex items-center justify-center pl-1">
              <TechLogo tech={tech} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Title Centered */}
      <h4 className={`font-display font-bold text-xl max-w-xs z-10 leading-snug mb-3 tracking-tight ${
        isLight ? 'text-[#334155]' : 'text-slate-100'
      }`}>
        {title}
      </h4>

      {/* Project Category Label Below */}
      <span className={`text-[10px] uppercase tracking-widest font-extrabold z-10 ${
        isLight ? 'text-slate-400' : 'text-primary/80'
      }`}>
        {category}
      </span>
    </div>
  )
})

const ProjectCard = memo(function ProjectCard({ project, githubDataForRepo, loading, theme, index }) {
  const isLight = theme === 'light'
  const repoUrl = githubDataForRepo?.html_url || project.github || `https://github.com/keerthivasanB2007/${project.repoName}`
  const homepageUrl = githubDataForRepo?.homepage || project.demo

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      whileHover={{
        y: -6,
        scale: 1.005,
        boxShadow: isLight
          ? '0 20px 50px rgba(15, 23, 42, 0.15)'
          : '0 0 50px -10px rgba(56, 189, 248, 0.45)'
      }}
      className={`rounded-[24px] p-6 sm:p-10 lg:p-12 overflow-hidden transition-all duration-300 relative group w-full border ${
        isLight 
          ? 'bg-white border-[rgba(148,163,184,0.18)] shadow-[0_12px_40px_rgba(15,23,42,0.08)]' 
          : 'glass border-white/10 shadow-2xl'
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.8fr] gap-8 items-stretch">

        {/* Left Column: Preview Panel */}
        <ProjectGallery
          project={project}
          theme={theme}
          fallbackBanner={
            <ProjectBanner
              repoName={project.repoName}
              title={project.title}
              stack={project.stack}
              category={project.category}
              theme={theme}
            />
          }
        />

        {/* Right Column: Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h3 className={`font-display font-bold text-[28px] md:text-[32px] lg:text-[36px] tracking-tight transition-colors duration-300 ${
              isLight 
                ? 'bg-gradient-to-r from-[#38bdf8] to-[#0ea5e9] bg-clip-text text-transparent' 
                : 'text-slate-100 group-hover:text-[#38bdf8]'
            }`}>
              {project.title}
            </h3>
            <p className={`text-[17px] leading-[1.8] max-w-[620px] mt-4 mb-6 transition-colors duration-300 ${
              isLight ? 'text-[#64748b]' : 'text-slate-350'
            }`}>
              {project.description}
            </p>

            {/* Features List */}
            <div className="mt-6">
              <p className={`text-[12px] font-bold uppercase tracking-[0.12em] mb-[14px] flex items-center gap-1.5 transition-colors duration-300 ${
                isLight ? 'text-[#334155]' : 'text-slate-400'
              }`}>
                Key Features
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-[16px] leading-[1.8] text-slate-500 dark:text-slate-450 mt-4">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="text-[#3b82f6] dark:text-[#38bdf8] font-bold mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Chips */}
            <div className="mt-6">
              <p className={`text-[12px] font-bold uppercase tracking-[0.12em] mb-[14px] transition-colors duration-300 ${
                isLight ? 'text-[#334155]' : 'text-slate-400'
              }`}>
                Technologies Used
              </p>
              <div className="flex flex-wrap gap-2.5 mt-4">
                {project.stack.map((tech) => (
                  <motion.span
                    key={tech}
                    whileHover={{ scale: 1.03, y: -2 }}
                    className={`h-[34px] px-3.5 inline-flex items-center gap-2 rounded-full border text-[13px] font-semibold shadow-sm transition-all duration-250 ${
                      isLight 
                        ? 'border-[#e2e8f0] bg-[#f8fafc] text-[#334155] hover:bg-white hover:border-[#3b82f6] hover:shadow-blue-500/5' 
                        : 'border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/[0.06] hover:border-[#38bdf8]'
                    }`}
                  >
                    <TechLogo tech={tech} />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* GitHub Stats */}
            <div className="mt-6">
              <div className="h-[1px] w-full bg-[rgba(226,232,240,0.8)] dark:bg-white/10 my-8" />
              
              <p className={`text-[12px] font-bold uppercase tracking-[0.12em] mb-[14px] flex items-center gap-1.5 transition-colors duration-300 ${
                isLight ? 'text-[#334155]' : 'text-slate-400'
              }`}>
                <Github size={14} className="text-slate-400 dark:text-slate-550" /> GitHub Repository Statistics
              </p>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4 text-xs text-slate-550 dark:text-slate-400">
                <span className="font-semibold text-[#334155] dark:text-slate-355">
                  {githubDataForRepo?.name || project.repoName}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-650" />
                <span className="text-[9px] uppercase tracking-wider bg-slate-105 dark:bg-white/5 border border-slate-200 dark:border-white/10 px-1.5 py-0.5 rounded font-bold text-slate-550 dark:text-slate-400">
                  {githubDataForRepo?.visibility || 'public'}
                </span>
                {githubDataForRepo?.language && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-650" />
                    <span className="flex items-center gap-1 font-medium text-slate-650 dark:text-slate-450">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: getLanguageColor(githubDataForRepo.language) }}
                      />
                      {githubDataForRepo.language}
                    </span>
                  </>
                )}
              </div>

              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <div key={idx} className="animate-pulse h-[72px] bg-slate-800/30 rounded-xl" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className={`flex-1 h-[72px] flex flex-col items-center justify-center rounded-[16px] border shadow-sm transition-all duration-300 ${
                      isLight 
                        ? 'border-[#e2e8f0] bg-white hover:border-[#3b82f6]/30 hover:shadow-md' 
                        : 'border-white/10 bg-white/[0.03] hover:border-[#38bdf8]/30'
                    }`}
                  >
                    <p className="text-slate-400 dark:text-slate-550 uppercase tracking-widest text-[9px] font-bold mb-0.5">Stars</p>
                    <p className={`font-display font-extrabold text-lg transition-colors duration-300 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {githubDataForRepo?.stars !== undefined ? githubDataForRepo.stars : 0}
                    </p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className={`flex-1 h-[72px] flex flex-col items-center justify-center rounded-[16px] border shadow-sm transition-all duration-300 ${
                      isLight 
                        ? 'border-[#e2e8f0] bg-white hover:border-[#3b82f6]/30 hover:shadow-md' 
                        : 'border-white/10 bg-white/[0.03] hover:border-[#38bdf8]/30'
                    }`}
                  >
                    <p className="text-slate-400 dark:text-slate-550 uppercase tracking-widest text-[9px] font-bold mb-0.5">Forks</p>
                    <p className={`font-display font-extrabold text-lg transition-colors duration-300 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {githubDataForRepo?.forks !== undefined ? githubDataForRepo.forks : 0}
                    </p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className={`flex-1 h-[72px] flex flex-col items-center justify-center rounded-[16px] border shadow-sm transition-all duration-300 ${
                      isLight 
                        ? 'border-[#e2e8f0] bg-white hover:border-[#3b82f6]/30 hover:shadow-md' 
                        : 'border-white/10 bg-white/[0.03] hover:border-[#38bdf8]/30'
                    }`}
                  >
                    <p className="text-slate-400 dark:text-slate-550 uppercase tracking-widest text-[9px] font-bold mb-0.5">Open Issues</p>
                    <p className={`font-display font-extrabold text-lg transition-colors duration-300 ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>
                      {githubDataForRepo?.openIssues !== undefined ? githubDataForRepo.openIssues : 0}
                    </p>
                  </motion.div>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className={`flex-1 h-[72px] flex flex-col items-center justify-center rounded-[16px] border shadow-sm transition-all duration-300 ${
                      isLight 
                        ? 'border-[#e2e8f0] bg-white hover:border-[#3b82f6]/30 hover:shadow-md' 
                        : 'border-white/10 bg-white/[0.03] hover:border-[#38bdf8]/30'
                    }`}
                  >
                    <p className="text-slate-400 dark:text-slate-550 uppercase tracking-widest text-[9px] font-bold mb-0.5">License</p>
                    <p className={`font-display font-extrabold text-sm truncate w-full px-1 text-center transition-colors duration-300 ${isLight ? 'text-slate-800' : 'text-slate-200'}`} title={githubDataForRepo?.license || 'None'}>
                      {githubDataForRepo?.license || 'None'}
                    </p>
                  </motion.div>
                </div>
              )}

              {!loading && githubDataForRepo?.lastUpdated && (
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3.5 text-right italic font-medium">
                  Last synchronized: {new Date(githubDataForRepo.lastUpdated).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>

          {/* Buttons container */}
          <div className="flex flex-wrap gap-3.5 mt-8">
            {project.id === 'laura-finance-tracker' && (
              <>
                {homepageUrl && (
                  <motion.a
                    href={homepageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                      isLight 
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                        : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                    }`}
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </motion.a>
                )}
                <motion.a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                    isLight 
                      ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                      : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                  }`}
                >
                  <Github size={16} />
                  View Repository
                </motion.a>
                <motion.a
                  href={`${repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 border ${
                    isLight 
                      ? 'border-[#dbeafe] bg-white text-[#334155] shadow-sm hover:border-[#3b82f6] hover:bg-[#f0f9ff] hover:shadow-md' 
                      : 'border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] hover:border-[#38bdf8]'
                  }`}
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
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                      isLight 
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                        : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                    }`}
                  >
                    <ExternalLink size={16} />
                    Live Website
                  </motion.a>
                )}
                <motion.a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                    isLight 
                      ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                      : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                  }`}
                >
                  <Github size={16} />
                  View Repository
                </motion.a>
                <motion.a
                  href={`${repoUrl}#readme`}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 border ${
                    isLight 
                      ? 'border-[#dbeafe] bg-white text-[#334155] shadow-sm hover:border-[#3b82f6] hover:bg-[#f0f9ff] hover:shadow-md' 
                      : 'border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06] hover:border-[#38bdf8]'
                  }`}
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
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                      isLight 
                        ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                        : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                    }`}
                  >
                    <ExternalLink size={16} />
                    Live Website
                  </motion.a>
                )}
                <motion.a
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02, y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className={`h-[46px] px-[22px] inline-flex items-center justify-center gap-2 rounded-[14px] text-sm font-semibold transition-all duration-300 ${
                    isLight 
                      ? 'bg-gradient-to-r from-[#38bdf8] to-[#3b82f6] text-white shadow-[0_10px_24px_rgba(59,130,246,0.25)] hover:brightness-110' 
                      : 'bg-gradient-to-r from-primary to-accent text-white dark:text-slate-950 hover:shadow-glow'
                  }`}
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
                  license: repo.license?.spdx_id || 'None',
                  lastUpdated: repo.updated_at,
                  visibility: repo.visibility,
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
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            githubDataForRepo={githubData[project.repoName]}
            loading={loading}
            theme={theme}
          />
        ))}
      </div>
    </section>
  )
}
