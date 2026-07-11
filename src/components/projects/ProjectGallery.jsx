import { motion } from 'framer-motion'
import PhoneGallery from './PhoneGallery'
import BrowserGallery from './BrowserGallery'

export default function ProjectGallery({ project, theme, fallbackBanner }) {
  const isLight = theme === 'light'
  const hasScreenshots = project.screenshots && project.screenshots.length > 0

  return (
    <motion.div
      // Subtle float animation
      animate={{
        y: [0, -6, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      // Slight zoom on hover
      whileHover={{ 
        scale: 1.015,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[440px] lg:min-h-full rounded-2xl overflow-hidden border transition-all duration-500 flex flex-col items-center justify-center p-4 sm:p-6 shadow-xl ${
        isLight
          ? 'border-[rgba(148,163,184,0.18)] bg-gradient-to-br from-slate-50 via-white/80 to-slate-100/50 shadow-slate-250/20'
          : 'border-white/5 bg-gradient-to-br from-void-950/60 via-[#090d16]/75 to-void-950/40 backdrop-blur-md shadow-black/60'
      }`}
    >
      {/* Radial soft background glow */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: isLight 
            ? 'radial-gradient(circle at center, rgba(56,189,248,0.08), transparent 70%)'
            : 'radial-gradient(circle at center, rgba(56,189,248,0.12), transparent 70%)'
        }}
      />

      {/* Category and status labels absolute overlay (preserves original UI design) */}
      <div className="absolute top-4 left-4 flex gap-2 z-30">
        <span className={`h-[28px] px-3.5 flex items-center justify-center rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md transition-all duration-300 ${
          isLight 
            ? 'bg-white border-[#dbeafe] text-[#334155]' 
            : 'bg-white/[0.03] border-white/10 text-slate-200'
        }`}>
          {project.category}
        </span>
        <span className={`h-[28px] px-3.5 flex items-center justify-center rounded-full text-[10px] font-bold tracking-wider uppercase border shadow-sm backdrop-blur-md transition-all duration-300 ${
          project.status === 'Completed'
            ? 'bg-[#d1fae5] border-[#a7f3d0] text-[#047857]'
            : 'bg-[#cffafe] border-[#a5f3fc] text-[#0369a1]'
        }`}>
          {project.status}
        </span>
      </div>

      {/* Gallery Content Area */}
      <div className="relative w-full h-full flex flex-col justify-center items-center z-10 mt-6 lg:mt-4">
        {project.id === 'laura-finance-tracker' && hasScreenshots ? (
          <PhoneGallery screenshots={project.screenshots} theme={theme} />
        ) : project.id === 'my-portfolio-website' && hasScreenshots ? (
          <BrowserGallery screenshots={project.screenshots} theme={theme} />
        ) : (
          fallbackBanner
        )}
      </div>
    </motion.div>
  )
}
