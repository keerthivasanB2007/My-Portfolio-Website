import { AnimatePresence, motion } from 'framer-motion'
import { X, Github, ExternalLink, Layers, Lightbulb, Rocket } from 'lucide-react'

export default function ProjectModal({ project, onClose }) {
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-void/90 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-strong rounded-3xl p-8"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-100"
              aria-label="Close project details"
            >
              <X size={22} />
            </button>

            <span className="eyebrow">{project.status}</span>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-slate-50 mt-2">{project.title}</h3>
            <p className="text-slate-400 mt-2">{project.tagline}</p>

            <div className="flex flex-wrap gap-2 mt-5">
              {project.stack.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-full bg-slate-800/70 text-slate-300">{t}</span>
              ))}
            </div>

            {/* Simple architecture / flow sketch */}
            <div className="mt-8 glass rounded-2xl p-5">
              <p className="eyebrow mb-3">Project Flow</p>
              <div className="flex items-center gap-2 overflow-x-auto text-xs sm:text-sm text-slate-300">
                {['Input', 'Processing', 'Logic Layer', 'Data Store', 'Output'].map((step, i, arr) => (
                  <div key={step} className="flex items-center gap-2 shrink-0">
                    <span className="px-3 py-1.5 rounded-lg bg-slate-800/70 whitespace-nowrap">{step}</span>
                    {i < arr.length - 1 && <span className="text-primary">→</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mt-8">
              <div>
                <p className="flex items-center gap-2 eyebrow mb-2"><Layers size={14} /> Features</p>
                <ul className="space-y-1.5 text-sm text-slate-400 list-disc list-inside">
                  {project.features.map((f) => <li key={f}>{f}</li>)}
                </ul>
              </div>
              <div className="space-y-5">
                <div>
                  <p className="flex items-center gap-2 eyebrow mb-2"><Lightbulb size={14} /> Challenges</p>
                  <p className="text-sm text-slate-400">{project.challenges}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">Lessons Learned</p>
                  <p className="text-sm text-slate-400">{project.lessons}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="flex items-center gap-2 eyebrow mb-2"><Rocket size={14} /> Future Improvements</p>
              <ul className="space-y-1.5 text-sm text-slate-400 list-disc list-inside">
                {project.future.map((f) => <li key={f}>{f}</li>)}
              </ul>
            </div>

            <div className="flex gap-4 mt-8">
              {project.github && (
                <a href={project.github} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass text-sm text-slate-200 hover:shadow-glow transition-shadow">
                  <Github size={16} /> View Code
                </a>
              )}
              {project.demo && (
                <a href={project.demo} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-accent text-slate-950 text-sm font-medium">
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
