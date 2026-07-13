import { useState, memo } from 'react'
import { motion } from 'framer-motion'
import { 
  SiSpringboot, 
  SiDocker
} from 'react-icons/si'
import {
  Code2,
  Monitor,
  Server,
  Database,
  Cpu,
  Wrench,
  Rocket,
  Code,
  Boxes,
  Workflow,
  Network,
  Layers3,
  Brain,
  Blocks
} from 'lucide-react'
import SectionHeading from './SectionHeading'

// Local SVG Logo Imports
import cLogo from '../assets/logos/c-1.svg'
import cppLogo from '../assets/logos/cpp.svg'
import javaLogo from '../assets/logos/java.svg'
import javascriptLogo from '../assets/logos/javascript-1.svg'
import sqlLogo from '../assets/logos/mysql-logo-pure.svg'
import htmlLogo from '../assets/logos/html-1.svg'
import cssLogo from '../assets/logos/css-3.svg'
import reactLogo from '../assets/logos/react-native-1.svg'
import nodeLogo from '../assets/logos/nodejs-2.svg'
import expressLogo from '../assets/logos/express-109.svg'
import oracleLogo from '../assets/logos/oracle-logo.svg'
import mysqlLogo from '../assets/logos/mysql-3.svg'
import gitLogo from '../assets/logos/git-icon.svg'
import githubLogo from '../assets/logos/github-icon-1.svg'
import vscodeLogo from '../assets/logos/vs-code-svgrepo-com.svg'
import intellijLogo from '../assets/logos/intellij-idea-svgrepo-com.svg'
import postmanLogo from '../assets/logos/postman.svg'

// Custom MonitorCog SVG since it is missing in the installed lucide-react version
function MonitorCogIcon({ size = 24, className = '', style = {} }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      width={size} 
      height={size} 
      className={className}
      style={style}
    >
      <rect width="20" height="14" x="2" y="3" rx="2" />
      <path d="M12 17v4" />
      <path d="M8 21h8" />
      <circle cx="12" cy="10" r="3" />
      <path d="M12 6V5" />
      <path d="M12 15v-1" />
      <path d="M8 10H7" />
      <path d="M17 10h-1" />
      <path d="m9.2 7.2.7.7" />
      <path d="m14.1 12.1.7.7" />
      <path d="m9.2 12.8.7-.7" />
      <path d="m14.1 7.9.7-.7" />
    </svg>
  )
}

// LogoTile Component representing a premium collectible card
function LogoTile({ name, icon: Icon, logo, color, shadowColor, badge }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="flex flex-col items-center select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo Card */}
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          scale: isHovered ? 1.05 : 1,
          borderColor: isHovered ? `${color}50` : 'var(--glass-border)',
          boxShadow: isHovered 
            ? `0 25px 50px rgba(0, 0, 0, 0.45), 0 0 30px ${shadowColor}` 
            : '0 10px 30px rgba(0, 0, 0, 0.15)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="logo-tile-card w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] lg:w-[180px] lg:h-[180px] rounded-[28px] flex items-center justify-center p-6 relative overflow-hidden"
      >
        {/* Gradient overlay inside card */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />

        {/* Logo Container (perfectly centered, object-fit contain) */}
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-[70px] h-[70px] sm:w-[80px] sm:h-[80px] lg:w-[90px] lg:h-[90px] flex items-center justify-center text-slate-350"
          style={{ color: isHovered && Icon ? color : undefined }}
        >
          {logo ? (
            <img
              src={logo}
              alt={name}
              className="tech-logo"
            />
          ) : Icon ? (
            <Icon size="100%" className="object-contain" />
          ) : null}
        </motion.div>

        {/* Learning Badge */}
        {badge && (
          <span 
            className="absolute top-3 right-3 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
            style={{ 
              background: `${color}15`, 
              border: `1px solid ${color}30`,
              color: color
            }}
          >
            {badge}
          </span>
        )}
      </motion.div>

      {/* Technology Name below the card (spacing 16px, Inter/sans, 600 weight, centered) */}
      <span 
        className="mt-4 font-body font-semibold text-sm sm:text-base text-slate-300 transition-colors duration-300 text-center"
        style={{ color: isHovered ? '#ffffff' : undefined }}
      >
        {name}
      </span>
    </div>
  )
}

function TechnicalExpertise() {
  const categoriesData = [
    {
      id: 'programming-languages',
      title: 'Programming Languages',
      icon: Code2,
      color: '#38BDF8', // sky
      shadowColor: 'rgba(56, 189, 248, 0.25)',
      skills: [
        { name: 'C', logo: cLogo },
        { name: 'C++', logo: cppLogo },
        { name: 'Java', logo: javaLogo },
        { name: 'JavaScript', logo: javascriptLogo },
        { name: 'SQL', logo: sqlLogo },
      ],
      layout: 'tiles',
    },
    {
      id: 'frontend-technologies',
      title: 'Frontend Technologies',
      icon: Monitor,
      color: '#14B8A6', // teal
      shadowColor: 'rgba(20, 184, 166, 0.25)',
      skills: [
        { name: 'HTML', logo: htmlLogo },
        { name: 'CSS', logo: cssLogo },
        { name: 'React', logo: reactLogo },
      ],
      layout: 'tiles',
    },
    {
      id: 'backend-technologies',
      title: 'Backend Technologies',
      icon: Server,
      color: '#A855F7', // purple
      shadowColor: 'rgba(168, 85, 247, 0.25)',
      skills: [
        { name: 'Node.js', logo: nodeLogo },
        { name: 'Express', logo: expressLogo },
      ],
      layout: 'tiles',
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: Database,
      color: '#10B981', // emerald
      shadowColor: 'rgba(16, 185, 129, 0.25)',
      skills: [
        { name: 'Oracle Database', logo: oracleLogo },
        { name: 'SQL', logo: mysqlLogo },
      ],
      layout: 'tiles',
    },
    {
      id: 'core-computer-science',
      title: 'Core Computer Science',
      icon: Cpu,
      color: '#6366F1', // indigo
      shadowColor: 'rgba(99, 102, 241, 0.25)',
      skills: [
        { name: 'Programming in C', icon: Code },
        { name: 'Object-Oriented Programming', icon: Boxes },
        { name: 'Data Structures', icon: Database },
        { name: 'Design and Analysis of Algorithms', icon: Workflow },
        { name: 'Database Management System', icon: Server },
        { name: 'Operating Systems', icon: MonitorCogIcon },
        { name: 'Networks & Data Communication', icon: Network },
        { name: 'Software Engineering', icon: Layers3 },
        { name: 'Theory of Computation', icon: Brain },
      ],
      layout: 'chips', // Premium rounded chips for Core Computer Science Concepts
    },
    {
      id: 'developer-tools',
      title: 'Developer Tools',
      icon: Wrench,
      color: '#06B6D4', // cyan
      shadowColor: 'rgba(6, 182, 212, 0.25)',
      skills: [
        { name: 'Git', logo: gitLogo },
        { name: 'GitHub', logo: githubLogo },
        { name: 'VS Code', logo: vscodeLogo },
        { name: 'IntelliJ', logo: intellijLogo },
        { name: 'Postman', logo: postmanLogo },
      ],
      layout: 'tiles',
    },
    {
      id: 'currently-learning',
      title: 'Currently Learning',
      icon: Rocket,
      color: '#FACC15', // yellow
      shadowColor: 'rgba(250, 204, 21, 0.25)',
      skills: [
        { name: 'Advanced Java', icon: Code2, subtitle: 'Building scalable Java applications' },
        { name: 'Operating Systems', icon: MonitorCogIcon, subtitle: 'Understanding processes, memory and scheduling' },
        { name: 'Networks and Data Communication', icon: Network, subtitle: 'Learning computer networking fundamentals' },
        { name: 'Theory of Computation', icon: Brain, subtitle: 'Exploring automata, grammars and computability' },
      ],
      layout: 'learning-grid',
      colSpan: true,
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  return (
    <div className="mt-28 w-full">
      {/* Inject style tag to handle responsive Light/Dark theme backgrounds for the Logo Tiles */}
      <style>{`
        .logo-tile-card {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid var(--glass-border);
          transition: background-color 300ms ease-in-out, border-color 300ms ease-in-out, box-shadow 300ms ease-in-out;
        }
        [data-theme='light'] .logo-tile-card {
          background: rgba(255, 255, 255, 0.85);
          border: 1px solid var(--glass-border);
        }
        .tech-logo {
          width: 90px;
          height: 90px;
          object-fit: contain;
          display: block;
        }
      `}</style>

      <SectionHeading
        title="Technical Expertise"
        subtitle="A categorized overview of the programming languages, technologies, computer science concepts, databases, and developer tools I use while building software."
        center
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
      >
        {categoriesData.map((category) => {
          const CategoryIcon = category.icon

          return (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{
                y: -4,
                scale: 1.01,
                borderColor: `${category.color}40`,
                boxShadow: `0 20px 45px rgba(0, 0, 0, 0.25), 0 0 15px ${category.shadowColor}`,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`group glass rounded-[24px] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden ${
                category.colSpan ? 'md:col-span-2' : ''
              }`}
            >
              {/* Subtle background glow matching theme */}
              <div 
                className="absolute -right-20 -top-20 w-40 h-40 rounded-full blur-[80px] pointer-events-none transition-opacity duration-300 opacity-10 group-hover:opacity-20"
                style={{ background: category.color }}
              />

              <div>
                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div 
                    className="p-3 rounded-2xl bg-white/[0.03] dark:bg-slate-900/[0.4] border border-white/10 flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ color: category.color, borderColor: `${category.color}30` }}
                  >
                    <CategoryIcon size={24} />
                  </div>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-150 transition-colors group-hover:text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills Container */}
                {category.layout === 'tiles' ? (
                  // Grid/Flex layout of Logo Tiles
                  <div className="flex flex-wrap justify-center sm:justify-start gap-6 lg:gap-8 mt-4">
                    {category.skills.map((skill, index) => (
                      <LogoTile
                        key={index}
                        name={skill.name}
                        icon={skill.icon}
                        logo={skill.logo}
                        color={category.color}
                        shadowColor={category.shadowColor}
                        badge={skill.badge}
                      />
                    ))}
                  </div>
                ) : category.layout === 'learning-grid' ? (
                  // 2x2 Grid for Currently Learning roadmap
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 mt-4">
                    {category.skills.map((skill, index) => {
                      const SkillIcon = skill.icon
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ 
                            y: -4, 
                            scale: 1.01,
                            boxShadow: `0 10px 25px rgba(59, 130, 246, 0.08)`, 
                          }}
                          className="p-5 flex items-start gap-4 rounded-[16px] border border-slate-200/50 bg-white/70 shadow-sm transition-all duration-300 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-[#38bdf8]/45 dark:hover:shadow-glow/10 group/item cursor-default select-none"
                        >
                          {/* Icon Container */}
                          <div 
                            className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-center text-[#38bdf8] dark:bg-white/[0.02] dark:border-white/10 dark:text-primary transition-all duration-300 group-hover/item:scale-110"
                          >
                            <SkillIcon size={20} />
                          </div>
                          
                          {/* Title & Subtitle */}
                          <div className="flex flex-col gap-0.5">
                            <span className="font-display font-bold text-base text-[#111827] dark:text-slate-100 transition-colors duration-300 group-hover/item:text-primary">
                              {skill.name}
                            </span>
                            <span className="font-body text-xs text-[#64748b] dark:text-slate-400 leading-relaxed font-medium">
                              {skill.subtitle}
                            </span>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                ) : (
                  // Premium rounded chips for Core Computer Science Concepts
                  <div className="flex flex-wrap gap-3 mt-4">
                    {category.skills.map((skill, index) => {
                      const SkillIcon = skill.icon
                      return (
                        <motion.div
                          key={index}
                          whileHover={{ scale: 1.05, borderColor: `${category.color}60` }}
                          className="flex items-center gap-2.5 pl-2.5 pr-4 py-1.5 rounded-full glass-strong border border-white/5 bg-white/[0.01] hover:bg-white/[0.04] transition-all duration-300 cursor-default select-none"
                          style={{
                            boxShadow: `0 4px 15px rgba(0, 0, 0, 0.08)`,
                          }}
                        >
                          {/* Circle badge for the icon */}
                          <div 
                            className="w-7 h-7 rounded-full flex items-center justify-center"
                            style={{ 
                              background: `${category.color}15`, 
                              border: `1px solid ${category.color}30`,
                              color: category.color
                            }}
                          >
                            <SkillIcon size={14} />
                          </div>
                          <span className="text-xs font-semibold tracking-wide text-slate-200">
                            {skill.name}
                          </span>
                        </motion.div>
                      )
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

export default memo(TechnicalExpertise)
