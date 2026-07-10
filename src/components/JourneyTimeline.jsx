import { useRef } from 'react'
import { Award, BookOpen, Brain, Code, Database, GraduationCap, Laptop, Rocket, School } from 'lucide-react'
import { motion, useScroll } from 'framer-motion'
import { journey } from '../data/timeline'
import SectionHeading from './SectionHeading'

const statusColor = {
  done: 'bg-secondary',
  active: 'bg-highlight',
  upcoming: 'bg-slate-600',
}

const iconMap = {
  Award,
  BookOpen,
  Brain,
  Code,
  Database,
  GraduationCap,
  Laptop,
  Rocket,
  School,
}

export default function JourneyTimeline() {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 75%', 'end 35%'],
  })

  return (
    <section id="journey" className="relative py-28 px-6 max-w-4xl mx-auto">
      <SectionHeading
        eyebrow="Journey Timeline"
        title="Engineering Journey"
        subtitle="From classroom curiosity to building real software systems."
        center
      />

      <div ref={timelineRef} className="mt-16 relative">
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-slate-800/70 sm:-translate-x-1/2" />
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px origin-top bg-gradient-to-b from-primary via-accent to-transparent sm:-translate-x-1/2"
        />

        <div className="space-y-8 sm:space-y-10">
          {journey.map((item, i) => {
            const leftSide = i % 2 === 0
            const Icon = iconMap[item.icon] || GraduationCap

            return (
              <motion.div
                key={item.title + item.year}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex sm:items-center gap-6 pl-12 sm:pl-0 ${
                  leftSide ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                <div
                  className={`absolute left-4 sm:left-1/2 top-1.5 w-3 h-3 rounded-full sm:-translate-x-1/2 ring-4 ring-void ${statusColor[item.status]}`}
                />
                <div className="sm:w-1/2" />
                <div className={`sm:w-1/2 ${leftSide ? 'sm:pr-10 sm:text-right' : 'sm:pl-10'}`}>
                  <motion.div
                    whileHover={{ y: -4, scale: 1.02 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="glass rounded-xl p-5 inline-block text-left hover:shadow-glow transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                        <Icon size={20} />
                      </div>

                      <div className="min-w-0">
                        <span className="text-xs font-display tracking-widest text-primary">{item.year}</span>
                        <h3 className="font-display font-semibold text-lg text-slate-100 mt-1">{item.title}</h3>

                        {item.institution && (
                          <p className="text-sm font-medium text-slate-300 mt-2">{item.institution}</p>
                        )}
                      </div>
                    </div>

                    {item.badges && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}

                    {item.highlights && (
                      <div className="mt-4 space-y-1">
                        {item.highlights.map((highlight) => (
                          <p key={highlight} className="text-sm text-slate-300">{highlight}</p>
                        ))}
                      </div>
                    )}

                    {item.coreSubject && (
                      <p className="mt-3 text-sm text-slate-400">
                        <span className="text-slate-300">Core Subject:</span> {item.coreSubject}
                      </p>
                    )}

                    {item.learning && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.learning.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-sm text-slate-400 mt-4">{item.desc}</p>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
