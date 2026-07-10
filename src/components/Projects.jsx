import { useState } from 'react'
import { motion } from 'framer-motion'
import { Github, ExternalLink, ImageOff } from 'lucide-react'
import { projects } from '../data/projects'
import SectionHeading from './SectionHeading'
import ProjectModal from './ProjectModal'

export default function Projects() {
  const [active, setActive] = useState(null)

  return (
    <section id="projects" className="relative py-28 px-6 max-w-6xl mx-auto">
      <SectionHeading
        eyebrow="Featured Work"
        title="Projects worth a second look"
        subtitle="From backend fundamentals to this very site — each project is a step in the same story."
      />

      <div className="mt-14 grid sm:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: (i % 2) * 0.1 }}
            whileHover={{ y: -6 }}
            onClick={() => setActive(project)}
            className="group glass rounded-2xl overflow-hidden cursor-pointer hover:shadow-glow transition-shadow"
            data-cursor-hover
          >
            <div className="aspect-video bg-gradient-to-br from-void-900 to-void-800 flex items-center justify-center relative overflow-hidden">
              <ImageOff className="text-slate-700" size={32} />
              <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent opacity-60" />
              <span className={`absolute top-3 right-3 text-[10px] tracking-widest uppercase px-2 py-1 rounded-full ${
                project.status === 'Completed' ? 'bg-secondary/20 text-secondary' : 'bg-highlight/20 text-highlight'
              }`}>
                {project.status}
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-display font-semibold text-xl text-slate-100 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 mt-2">{project.tagline}</p>

              <div className="flex flex-wrap gap-2 mt-4">
                {project.stack.slice(0, 4).map((t) => (
                  <span key={t} className="text-xs px-2 py-1 rounded-full bg-slate-800/70 text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 mt-5 text-sm text-slate-400">
                {project.github && (
                  <span className="inline-flex items-center gap-1.5"><Github size={15} /> Code</span>
                )}
                {project.demo && (
                  <span className="inline-flex items-center gap-1.5"><ExternalLink size={15} /> Live</span>
                )}
                <span className="ml-auto text-primary text-xs group-hover:underline">View details →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <ProjectModal project={active} onClose={() => setActive(null)} />
    </section>
  )
}
